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
import handleCurrency from "../../utils/handleCurrency";

// ***** D O N E ***********

const AdminCourse = () => {
  const initForm = {
    name: "",
    amount: "",
    numberSession: "",
    numberGrade: "",
  };

  const [courses, setCourses] = useState([]);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [courseForm, setCourseForm] = useState(initForm);
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

  // Modal chi tiết và modal sửa
  const showModalAdd = () => {
    form.setFieldsValue({
      name: "",
      amount: "",
      numberSession: "",
      numberGrade: "",
      image:"",
    });
    setCourseForm(initForm);
    setIsModalAddVisible(true);
  };

  const showModalUpdate = (record) => {
    loadCourse(record.id);
    setIsModalUpdateVisible(true);
  };

  // tạo
  const handleSubmitAdd = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.post(`${apiUrl}/api/course/`, courseForm).then((res) => {
      if (res.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Tạo khóa học thành công !");
        loadCourseList();
        setIsModalAddVisible(false);
      }
    });
  };
  // sửa
  const handleSubmitUpdate = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.put(
        `${apiUrl}/api/course/${courseForm.id}/`,
        courseForm
      );
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Sửa thành công");
        loadCourseList();
        setIsModalUpdateVisible(false);
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
    }
  };

  const handleCancel = () => {
    setCourseForm(initForm);
    setIsModalUpdateVisible(false);
    setIsModalAddVisible(false);
  };

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Giá tiền",
      render: (record) => handleCurrency(record.amount),
      align: "center",
    },
    {
      title: "Số buổi học",
      dataIndex: "numberSession",
      align: "center",
      width: 200,
    },
    {
      title: "Số lượng điểm",
      dataIndex: "numberGrade",
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
          <Button
            type="primary"
            onClick={() => navigate(`/admin/course/detail/${record.id}`)}
          >
            Chi tiết
          </Button>
          <Button onClick={(e) => showModalUpdate(record)}>
            Chỉnh sửa
          </Button>
        </div>
      ),
      align: "center",
      width: 250,
    },
  ];

  // load courses and course
  const loadCourseList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/course/`).then((res) => {
      setCourses(res.data);
    });
  };

  const loadCourse = async (id) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/course/${id}`).then((res) => {
      form.setFieldsValue({
        name: res.data.name,
        amount: res.data.amount,
        numberSession: res.data.numberSession,
        numberGrade: res.data.numberGrade,
      });
      setCourseForm(res.data);
    });
  };

  const onChangeForm = (event) => {
    setCourseForm({
      ...courseForm,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    loadCourseList();
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={23} offset={0} className="tableCourses">
          <Row className="section-title">
            <div>KHÓA HỌC</div>
          </Row>
          <Row justify="end">
            <Button
              type="primary"
              onClick={() => showModalAdd()}
              className="add-btn"
            >
              <PlusCircleOutlined style={{ marginRight: "10px" }} />
              Thêm khóa học
            </Button>
          </Row>
          <Table
            columns={columns}
            dataSource={courses}
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
                onDoubleClick: (event) =>
                  navigate(`/admin/course/detail/${record.id}`),
              };
            }}
            rowClassName="table-row"
            rowKey={(obj) => obj.id}
          />
        </Col>
      </Row>
      <Modal
        title={"Chỉnh sửa khóa học"}
        visible={isModalUpdateVisible}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmitUpdate}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Tên khóa học : "
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khóa học!",
              },
            ]}
          >
            <Input
              name="name"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Giá tiền :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền !",
              },
            ]}
          >
            <Input
              name="amount"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="numberSession"
            label="Số lượng buổi học :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng buổi học !",
              },
            ]}
          >
            <Input
              name="numberSession"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="numberGrade"
            label="Số lượng điểm :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng điểm !",
              },
            ]}
          >
            <Input
              name="numberGrade"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="image"
            label="Link ảnh mô tả :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập link ảnh mô tả !",
              },
            ]}
          >
            <Input
              name="image"
              value={courseForm.image}
              onChange={onChangeForm}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={"Tạo khóa học"}
        visible={isModalAddVisible}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmitAdd}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Tên khóa học : "
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khóa học !",
              },
            ]}
          >
            <Input
              name="name"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Giá tiền :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền !",
              },
            ]}
          >
            <Input
              name="amount"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="numberSession"
            label="Số lượng buổi học :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng buổi học !",
              },
            ]}
          >
            <Input
              name="numberSession"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="numberGrade"
            label="Số lượng điểm :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng điểm !",
              },
            ]}
          >
            <Input
              name="numberGrade"
              value={courseForm.name}
              onChange={onChangeForm}
            />
          </Form.Item>
          <Form.Item
            name="image"
            label="Link ảnh mô tả :"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập link ảnh mô tả !",
              },
            ]}
          >
            <Input
              name="image"
              value={courseForm.image}
              onChange={onChangeForm}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminCourse;
