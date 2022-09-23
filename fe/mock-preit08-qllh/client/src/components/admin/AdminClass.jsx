import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import setAuthToken from "../../utils/setAuthToken";
import { useNavigate } from "react-router-dom";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const { Option } = Select;
const children = [
  <Option key={1}>Thứ hai 07:30 - 09:30</Option>,
  <Option key={2}>Thứ hai 10:00 - 12:00</Option>,
  <Option key={3}>Thứ hai 14:00 - 16:00</Option>,
  <Option key={4}>Thứ hai 16:30 - 18:30</Option>,
  <Option key={5}>Thứ hai 19:30 - 21:30</Option>,
  <Option key={6}>Thứ ba 07:30 - 09:30</Option>,
  <Option key={7}>Thứ ba 10:00 - 12:00</Option>,
  <Option key={8}>Thứ ba 14:00 - 16:00</Option>,
  <Option key={9}>Thứ ba 16:30 - 18:30</Option>,
  <Option key={10}>Thứ ba 19:30 - 21:30</Option>,
  <Option key={11}>Thứ tư 07:30 - 09:30</Option>,
  <Option key={12}>Thứ tư 10:00 - 12:00</Option>,
  <Option key={13}>Thứ tư 14:00 - 16:00</Option>,
  <Option key={14}>Thứ tư 16:30 - 18:30</Option>,
  <Option key={15}>Thứ tư 19:30 - 21:30</Option>,
  <Option key={16}>Thứ năm 07:30 - 09:30</Option>,
  <Option key={17}>Thứ năm 10:00 - 12:00</Option>,
  <Option key={18}>Thứ năm 14:00 - 16:00</Option>,
  <Option key={19}>Thứ năm 16:30 - 18:30</Option>,
  <Option key={20}>Thứ năm 19:30 - 21:30</Option>,
  <Option key={21}>Thứ sáu 07:30 - 09:30</Option>,
  <Option key={22}>Thứ sáu 10:00 - 12:00</Option>,
  <Option key={23}>Thứ sáu 14:00 - 16:00</Option>,
  <Option key={24}>Thứ sáu 16:30 - 18:30</Option>,
  <Option key={25}>Thứ sáu 19:30 - 21:30</Option>,
  <Option key={26}>Thứ bảy 07:30 - 09:30</Option>,
  <Option key={27}>Thứ bảy 10:00 - 12:00</Option>,
  <Option key={28}>Thứ bảy 14:00 - 16:00</Option>,
  <Option key={29}>Thứ bảy 16:30 - 18:30</Option>,
  <Option key={30}>Thứ bảy 19:30 - 21:30</Option>,
  <Option key={31}>Chủ nhật 07:30 - 09:30</Option>,
  <Option key={32}>Chủ nhật 10:00 - 12:00</Option>,
  <Option key={33}>Chủ nhật 14:00 - 16:00</Option>,
  <Option key={34}>Chủ nhật 16:30 - 18:30</Option>,
  <Option key={35}>Chủ nhật 19:30 - 21:30</Option>,
];

const AdminClass = () => {
  const [classes, setClasses] = useState([]);
  const [classFilter, setClassFilter] = useState([]);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [formAdd, setFormAdd] = useState({});
  const [teacherClassForm, setTeacherClassForm] = useState({});
  const [optionCourse, setOptionCourse] = useState([]);
  const [optionDepartment, setOptionDepartment] = useState([]);
  const [optionTeacher, setoptionTeacher] = useState([]);
  const navigate = useNavigate();

  // function thông báo
  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };
  // Modal chi tiết và modal sửa
  const showModalDetailed = (id) => {
    navigate(`/admin/class/detail/${id}`);
  };
  const showModalAdd = () => {
    setIsModalAddVisible(true);
    loadCourseList();
    loadDepartmentList();
    loadTeacherList();
  };

  // tạo
  const handleSubmitAdd = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    let validClassForm = false;
    // let teacherId = teacherClassForm.teacherId;
    let newTeacherClassForm = {};
    await axios.post(`${apiUrl}/api/class/post`, formAdd).then((res) => {
      if (res.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        validClassForm = true;
        newTeacherClassForm = {
          teacherId: teacherClassForm.teacherId,
          classId: res.data.id,
          status: "TEACHING",
        };
        successMsg("Tạo lớp mới thành công");
        loadClassList();
        setIsModalAddVisible(false);
      }
    });
    if (validClassForm) {
      await axios.post(`${apiUrl}/api/teacherClass/post`, newTeacherClassForm)
    }
  };
  const handleCancel = () => {
    setIsModalAddVisible(false);
  };
  const onChangeSelect = (value) => {
    setFormAdd({ ...formAdd, status: value });
  };
  const onChangeStartDate = (date, dateString) => {
    setFormAdd({ ...formAdd, startDate: new Date(dateString) });
  };
  const onChangeEndDate = (date, dateString) => {
    setFormAdd({ ...formAdd, endDate: new Date(dateString) });
  };

  // popup xóa
  const cancelDelete = () => {};
  const confirmDelete = async (record) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.delete(`${apiUrl}/api/class/${record.id}`);
      await loadClassList();
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Xóa thành công");
        loadClassList();
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
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
  const loadTeacherList = async () => {
    await axios.get(`${apiUrl}/api/user/get?role=TEACHER`).then((res) => {
      const newList = [];
      res.data.forEach((item, index) => {
        newList.push({
          label: item.fullName + " - " + item.phone,
          value: item.id,
        });
      });
      setoptionTeacher(newList);
    });
  };
  const handleChangeFilter = (event) => {
    const newClass = classes.filter((item, index) => {
      return (
        item.name.toUpperCase().search(event.target.value.toUpperCase()) !== -1 || item.code.toUpperCase().search(event.target.value.toUpperCase()) !== -1
      );
    });
    setClassFilter(newClass);
  };
  const [page, setPage] = React.useState(1);
  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
    },
    {
      title: "Mã lớp",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Tên lớp",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Cơ sở",
      render: (record) => record.department.name,
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "tags",
      render: (_, record) => {
        let color = "red";
        if (record.status === "STUDYING") color = "blue";
        else if (record.status === "FINISHED") color = "green";
        else if (record.status === "WAITING") color = "orange";
        return <Tag color={color}>{handleStatus(record.status)}</Tag>;
      },
      align: "center",
      filters: [
        {
          text: "ĐANG HỌC",
          value: "STUDYING",
        },
        {
          text: "HOÀN THÀNH",
          value: "FINISHED",
        },
        {
          text: "SẮP MỞ",
          value: "WAITING",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Ngày bắt đầu",
      render: (record) =>
        new Date(record.startDate).toLocaleDateString("en-GB"),
      align: "center",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Ngày kết thúc",
      render: (record) => new Date(record.endDate).toLocaleDateString("en-GB"),
      align: "center",
      sorter: (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      sortDirections: ["descend"],
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
          <Button type="primary" onClick={() => showModalDetailed(record.id)}>
            Chi tiết
          </Button>
          <Button onClick={() => navigate(`/admin/class/update/${record.id}`)}>
            Chỉnh sửa
          </Button>
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

  const loadClassList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/class/`).then((res) => {
      setClasses(res.data);
      setClassFilter(res.data);
    });
  };

  const onSelectCourse = (value) => {
    setFormAdd({ ...formAdd, courseId: value });
  };
  const onSelectTeacher = (value) => {
    setTeacherClassForm({ ...teacherClassForm, teacherId: value });
  };
  const onSelectDepartment = (value) => {
    setFormAdd({ ...formAdd, departmentId: value });
  };
  const handleChangePost = (value) => {
    setFormAdd({ ...formAdd, timeslotId: value });
  };
  useEffect(() => {
    loadClassList();
  }, []);
  const onChangeForm = (event) => {
    setFormAdd({ ...formAdd, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Row justify="center">
        <Col span={23} offset={0} className="tableClasses">
          <Row className="section-title">
            <div>QUẢN LÝ LỚP</div>
          </Row>
          <Row justify="space-between">
            <Col style={{ margin: "0 0 20 0" }} span={9}>
                <Input
                  prefix={<SearchOutlined />}
                  allowClear
                  placeholder="Tìm kiếm theo tên hoặc mã lớp"
                  onChange={handleChangeFilter}
                  className="search-input"
                />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => showModalAdd()}
                className="add-btn"
              >
                <PlusCircleOutlined style={{ marginRight: "10px" }} />
                Tạo lớp mới
              </Button>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={classFilter}
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
                  navigate(`/admin/class/detail/${record.id}`),
              };
            }}
            rowClassName="table-row"
            rowKey={(obj) => obj.id}
          />
        </Col>
      </Row>
      <Modal
        title={"Tạo lớp "}
        visible={isModalAddVisible}
        okText="Gửi"
        cancelText="Hủy"
        onOk={handleSubmitAdd}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            offset: 1,
            span: 6,
          }}
          wrapperCol={{
            offset: 2,
            span: 12,
          }}
          layout="horizontal"
        >
          <Form.Item
            name="code"
            label="Mã lớp"
            rules={[
              {
                required: true,
                message: "Vui lòng điền mã lớp",
              },
            ]}
          >
            <Input name="code" value={formAdd.code} onChange={onChangeForm} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên lớp"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên lớp",
              },
            ]}
          >
            <Input name="name" value={formAdd.name} onChange={onChangeForm} />
          </Form.Item>
          <Form.Item
            name="room"
            label="Phòng học"
            rules={[
              {
                required: true,
                message: "Vui lòng điền phòng học",
              },
            ]}
          >
            <Input name="room" value={formAdd.room} onChange={onChangeForm} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái",
              },
            ]}
          >
            {/* <Input
              name="status"
              value={formAdd.room}
              onChange={onChangeForm}
            /> */}
            <Select onChange={onChangeSelect}>
              <Select.Option value="WAITING">SẮP MỞ</Select.Option>
              <Select.Option value="STUDYING">ĐANG HỌC</Select.Option>
              <Select.Option value="FINISHED">ĐÃ HỌC</Select.Option>
              <Select.Option value="CANCELED">HỦY</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Ngày nhập học"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày bắt đầu",
              },
            ]}
          >
            {/* <Input name="startDate" value={formAdd.startDate} onChange{onChangeForm} /> */}
            <DatePicker
              onChange={onChangeStartDate}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày kết thúc",
              },
            ]}
          >
            {/* <Input name="endDate" value={formAdd.endDate} onChange{onChangeForm}  /> */}
            <DatePicker onChange={onChangeEndDate} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="timeslotId"
            label="Thời khóa biểu"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời khóa biểu",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Vui lòng chọn thời gian học"
              name="timeslotId"
              onChange={handleChangePost}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item
            name="courseId"
            label="Chọn khoá học"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khóa học",
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
          <Form.Item
            name="DepartmentId"
            label="Chọn chi nhánh"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chi nhánh",
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
          <Form.Item
            name="teacherId"
            label="Chọn giảng viên"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giảng viên",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Giảng viên"
              optionFilterProp="label"
              onChange={onSelectTeacher}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={optionTeacher}
            ></Select>
          </Form.Item>
          <Form.Item name="progress" label="Tiến trình">
            <Input
              name="progress"
              value={formAdd.progress}
              onChange={onChangeForm}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminClass;
