import React, { useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Table,
  Tag,
} from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import { useEffect } from "react";
import handleStatus from "./../../utils/handleStatus";

const AdminUserList = ({ type }) => {
  const [usersList, setUsersList] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [studentClasses, setStudentClasses] = useState([]);
  const [isModalDetailedVisible, setIsModalDetailedVisible] = useState(false);
  const [modaldata, setModalData] = useState({});
  const [usersFilter, setUsersFilter] = useState([]);
  const [page, setPage] = React.useState(1);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const navigate = useNavigate();

  // function thông báo
  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  // Modal chi tiết
  const showModalDetailed = (record) => {
    loadUser(record.id);
  };

  //Navigate to Form update
  const updateUser = (record) => {
    navigate(`/admin/update/user/${record.id}`);
  };

  const handleOk = () => {
    setIsModalDetailedVisible(false);
  };

  const handleCancel = () => {
    setModalData({});
    setIsModalDetailedVisible(false);
  };

  const handleChangeFilter = (event) => {
    const newUsers = usersList.filter((item, index) => {
      return (
        item.fullName.toUpperCase().search(event.target.value.toUpperCase()) !==
          -1 || item.phone.search(event.target.value) !== -1
      );
    });
    setUsersFilter(newUsers);
  };

  // popup xóa
  const cancelDelete = () => {};
  const confirmDelete = async (record) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.delete(
        `${apiUrl}/api/user/admin/delete/${record.id}`
      );
      await loadUserList();
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Xóa thành công");
        loadUserList();
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
    }
  };

  const columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      align: "center",
      width: "18%",
    },
    {
      title: "Ngày sinh",
      render: (record) => new Date(record.dob).toLocaleDateString("en-GB"),
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Vai trò",
      render: (record) =>
        record.roles.map((item, index) => {
          return (
            <Tag color="geekblue" key={index} style={{ fontSize: "14px" }}>
              {item.roleCode === "ADMIN" && "Chủ trung tâm"}
              {item.roleCode === "EMPLOYEE" && "Nhân viên"}
              {item.roleCode === "TEACHER" && "Giảng viên"}
              {item.roleCode === "STUDENT" && "Học viên"}
            </Tag>
          );
        }),
      align: "center",
      width: "18%",
    },
    {
      title: "Trạng Thái",
      render: (record) => (
        <Tag color={record.status === "ACTIVE" ? "green" : "red"}>
          {handleStatus(record.status)}
        </Tag>
      ),
      filters: [
        {
          text: "ĐÃ KÍCH HOẠT",
          value: "ACTIVE",
        },
        {
          text: "CHƯA KÍCH HOẠT",
          value: "INACTIVE",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
          <Button type="primary" onClick={() => showModalDetailed(record)}>
            Chi tiết
          </Button>
          <Button onClick={() => updateUser(record)}>Chỉnh sửa</Button>
          <Popconfirm
            title="Bạn có muốn xóa danh mục này?"
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

  const loadUserList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    switch (type) {
      case "all":
        await axios.get(`${apiUrl}/api/user/`).then((res) => {
          setUsersList(res.data);
          setUsersFilter(res.data);
        });
        break;
      case "employee":
        await axios.get(`${apiUrl}/api/user/get?role=EMPLOYEE`).then((res) => {
          setUsersList(res.data);
          setUsersFilter(res.data);
        });
        break;
      case "teacher":
        await axios.get(`${apiUrl}/api/user/get?role=TEACHER`).then((res) => {
          setUsersList(res.data);
          setUsersFilter(res.data);
        });
        break;
      case "student":
        await axios.get(`${apiUrl}/api/user/get?role=STUDENT`).then((res) => {
          setUsersList(res.data);
          setUsersFilter(res.data);
        });
        break;
      default:
        break;
    }
    if (type === "all") {
      await axios.get(`${apiUrl}/api/user/`).then((res) => {
        setUsersList(res.data);
        setUsersFilter(res.data);
      });
    }
  };

  const loadUser = async (id) => {
    setIsStudent(false);
    setIsTeacher(false);
    setStudentClasses([]);
    setTeacherClasses([]);
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/user/${id}`)
      .then((res) => {
        setModalData(res.data);
        return res.data;
      })
      .then((res) => {
        res.roles.forEach(async (item) => {
          if (item.roleCode === "TEACHER") {
            setIsTeacher(true);
            await axios
              .get(`${apiUrl}/api/teacherClass/teacherId/${id}`)
              .then((res) => {
                const teacherClass = [];
                res.data.forEach((item, idex) => {
                  teacherClass.push(item.classes.name);
                });
                setTeacherClasses(teacherClass);
              });
          }
          if (item.roleCode === "STUDENT") {
            setIsStudent(true);
            await axios
              .get(`${apiUrl}/api/student_class/studentId/${id}`)
              .then((res) => {
                const studentClass = [];
                res.data.forEach((item, idex) => {
                  studentClass.push(item.classes.name);
                });
                setStudentClasses(studentClass);
              });
          }
        });
      });
    setIsModalDetailedVisible(true);
  };

  useEffect(() => {
    loadUserList();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Row style={{ marginBottom: "14px" }}>
        <Col style={{ margin: "0 0 20 0" }} span={11}>
          <Input
            prefix={<SearchOutlined />}
            allowClear
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            onChange={handleChangeFilter}
            className="search-input ml12"
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={usersFilter}
        pagination={{
          pageSize: 8,
          position: ["bottomCenter"],
          onChange(current) {
            setPage(current);
          },
        }}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => showModalDetailed(record),
          };
        }}
        rowClassName="table-row"
        rowKey="id"
      />
      <Modal
        title={"Thông tin chi tiết - " + modaldata.fullName}
        visible={isModalDetailedVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ overflowY: "scroll", maxHeight: "calc(100vh - 250px)" }}
      >
        <Row className="row-detail">
          <Col span={6}>ID: </Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>{modaldata.id}</span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Họ và tên: </Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>{modaldata.fullName}</span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Ngày sinh: </Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>
              {new Date(modaldata.dob).toLocaleDateString("en-GB")}
            </span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Số điện thoại: </Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>{modaldata.phone}</span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Email: </Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>{modaldata.email}</span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Địa chỉ: </Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>{modaldata.address}</span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Chức vụ:</Col>
          <Col span={18}>
            {isModalDetailedVisible &&
              modaldata.roles.map((item, index) => {
                return (
                  <Tag key={index} color="geekblue">
                    {handleStatus(item.roleCode)}
                  </Tag>
                );
              })}
          </Col>
        </Row>
        {isTeacher && (
          <Row className="row-detail">
            <Col span={6}>Lớp giảng dạy: </Col>
            <Col span={18}>
              {teacherClasses.length > 0 ? (
                teacherClasses.map((item, index) => {
                  return (
                    <Row className="row-detail" key={index}>
                      <span
                        style={{
                          fontWeight: "650",
                          color: "blue",
                        }}
                      >
                        {item}
                      </span>
                    </Row>
                  );
                })
              ) : (
                <span style={{ fontWeight: "650", color: "red" }}>
                  Không giảng dạy lớp học nào
                </span>
              )}
            </Col>
          </Row>
        )}
        {isStudent && (
          <Row className="row-detail">
            <Col span={6}>Lớp học tham gia: </Col>
            <Col span={18}>
              {studentClasses.length > 0 ? (
                studentClasses.map((item, index) => {
                  return (
                    <Row className="row-detail">
                      <span
                        style={{
                          fontWeight: "650",
                          color: "blue",
                        }}
                      >
                        {item}
                      </span>
                    </Row>
                  );
                })
              ) : (
                <span style={{ fontWeight: "650", color: "red" }}>
                  Không tham gia lớp học nào
                </span>
              )}
            </Col>
          </Row>
        )}
        <Row className="row-detail">
          <Col span={6}>Ngày tạo:</Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>
              {new Date(modaldata.createdAt).toLocaleString()}
            </span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Ngày sửa: </Col>
          <Col span={18}>
            <span style={{ fontWeight: "650" }}>
              {new Date(modaldata.updatedAt).toLocaleString()}
            </span>
          </Col>
        </Row>
        <Row className="row-detail">
          <Col span={6}>Trạng thái: </Col>
          <Col span={18}>
            <Tag color={modaldata.status === "ACTIVE" ? "green" : "red"}>
              {handleStatus(modaldata.status)}
            </Tag>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AdminUserList;
