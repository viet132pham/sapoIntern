import { Button, Col, message, Row, Upload } from "antd";
import {
  LeftOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { useMatch, useNavigate } from "react-router-dom";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/reducers/authSlice";

// ***** D O N E ***********

const beforeUpload = (file) => {
  const isLt5 = file.size / 1024 / 1024 < 5;
  if (!isLt5) {
    message.error("IVui lòng tải lên file nhỏ hơn 5MB!");
  }
  return isLt5;
};

const StudentDocumentDetail = () => {
  const match = useMatch(`/student/document/:id`);
  const navigate = useNavigate();
  const authState = useSelector(authSelector);
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [submission, setSubmission] = useState({
    studentId: authState.id,
    documentId: parseInt(match.params.id),
    url: "",
  });

  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  const loadDocument = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/document/${match.params.id}`)
      .then((response) => {
        setDocument(response.data);
      });
  };

  useEffect(() => {
    loadDocument();
    // eslint-disable-next-line
  }, []);

  // preview list of files
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

  return (
    <Row>
      <Col offset={1} span={22}>
        <Row className="section-title">
          <div>Tài liệu</div>
        </Row>
        <Row justify="space-between">
          <Col>
            <Row>
              <Button
                className="back-btn"
                type="text"
                onClick={() => {
                  navigate("/student/document");
                }}
              >
                <LeftOutlined /> Quay lại
              </Button>
            </Row>
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
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              disabled={loading}
              onClick={handleSubmit}
            >
              Nộp bài
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StudentDocumentDetail;
