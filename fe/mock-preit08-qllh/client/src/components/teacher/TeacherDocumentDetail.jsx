import { Button, Col, Row, Table } from "antd";
import { LeftOutlined, DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import setAuthToken from "../../utils/setAuthToken";

// ***** D O N E ***********

const TeacherDocumentDetail = () => {
  const match = useMatch(`/teacher/document/:id`);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [submissions, setSubmissions] = useState();
  const [document, setDocument] = useState({});

  const loadSubmission = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/submission/documentId/${match.params.id}`)
      .then((response) => {
        setSubmissions(response.data);
      });
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
    loadSubmission();
    loadDocument();
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
      title: "Họ và tên học viên",
      render: (record) => record.student.fullName,
      align: "center",
    },
    {
      title: "Link bài nộp",
      render: (record) => (
        <a href={record.url} target="_blank" rel="noreferrer">
          Xem bài làm
        </a>
      ),
      align: "center",
    },
    {
      title: "Thời gian nộp",
      render: (record) =>
        new Date(record.createdDate).toLocaleDateString("vi-VN", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      align: "center",
      sorter: (a, b) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
  ];

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>Xem bài nộp học viên</div>
        </Row>
        <Row>
          <Button
            className="back-btn"
            type="text"
            onClick={() => {
              navigate("/teacher/document");
            }}
          >
            <LeftOutlined /> Quay lại
          </Button>
        </Row>
        <Row>
          <Col span={6}>
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
          </Col>
          <Col span={18}>
            <Row justify="center" className="mb25">
              <h2>Danh sách bài nộp của học viên</h2>
            </Row>
            <Table
              columns={columns}
              dataSource={submissions}
              bordered
              pagination={{
                pageSize: 8,
                position: ["bottomCenter"],
                onChange(current) {
                  setPage(current);
                },
              }}
              rowKey="id"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TeacherDocumentDetail;
