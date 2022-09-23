import React, { useState } from "react";
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import logo from "../../assets/logo.png";
import {
  Row,
  Col,
  Form,
  Input,
  Divider,
  message,
  DatePicker,
  Button,
} from "antd";
import { apiUrl } from "../../common/constants";
import axios from "axios";

const GuestPage = () => {
  const [formGuest, setFormGuest] = useState({
    fullName: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
  });

  const [form] = Form.useForm();

  // function thông báo
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };
  const successMsg = (msg) => {
    message.success(msg, 5);
  };

  const onChangeFormGuest = (event) => {
    setFormGuest({ ...formGuest, [event.target.name]: event.target.value });
  };

  const onChangeDatePicker = (date, dateString) => {
    setFormGuest({ ...formGuest, dob: new Date(dateString) });
  };

  const registerGuest = async () => {
    try {
      await axios.post(`${apiUrl}/api/guest/`, formGuest);
      setFormGuest({
        fullName: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
      });
      form.resetFields();
      successMsg(
        "Xin cảm ơn! Sẽ có nhân viên liên hệ bạn trong thời gian sớm nhất"
      );
    } catch (error) {
      errorMsg("Không thành công");
    }
  };

  return (
    <Row>
      <Row className="navbar" justify="center" id="#">
        <Col
          span={24}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={logo}
            alt=""
            style={{ marginLeft: "40px", height: "40px" }}
          />
          <a
            href="#form-guest"
            className="button-register"
            style={{ marginRight: "40px" }}
          >
            Đăng ký nhận tư vấn
          </a>
        </Col>
      </Row>
      <Row className="slide">
        <Col span={24}>
          <img src={slide1} alt="" style={{ width: "100%" }} />
        </Col>
      </Row>
      <Row id="form-guest" className="guest-form">
        <h1 style={{ color: "#cf1322", textAlign: "center" }}>
          ĐĂNG KÝ TƯ VẤN
        </h1>
        <Form
          form={form}
          onFinish={registerGuest}
          onSubmit={(e) => e.preventDefault()}
          style={{ marginTop: "30px", textAlign: "center" }}
        >
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui lòng điền họ và tên",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Họ và tên"
              value={formGuest.fullName}
              name="fullName"
              onChange={onChangeFormGuest}
              className="guest-input"
            />
          </Form.Item>
          <Form.Item
            name="dob"
            rules={[
              {
                required: true,
                message: "Vui lòng điền ngày sinh",
              },
            ]}
          >
            <DatePicker
              onChange={onChangeDatePicker}
              style={{ width: "100%" }}
              className="guest-input"
              placeholder="Chọn ngày sinh"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Nhập số điện thoại"
              value={formGuest.phone}
              name="phone"
              onChange={onChangeFormGuest}
              className="guest-input"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng điền email!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Nhập email"
              value={formGuest.phone}
              name="email"
              onChange={onChangeFormGuest}
              className="guest-input"
            />
          </Form.Item>
          <Form.Item
            name="address"
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
              value={formGuest.phone}
              name="address"
              onChange={onChangeFormGuest}
              className="guest-input"
            />
          </Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="guest-submit"
          >
            ĐĂNG KÝ
          </Button>
        </Form>
      </Row>
      <Row className="slide">
        <Col Col span={18} offset={3}>
          <img src={slide2} alt="" style={{ width: "100%" }} />
        </Col>
      </Row>
      <Divider />
    </Row>
  );
};

export default GuestPage;
