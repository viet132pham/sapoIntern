import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import { Col, Input, message, Popconfirm, Row, Table, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import setAuthToken from "../../utils/setAuthToken";
import moment from "moment";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/reducers/authSlice";

const EmployeeGuestList = ({ dataList, loadGuest, type }) => {
  const [page, setPage] = React.useState(1);
  const authState = useSelector(authSelector);
  const [guestsFilter, setGuestFilter] = useState();

  // function thông báo
  const successMsg = (msg) => {
    message.success(msg, 5);
  };
  const errorMsg = (msg) => {
    message.error(msg, 5);
  };

  const handleChangeFilter = (event) => {
    const newList = dataList.filter((item, index) => {
      return (
        item.fullName.toUpperCase().search(event.target.value.toUpperCase()) !==
          -1 || item.phone.search(event.target.value) !== -1
      );
    });
    setGuestFilter(newList);
  };

  const cancelDelete = () => {};

  const confirmAccept = async (record) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.put(
        `${apiUrl}/api/guest/${record.id}/employee/${authState.id}`,
        {}
      );
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Đã nhận khách hàng này");
        loadGuest();
      }
    } catch (e) {
      errorMsg("Có lỗi xảy ra");
    }
  };

  const confirmDelete = async (record) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    try {
      const response = await axios.delete(
        `${apiUrl}/api/guest/${record.id}/delete/supporting`,
        {}
      );
      if (response.status !== 200) {
        errorMsg("Có lỗi xảy ra");
      } else {
        successMsg("Đã xóa khách hàng khỏi danh sách tư vấn !");
        loadGuest();
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
      title: "Tên khách hàng",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "Ngày sinh",
      render: (record) => new Date(record.dob).toLocaleDateString("en-GB"),
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "Thời gian đăng ký",
      render: (record) =>
        moment(new Date(record.createdAt)).format("DD-MM-YYYY HH:mm"),
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
          {type === "unsupporting" && (
            <Popconfirm
              title="Bạn có chắc muốn nhận tư vấn khách hàng này không?"
              placement="topRight"
              onConfirm={() => confirmAccept(record)}
              onCancel={cancelDelete}
              okText="Có"
              cancelText="Không"
            >
              <Typography.Link href="#">Nhận</Typography.Link>
            </Popconfirm>
          )}

          {type === "supporting" && (
            <Popconfirm
              title="Bạn có chắc chắn muốn hủy tư vấn khách hàng này?"
              placement="topRight"
              onConfirm={() => confirmDelete(record)}
              onCancel={cancelDelete}
              okText="Có"
              cancelText="Không"
            >
              <Typography.Link href="#" style={{ color: "#cf1322" }}>
                Hủy
              </Typography.Link>
            </Popconfirm>
          )}
        </div>
      ),
      align: "center",
    },
  ];

  useEffect(() => {
    setGuestFilter(dataList);
  }, [dataList]);

  return (
    <div>
      <Row style={{ marginBottom: "14px" }}>
        <Col style={{ margin: "0 0 20 0" }} span={14}>
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
        dataSource={guestsFilter}
        pagination={{
          pageSize: 8,
          position: ["bottomCenter"],
          onChange(current) {
            setPage(current);
          },
        }}
        rowKey="id"
      />
    </div>
  );
};

export default EmployeeGuestList;
