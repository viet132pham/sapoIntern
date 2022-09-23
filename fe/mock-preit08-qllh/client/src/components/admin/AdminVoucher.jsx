import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
  Col,
  DatePicker,
  Row,
  Table,
  Tag,
} from "antd";
import setAuthToken from "../../utils/setAuthToken";
import handleCurrency from "../../utils/handleCurrency";
import moment from "moment";
import handleStatus from "../../utils/handleStatus";

// ***** D O N E ***********

const AdminVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalReceipt, setTotalReceipt] = useState(0);
  const [total, setTotal] = useState(0);
  const { RangePicker } = DatePicker;
  const dateEndFormat = "YYYY-MM-DD 23:59:59";

  // function thông báo

  const onChangePeriod = async (dates, dateStrings) => {
    if (dates) {
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken();
      }
      loadVoucherListInPeriod(
        dateStrings[0],
        moment(dateStrings[1]).format(dateEndFormat)
      );
    } else {
      loadVoucherList();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: "5%",
    },
    {
      title: "Loại",
      key: "type",
      render: (_, record) => {
        let color = "blue";
        if (record.type === "REI") color = "red";
        else if (record.type === "PAY") color = "green";
        return <Tag color={color}>{handleStatus(record.type)}</Tag>;
      },
      filters: [
        {
          text: "PHIẾU CHI",
          value: "REI",
        },
        {
          text: "PHIẾU THU",
          value: "PAY",
        },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: true,
      align: "center",
      width: 100,
    },
    {
      title: "Số tiền",
      render: (record) => handleCurrency(record.amount),
      align: "center",
      width: 150,
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend"],
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        let color = "red";
        if (record.status === "COMPLETED") color = "green";
        else if (record.status === "PENDING") color = "blue";
        return <Tag color={color}>{handleStatus(record.status)}</Tag>;
      },
      filters: [
        {
          text: "HOÀN THÀNH",
          value: "COMPLETED",
        },
        {
          text: "CHƯA NỘP",
          value: "PENDING",
        },
        {
          text: "HỦY",
          value: "CANCELED",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      align: "center",
      width: 120,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      align: "center",
      width: 200,
    },
    {
      title: "Thời gian tạo",
      render: (record) =>
        new Date(record.createdAt).toLocaleDateString("vi-VN", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      align: "center",
      width: 200,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      sortDirections: ["descend"],
    },
    {
      title: "Chỉnh sửa lần cuối",
      render: (record) =>
        new Date(record.updatedAt).toLocaleDateString("vi-VN", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      align: "center",
      width: 200,
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
  ];

  // load voucher
  const loadVoucherList = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/voucher/`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setVouchers(res);

        let totalPaymentMoney = 0;
        let totalReceiptMoney = 0;
        res.forEach((item) => {
          if (item.type === "PAY") {
            if (item.status === "COMPLETED") totalPaymentMoney += item.amount;
          }
          if (item.type === "REI") {
            if (item.status === "COMPLETED") totalReceiptMoney += item.amount;
          }
        });

        setTotalPayment((prevState) => totalPaymentMoney);
        setTotalReceipt((prevState) => totalReceiptMoney);
        setTotal((prevState) => totalPaymentMoney - totalReceiptMoney);
      });
  };

  const loadVoucherListInPeriod = async (start, end) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken();
    }
    await axios
      .get(`${apiUrl}/api/voucher/${start}/to/${end}`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setVouchers(res);
        let totalPaymentMoney = 0;
        let totalReceiptMoney = 0;
        res.forEach((item) => {
          if (item.type === "PAY") {
            if (item.status === "COMPLETED") totalPaymentMoney += item.amount;
          }
          if (item.type === "REI") {
            if (item.status === "COMPLETED") totalReceiptMoney += item.amount;
          }
        });

        setTotalPayment((prevState) => totalPaymentMoney);
        setTotalReceipt((prevState) => totalReceiptMoney);
        setTotal((prevState) => totalPaymentMoney - totalReceiptMoney);
      });
  };

  useEffect(() => {
    loadVoucherListInPeriod(
      moment().startOf("month").format("YYYY-MM-DD"),
      moment().format(dateEndFormat)
    );
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={23} offset={0} className="tableCategories">
          <Row className="section-title">
            <div>SỔ QUỸ</div>
          </Row>
          <Row style={{ marginBottom: "25px" }}>
            <Col>
              <RangePicker
                size="large"
                ranges={{
                  "Tất cả": [moment(new Date("1900-08-01")), moment()],
                  "Hôm nay": [moment(), moment()],
                  "Hôm qua": [
                    moment().subtract(1, "day"),
                    moment().subtract(1, "day"),
                  ],
                  "Tuần này": [moment().startOf("week"), moment()],
                  "Tuần trước": [
                    moment().subtract(1, "week").startOf("week"),
                    moment().subtract(1, "week").endOf("week"),
                  ],
                  "Tháng này": [
                    moment().startOf("month"),
                    moment().endOf("month"),
                  ],
                  "Tháng trước": [
                    moment().subtract(1, "months").startOf("month"),
                    moment().subtract(1, "months").endOf("month"),
                  ],
                }}
                onChange={onChangePeriod}
                style={{ borderRadius: "5px" }}
                defaultValue={[moment().startOf("month"), moment()]}
              />
            </Col>
          </Row>

          <Row
            className="flex-center"
            style={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: "25px",
              padding: "20px",
            }}
          >
            <Col span={4} className="column-money-title">
              <h3>Tổng thu</h3>
              <h4 style={{ color: "#75a561" }}>
                {totalPayment.toLocaleString()}
              </h4>
            </Col>
            <Col span={3} className="column-money-price">
              -
            </Col>
            <Col span={4} className="column-money-title">
              <h3>Tổng chi</h3>
              <h4 style={{ color: "#a13d3d" }}>
                {totalReceipt.toLocaleString()}
              </h4>
            </Col>
            <Col span={3} className="column-money-price">
              =
            </Col>
            <Col span={4} className="column-money-title">
              <h3>Số dư</h3>
              <h4 style={{ color: "#3da2d2" }}>{total.toLocaleString()} vnđ</h4>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={vouchers}
            pagination={{ pageSize: 8, position: ["bottomCenter"] }}
            rowKey={(obj) => obj.id}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminVoucher;
