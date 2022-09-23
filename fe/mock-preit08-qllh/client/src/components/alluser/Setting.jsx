import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logoutUser } from "../../features/reducers/authSlice";
import { Col, Row, Space, Button } from "antd";
import { LogoutOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Setting = () => {
  // eslint-disable-next-line
  const authState = useSelector(authSelector);
  const dispatch = useDispatch();
  return (
    <Row justify="center">
      <Col span={23} offset={0}>
        <Row className="section-title">
          <div>CÀI ĐẶT THÔNG TIN</div>
        </Row>
        <Row
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "3px",
            boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
            marginBottom: "20px",
          }}
        >
          <Col span={22}>
            <div style={{ padding: "16px 40px" }}>
              <h4>Cài đặt cá nhân</h4>
            </div>
            <Row>
              <Col span={8} className="setting-item">
                <Link to="/settings/update-info">
                  <Space
                    direction="horizontal"
                    size="large"
                    align="center"
                    style={{ padding: "5px", width: "100%" }}
                  >
                    <UserOutlined
                      style={{
                        fontSize: "45px",
                        color: "var(--text-color)",
                        transform: "translateY(-5px)",
                      }}
                    />
                    <Space direction="vertical">
                      <h4 style={{ color: "var(--main)" }}>Thông tin cơ bản</h4>
                      <p style={{ color: "var(--text-color)" }}>
                        Xem và thay đổi thông tin cơ bản
                      </p>
                    </Space>
                  </Space>
                </Link>
              </Col>
              <Col span={8} className="setting-item">
                <Link to="/settings/update-password">
                  <Space
                    direction="horizontal"
                    size="large"
                    style={{ padding: "5px", width: "100%" }}
                  >
                    <LockOutlined
                      style={{
                        fontSize: "45px",
                        color: "var(--text-color)",
                        transform: "translateY(-5px)",
                      }}
                    />
                    <Space direction="vertical">
                      <h4 style={{ color: "var(--main)" }}>Mật khẩu cá nhân</h4>
                      <p style={{ color: "var(--text-color)" }}>
                        Xem và thay đổi mật khẩu
                      </p>
                    </Space>
                  </Space>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button
              type="text"
              style={{
                color: "var(--main)",
                padding: "0",
                fontSize: "20px",
                margin: "20px 0",
              }}
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              <LogoutOutlined /> Đăng xuất
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Setting;
