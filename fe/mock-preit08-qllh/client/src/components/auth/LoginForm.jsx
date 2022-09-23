import { Button, Col, Form, Input, message, Radio, Row, Space } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import { loadUser } from "../../features/reducers/authSlice";
import logo from "../../assets/logo.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  
  // state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  // handle user input
  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  // function thông báo
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  // handle login submit
  const login = async () => {
    try {
      const response = await axios.post(`${apiUrl}/login`, loginForm);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
      if(response.status === 200) {window.location.reload(true)};
      dispatch(loadUser());
      return response.data;
    } catch (error) {
      errorMsg("Tài khoản không tồn tại hoặc sai thông tin đăng nhập");
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  return (
    <Row className="auth-wrapper">
      <Col className="auth-form">
        <div className="auth-banner">
          <div className="auth-banner-name">TRUNG TÂM TIẾNG ANH</div>
          <div className="auth-banner-logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="auth-form-wrapper flex-center">
          <Form
            className="loginControl"
            labelCol={{
              offset: 2,
              span: 8,
            }}
            wrapperCol={{
              span: 9,
              offset: 1,
            }}
            onFinish={login}
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Item
              style={{
                fontSize: "30px",
                fontWeight: "700",
                textAlign: "center",
                color: "var(--main)",
              }}
              wrapperCol={{ span: "24" }}
            >
              ĐĂNG NHẬP
            </Form.Item>
            <Form.Item
              name="role"
              label="Vui lòng chọn vai trò đăng nhập"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vai trò đăng nhập!",
                },
              ]}
            >
              <Radio.Group
                onChange={(e) => sessionStorage.setItem("role", e.target.value)}
              >
                <Space direction="vertical">
                  <Radio value="student">Tôi là học viên</Radio>
                  <Radio value="teacher">Tôi là giảng viên</Radio>
                  <Radio value="employee">Tôi là nhân viên</Radio>
                  {/* <Radio value="admin">Tôi là chủ trung tâm</Radio> */}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tên đăng nhập!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                name="username"
                onChange={onChangeLoginForm}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mật khẩu!",
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                name="password"
                onChange={onChangeLoginForm}
              />
            </Form.Item>

            <Form.Item
              style={{ textAlign: "center" }}
              wrapperCol={{
                span: 24,
              }}
            >
              <Button size="large" type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item
              style={{ textAlign: "center" }}
              wrapperCol={{
                span: 24,
              }}
            >
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginForm;
