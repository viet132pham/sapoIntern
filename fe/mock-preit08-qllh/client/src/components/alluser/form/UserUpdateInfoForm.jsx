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
  Divider,
  DatePicker,
} from "antd";
import moment from "moment";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../../features/reducers/authSlice";

const UserUpdateInfoForm = () => {
  const [updateForm, setUpdateForm] = useState({
    id: "",
    fullName: "",
    username: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    roles: [],
  });
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    loadInfo();
    // eslint-disable-next-line
  }, []);

  const authState = useSelector(authSelector);

  const loadInfo = async () => {
    await axios
      .get(`${apiUrl}/api/user/get/${authState.id}`)
      .then((res) => {
        setUpdateForm(res.data);
        return res.data;
      })
      .then((res) => {
        form.setFieldsValue({
          fullName: res.fullName,
          dob: moment(res.dob, dateFormat),
          username: res.username,
          email: res.email,
          phone: res.phone,
          address: res.address,
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

  const onChangeUpdateForm = (event) => {
    setUpdateForm({
      ...updateForm,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeDatePicker = (date, dateString) => {
    setUpdateForm({ ...updateForm, dob: new Date(dateString) });
  };

  const navigate = useNavigate();

  const updateUser = async () => {
    try {
      await axios.put(
        `${apiUrl}/api/user/update/info/${authState.id}`,
        updateForm
      );
      successMsg("Thay đổi thành công");
      navigate("/");
    } catch (error) {
      errorMsg("Không thành công");
    }
  };

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>THAY ĐỔI THÔNG TIN</div>
        </Row>
        <Col
          span={24}
          className="section-one"
        >
          <Row
            style={{
              marginTop: "-26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
            }}
          >
            <Button className="back-btn" type="text">
            <Link to="/settings">
                <LeftOutlined />Quay lại trang cài đặt
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
              <h3>Tài khoản cá nhân</h3>
              <p>Thông tin tài khoản cá nhân</p>
            </Col>
            <Col span={1}>
              <Divider
                type="vertical"
                style={{
                  height: "54vh",
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
                        value={updateForm.fullName}
                        name="fullName"
                        onChange={onChangeUpdateForm}
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
                        value={updateForm.username}
                        name="username"
                        onChange={onChangeUpdateForm}
                        disabled
                      />
                    </Form.Item>
                  </Col>
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
                          type:"email",
                          message:"Email không đúng định dạng"
                        }
                      ]}
                    >
                      <Input
                        type="email"
                        placeholder="Nhập email"
                        value={updateForm.email}
                        name="email"
                        onChange={onChangeUpdateForm}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-around">
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
                          message:"Số điện thoại không đúng định dạng"
                        }
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={updateForm.phone}
                        name="phone"
                        onChange={onChangeUpdateForm}
                      />
                    </Form.Item>
                  </Col>
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
                        value={updateForm.address}
                        name="address"
                        onChange={onChangeUpdateForm}
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

export default UserUpdateInfoForm;
