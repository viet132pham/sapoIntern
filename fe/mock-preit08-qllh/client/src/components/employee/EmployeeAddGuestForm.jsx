import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../common/constants";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
  DatePicker,
  Select,
  Divider,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const EmployeeAddGuestForm = () => {
  const navigate = useNavigate();

  const initStateForm = {
    fullName: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    employeeId: "",
  };

  const [addForm, setAddForm] = useState(initStateForm);

  const [form] = Form.useForm();

  const [optionEmployee, setOptionEmployee] = useState([]);

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

  const onSelectEmployee = (value) => {
    setAddForm({
      ...addForm,
      employeeId: value,
    });
  };

  const addUser = async () => {
    try {
      await axios.post(`${apiUrl}/api/guest/create`, addForm);
      setAddForm(initStateForm);
      form.resetFields();
      navigate(-1);
      successMsg("Thêm khách hàng thành công");
    } catch (error) {
      errorMsg("Không thành công");
    }
  };

  const loadEmployeeList = async () => {
    await axios.get(`${apiUrl}/api/user/get?role=EMPLOYEE`).then((res) => {
      const newList = [];
      res.data.forEach((item, index) => {
        newList.push({
          label: item.fullName,
          value: item.id,
        });
      });
      setOptionEmployee(newList);
    });
  };

  useEffect(() => {
    loadEmployeeList();
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>THÊM KHÁCH HÀNG</div>
        </Row>
        <Col
          span={24}
          style={{
            backgroundColor: "#fff",
            borderRadius: "4px",
            paddingTop: "20px"
          }}
        >
          <Row
            style={{
              marginTop: "-26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              padding: "15px",
            }}
          >
            <Link to="/employee/guest">
              <Space>
                <LeftOutlined />
                <div style={{ color: "#b8b2b3" }}>
                  <span>Quay lại danh sách khách hàng</span>
                </div>
              </Space>
            </Link>
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
              <h3>Nhập thông tin khách hàng mới</h3>
              <p>Thông tin khách hàng , tên nhân viên tư vấn</p>
            </Col>
            <Col span={1}>
              <Divider
                type="vertical"
                style={{
                  height: "55vh",
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
                }}
                size="large"
              >
                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="fullName"
                      label="Tên khách hàng :"
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
                        value={addForm.fullName}
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
                        value={addForm.phone}
                        name="phone"
                        onChange={onChangeAddForm}
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
                        value={addForm.email}
                        name="email"
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
                        value={addForm.address}
                        name="address"
                        onChange={onChangeAddForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item name="employee" label="Nhân viên tư vấn :">
                      <Select
                        onChange={onSelectEmployee}
                        options={optionEmployee}
                      ></Select>
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

export default EmployeeAddGuestForm;
