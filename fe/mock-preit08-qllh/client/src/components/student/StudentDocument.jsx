import { Button, Col, Row, Table, Modal, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/reducers/authSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../config/firebaseConfig";
import {
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********
const beforeUpload = (file) => {
  const isLt5 = file.size / 1024 / 1024 < 5;
  if (!isLt5) {
    message.error("IVui lòng tải lên file nhỏ hơn 5MB!");
  }
  return isLt5;
};
const StudentDocument = () => {
  const authState = useSelector(authSelector);
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = React.useState(1);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [submission, setSubmission] = useState({
    studentId: authState.id,
    url: "",
    documentId: "",
  });

  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList.slice(-1));
  };
  const handleUpload = (file) => {
    const storageRef = ref(storage, `/files/student/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setSubmission({ ...submission, url: url });
        });
        setLoading(false);
        setDisabledSubmitBtn(false);
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/submission/post`,
        submission
      );
      if (response.status === 200) {
        successMsg("Nộp bài tập thành công!");
        setIsModalAddVisible(false);
      } else {
        errorMsg("Có lỗi xảy ra");
      }
    } catch (error) {
      errorMsg("Có lỗi xảy ra");
      console.log(error);
    }
  };

  const props = {
    beforeUpload: beforeUpload,
    action: handleUpload,
    onChange: handleChange,
    multiple: true,
  };

  const loadDocument = async (id) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/document/${id}`).then((response) => {
      setDocument(response.data);
      setSubmission({ ...submission, documentId: id });
    });
  };
  const loadHomework = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/document/studentId/${authState.id}`)
      .then((response) => {
        setDocuments(response.data);
      });
  };

  const handleCancel = () => {
    setIsModalAddVisible(false);
  };
  useEffect(() => {
    loadHomework();
    // eslint-disable-next-line
  }, []);
  const showDocument = async (id) => {
    // showModal()
    loadDocument(id);
    setIsModalAddVisible(true);
  };

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
    },
    {
      title: "Tên tài liệu",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Mã lớp",
      render: (record) => record.classes.code,
      align: "center",
    },
    {
      title: "Tên lớp",
      render: (record) => record.classes.name,
      align: "center",
    },
    {
      title: "Kiểu tài liệu",
      render: (record) => handleStatus(record.type),
      align: "center",
      filters: [
        {
          text: "Bài tập",
          value: "HW",
        },
        {
          text: "Tài liệu",
          value: "DOC",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
    },
    {
      title: "Hạn cuối",
      render: (record) => {
        if (record.type === "HW")
          return new Date(record.deadline).toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
        else return "---";
      },
      align: "center",
      sorter: (a, b) =>
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime(),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Tùy chọn",
      render: (record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              // navigate(`/student/document/${record.id}`);
              showDocument(record.id);
            }}
          >
            Chi tiết
          </Button>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <div>
      <Row justify="center">
        <Col span={23} offset={0}>
          <Row className="section-title">
            <div>DANH SÁCH TÀI LIỆU</div>
          </Row>
          <Table
            columns={columns}
            dataSource={documents}
            bordered
            pagination={{
              pageSize: 10,
              position: ["bottomCenter"],
              onChange(current) {
                setPage(current);
              },
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  showDocument(record.id);
                  setIsModalAddVisible(true);
                },
              };
            }}
            rowClassName="table-row"
            rowKey="id"
          />
        </Col>
      </Row>
      <Modal
        title={"Bài tập"}
        visible={isModalAddVisible}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            disabled={disabledSubmitBtn}
          >
            Nộp bài
          </Button>,
        ]}
      >
        <Row
          style={{
            color: "var(--text-color)",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <h2>{document.name}</h2>
          Hết hạn vào:{" "}
          {new Date(document.deadline).toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Row>
        <Row
          style={{
            color: "var(--text-color)",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <h3>Hướng dẫn</h3>
          <div>{document.instruction}</div>
        </Row>
        <Row
          style={{
            color: "var(--text-color)",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <h3>Tập tin liên quan</h3>
          <a target="_blank" rel="noreferrer" href={document.url}>
            <DownloadOutlined /> Tải xuống
          </a>
        </Row>
        {document.type === "HW" ? (
          <Row
            style={{
              color: "var(--text-color)",
              marginBottom: "20px",
              flexDirection: "column",
            }}
          >
            <h3>Bài làm của tôi</h3>
            <Upload {...props} fileList={fileList}>
              <div className="upload-btn">
                <UploadOutlined /> Đính kèm
              </div>
            </Upload>
          </Row>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

export default StudentDocument;
