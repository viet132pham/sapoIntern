import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../features/reducers/authSlice";
import {
  LeftOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import TextArea from "antd/lib/input/TextArea";

// ***** D O N E ***********

const beforeUpload = (file) => {
  const isLt5 = file.size / 1024 / 1024 < 5;
  if (!isLt5) {
    message.error("Vui lòng tải lên file nhỏ hơn 5MB!");
  }
  return isLt5;
};

const TeacherDocumentUpload = () => {
  const navigate = useNavigate();
  const authState = useSelector(authSelector);
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [classOption, setClassOption] = useState([]);
  const [disabledUpload, setDisabledUpload] = useState(true);
  // eslint-disable-next-line
  const { url, type, name, instruction, deadline, classId } = document;

  let stopRender = 0;

  const loadClassList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/teacherClass/teacherId/${authState.id}`)
      .then((res) => {
        res.data.forEach((obj) => {
          if (res.data.length > stopRender) {
            setClassOption((classOption) => [
              ...classOption,
              {
                label: obj.classes.code + " - " + obj.classes.name,
                value: obj.id.classId,
              },
            ]);
            stopRender++;
          }
        });
      });
  };

  useEffect(() => {
    loadClassList();
    // eslint-disable-next-line
  }, []);

  const onChangeDocument = (event) => {
    setDocument({ ...document, [event.target.name]: event.target.value });
  };
  const onChangeDatePicker = (date, dateString) => {
    setDocument({ ...document, deadline: new Date(dateString).setSeconds(0) });
  };
  const onChangeRadio = (event) => {
    setDocument({ ...document, type: event.target.value });
  };
  const onChangeSelect = (value) => {
    setDocument({ ...document, classId: value });
  };

  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    info.file.status = "done";
    setFileList(newFileList.slice(-1));
  };

  const handleUpload = (file) => {
    const storageRef = ref(storage, `/files/student/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDocument({ ...document, url: url });
        });
        setLoading(false);
        setDisabledUpload(false);
      }
    );
  };

  const handleSubmit = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    setDocument({ ...document, classId: parseInt(classId) });
    try {
      const response = await axios.post(
        `${apiUrl}/api/document/post`,
        document
      );
      if (response.status === 200) {
        successMsg("Đăng tài liệu thành công!");
        navigate("/teacher/document");
      } else {
        errorMsg("Có lỗi xảy ra");
      }
    } catch (error) {
      errorMsg("Có lỗi xảy ra");
      console.log(error);
    }
  };

  const props = {
    beforeUpload: beforeUpload,
    action: handleUpload,
    onChange: handleChange,
    multiple: false,
    showUploadList: {
      showPreviewIcon: false,
    },
  };

  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>Tải tài liệu lên</div>
        </Row>
        <Row>
          <Button
            className="back-btn"
            type="text"
            onClick={() => {
              navigate("/teacher/document");
            }}
          >
            <LeftOutlined /> Quay lại
          </Button>
        </Row>
        <div className="white-box">
          <Row>
            <Col span={7}>
              <h3>Tải lên tài liệu hoặc bài tập</h3>
            </Col>
            <Col span={1}>
            <Divider
                type="vertical"
                style={{
                  height: "100%",
                  backgroundColor: "rgb(211,213,215)",
                }}
              />
            </Col>
            <Col span={16}>
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
                onFinish={handleSubmit}
                onSubmit={(e) => e.preventDefault()}
                style={{
                  padding: "10px",
                }}
              >
                <Form.Item
                  name="classId"
                  label="Mã lớp"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền mã lớp học!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={classOption}
                    onChange={onChangeSelect}
                  />
                </Form.Item>
                <Form.Item
                  name="type"
                  label="Kiểu tài liệu :"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn kiểu tài liệu",
                    },
                  ]}
                >
                  <Radio.Group onChange={onChangeRadio}>
                    <Radio value="HW" label="Bài tập">
                      Bài tập
                    </Radio>
                    <Radio value="DOC" label="Tài liệu">
                      Tài liệu
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Tên tài liệu :"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền tên tài liệu!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Nhập tên tài liệu"
                    value={name}
                    name="name"
                    onChange={onChangeDocument}
                  />
                </Form.Item>
                <Form.Item name="deadline" label="Hạn cuối :">
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    minuteStep={5}
                    showNow={false}
                    onChange={onChangeDatePicker}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item name="instruction" label="Hướng dẫn :">
                  <TextArea
                    rows={3}
                    type="text"
                    placeholder="Thêm hướng dẫn, mô tả cho học viên"
                    value={instruction}
                    name="instruction"
                    onChange={onChangeDocument}
                  />
                </Form.Item>
                <Form.Item label="Tệp đính kèm">
                  {loading ? (
                    <div>
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 30,
                            }}
                            spin
                          />
                        }
                      />
                    </div>
                  ) : (
                    <Upload {...props} fileList={fileList}>
                      <div className="upload-btn">
                        <UploadOutlined /> Tải lên
                      </div>
                    </Upload>
                  )}
                </Form.Item>
                <Row justify="center">
                  <Button
                    disabled={disabledUpload}
                    size="large"
                    type="primary"
                    htmlType="submit"
                  >
                    ĐĂNG
                  </Button>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default TeacherDocumentUpload;
