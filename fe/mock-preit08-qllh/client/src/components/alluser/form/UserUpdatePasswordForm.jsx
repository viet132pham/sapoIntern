import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../common/constants";
import { Button, Col, Form, Input, message, Row, Divider } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../../features/reducers/authSlice";

const UserUpdatePasswordForm = () => {
  const authState = useSelector(authSelector);
  const [updateForm, setUpdateForm] = useState({
    username: authState.user,
    password: "",
    newPassword: "",
  });
  const [form] = Form.useForm();

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

  const navigate = useNavigate();

  const updateUser = async () => {
    try {
      await axios.put(
        `${apiUrl}/api/user/update/password/${authState.id}`,
        updateForm
      );
      successMsg("Thay đổi thành công");
      navigate("/");
    } catch (e) {
      errorMsg("Mật khẩu cũ không đúng");
    }
  };

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>THAY ĐỔI MẬT KHẨU</div>
        </Row>
        <Col span={24} className="section-one">
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
                <LeftOutlined />
                Quay lại trang cài đặt
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
              <h3>Mật khẩu cá nhân</h3>
            </Col>
            <Col span={1}>
              <Divider
                type="vertical"
                style={{
                  height: "50vh",
                  backgroundColor: "rgb(211,213,215)",
                }}
              />
            </Col>
            <Col span={16}>
              <Form
                form={form}
                layout="horizontal"
                labelCol={{ span: 8, offset: 1 }}
                wrapperCol={{ span: 12 }}
                onFinish={updateUser}
                onSubmit={(e) => e.preventDefault()}
                style={{
                  padding: "10px",
                }}
                size="large"
              >
                <Form.Item
                  name="password"
                  label="Mật khẩu cũ :"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền mật khẩu cũ!",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu cũ"
                    value={updateForm.password}
                    name="password"
                    onChange={onChangeUpdateForm}
                  />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="Mật khẩu mới :"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền mật khẩu mới!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={updateForm.newPassword}
                    name="newPassword"
                    onChange={onChangeUpdateForm}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Xác nhận mật khẩu mới :"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng xác nhận mật khẩu mới!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error("Mật khẩu không khớp"));
                      },
                    }),
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    value={updateForm.newPassword}
                    name="newPassword"
                    onChange={onChangeUpdateForm}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

export default UserUpdatePasswordForm;
