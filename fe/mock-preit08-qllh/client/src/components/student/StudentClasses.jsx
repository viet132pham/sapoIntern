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

const StudentClasses = () => {
  const authState = useSelector(authSelector);
  const [classes, setClasses] = useState([]);
  const [page, setPage] = React.useState(1);

  const navigate = useNavigate();

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
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
      title: "Thời gian học",
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
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "tags",
      align: "center",
      render: (_, record) => {
        let color = "red";
        if (record.status === "STUDYING") color = "blue";
        else if (record.status === "FINISHED") color = "green";
        else if (record.status === "WAITING") color = "orange";
        return <Tag color={color}>{handleStatus(record.status)}</Tag>;
      },
    },
    {
      title: "Địa chỉ",
      render: (_, record) => {
        return (
          <div>
            <div>Phòng {record.classes.room}</div>
            <div>- {record.classes.department.address}</div>
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
            onClick={() => navigate(`/student/class/detail/${record.id.classId}`)}
          >
            Chi tiết lớp
          </Button>
        </div>
      ),
      align: "center",
    },
  ];

  const loadCategoryList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/student_class/studentId/${authState.id}`)
      .then((res) => {
        setClasses(res.data);
      });
  };

  useEffect(() => {
    loadCategoryList();
    // eslint-disable-next-line
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>DANH SÁCH LỚP HỌC VIÊN</div>
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
              onClick: event => navigate(`/student/class/detail/${record.id.classId}`)
            }
          }}
          rowClassName="table-row"
          rowKey="(record,index)=>{return index}"
        />
      </Col>
    </Row>
  );
};

export default StudentClasses;
