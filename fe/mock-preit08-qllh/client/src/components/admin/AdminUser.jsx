import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
  Button,
  Col,
  Row,
  Tabs
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import AdminUserList from "./AdminUserList";

// ***** D O N E ***********

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [first, setFirst] = useState(true);

  const loadUserList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios.get(`${apiUrl}/api/user/`).then((res) => {
      setFirst(false);
      setUsers(res.data);
    });
  };
 
  useEffect(() => {
    loadUserList();
  }, []);

  return (
    <div>
      {!first && users.length === 0 && (
        <div className="section-zero">
          <img
            src="https://sapo.sapocdn.net/sapo-frontend-v3/master/static/media/f0049312d442f57146cf.svg?fbclid=IwAR2yaf2I-NFl47TQrkbMsshctAgpuBSoDe9FniTYnJuHdhD6-Wo6D6KgEGM"
            alt=""
            style={{ width: "350px", height: "350px" }}
          />
          <h2>Hệ thống của bạn chưa có người dùng nào</h2>
          <Button type="primary" className="button-create-first">
            <Link to="/admin/add/user">
              {" "}
              <PlusOutlined style={{ marginRight: "10px" }} />
              Tạo tài khoản đầu tiên
            </Link>
          </Button>
        </div>
      )}

      {!first && users.length > 0 && (
        <Row justify="center">
          <Col span={23} offset={0}>
            <Row className="section-title">
              <div>DANH SÁCH NGƯỜI DÙNG</div>
            </Row>
            <Row justify="end">
                <Button type="primary" className="add-btn">
                  <Link to="/admin/add/user">
                    {" "}
                    <PlusOutlined style={{ marginRight: "10px" }} />
                    Thêm tài khoản
                  </Link>
                </Button>
            </Row>
            <Row>
              <Col span={24} style={{backgroundColor:"#fff"}}>
                <Tabs 
                  defaultActiveKey="1" 
                  size="large"
                >
                  <Tabs.TabPane tab="Tất cả" key="1">
                    <AdminUserList type="all"/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Nhân viên" key="2">
                    <AdminUserList type="employee"/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Giảng viên" key="3">
                    <AdminUserList type="teacher"/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Học viên" key="4">
                    <AdminUserList type="student"/>
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdminUser;
