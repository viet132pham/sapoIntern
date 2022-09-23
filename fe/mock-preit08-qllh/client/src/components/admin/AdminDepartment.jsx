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
  Row,
  Table,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import setAuthToken from "../../utils/setAuthToken";
import { useNavigate } from "react-router-dom";

// ***** D O N E ***********

const AdminDepartment = () => {
  const initState = {
    name: "",
    phone: "",
    address: "",
  };
  const [departments, setDepartments] = useState([]);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [modaldata, setModalData] = useState([]);
  const [departmentForm, setDepartmentForm] = useState(initState);
  const [form] = Form.useForm();
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();

  // function thông báo
  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  const showModalUpdate = (record) => {
    loadDepartment(record.id);
    form.setFieldsValue({
      name: record.name,
      address: record.address,
      phone: record.phone,
    });
    setIsModalUpdateVisible(true);
  };

  const showModalAdd = () => {
    form.setFieldsValue({
      name: "",
      address: "",
      phone: "",
    });
    setDepartmentForm(initState);
    setIsModalAddVisible(true);
  };

  //Add
  const handleAdd = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/department/`,
        departmentForm
      );
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Thêm thành công");
        setDepartmentForm(initState);
        setIsModalAddVisible(false);
        loadDepartmentList();
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
    }
  };

  // sửa
  const handleSubmit = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.put(
        `${apiUrl}/api/department/${modaldata.id}`,
        departmentForm
      );
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Sửa thành công");
        setDepartmentForm([]);
        setIsModalUpdateVisible(false);
        loadDepartmentList();
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
    }
  };
  const handleCancel = () => {
    setIsModalUpdateVisible(false);
    setIsModalAddVisible(false);
  };

  const onChangeDepartmentForm = (event) => {
    setDepartmentForm({
      ...departmentForm,
      [event.target.name]: event.target.value,
    });
  };

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
    },
    {
      title: "Tên chi nhánh",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
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
          <Button
            type="primary"
            onClick={() => navigate(`/admin/department/detail/${record.id}`)}
          >
            Chi tiết
          </Button>
          <Button onClick={() => showModalUpdate(record)}>Chỉnh sửa</Button>
        </div>
      ),
      align: "center",
    },
  ];

  //Load data
  const loadDepartmentList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/department/`).then((res) => {
      setDepartments(res.data);
    });
  };
  const loadDepartment = async (id) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/department/${id}`).then((res) => {
      setModalData(res.data);
      setDepartmentForm(res.data);
    });
  };

  useEffect(() => {
    loadDepartmentList();
  }, []);

  return (
    <div>
      <Row justify="center">
        <Col span={23} offset={0} className="tableCategories">
          <Row className="section-title">
            <div>CHI NHÁNH</div>
          </Row>
          <Row justify="end">
            <Button type="primary" onClick={showModalAdd} className="add-btn">
              <PlusCircleOutlined style={{ marginRight: "10px" }} />
              Thêm chi nhánh
            </Button>
          </Row>
          <Table
            columns={columns}
            dataSource={departments}
            bordered
            pagination={{
              pageSize: 8,
              position: ["bottomCenter"],
              onChange(current) {
                setPage(current);
              },
            }}
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: event => navigate(`/admin/department/detail/${record.id}`)
              }
            }}
            rowClassName="table-row"
            rowKey={(obj) => obj.id}
          />
        </Col>
      </Row>
      <Modal
        title={"Chỉnh sửa thông tin chi nhánh " + modaldata.id}
        visible={isModalUpdateVisible}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên chi nhánh"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên chi nhánh",
              },
            ]}
          >
            <Input
              name="name"
              value={departmentForm.name}
              onChange={onChangeDepartmentForm}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại",
              },
            ]}
          >
            <Input
              name="phone"
              value={departmentForm.phone}
              onChange={onChangeDepartmentForm}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng điền địa chỉ",
              },
            ]}
          >
            <Input
              name="address"
              value={departmentForm.address}
              onChange={onChangeDepartmentForm}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={"Thêm chi nhánh"}
        visible={isModalAddVisible}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleAdd}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Tên chi nhánh"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên chi nhánh",
              },
            ]}
          >
            <Input
              name="name"
              value={departmentForm.name}
              onChange={onChangeDepartmentForm}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại",
              },
            ]}
          >
            <Input
              name="phone"
              value={departmentForm.phone}
              onChange={onChangeDepartmentForm}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng điền địa chỉ",
              },
            ]}
          >
            <Input
              name="address"
              value={departmentForm.address}
              onChange={onChangeDepartmentForm}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDepartment;
