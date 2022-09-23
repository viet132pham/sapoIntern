import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import { Button, Col, Row, Table, Input, Tag } from "antd";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useMatch, useNavigate } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const AdminDepartmentDetail = () => {
  const [classDetail, setClassDetail] = useState([]);
  const [page, setPage] = React.useState(1);
  const [classFilter, setClassFilter] = useState([]);
  const match = useMatch("/admin/department/detail/:id");
  const navigate = useNavigate();

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
    },
    {
      title: "Mã lớp",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Tên lớp",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Phòng học",
      dataIndex: "room",
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "tags",
      render: (_, record) => {
        let color = "red";
        if (record.status === "STUDYING") color = "blue";
        else if (record.status === "FINISHED") color = "green";
        else if (record.status === "WAITING") color = "orange";
        return <Tag color={color}>{handleStatus(record.status)}</Tag>;
      },
      align: "center",
      filters: [
        {
          text: "ĐANG HỌC",
          value: "STUDYING",
        },
        {
          text: "HOÀN THÀNH",
          value: "FINISHED",
        },
        {
          text: "SẮP MỞ",
          value: "WAITING",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Ngày bắt đầu",
      render: (record) =>
        new Date(record.startDate).toLocaleDateString("en-GB"),
      align: "center",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Ngày kết thúc",
      render: (record) => new Date(record.endDate).toLocaleDateString("en-GB"),
      align: "center",
      sorter: (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      sortDirections: ["descend"],
    },
  ];

  // load classDetail and category
  const loadCategoryList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/class/department/${match.params.id}`)
      .then((res) => {
        setClassDetail(res.data);
        setClassFilter(res.data);
      });
  };
  const handleChangeFilter = (event) => {
    const newClass = classDetail.filter((item, index) => {
      return (
        item.name.toUpperCase().search(event.target.value.toUpperCase()) !== -1 || item.code.toUpperCase().search(event.target.value.toUpperCase()) !== -1
      );
    });
    setClassFilter(newClass);
  };

  useEffect(() => {
    loadCategoryList();
    // eslint-disable-next-line
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>Danh sách các lớp tại chi nhánh</div>
        </Row>
        <Row>
          <Col>
            <Button className="back-btn" type="text">
              <Link to="/admin/department">
                <LeftOutlined /> Quay lại
              </Link>
            </Button>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col style={{ marginBottom: "20px" }} span={9}>  
              <Input
                prefix={<SearchOutlined />}
                allowClear
                placeholder="Tìm kiếm theo tên lớp"
                onChange={handleChangeFilter}
                className="search-input"
              />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={classFilter}
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
              onClick: event => navigate(`/admin/class/detail/${record.id}`)
            }
          }}
          rowClassName="table-row"
          rowKey="(record,index)=>{return index}"
        />
      </Col>
    </Row>
  );
};

export default AdminDepartmentDetail;
