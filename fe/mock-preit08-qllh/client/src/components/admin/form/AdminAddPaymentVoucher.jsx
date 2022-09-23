import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Divider,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../common/constants";
import axios from "axios";
import handleCurrency from "../../../utils/handleCurrency";
import { useSelector } from "react-redux";
import { authSelector } from "../../../features/reducers/authSlice";

const AdminAddPaymentVoucher = () => {
  const authState = useSelector(authSelector);
  const initStateForm = {
    studentName: "",
    studentPhone: "",
    studentEmail: "",
    employeeId: authState.id,
    courseId: "",
    amount: "",
    type: "PAY",
    status: "",
    description: "",
  };

  const [optionName, setOptionName] = useState([]);

  const [optionCourse, setOptionCourse] = useState([]);

  const [paymentForm, setPaymentForm] = useState(initStateForm);

  const [payerList, setPayerList] = useState([]);

  const [courseList, setCourseList] = useState([]);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  // function thông báo
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };
  const successMsg = (msg) => {
    message.success(msg, 5);
  };

  //handle
  const onChangePaymentForm = (event) => {
    setPaymentForm({
      ...paymentForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSelectPayerGroup = async (value) => {
    form.setFieldsValue({
      studentName: "",
      studentPhone: "",
      studentEmail: "",
      employeeId: "",
    });
    if (value === "student") {
      await axios.get(`${apiUrl}/api/user/get?role=STUDENT`).then((res) => {
        const newList = [];
        res.data.forEach((item, index) => {
          newList.push({
            label: `${item.fullName}(${item.phone})`,
            value: item.id,
          });
        });
        setOptionName(newList);
        setPayerList(res.data);
      });
    } else {
      await axios.get(`${apiUrl}/api/guest/`).then((res) => {
        const newList = [];
        res.data.forEach((item, index) => {
          newList.push({
            // eslint-disable-next-line no-useless-concat
            label: `${item.fullName}` + " (" + `${item.phone})`,
            value: item.id,
          });
        });
        setOptionName(newList);
        setPayerList(res.data);
      });
    }
  };

  const onSelectName = (value) => {
    const payer = payerList.filter((item, index) => item.id === value)[0];
    setPaymentForm({
      ...paymentForm,
      studentName: payer.fullName,
      studentEmail: payer.email,
      studentPhone: payer.phone,
    });
    form.setFieldsValue({
      studentEmail: payer.email,
      studentPhone: payer.phone,
    });
  };

  const onSelectCourse = (value) => {
    const course = courseList.filter((item) => {
      return item.id === value;
    })[0];
    setPaymentForm({
      ...paymentForm,
      courseId: value,
      amount: course.amount,
    });
    form.setFieldsValue({
      amount: course.amount,
    });
  };

  const onSelectType = (value) => {
    setPaymentForm({
      ...paymentForm,
      type: value,
    });
  };

  const onSelectStatus = (value) => {
    setPaymentForm({
      ...paymentForm,
      status: value,
    });
  };

  const addPayment = async () => {
    try {
      await axios.post(`${apiUrl}/api/voucher/payment/post`, paymentForm);
      setPaymentForm(initStateForm);
      form.resetFields();
      successMsg("Tạo phiếu thu thành công");
      navigate("/admin/payment/");
    } catch (error) {
      errorMsg("Không thành công");
    }
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
      setCourseList(res.data);
    });
  };

  useEffect(() => {
    loadCourseList();
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>THÊM PHIẾU THU</div>
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
              alignItems: "end",
              padding: "15px",
            }}
          >
            <Button className="back-btn" type="text">
            <Link to="/admin/payment">
                <LeftOutlined />Quay lại danh sách phiếu thu
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
              <h3>Nhập thông tin phiếu thu</h3>
              <p>Thông tin người tạo, người nộp , số tiền</p>
            </Col>
            <Col span={1}>
              <Divider
                type="vertical"
                style={{
                  height: "90vh",
                  backgroundColor: "rgb(211,213,215)",
                }}
              />
            </Col>
            <Col span={16}>
              <Form
                form={form}
                layout="vertical"
                onFinish={addPayment}
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
                      name="payerGroup"
                      label="Nhóm người nộp :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn nhóm người nộp!",
                        },
                      ]}
                    >
                      <Select onChange={onSelectPayerGroup} size="large">
                        <Select.Option value="guest">Khách hàng</Select.Option>
                        <Select.Option value="student">Học viên</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="studentName"
                      label="Tên người nộp :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền tên người nộp!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Tên người nộp"
                        optionFilterProp="label"
                        onChange={onSelectName}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={optionName}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="studentPhone"
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
                        value={paymentForm.studentPhone}
                        name="studentPhone"
                        onChange={onChangePaymentForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="studentEmail"
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
                        value={paymentForm.studentEmail}
                        name="studentEmail"
                        onChange={onChangePaymentForm}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="course"
                      label="Chọn khóa học :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn khóa học!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Khóa học"
                        optionFilterProp="label"
                        onChange={onSelectCourse}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={optionCourse}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="amount"
                      label="Số tiền :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số tiền!",
                        },
                        {
                          pattern: new RegExp(/^[0-9]+$/),
                          message:"Số tiền không đúng định dạng"
                        }
                      ]}
                    >
                      <Input
                        type="text"
                        suffix="VND"
                        placeholder="Số tiền"
                        value={paymentForm.amount}
                        name="amount"
                        onChange={onChangePaymentForm}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item
                      name="type"
                      label="Chọn kiểu phiếu :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn kiểu phiếu!",
                        },
                      ]}
                      initialValue="PAY"
                    >
                      <Select placeholder="Kiểu phiếu" onChange={onSelectType}>
                        <Select.Option value="PAY">Phiếu thu</Select.Option>
                        <Select.Option value="REI" disabled>
                          Phiếu chi
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name="status"
                      label="Chọn trạng thái :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn trạng thái!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Trạng thái"
                        onChange={onSelectStatus}
                      >
                        <Select.Option value="COMPLETED">
                          Hoàn thành
                        </Select.Option>
                        <Select.Option value="PENDING">Chưa nộp</Select.Option>
                        <Select.Option value="CANCELED" disabled>
                          Hủy
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-around">
                  <Col span={11}>
                    <Form.Item name="description" label="Thêm mô tả :">
                      <Input.TextArea
                        name="description"
                        rows={2}
                        maxLength={50}
                        onChange={onChangePaymentForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    span={11}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Col>
                      <h2>Thanh Toán :</h2>
                    </Col>
                    <Col>
                      <h2
                        style={{
                          color: "#cf1322",
                          fontWeight: "650",
                          fontSize: "26px",
                        }}
                      >
                        {handleCurrency(paymentForm.amount)}
                      </h2>
                    </Col>
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

export default AdminAddPaymentVoucher;
