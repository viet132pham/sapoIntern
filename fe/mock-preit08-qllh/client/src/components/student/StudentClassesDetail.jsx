import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import { Button, Col, Row, Table, Tag, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useMatch } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import handleStatus from "../../utils/handleStatus";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/reducers/authSlice";

// ***** D O N E ***********

const StudentClassesDetail = () => {
  const authState = useSelector(authSelector);
  const [classDetail, setClassDetail] = useState([]);
  const [page, setPage] = React.useState(1);
  const [classes, setClasses] = useState([]);
  const [department, setDepartmane] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [classDetailsFilter, setClassDetailsFilter] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [point, setPoint] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeNumber, setGradeNumber] = useState("");

  const match = useMatch("/student/class/detail/:id");

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
    },
    {
      title: "Họ và tên",
      render: (record) => record.student.fullName,
      align: "center",
    },
    {
      title: "Ngày sinh",
      render: (record) =>
        new Date(record.student.dob).toLocaleDateString("en-GB"),
      align: "center",
    },
    {
      title: "Địa chỉ",
      render: (record) => record.student.address,
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        let color = "red";
        if (record.status === "STUDYING") color = "blue";
        else if (record.status === "FINISHED") color = "green";
        return <Tag color={color}>{handleStatus(record.status)}</Tag>;
      },
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
          text: "HỦY",
          value: "CANCELLED",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      align: "center",
    },
  ];

  const handleChangeFilter = (event) => {
    if (event.target.value === "") {
      setClassDetailsFilter(classDetail);
    } else {
      const newClassDetails = classDetail.filter((item, index) => {
        return item.student.fullName.search(event.target.value) !== -1;
      });
      setClassDetailsFilter(newClassDetails);
    }
  };
  const loadClasses = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/class/${match.params.id}`).then((res) => {
      setClasses(res.data);
      setDepartmane(res.data.department);
      setTimeslots(res.data.timeslots);
      setGradeNumber(res.data.course.numberGrade);
    });
  };
  // load classDetail and category
  const loadInfo = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/student_class/classId/${match.params.id}`)
      .then((res) => {
        setClassDetail(res.data);
        setClassDetailsFilter(res.data);
      });
    await axios
      .get(`${apiUrl}/api/teacherClass/classId/${match.params.id}`)
      .then((res) => {
        setTeacher(res.data.teacher);
      });
    await axios
      .get(
        `${apiUrl}/api/student_grade/get/${match.params.id}/studentId/${authState.id}`
      )
      .then((res) => {
        console.log(res.data[0]);
        setPoint(res.data[0].point);
        console.log(point);
        setGrade(res.data[0].gradeId);
        console.log(grade);
      });
  };

  var items = new Array(gradeNumber).fill(null).map((_, i) => {
    const id2 = i + 1;
    const gradeIds = JSON.parse("[" + grade + "]");
    const points = JSON.parse("[" + point + "]");
    if (gradeIds.indexOf(id2) >= 0)
      return (
        <div>
          Điểm bài {id2}: <span style={{color: 'var(--red)', fontSize: '16px', marginLeft: "20px"}}>{points[gradeIds.indexOf(id2)]}</span> 
        </div>
      );
    else return <div>Điểm bài {id2}: chưa có</div>;
  });

  useEffect(() => {
    loadInfo();
    loadClasses();
    // eslint-disable-next-line
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>Chi tiết lớp học viên</div>
        </Row>
        <Row>
          <Button className="back-btn" type="text">
            <Link to="/student/classes">
              <LeftOutlined /> Quay lại
            </Link>
          </Button>
        </Row>
        <Row>
          <Col span={8} className="white-box">
            <Row className="mb25">
              <h2>Thông tin lớp</h2>
            </Row>
            <Row>
              <Col span={6}>Tên lớp:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {classes.name}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Mã lớp:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {classes.code}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Giảng viên:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {teacher.fullName ? teacher.fullName : "Chưa có"}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Số điện thoại:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {teacher.phone ? teacher.phone : "Chưa có"}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Email giảng viên:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {teacher.email ? teacher.email : "Chưa có"}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Tiến độ học:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {classes.course ? (
                  <>
                    {classes.progress}/{classes.course.numberSession} buổi
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Sĩ số:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {classDetail.length}/15
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Địa điểm:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                Phòng {classes.room} - {department.address}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Thời gian học:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {timeslots.map((element) => (
                  <div>
                    {element.date}: {element.time}
                  </div>
                ))}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={6}>Điểm:</Col>
              <Col span={16} offset={2} style={{ fontWeight: "600" }}>
                {items}
              </Col>
            </Row>
          </Col>
          <Col span={15} offset={1} className="white-box">
            <Row className="mb25">
              <h2>Danh sách học viên cùng lớp</h2>
            </Row>
            <Row>
              <Col span={18}>
                <Input
                  allowClear
                  placeholder="Tìm theo tên"
                  onChange={handleChangeFilter}
                  style={{ width: "300px" }}
                />
              </Col>
            </Row>
            <br />
            <Table
              columns={columns}
              dataSource={classDetailsFilter}
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
      </Col>
    </Row>
  );
};

export default StudentClassesDetail;
