import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../common/constants";
import { Button, Col, Row, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EmployeeGuestList from "./EmployeeGuestList";
import { authSelector } from "../../features/reducers/authSlice";
import { useSelector } from "react-redux";

// ***** D O N E ***********

const EmployeeUnsupported = () => {
  const authState = useSelector(authSelector);
  const [supportingList, setSupportingList] = useState([]);
  const [unsupportingList, setUnSupportingList] = useState([]);

  const loadGuest = async () => {
    await axios.get(`${apiUrl}/api/guest/find/${authState.id}`).then((res) => {
      setSupportingList(res.data);
    });
    await axios.get(`${apiUrl}/api/guest/find`).then((res) => {
      setUnSupportingList(res.data);
    });
  };
  useEffect(() => {
    loadGuest();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Row justify="center">
        <Col span={23} offset={0}>
          <Row className="section-title">
            <div>DANH SÁCH KHÁCH HÀNG</div>
          </Row>
          <Row justify="end">
            <Col>
              <Button type="primary" className="add-btn">
                <Link to="/employee/add/guest">
                  {" "}
                  <PlusOutlined style={{ marginRight: "10px" }} />
                  Thêm khách hàng
                </Link>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ backgroundColor: "#fff" }}>
              <Tabs defaultActiveKey="1" size="large">
                <Tabs.TabPane tab="Đang tư vấn" key="1">
                  <EmployeeGuestList
                    type="supporting"
                    dataList={supportingList}
                    loadGuest={loadGuest}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chưa tư vấn" key="2">
                  <EmployeeGuestList
                    type="unsupporting"
                    dataList={unsupportingList}
                    loadGuest={loadGuest}
                  />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeUnsupported;
