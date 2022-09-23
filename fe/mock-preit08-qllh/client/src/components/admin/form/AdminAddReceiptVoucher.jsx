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

const AdminAddReceiptVoucher = () => {
  const authState = useSelector(authSelector);
  const initStateForm = {
    adminId: authState.id,
    departmentId: "",
    amount: "",
    type: "REI",
    status: "",
    description: "",
  };

  const [optionDepartment, setOptionDepartment] = useState([]);

  const [receiptForm, setReceiptForm] = useState(initStateForm);

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
  const onChangeReceiptForm = (event) => {
    setReceiptForm({
      ...receiptForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSelectDepartment = (value) => {
    setReceiptForm({
      ...receiptForm,
      departmentId: value,
    });
  };

  const onSelectType = (value) => {
    setReceiptForm({
      ...receiptForm,
      type: value,
    });
  };

  const onSelectStatus = (value) => {
    setReceiptForm({
      ...receiptForm,
      status: value,
    });
  };

  const addReceipt = async () => {
    try {
      await axios.post(`${apiUrl}/api/voucher/receipt/post`, receiptForm);
      setReceiptForm(initStateForm);
      form.resetFields();
      successMsg("Tạo phiếu chi thành công");
      navigate("/admin/receipt/");
    } catch (error) {
      errorMsg("Không thành công");
    }
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

  useEffect(() => {
    loadDepartmentList();
  }, []);

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>THÊM PHIẾU CHI</div>
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
            <Link to="/admin/receipt">
                <LeftOutlined />Quay lại danh sách phiếu chi
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
              <h3>Nhập thông tin phiếu chi</h3>
              <p>Thông tin người tạo, số tiền</p>
            </Col>
            <Col span={1}>
              <Divider
                type="vertical"
                style={{
                  height: "56vh",
                  backgroundColor: "rgb(211,213,215)",
                }}
              />
            </Col>
            <Col span={16}>
              <Form
                form={form}
                layout="vertical"
                onFinish={addReceipt}
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
                      name="department"
                      label="Tên chi nhánh :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn chi nhánh!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Chi nhánh"
                        optionFilterProp="label"
                        onChange={onSelectDepartment}
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
                      name="type"
                      label="Loại phiếu :"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn loại phiếu!",
                        },
                      ]}
                      initialValue="REI"
                    >
                      <Select placeholder="Loại phiếu" onChange={onSelectType}>
                        <Select.Option value="REI">Phiếu chi</Select.Option>
                        <Select.Option value="PAY" disabled>
                          Phiếu thu
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-around">
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
                        value={receiptForm.amount}
                        name="amount"
                        onChange={onChangeReceiptForm}
                      />
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
                        onChange={onChangeReceiptForm}
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
                        {handleCurrency(receiptForm.amount)}
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

export default AdminAddReceiptVoucher;
