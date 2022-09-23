import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../common/constants";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
  Divider,
  DatePicker,
  Select,
  //   Checkbox,
} from "antd";
// import moment from "moment";
import { LeftOutlined } from "@ant-design/icons";
import {
  Link,
  useNavigate,
  useParams,
  //   useSearchParams,
} from "react-router-dom";
import moment from "moment";

// ***** D O N E ***********

const AdminClassUpdate = () => {
  const [updateForm, setUpdateForm] = useState({});
  const [form] = Form.useForm();
  const [optionTeacher, setoptionTeacher] = useState([]);
  const [teacherClassForm, setTeacherClassForm] = useState({});
  const [optionCourse, setOptionCourse] = useState([]);
  const [optionDepartment, setOptionDepartment] = useState([]);
  const dateFormat = "YYYY/MM/DD";

  const { Option } = Select;
  const children = [
    <Option key={1}>Thứ hai 07:30 - 09:30</Option>,
    <Option key={2}>Thứ hai 10:00 - 12:00</Option>,
    <Option key={3}>Thứ hai 14:00 - 16:00</Option>,
    <Option key={4}>Thứ hai 16:30 - 18:30</Option>,
    <Option key={5}>Thứ hai 19:30 - 21:30</Option>,
    <Option key={6}>Thứ ba 07:30 - 09:30</Option>,
    <Option key={7}>Thứ ba 10:00 - 12:00</Option>,
    <Option key={8}>Thứ ba 14:00 - 16:00</Option>,
    <Option key={9}>Thứ ba 16:30 - 18:30</Option>,
    <Option key={10}>Thứ ba 19:30 - 21:30</Option>,
    <Option key={11}>Thứ tư 07:30 - 09:30</Option>,
    <Option key={12}>Thứ tư 10:00 - 12:00</Option>,
    <Option key={13}>Thứ tư 14:00 - 16:00</Option>,
    <Option key={14}>Thứ tư 16:30 - 18:30</Option>,
    <Option key={15}>Thứ tư 19:30 - 21:30</Option>,
    <Option key={16}>Thứ năm 07:30 - 09:30</Option>,
    <Option key={17}>Thứ năm 10:00 - 12:00</Option>,
    <Option key={18}>Thứ năm 14:00 - 16:00</Option>,
    <Option key={19}>Thứ năm 16:30 - 18:30</Option>,
    <Option key={20}>Thứ năm 19:30 - 21:30</Option>,
    <Option key={21}>Thứ sáu 07:30 - 09:30</Option>,
    <Option key={22}>Thứ sáu 10:00 - 12:00</Option>,
    <Option key={23}>Thứ sáu 14:00 - 16:00</Option>,
    <Option key={24}>Thứ sáu 16:30 - 18:30</Option>,
    <Option key={25}>Thứ sáu 19:30 - 21:30</Option>,
    <Option key={26}>Thứ bảy 07:30 - 09:30</Option>,
    <Option key={27}>Thứ bảy 10:00 - 12:00</Option>,
    <Option key={28}>Thứ bảy 14:00 - 16:00</Option>,
    <Option key={29}>Thứ bảy 16:30 - 18:30</Option>,
    <Option key={30}>Thứ bảy 19:30 - 21:30</Option>,
    <Option key={31}>Chủ nhật 07:30 - 09:30</Option>,
    <Option key={32}>Chủ nhật 10:00 - 12:00</Option>,
    <Option key={33}>Chủ nhật 14:00 - 16:00</Option>,
    <Option key={34}>Chủ nhật 16:30 - 18:30</Option>,
    <Option key={35}>Chủ nhật 19:30 - 21:30</Option>,
  ];

  const onChangeStartDate = (date, dateString) => {
    setUpdateForm({ ...updateForm, startDate: new Date(dateString) });
  };
  const onChangeEndDate = (date, dateString) => {
    setUpdateForm({ ...updateForm, endDate: new Date(dateString) });
  };
  const handleChangePut = (value) => {
    setUpdateForm({ ...updateForm, timeslotId: value });
  };

  useEffect(() => {
    loadInfo();
    loadTeacherList();
    loadCourseList();
    loadDepartmentList();
    // eslint-disable-next-line
  }, []);

  const param = useParams();
  const navigate = useNavigate();
  //   const [searchParam] = useSearchParams();
  let dataView;
  dataView = {
    successMsg: "Sửa tài lớp học thành công !",
    title: "SỬA LỚP HỌC",
    section: "Lớp học",
    backText: "Quay lại",
    backLink: "/admin/class",
  };

  const loadCourseList = async () => {
    await axios.get(`${apiUrl}/api/course/`).then((res) => {
      const newList = [];
      res.data.forEach((item, index) => {
        newList.push({
          label: item.name,
          value: item.id,
        });
      });
      setOptionCourse(newList);
    });
  };
  const loadDepartmentList = async () => {
    await axios.get(`${apiUrl}/api/department/`).then((res) => {
      const newList = [];
      res.data.forEach((item, index) => {
        newList.push({
          label: item.name,
          value: item.id,
        });
      });
      setOptionDepartment(newList);
    });
  };
  const loadTeacherList = async () => {
    await axios.get(`${apiUrl}/api/user/get?role=TEACHER`).then((res) => {
      const newList = [];
      res.data.forEach((item, index) => {
        newList.push({
          label: item.fullName + " - " + item.phone,
          value: item.id,
        });
      });
      setoptionTeacher(newList);
    });
  };

  const loadInfo = async () => {
    await axios
      .get(`${apiUrl}/api/class/${param.id}`)
      .then((res) => {
        // res.point = ....
        setUpdateForm(res.data);
        setUpdateForm({
          courseId: res.data.course.id,
          departmentId: res.data.department.id,
        });
        setTeacherClassForm({ ...teacherClassForm, classId: res.data.id });
        return res.data;
      })
      .then((res) => {
        const newTimeslots = [];
        res.timeslots.forEach((timeslot) => {
          let newSlot = children.filter((slot) => {
            // eslint-disable-next-line eqeqeq
            return slot.key == timeslot.id;
          });
          newSlot.forEach((slot) => {newTimeslots.push(slot.props.children);})
          // newTimeslots.push(newSlot.props.children);
          // newTimeslots.push(timeslot.id);
        });
        form.setFieldsValue({
          name: res.name,
          code: res.code,
          room: res.room,
          startDate: moment(res.startDate, dateFormat),
          endDate: moment(res.endDate, dateFormat),
          status: res.status,
          courseId: res.course.id,
          departmentId: res.department.id,
          progress: res.progress,
          timeslotId: newTimeslots,
        });
      });
    await axios
      .get(`${apiUrl}/api/teacherClass/classId/${param.id}`)
      .then((res) => {
        form.setFieldsValue({ teacherId: res.data.teacher.id });
        setTeacherClassForm({
          ...teacherClassForm,
          teacherId: res.data.teacher.id,
          classId: res.data.classes.id,
        });
      });
  };

  // function thông báo
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };
  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const onSelectTeacher = (value) => {
    setTeacherClassForm({ ...teacherClassForm, teacherId: value });
  };

  const onChangeUpdateForm = (event) => {
    setUpdateForm({ ...updateForm, [event.target.name]: event.target.value });
  };
  const onChangeSelectCourse = (value) => {
    setUpdateForm({ ...updateForm, courseId: value });
  };
  const onChangeSelectDepartment = (value) => {
    setUpdateForm({ ...updateForm, departmentId: value });
  };

  //   const onChangeDatePicker = (date, dateString) => {
  //     setUpdateForm({ ...updateForm, dob: new Date(dateString) });
  //   };

  const onChangeSelect = (value) => {
    setUpdateForm({ ...updateForm, status: value });
  };

  //   const onChangeCheckbox = (checkedValue) => {
  //     setUpdateForm({ ...updateForm, roleCode: checkedValue });
  //   };

  const updateUser = async () => {
    let newTeacherClassForm = {};
    try {
      await axios.put(`${apiUrl}/api/class/put/${param.id}`, updateForm);
      successMsg(dataView.successMsg);
      navigate(`${dataView.backLink}`);
      newTeacherClassForm = {
        teacherId: teacherClassForm.teacherId,
        classId: teacherClassForm.classId,
        status: "TEACHING",
      };
    } catch (error) {
      errorMsg("Không thành công");
    }
    await axios.post(`${apiUrl}/api/teacherClass/post`, newTeacherClassForm);
  };

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>{dataView.title}</div>
        </Row>
        <Col className="section-one">
          <Row
            style={{
              marginTop: "-26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              padding: "15px",
            }}
          >
            <Link to={dataView.backLink}>
              <Space>
                <LeftOutlined />
                <div style={{ color: "var(--main)" }}>
                  <span>{dataView.backText}</span>
                </div>
              </Space>
            </Link>
          </Row>
          <Row style={{ marginTop: "12px", padding: "15px" }}>
            <Col span={7}>
              <h3>{dataView.section}</h3>
              <p>Điền thông tin cần sửa</p>
            </Col>
            <Col span={1}>
              <Divider
                type="vertical"
                style={{
                  height: "70vh",
                  backgroundColor: "rgb(211,213,215)",
                }}
              />
            </Col>
            <Col span={16}>
              <Form
                form={form}
                layout="vertical"
                onFinish={updateUser}
                onSubmit={(e) => e.preventDefault()}
                style={{
                  padding: "10px 0",
                  borderRadius: "4px",
                }}
              >
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="teacherId"
                      label="Chọn giảng viên"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn giảng viên",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Giảng viên"
                        optionFilterProp="label"
                        // defaultValue={}
                        onChange={onSelectTeacher}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={optionTeacher}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="code"
                      label="Mã lớp :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền mã lớp!",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập mã lớp"
                        value={updateForm.code}
                        name="code"
                        onChange={onChangeUpdateForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="status"
                      label="Trạng thái :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn trạng thái!",
                        },
                      ]}
                    >
                      <Select onChange={onChangeSelect}>
                        <Select.Option value="WAITING">SẮP MỞ</Select.Option>
                        <Select.Option value="STUDYING">ĐANG HỌC</Select.Option>
                        <Select.Option value="FINISHED">ĐÃ HỌC</Select.Option>
                        <Select.Option value="CANCELED">HỦY</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="name"
                      label="Tên lớp :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền tên lớp!",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập tên lớp"
                        value={updateForm.name}
                        name="name"
                        onChange={onChangeUpdateForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="room"
                      label="Phòng học :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền phòng học!",
                        },
                      ]}
                    >
                      <Input
                        type="room"
                        placeholder="Phòng học"
                        value={updateForm.room}
                        name="room"
                        onChange={onChangeUpdateForm}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="departmentId"
                      label="Chọn chi nhánh"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn chi nhánh",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Chi nhánh"
                        optionFilterProp="label"
                        name="departmentId"
                        onChange={onChangeSelectDepartment}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={optionDepartment}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="courseId"
                      label="Chọn khoá học"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn khóa học",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Khóa học"
                        name="courseId"
                        optionFilterProp="label"
                        onChange={onChangeSelectCourse}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={optionCourse}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="startDate"
                      label="Ngày nhập học"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày nhập học!",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={onChangeStartDate}
                        value={updateForm.startDate}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="endDate"
                      label="Ngày kết thúc"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày kết thúc!",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={onChangeEndDate}
                        value={updateForm.startDate}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="timeslotId"
                      label="Thời khóa biểu"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn thời khóa biểu!",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Vui lòng chọn thời gian học"
                        // defaultValue={updateForm.timeslotId}
                        name="timeslotId"
                        onChange={handleChangePut}
                      >
                        {children}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="progress"
                      label="Tiến độ học tập :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tiến độ học tập!",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập tiến độ học tập"
                        value={updateForm.progress}
                        name="progress"
                        onChange={onChangeUpdateForm}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="end">
                  <Col style={{ margin: "0 16px" }}>
                    <Button size="large" type="primary" htmlType="submit">
                      Lưu
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: "rgb(236,236,236)" }} />
        </Col>
      </Col>
    </Row>
  );
};

export default AdminClassUpdate;
