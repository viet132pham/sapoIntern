import { Button, Col, Row, Table, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authSelector } from "../../features/reducers/authSlice";
import { useSelector } from "react-redux";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const TeacherDocument = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(1);
  const authState = useSelector(authSelector);
  const [documentsFilter, setDocumentsFilter] = useState([]);

  const handleChangeFilter = (event) => {
    if (event.target.value === "") {
      setDocumentsFilter(documents);
    } else {
      const newDocuments = documents.filter((item, index) => {
        return item.classes.code.search(event.target.value) !== -1;
      });
      setDocumentsFilter(newDocuments);
    }
  };
  const loadDocuments = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/document/teacherId/${authState.id}`)
      .then((res) => {
        setDocuments(res.data);
        setDocumentsFilter(res.data);
      });
  };

  useEffect(() => {
    loadDocuments();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
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
      width: "10%",
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
              navigate(`/teacher/document/${record.id}`);
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
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>TÀI LIỆU GIẢNG VIÊN</div>
        </Row>
        <Row justify="space-between">
          <Col style={{ margin: "0 0 20 0" }} span={9}>
              <Input
                allowClear
                placeholder="Tìm theo mã lớp"
                onChange={handleChangeFilter}
                className="search-input"
              />
          </Col>
          <Col>
            <Button
              className="add-btn"
              type="primary"
              style={{ marginBottom: "20px" }}
            >
              <Link to="upload">
                <PlusCircleOutlined style={{ marginRight: "10px" }} />
                Tải tài liệu
              </Link>
            </Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={documentsFilter}
          bordered
          pagination={{
            pageSize: 8,
            position: ["bottomCenter"],
            onChange(current) {
              setPage(current);
            },
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => navigate(`/teacher/document/${record.id}`)
            }
          }}
          rowClassName="table-row"
          rowKey="id"
        />
      </Col>
    </Row>
  );
};

export default TeacherDocument;
