import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Table,
  Select,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import setAuthToken from "../../utils/setAuthToken";
import handleCurrency from "../../utils/handleCurrency";
import { useNavigate } from "react-router-dom";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const AdminPayment = () => {
  const initFormUpdate = {
    voucherId: "",
    studentName: "",
    studentPhone: "",
    studentEmail: "",
    employeeId: "",
    courseId: "",
    amount: "",
    type: "PAY",
    status: "",
    description: "",
  };

  const [payments, setPayments] = useState([]);
  const [paymentsFilter, setPaymentsFilter] = useState([]);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [paymentForm, setPaymentForm] = useState(initFormUpdate);
  const [optionName, setOptionName] = useState([]);
  const [optionCourse, setOptionCourse] = useState([]);
  const [payerList, setPayerList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  // function thông báo
  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  //sua
  const showModalUpdate = (record) => {
    // loadPayment(record.voucher.id);
    setPaymentForm({
      voucherId: record.voucher.id,
      studentName: record.studentName,
      studentPhone: record.studentPhone,
      studentEmail: record.studentEmail,
      employeeId: record.employee.id,
      courseId: record.course.id,
      amount: record.voucher.amount,
      type: "PAY",
      status: record.voucher.status,
      description: record.voucher.description,
    });
    form.setFieldsValue({
      studentName: record.studentName,
      studentPhone: record.studentPhone,
      studentEmail: record.studentEmail,
      employeeId: record.employee.id,
      course: record.course.id,
      amount: record.voucher.amount,
      type: "PAY",
      status: record.voucher.status,
      description: record.voucher.description,
    });
    setIsModalUpdateVisible(true);
  };

  // sửa
  const handleSubmit = async () => {
    try {
      await axios.put(`${apiUrl}/api/voucher/payment/put`, paymentForm);
      setPaymentForm(initFormUpdate);
      form.resetFields();
      setIsModalUpdateVisible(false);
      loadPaymentList();
      successMsg("Sửa phiếu thu thành công");
      navigate("/admin/payment/");
    } catch (error) {
      errorMsg("Không thành công");
    }
  };

  const handleCancel = () => {
    setIsModalUpdateVisible(false);
  };

  const handleChangeFilter = (event) => {
    if (event.target.value === "") {
      setPaymentsFilter(payments);
    } else {
      const newPayments = payments.filter((item, index) => {
        return (
          item.studentPhone.search(event.target.value) !== -1 ||
          item.studentName.search(event.target.value) !== -1 ||
          item.studentEmail.search(event.target.value) !== -1 ||
          item.employee.fullName.search(event.target.value) !== -1
        );
      });
      setPaymentsFilter(newPayments);
    }
  };

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
            label: `${item.fullName} (${item.phone})`,
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

  // popup xóa
  const cancelDelete = () => {};
  const confirmDelete = async (record) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.delete(
        `${apiUrl}/api/voucher/payment/${record.voucher.id}`
      );
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Xóa thành công");
        loadPaymentList();
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
    }
  };

  const columns = [
    {
      title: "Mã phiếu thu",
      render: (record) => record.voucher.id,
      align: "center",
      width: 100,
    },
    {
      title: "Người tạo",
      render: (record) => record.employee.fullName,
      align: "center",
      width: 160,
    },
    {
      title: "Số tiền",
      render: (record) => handleCurrency(record.voucher.amount),
      align: "center",
      width: 120,
      sorter: (a, b) => a.voucher.amount - b.voucher.amount,
      sortDirections: ["descend"],
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        let color = "red";
        if (record.voucher.status === "COMPLETED") color = "green";
        else if (record.voucher.status === "PENDING") color = "blue";
        return <Tag color={color}>{handleStatus(record.voucher.status)}</Tag>;
      },
      filters: [
        {
          text: "HOÀN THÀNH",
          value: "COMPLETED",
        },
        {
          text: "CHƯA NỘP",
          value: "PENDING",
        },
        {
          text: "HỦY",
          value: "CANCELED",
        },
      ],
      onFilter: (value, record) => record.voucher.status.startsWith(value),
      filterSearch: true,
      align: "center",
      width: 130,
    },
    {
      title: "Chỉnh sửa lần cuối",
      render: (record) =>
        new Date(record.voucher.updatedAt).toLocaleDateString("vi-VN", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      width: 200,
      align: "center",
      sorter: (a, b) =>
        new Date(a.voucher.updatedAt).getTime() -
        new Date(b.voucher.updatedAt).getTime(),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Người nộp",
      render: (record) => record.studentName,
      align: "center",
      width: 160,
    },
    {
      title: "Số điện thoại",
      render: (record) => record.studentPhone,
      align: "center",
    },
    {
      title: "Email",
      render: (record) => record.studentEmail,
      align: "center",
    },
    {
      title: "Miêu tả",
      render: (record) => record.voucher.description,
      align: "center",
      width: 160,
    },
    {
      title: "Tùy chọn",
      render: (record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button onClick={() => showModalUpdate(record)}>Chỉnh sửa</Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này?"
            onConfirm={() => confirmDelete(record)}
            onCancel={cancelDelete}
            okText="Đúng"
            cancelText="Không"
          >
            <DeleteOutlined style={{ color: "red", fontSize: "16px" }} />
          </Popconfirm>
        </div>
      ),
      align: "center",
    },
  ];

  // load data
  const loadPaymentList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/voucher/payment/get`).then((res) => {
      setPayments(res.data);
      setPaymentsFilter(res.data);
    });
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
    loadPaymentList();
    loadCourseList();
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={23} offset={0} className="tablepayments">
          <Row className="section-title">
            <div>PHIẾU THU</div>
          </Row>
          <Row justify="space-between">
            <Col style={{ margin: "0 0 20 0" }} span={9}>
              <Input
                prefix={<SearchOutlined />}
                allowClear
                placeholder="Tìm kiếm theo nhân viên, tên, số điện thoại, email"
                onChange={handleChangeFilter}
                className="search-input"
                style={{ width: "500px" }}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/admin/payment/create");
                }}
                className="add-btn"
              >
                <PlusCircleOutlined style={{ marginRight: "10px" }} />
                Thêm phiếu thu
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={paymentsFilter}
            pagination={{ pageSize: 8, position: ["bottomCenter"] }}
            rowKey={(obj) => obj.voucher.id}
          />
        </Col>
      </Row>
      <Modal
        width={700}
        title={"Chỉnh sửa phiếu thu"}
        visible={isModalUpdateVisible}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
        style={{
          top: 50,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onSubmit={(e) => e.preventDefault()}
          style={{
            padding: "10px 0",
            borderRadius: "4px",
          }}
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
                <Select onChange={onSelectPayerGroup}>
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
                    option.label.toLowerCase().includes(input.toLowerCase())
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
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  options={optionCourse}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="amount"
                label="Giá tiền :"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá tiền!",
                  },
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message:"Số tiền không đúng định dạng"
                  }
                ]}
              >
                <Input
                  type="text"
                  addonAfter="VND"
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
                <Select placeholder="Kiểu phiếu" onChange={onSelectType} disabled>
                  <Select.Option value="PAY">Phiếu thu</Select.Option>
                  <Select.Option value="REI">Phiếu chi</Select.Option>
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
                <Select placeholder="Trạng thái" onChange={onSelectStatus}>
                  <Select.Option value="COMPLETED">Hoàn thành</Select.Option>
                  <Select.Option value="PENDING">Chưa nộp</Select.Option>
                  <Select.Option value="CANCELED">Hủy</Select.Option>
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
      </Modal>
    </>
  );
};

export default AdminPayment;
