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
import { useSelector } from "react-redux";
import { authSelector } from "../../features/reducers/authSlice";
import handleCurrency from "../../utils/handleCurrency";
import { useNavigate } from "react-router-dom";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const AdminReceipt = () => {
  const authState = useSelector(authSelector);

  const initFormUpdate = {
    voucherId: "",
    adminId: authState.id,
    departmentId: "",
    amount: "",
    type: "REI",
    status: "",
    description: "",
  };

  const [receipts, setReceipts] = useState([]);
  const [receiptsFilter, setReceiptsFilter] = useState([]);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [receiptForm, setReceiptForm] = useState(initFormUpdate);

  const [optionDepartment, setOptionDepartment] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // function thông báo
  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  // Modal change
  const showModalUpdate = (record) => {
    setReceiptForm({
      voucherId: record.voucher.id,
      adminId: record.admin.id,
      departmentId: record.department.id,
      amount: record.voucher.amount,
      type: "REI",
      status: record.voucher.status,
      description: record.voucher.description,
    });
    form.setFieldsValue({
      department: record.department.id,
      amount: record.voucher.amount,
      type: "REI",
      status: record.voucher.status,
      description: record.voucher.description,
    });
    setIsModalUpdateVisible(true);
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

  // sửa
  const handleSubmit = async () => {
    try {
      await axios.put(`${apiUrl}/api/voucher/receipt/put`, receiptForm);
      setReceiptForm(initFormUpdate);
      form.resetFields();
      setIsModalUpdateVisible(false);
      loadReceiptList();
      successMsg("Sửa phiếu chi thành công");
      navigate("/admin/receipt/");
    } catch (error) {
      errorMsg("Không thành công");
    }
  };

  const handleCancel = () => {
    setIsModalUpdateVisible(false);
  };

  const handleChangeFilter = (event) => {
    if (event.target.value === "") {
      setReceiptsFilter(receipts);
    } else {
      const newReceipts = receipts.filter((item, index) => {
        return (
          item.voucher.id === Number(event.target.value) ||
          item.department.name.search(event.target.value) !== -1
        );
      });
      setReceiptsFilter(newReceipts);
    }
  };

  // popup xóa
  const cancelDelete = () => {};
  const confirmDelete = async (record) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.delete(
        `${apiUrl}/api/voucher/receipt/${record.voucher.id}`
      );
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Xóa thành công");
        loadReceiptList();
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
    }
  };
  const columns = [
    {
      title: "Mã phiếu chi",
      render: (record) => record.voucher.id,
      align: "center",
      width: 100,
    },
    {
      title: "Người tạo",
      render: (record) => record.admin.fullName,
      align: "center",
      width: 160,
    },
    {
      title: "Số tiền",
      render: (record) => handleCurrency(record.voucher.amount),
      align: "center",
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
    },
    {
      title: "Chi nhánh",
      render: (record) => record.department.name,
      align: "center",
      width: 160,
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
      align: "center",
      sorter: (a, b) =>
        new Date(a.voucher.updatedAt).getTime() -
        new Date(b.voucher.updatedAt).getTime(),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Mô tả",
      render: (record) => record.voucher.description,
      align: "center",
      width: 200,
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
  const loadReceiptList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/voucher/receipt/get`).then((res) => {
      setReceipts(res.data);
      setReceiptsFilter(res.data);
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

  useEffect(() => {
    loadReceiptList();
    loadDepartmentList();
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={23} offset={0} className="tableReceipts">
          <Row className="section-title">
            <div>PHIẾU CHI</div>
          </Row>
          <Row justify="space-between">
            <Col style={{ margin: "0 0 20 0" }} span={20}>
              <Input
                prefix={<SearchOutlined />}
                allowClear
                placeholder="Tìm kiếm theo mã phiếu chi, chi nhánh"
                onChange={handleChangeFilter}
                className="search-input"
                style={{ width: "500px" }}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/admin/receipt/create");
                }}
                className="add-btn"
              >
                <PlusCircleOutlined style={{ marginRight: "10px" }} />
                Thêm phiếu chi
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={receiptsFilter}
            pagination={{ pageSize: 8, position: ["bottomCenter"] }}
            rowKey={(obj) => obj.voucher.id}
          />
        </Col>
      </Row>
      <Modal
        title={"Chỉnh sửa phiếu chi"}
        visible={isModalUpdateVisible}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={700}
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
                    option.label.toLowerCase().includes(input.toLowerCase())
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
                <Select placeholder="Loại phiếu" onChange={onSelectType} disabled>
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
                <Select placeholder="Trạng thái" onChange={onSelectStatus}>
                  <Select.Option value="COMPLETED">Hoàn thành</Select.Option>
                  <Select.Option value="PENDING">Chưa nộp</Select.Option>
                  <Select.Option value="CANCELED">Hủy</Select.Option>
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
                  addonAfter="VND"
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
      </Modal>
    </>
  );
};

export default AdminReceipt;
