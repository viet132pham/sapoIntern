import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import { Button, Col, Row, Table, Tag } from "antd";
import setAuthToken from "../../utils/setAuthToken";
import { authSelector } from "../../features/reducers/authSlice";
import { useSelector } from "react-redux";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const [page, setPage] = React.useState(1);
  const authState = useSelector(authSelector);
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
      render: (record) => record.classes.code,
      align: "center",
    },
    {
      title: "Tên lớp",
      render: (record) => record.classes.name,
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "tags",
      render: (_, record) => {
        let color = "red";
        if (record.status === "TEACHING") color = "blue";
        else if (record.status === "FINISHED") color = "green";
        else if (record.status === "WAITING") color = "orange";
        return <Tag color={color}>{handleStatus(record.status)}</Tag>;
      },
      align: "center",
      filters: [
        {
          text: "TEACHING",
          value: "TEACHING",
        },
        {
          text: "FINISHED",
          value: "FINISHED",
        },
        {
          text: "CANCELED",
          value: "CANCELED",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Thời gian dạy",
      render: (_, record) => (
        <div>
          {record.classes.timeslots.map((element) => (
            <div>
              <div>
                {element.date}: {element.time}
              </div>
            </div>
          ))}
        </div>
      ),
      width: "20%",
      align: "center",
    },
    {
      title: "Địa chỉ",
      render: (_, record) => {
        return (
          <div>
            <div>Phòng {record.classes.room}</div>
            <div>Cơ sở {record.classes.department.address}</div>
          </div>
        );
      },
      align: "center",
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
            onClick={() => navigate(`/teacher/class/detail/${record.id.classId}`)}
          >
            Chi tiết
          </Button>
        </div>
      ),
      align: "center",
    },
  ];

  // load classes and class
  const loadClassList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/teacherClass/teacherId/${authState.id}`)
      .then((res) => {
        setClasses(res.data);
      });
  };

  useEffect(() => {
    loadClassList();
    // eslint-disable-next-line
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>DANH SÁCH LỚP CỦA GIẢNG VIÊN</div>
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
          onRow={(record, rowIndex) => {
            return {
              onClick: event => navigate(`/teacher/class/detail/${record.id.classId}`)
            }
          }}
          rowClassName="table-row"
          rowKey="(record,index)=>{return index}"
        />
      </Col>
    </Row>
  );
};

export default TeacherClasses;
