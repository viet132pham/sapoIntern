import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import { Col, Row, Table, Tag } from "antd";
import setAuthToken from "../../utils/setAuthToken";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const EmployeeClasses = () => {
  const [classes, setClasses] = useState([]);
  const [page, setPage] = React.useState(1);
  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
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
      defaultFilteredValue: ["WAITING"],
    },
    {
      title: "Thời gian học",
      render: (_, record) => (
        <div>
          {record.timeslots.map((element) => (
            <div>
              <div>
                {element.date}: {element.time}
              </div>
            </div>
          ))}
        </div>
      ),
      align: "center",
    },
    {
      title: "Mã lớp",
      render: (record) => record.code,
      align: "center",
    },
    {
      title: "Khóa học",
      render: (record) => record.course.name,
      align: "center",
      filters: [
        {
          text: "Khóa học IETLS band 6.0",
          value: "Khóa học IETLS band 6.0",
        },
        {
          text: "Khóa học IETLS band 6.5",
          value: "Khóa học IETLS band 6.5",
        },
        {
          text: "Khóa học IETLS band 7.0",
          value: "Khóa học IETLS band 7.0",
        },
        {
          text: "Khóa học IETLS band 7.5",
          value: "Khóa học IETLS band 7.5",
        },
        {
          text: "Khóa học IETLS Beginner",
          value: "Khóa học IETLS Beginner",
        },
      ],
      onFilter: (value, record) => record.course.name.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Phòng học",
      render: (record) => record.room,
      align: "center",
    },
    {
      title: "Cơ sở",
      render: (record) => record.department.name,
      align: "center",
    },
    {
      title: "Địa chỉ",
      render: (record) => record.department.address,
      align: "center",
    },
  ];

  const loadClassList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/class/`).then((res) => {
      setClasses(res.data);
    });
  };

  useEffect(() => {
    loadClassList();
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>THÔNG TIN CÁC LỚP ĐANG MỞ, SẮP MỞ</div>
        </Row>
        <Table
          columns={columns}
          dataSource={classes}
          bordered
          pagination={{
            pageSize: 8,
            position: ["bottomCenter"],
            onChange(current) {
              setPage(current);
            },
          }}
          rowKey="(record,index)=>{return index}"
        />
      </Col>
    </Row>
  );
};

export default EmployeeClasses;
