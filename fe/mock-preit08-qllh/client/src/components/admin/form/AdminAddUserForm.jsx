import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../common/constants";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  DatePicker,
  Select,
  Checkbox,
  Divider,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const AdminAddUserForm = () => {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  let dataView;
  switch (searchParam.get("type")) {
    case "STUDENT":
      dataView = {
        successMsg: "Thêm tài khoản học viên thành công !",
        title: "THÊM HỌC VIÊN",
        section: "Tài khoản học viên",
        backText: "Quay lại danh sách học viên",
        backLink: "/admin/student",
      };
      break;
    case "TEACHER":
      dataView = {
        successMsg: "Thêm tài khoản giảng viên thành công !",
        title: "THÊM GIẢNG VIÊN",
        section: "Tài khoản giảng viên",
        backText: "Quay lại danh sách giảng viên",
        backLink: "/admin/teacher",
      };
      break;
    case "EMPLOYEE":
      dataView = {
        successMsg: "Thêm tài khoản nhân viên thành công !",
        title: "THÊM NHÂN VIÊN",
        section: "Tài khoản nhân viên",
        backText: "Quay lại danh sách nhân viên",
        backLink: "/admin/employee",
      };
      break;
    case null:
      dataView = {
        successMsg: "Thêm tài khoản người dùng thành công !",
        title: "THÊM NGƯỜI DÙNG",
        section: "Tài khoản người dùng",
        backText: "Quay lại danh sách người dùng",
        backLink: "/admin/user",
      };
      break;
    default:
      break;
  }

  const initStateForm = {
    fullName: "",
    username: "",
    password: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    status: "ACTIVE",
    roleCode: searchParam.get("type") !== null ? [searchParam.get("type")] : [],
  };

  const options = [
    {
      label: "Chủ trung tâm",
      value: "ADMIN",
    },
    {
      label: "Nhân viên",
      value: "EMPLOYEE",
    },
    {
      label: "Giảng viên",
      value: "TEACHER",
    },
    {
      label: "Học viên",
      value: "STUDENT",
    },
  ];

  const [addForm, setAddForm] = useState(initStateForm);

  // eslint-disable-next-line
  const {fullName, username, password, dob, email, phone, address, status, roleCode} = addForm;

  const [form] = Form.useForm();

  // function thông báo
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };
  const successMsg = (msg) => {
    message.success(msg, 5);
  };

  //handle
  const onChangeAddForm = (event) => {
    setAddForm({ ...addForm, [event.target.name]: event.target.value });
  };

  const onChangeDatePicker = (date, dateString) => {
    setAddForm({ ...addForm, dob: new Date(dateString) });
  };

  const onChangeSelect = (value) => {
    setAddForm({ ...addForm, status: value });
  };

  const onChangeCheckbox = (checkedValue) => {
    setAddForm({ ...addForm, roleCode: checkedValue });
  };

  const addUser = async () => {
    try {
      await axios.post(`${apiUrl}/api/user/post`, addForm);
      setAddForm(initStateForm);
      form.resetFields();
      successMsg(dataView.successMsg);
      navigate("/admin/user");
    } catch (error) {
      errorMsg("Không thành công");
    }
  };

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>{dataView.title}</div>
        </Row>
        <Col span={24} className="section-one">
          <Row
            style={{
              marginTop: "-26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              padding: "15px",
            }}
          >
            <Button className="back-btn" type="text">
              <Link to={dataView.backLink}>
                <LeftOutlined />
                {dataView.backText}
              </Link>
            </Button>

            <Col>
              <Button
                size="large"
                htmlType="submit"
                onClick={() => {
                  form.resetFields();
                  navigate(-1);
                }}
                className="button-cancel"
              >
                Hủy
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => form.submit()}
                className="button-submit"
              >
                Lưu
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "12px", padding: "15px" }}>
            <Col span={7}>
              <h3>{dataView.section}</h3>
              <p>Thông tin tài khoản , phân quyền của người dùng</p>
            </Col>
            <Col span={1}>
              <Divider
                type="vertical"
                style={{
                  height: "86vh",
                  backgroundColor: "rgb(211,213,215)",
                }}
              />
            </Col>
            <Col span={16}>
              <Form
                form={form}
                layout="vertical"
                onFinish={addUser}
                onSubmit={(e) => e.preventDefault()}
                style={{
                  padding: "10px 0",
                  borderRadius: "4px",
                }}
                size="large"
              >
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="fullName"
                      label="Họ tên :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền họ tên!",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập họ tên"
                        value={fullName}
                        name="fullName"
                        onChange={onChangeAddForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="dob"
                      label="Ngày sinh :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày sinh!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        onChange={onChangeDatePicker}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="username"
                      label="Tên tài khoản :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền tên tài khoản!",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập tên tài khoản"
                        value={username}
                        name="username"
                        onChange={onChangeAddForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="password"
                      label="Mật khẩu :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        name="password"
                        onChange={onChangeAddForm}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="email"
                      label="Email :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền email!",
                        },
                        {
                          type: "email",
                          message: "Email không đúng định dạng",
                        },
                      ]}
                    >
                      <Input
                        type="email"
                        placeholder="Nhập email"
                        value={email}
                        name="email"
                        onChange={onChangeAddForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          pattern: new RegExp(/^0\d{7,10}$/),
                          message: "Số điện thoại không đúng định dạng",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        name="phone"
                        onChange={onChangeAddForm}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="address"
                      label="Địa chỉ :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền địa chỉ!",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        name="address"
                        onChange={onChangeAddForm}
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
                      initialValue="ACTIVE"
                    >
                      <Select onChange={onChangeSelect}>
                        <Select.Option value="ACTIVE">
                          Đã kích hoạt
                        </Select.Option>
                        <Select.Option value="INACTIVE" disabled>
                          Chưa kích hoạt
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ margin: "0 14px" }}>
                    <Form.Item
                      name="roleCode"
                      label="Chức vụ :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn chức vụ",
                        },
                      ]}
                      initialValue={
                        searchParam.get("type") !== null
                          ? [searchParam.get("type")]
                          : []
                      }
                    >
                      <Checkbox.Group
                        options={options}
                        onChange={onChangeCheckbox}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

export default AdminAddUserForm;
