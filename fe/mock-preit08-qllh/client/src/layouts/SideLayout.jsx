import {
  TeamOutlined,
  HomeOutlined,
  ReadOutlined,
  SolutionOutlined,
  CustomerServiceOutlined,
  BankOutlined,
  WalletOutlined,
  ApartmentOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  UserOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, authSelector } from "../features/reducers/authSlice";
import logo1 from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [getItem(<Link to="/">Trang chủ</Link>, "0", <HomeOutlined />)];

const SideLayout = ({ content }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentStyle, setContentStyle] = useState({ marginLeft: "250px" });
  const [logoStyle, setLogoStyle] = useState({
    height: "64px",
    width: "250px",
    position: "fixed",
    zIndex: "5",
    backgroundColor: "var(--header-background-color)",
    transition: "0.3s linear",
    boxShadow: "var(--shadow2)",
  });
  const [collapsedBtnStyle, setCollapsedBtnStyle] = useState({});
  const [logo, setLogo] = useState(logo1);
  const authState = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (collapsed) {
      setCollapsedBtnStyle({ width: "64px", fontWeight: "600" });
      setContentStyle({
        marginLeft: "64px",
        transition: "0.2s linear",
        color: "var(--text-color)",
      });
      setLogoStyle({ ...logoStyle, width: "64px", transition: "0.3s linear" });
      setLogo(logo2);
    } else {
      setCollapsedBtnStyle({ width: "250px" });
      setContentStyle({
        marginLeft: "250px",
        transition: "0.2s linear",
        color: "var(--text-color)",
      });
      setLogoStyle({ ...logoStyle, width: "250px", transition: "0.1s linear" });
      setLogo(logo1);
    }
    // eslint-disable-next-line
  }, [collapsed]);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  let stopRender = 1;
  if (items.length <= stopRender) {
    for (let i = 0; i < authState.roles.length; i++) {
      if (authState.roles[i] === "student") {
        items.push(
          getItem("Học viên", "1", <ReadOutlined />, [
            getItem(<Link to="/student/classes">Danh sách lớp</Link>, "11"),
            getItem(
              <Link to="/student/document">Danh sách tài liệu</Link>,
              "12"
            ),
          ])
        );
        stopRender++;
      }
      if (authState.roles[i] === "teacher") {
        items.push(
          getItem("Giảng viên", "2", <SolutionOutlined />, [
            getItem(<Link to="/teacher/classes">Danh sách lớp</Link>, "21"),
            getItem(<Link to="/teacher/document">Tài liệu</Link>, "22"),
          ])
        );
        stopRender++;
      }
      if (authState.roles[i] === "employee") {
        items.push(
          getItem("Nhân viên", "3", <CustomerServiceOutlined />, [
            getItem(
              <Link to="/employee/guest">Danh sách khách hàng</Link>,
              "31"
            ),
            getItem(<Link to="/employee/classes">Danh sách lớp</Link>, "32"),
            getItem(
              <Link to="/employee/payment/create">Tạo phiếu thu</Link>,
              "33"
            ),
          ])
        );
        stopRender++;
      }
      if (authState.roles[i] === "admin") {
        items.push(
          getItem(
            <Link to="/admin/user">Quản lý nhân lực</Link>,
            "41",
            <TeamOutlined />
          ),
          getItem("Quản lý lớp", "5", <BankOutlined />, [
            getItem(<Link to="/admin/class">Lớp học</Link>, "51"),
            getItem(<Link to="/admin/course">Khóa học</Link>, "52"),
          ]),
          getItem("Quản lý tài chính", "6", <WalletOutlined />, [
            getItem(<Link to="/admin/payment">Phiếu thu</Link>, "61"),
            getItem(<Link to="/admin/receipt">Phiếu chi</Link>, "62"),
            getItem(<Link to="/admin/voucher">Sổ quỹ</Link>, "63"),
          ]),
          getItem(
            <Link to="/admin/department">Quản lý chi nhánh</Link>,
            "7",
            <ApartmentOutlined />
          )
        );
        stopRender++;
      }
    }
    items.push(
      getItem(<Link to="/settings">Cài đặt</Link>, "8", <SettingOutlined />),
      getItem(
        <Button
          type="text"
          style={{ color: "var(--red)", padding: "0" }}
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          <LogoutOutlined /> Đăng xuất
        </Button>,
        "9"
      ),
      getItem(<div style={{ height: "48px", width: "100%" }}></div>, "10")
      // ,
      // getItem(<Button
      //   type="text"
      //   onClick={toggleCollapsed}
      //   style={{
      //     marginBottom: 16,
      //   }}
      // >
      //   {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      // </Button>, "10")
    );
  }

  const menuUser = (
    <Menu
      items={[
        {
          label: (
            <Link to="/settings/update-info">
              <Space size="middle">
                <UserOutlined />
                Thông tin cơ bản
              </Space>
            </Link>
          ),
          key: "1",
        },
        {
          label: (
            <Link to="/settings/update-password">
              <Space size="middle">
                <SettingOutlined />
                Đổi mật khẩu
              </Space>
            </Link>
          ),
          key: "2",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Space
              size="middle"
              onClick={() => {
                dispatch(logoutUser());
              }}
              style={{ color: "var(--red)" }}
            >
              <LogoutOutlined />
              Đăng xuất
            </Space>
          ),
          key: "3",
        },
      ]}
    />
  );
  return (
    <Layout
      hasSider
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="logo flex-center" style={logoStyle}>
        <img
          src={logo}
          alt=""
          style={{
            maxHeight: "70%",
            maxWidth: "70%",
            transition: "opacity 5s ease-in-out",
          }}
        />
      </div>
      <Sider
        width="250"
        className="sideLayout-sider"
        // collapsible
        collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
        collapsedWidth="64px"
      >
        <nav>
          <div className="logo flex-center" style={{ height: "64px" }}>
            <img
              src={logo}
              alt=""
              style={{ maxHeight: "70%", maxWidth: "70%" }}
            />
          </div>

          <Menu
            style={{ minHeight: "100%" }}
            theme="light"
            defaultSelectedKeys={["0"]}
            mode="inline"
            items={items}
          />
          <Button
            className="sider-collapse-btn"
            type="text"
            onClick={toggleCollapsed}
            style={collapsedBtnStyle}
          >
            {collapsed ? (
              <DoubleRightOutlined />
            ) : (
              <>
                <DoubleLeftOutlined style={{ marginRight: "10px" }} />
                Thu gọn
              </>
            )}
          </Button>
        </nav>
      </Sider>
      <Layout className="site-layout" style={contentStyle}>
        <Header
          className="sideLayout-header flex-center"
          style={{
            padding: 0,
            backgroundColor: "var(--header-background-color)",
            borderBottomColor: "#e8ebed",
            boxShadow: "var(--shadow2)",
          }}
        >
          <Dropdown
            placement="bottomRight"
            overlay={menuUser}
            // trigger={["click"]}
            arrow
            className="drop"
          >
            <div
              onClick={(e) => e.preventDefault()}
              style={{
                color: "var(--text-color-third)",
                marginRight: "64px",
              }}
            >
              <Space>
                <UserOutlined />
                {authState.fullName}
                <DownOutlined style={{ fontSize: "16px" }} />
              </Space>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "32px 16px 0",
          }}
        >
          {content}
        </Content>
        {/* <Footer
          className="flex-center"
          style={{
            height: "48px",
            color: "var(--layout-background-color)",
          }}
        >
          Mock Project: Phần mềm quản lý Trung tâm dạy tiếng Anh SIETLS - SAPO
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default SideLayout;
