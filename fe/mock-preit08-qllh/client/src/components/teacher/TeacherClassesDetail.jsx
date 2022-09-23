import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
  Button,
  Col,
  Form,
  InputNumber,
  message,
  Row,
  Table,
  Popconfirm,
  Typography,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useMatch } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";

// ***** D O N E ***********

const TeacherClassesDetail = () => {
  const [students, setStudents] = useState([]);
  const [timeslotId, setTimeslotId] = useState([]);
  const [classes, setClasses] = useState({});
  const [classDetail, setClassDetail] = useState({
    name: "",
    timeslots: [],
    department: { name: "", address: "" },
  });
  const [page, setPage] = React.useState(1);
  const [grades, setGrades] = useState({});
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [gradeNumber, setGradeNumber] = useState();
  const [sessionNumber, setSessionNumber] = useState();
  const [progress, setProgress] = useState();
  const match = useMatch("/teacher/class/detail/:id");
  const [renderAgain, setRenderAgain] = useState(false);
  const [addBtnDisabled, setAddBtnDisabled] = useState(false);
  const [subBtnDisabled, setSubBtnDisabled] = useState(false);

  const isEditing = (record) => record.student.id === editingKey;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    if (title) {
      var thisGradeId = "grade" + title.charAt(11);
    }
    return (
      <td {...restProps}>
        {editing ? (
          <>
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập ${title}!`,
                },
              ]}
            >
              <InputNumber
                onChange={(value) => {
                  setGrades({
                    ...grades,
                    studentId: record.student.id,
                    classId: record.aclass.id,
                    [thisGradeId]: value,
                  });
                }}
                rules={[
                  {
                    validator: (_, value) =>
                      value && value >=0 && value <=10
                        ? Promise.resolve()
                        : Promise.reject("Vui lòng nhập điểm trong khoảng từ 0 đến 10"),
                    message: `Vui lòng nhập điểm trong khoảng từ 0 đến 10`,
                  },
                ]}
                value={grades[thisGradeId]}
              />
            </Form.Item>
          </>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    setEditingKey(record.student.id);
    const gradeIds = JSON.parse("[" + record.gradeId + "]");
    const points = JSON.parse("[" + record.point + "]");
    let point = { studentId: record.student.id, classId: record.aclass.id };
    for (let i = 0; i < gradeIds.length; i++) {
      var thisGradeId = `grade${gradeIds[i]}`;
      point = { ...point, [thisGradeId]: points[i] };
    }
    setGrades(point);
    setRenderAgain(!renderAgain);
  };

  const cancel = () => {
    setGrades({});
    setEditingKey("");
  };

  useEffect(() => {}, [renderAgain]);

  const handleSave = async (sid, cid) => {
    const reqClassId = grades.classId;
    const reqStudentId = grades.studentId;
    delete grades.studentId;
    delete grades.classId;
    delete grades.gradenull;
    let reqGradeId = [];
    let reqPoint = [];
    for (const grade in grades) {
      reqGradeId.push(grade.charAt(5));
      reqPoint.push(grades[grade]);
    }
    let req = {
      classId: reqClassId,
      studentId: reqStudentId,
      gradeId: reqGradeId.join(","),
      point: reqPoint.join(","),
    };
    setRenderAgain(!renderAgain);
    save(sid, cid, req);
    setEditingKey("");
  };

  const save = async (studentId, classId, req) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/student_grade/classId/${classId}/studentId/${studentId}`,
        req
      );
      loadStudentList();
      setGrades({});
      if (res.status === 200) {
        successMsg("Cập nhật điểm thành công");
      } else {
        errorMsg("Có lỗi xảy ra");
      }
    } catch (err) {
      errorMsg("Có lỗi xảy ra");
      console.log(err);
    }
  };

  const update = async (classNew) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/class/put/${match.params.id}`,
        classNew
      );
      if (res.status === 200) {
        successMsg("Cập nhật thành công");
        loadCourse();
      } else errorMsg("Có lỗi xảy ra");
    } catch (error) {
      errorMsg("Có lỗi xảy ra");
      console.log(error);
    }
  };

  var editArray = [
    {
      title: "Tùy chọn",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => handleSave(record.student.id, record.aclass.id)}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={cancel}>
              <Typography.Link>Hủy</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Sửa
          </Typography.Link>
        );
      },
      align: "center",
    },
  ];

  var items = new Array(gradeNumber).fill(null).map((_, i) => {
    const id2 = i + 1;
    return {
      title: `Điểm bài ${id2}`,
      render: (record) => {
        const gradeIds = JSON.parse("[" + record.gradeId + "]");
        const points = JSON.parse("[" + record.point + "]");
        if (gradeIds.indexOf(id2) >= 0) return points[gradeIds.indexOf(id2)];
        else return null;
      },
      align: "center",
      // sorter: {
      //   compare: (a, b) => a.test1_grade - b.test1_grade,
      // },
      width: "10%",
      editable: true,
    };
  });

  var columns = [
    {
      title: "STT",
      render: (value, item, index) => (page - 1) * 8 + index + 1,
      align: "center",
      width: "5%",
    },
    {
      title: "Họ và tên",
      render: (record) => record.student.fullName,
      align: "center",
      width: "15%",
    },
    {
      title: "Ngày sinh",
      render: (record) =>
        new Date(record.student.dob).toLocaleDateString("en-GB"),
      align: "center",
      width: "10%",
    },
    {
      title: "Email",
      render: (record) => record.student.email,
      align: "center",
      width: "10%",
    },
    {
      title: "Số điện thoại",
      render: (record) => record.student.phone,
      width: "10%",
      align: "center",
    },
  ];

  const cl = [...columns, ...items, ...editArray];

  const successMsg = (msg) => {
    message.success(msg, 5);
  };

  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  // load Students list
  const loadStudentList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/student_grade/get/${match.params.id}`)
      .then((res) => {
        setStudents(res.data);
      });
  };

  const loadCourse = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/class/${match.params.id}`).then((res) => {
      setClassDetail(res.data);
      setGradeNumber(res.data.course.numberGrade);
      setSessionNumber(res.data.course.numberSession);
      setProgress(res.data.progress);
      if (res.data.progress < 1) setSubBtnDisabled(true);
      else setSubBtnDisabled(false);
      if (res.data.progress >= res.data.course.numberSession)
        setAddBtnDisabled(true);
      else setAddBtnDisabled(false);
      setTimeslotId(res.data.timeslots.map(({ id }) => id));
      setClasses({
        code: res.data.code,
        name: res.data.name,
        room: res.data.room,
        status: res.data.status,
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        progress: res.data.progress,
        courseId: res.data.course.id,
        departmentId: res.data.department.id,
      });
    });
  };

  useEffect(() => {
    loadStudentList();
    loadCourse();
    // eslint-disable-next-line
  }, []);

  const mergedColumns = cl.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>Chi tiết lớp giảng viên</div>
        </Row>
        <Row>
          <Button className="back-btn" type="text">
            <Link to="/teacher/classes">
              <LeftOutlined /> Quay lại
            </Link>
          </Button>
        </Row>
        <div className="white-box">
          <Row>
            <Col span={3}>Tên lớp:</Col>
            <Col span={9} style={{ fontWeight: "600" }}>
              {classDetail.name}
            </Col>
            <Col span={3}>Sĩ số:</Col>
            <Col span={1} style={{ fontWeight: "600" }}>
              {students.length}/15
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={3}>Tên cơ sở:</Col>
            <Col span={9} style={{ fontWeight: "600" }}>
              {classDetail.department.name}
            </Col>
            <Col span={3}>Địa chỉ:</Col>
            <Col span={4} style={{ fontWeight: "600" }}>
              {classDetail.department.address}
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={3}>Phòng học:</Col>
            <Col span={9} style={{ fontWeight: "600" }}>
              {classDetail.room}
            </Col>
            <Col span={3}>Thời gian học:</Col>
            <Col span={4} style={{ fontWeight: "600" }}>
              {classDetail.timeslots.map((element) => (
                <div>
                  {element.date}: {element.time}
                </div>
              ))}
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={3}>Tiến độ học tập:</Col>
            <Col span={9} style={{ fontWeight: "600" }}>
              <Row align="middle" gutter={10}>
                <Col>
                  <Button
                    disabled={subBtnDisabled}
                    type="default"
                    onClick={() => {
                      var timeslotIdNew = timeslotId;
                      let progressNew = progress - 1;
                      let classNew = {
                        ...classes,
                        timeslotId: timeslotIdNew,
                        progress: progressNew,
                      };
                      update(classNew);
                    }}
                  >
                    -
                  </Button>
                </Col>
                <Col>
                  {progress} / {sessionNumber} buổi
                </Col>

                <Col>
                  <Button
                    disabled={addBtnDisabled}
                    type="primary"
                    onClick={() => {
                      var timeslotIdNew = timeslotId;
                      let progressNew = progress + 1;
                      let classNew = {
                        ...classes,
                        timeslotId: timeslotIdNew,
                        progress: progressNew,
                      };
                      update(classNew);
                    }}
                  >
                    +
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            columns={mergedColumns}
            dataSource={students}
            bordered
            pagination={{
              pageSize: 8,
              position: ["bottomCenter"],
              onChange(current) {
                setPage(current);
              },
            }}
            rowKey="(record,index)=>{return index}"
          />
        </Form>

        {/* <Modal
          title={"Chỉnh sửa điểm học viên"}
          visible={isModalUpdateVisible}
          okText="Gửi"
          cancelText="Hủy"
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" initialValues={{
            test1_grade: gradeForm.test1_grade
          }}>
            <Form.Item name="test1_grade" label="Điểm bài 1">
              <Input
                name="test1_grade"
                value={gradeForm.test1_grade}
                onChange={onChangegradeForm}
              />
            </Form.Item>
            <Form.Item name="test2_grade" label="Điểm bài 2">
              <Input
                name="test2_grade"
                value={gradeForm.test2_grade}
                onChange={onChangegradeForm}
              />
            </Form.Item>
            <Form.Item name="test3_grade" label="Điểm bài 3">
              <Input
                name="test3_grade"
                value={gradeForm.test3_grade}
                onChange={onChangegradeForm}
              />
            </Form.Item>
            <Form.Item name="progress_grade" label="Điểm quá trình">
              <Input
                name="progress_grade"
                value={gradeForm.progress_grade}
                onChange={onChangegradeForm}
              />
            </Form.Item>
          </Form>
        </Modal> */}
      </Col>
    </Row>
  );
};

export default TeacherClassesDetail;
