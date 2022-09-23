import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
  Button,
  Col,
  Row,
  Table,
  Tag,
  Input,
  message,
  Modal,
  Form,
  Select,
} from "antd";
import {
  LeftOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Link, useMatch } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import handleStatus from "../../utils/handleStatus";

const AdminClassesDetail = () => {
  const [classDetail, setClassDetail] = useState([]);
  const [page, setPage] = React.useState(1);
  const [classes, setClasses] = useState([]);
  const [department, setDepartmane] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [classDetailsFilter, setClassDetailsFilter] = useState([]);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [studentForm, setStudentForm] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [form] = Form.useForm();
  const [student, setStudent] = useState([]);
  const [course, setCourse] = useState([]);
  const [optionClass, setOptionClass] = useState([]);
  const [optionStudent, setOptionStudent] = useState([]);

  const match = useMatch("/admin/class/detail/:id");

  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };
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
      title: "Email",
      render: (record) => record.student.email,
      align: "center",
    },
    {
      title: "Số điện thoại",
      render: (record) => record.student.phone,
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
          text: "NGHỈ",
          value: "CANCELED",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      align: "center",
    },
    {
      title: "Chuyển lớp",
      render: (record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button onClick={() => showModalUpdate(record)}>Chuyển lớp</Button>
        </div>
      ),
      align: "center",
    },
  ];
  const onSelectClass = (value) => {
    setStudentForm({
      ...studentForm,
      classId: value,
    });
  };
  const onSelectStudent = (value) => {
    setStudentForm({
      ...studentForm,
      studentId: value,
    });
  };

  const showModalAdd = () => {
    setIsModalAddVisible(true);
    LoadStudentList();
    form.setFieldsValue({
      studentId: studentForm.studentId,
    });
  };
  const handleCancel = () => {
    setIsModalUpdateVisible(false);
    setIsModalAddVisible(false);
  };
  const loadStudent = async (id) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(
        `${apiUrl}/api/student_class/studentId/${id.studentId}/classId/${id.classId}`
      )
      .then((res) => {
        setCourse(res.data.course);
        setStudentForm(res.data.id);
      });
  };
  const showModalUpdate = (record) => {
    loadStudent(record.id);
    setStudent(record.student);
    LoadClassList();

    form.setFieldsValue({
      id: studentForm.id,
    });
    setIsModalUpdateVisible(true);
  };
  const handleSubmit = async () => {
    let update = {
      studentId: student.id,
      classId: studentForm.classId,
      status: "STUDYING",
    };
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .put(
        `${apiUrl}/api/student_class/admin/studentId/${student.id}/classId/${classes.id}`,
        update
      )
      .then((res) => {
        if (res.status !== 200) {
          errorMsg("Có lỗi xảy ra");
        } else {
          successMsg("Chuyển lớp thành công");
          loadCategoryList();
          setIsModalUpdateVisible(false);
        }
      });
  };
  const handleSubmitAdd = async () => {
    let add = {
      status: "STUDYING",
      classId: classes.id,
      studentId: studentForm.studentId,
    };

    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.post(`${apiUrl}/api/student_class/post`, add).then((res) => {
      if (res.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Thêm học viên thành công");
        loadCategoryList();
        setIsModalAddVisible(false);
      }
    });
  };
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
      setStudentForm(res.data);
      setDepartmane(res.data.department);
      setTimeslots(res.data.timeslots);
      setCourse(res.data.course);
    });
  };
  // load classDetail and category
  const loadCategoryList = async () => {
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
  };
  const LoadClassList = async () => {
    await axios.get(`${apiUrl}/api/class/course/${course.id}`).then((res) => {
      const newList = [];
      res.data.forEach((item, index) => {
        newList.push({
          label: item.name + " - " + item.code,
          value: item.id,
        });
      });
      setOptionClass(newList);
    });
  };
  const LoadStudentList = async () => {
    await axios.get(`${apiUrl}/api/user/get?role=STUDENT`).then((res) => {
      const newList = [];
      res.data.forEach((item, index) => {
        newList.push({
          label: item.fullName + " - " + item.phone,
          value: item.id,
        });
      });
      setOptionStudent(newList);
    });
  };

  useEffect(() => {
    loadCategoryList();
    loadClasses();
    LoadStudentList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={23} offset={0}>
          <Row className="section-title">
            <div>Chi tiết lớp học viên</div>
          </Row>
          <Row>
            <Button className="back-btn" type="text">
              <Link to="/admin/class">
                <LeftOutlined /> Quay lại
              </Link>
            </Button>
          </Row>
          <div className="white-box">
            <Row>
              <Col span={3}>Giảng viên:</Col>
              <Col span={9} style={{ fontWeight: "600" }}>
                {teacher.fullName}
              </Col>
              <Col span={3}>Số điện thoại:</Col>
              <Col span={1} style={{ fontWeight: "600" }}>
                {teacher.phone}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={3}>Email giảng viên:</Col>
              <Col span={9} style={{ fontWeight: "600" }}>
                {teacher.email}
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={3}>Tên lớp:</Col>
              <Col span={9} style={{ fontWeight: "600" }}>
                {classes.name}
              </Col>
              <Col span={3}>Sĩ số:</Col>
              <Col span={1} style={{ fontWeight: "600" }}>
                {classDetail.length}/15
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={3}>Tên cơ sở:</Col>
              <Col span={9} style={{ fontWeight: "600" }}>
                {department.name}
              </Col>
              <Col span={3}>Thời gian học:</Col>
              <Col span={4} style={{ fontWeight: "600" }}>
                {timeslots.map((element) => (
                  <div>
                    {element.date}: {element.time}
                  </div>
                ))}
              </Col>
            </Row>
          </div>
          <Row justify="space-between" className="mb25">
            <Col style={{ margin: "0 0 20 0" }} span={9}>
              <Input
                prefix={<SearchOutlined />}
                allowClear
                placeholder="Tìm kiếm theo tên"
                onChange={handleChangeFilter}
                className="search-input"
              />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => showModalAdd()}
                className="add-btn"
              >
                <PlusCircleOutlined style={{ marginRight: "10px" }} />
                Thêm học viên
              </Button>
            </Col>
          </Row>
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
      <Modal
        title={"Thêm học viên"}
        visible={isModalAddVisible}
        okText="Gửi"
        cancelText="Hủy"
        onOk={handleSubmitAdd}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            name="studentId"
            label="Chọn học viên"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn học viên",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Học viên"
              optionFilterProp="label"
              onChange={onSelectStudent}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={optionStudent}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={"Chuyển lớp cho học viên"}
        visible={isModalUpdateVisible}
        okText="Gửi"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="id"
            label="Chọn lớp học"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mã danh mục",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Lớp học"
              optionFilterProp="label"
              onChange={onSelectClass}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={optionClass}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminClassesDetail;
