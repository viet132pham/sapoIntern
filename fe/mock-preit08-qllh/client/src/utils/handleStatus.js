const handleStatus = (status) => {
  // status = status.toUpperCase();
  switch (status) {
    case "STUDYING":
      return "ĐANG HỌC";
    case "FINISHED":
      return "HOÀN THÀNH";
    case "WAITING":
      return "SẮP MỞ";
    case "CANCELLED":
      return "HỦY";
    case "CANCELED":
      return "HỦY";
    case "TEACHING":
      return "ĐANG DẠY";
    case "ACTIVE":
      return "ĐÃ KÍCH HOẠT";
    case "INACTIVE":
      return "CHƯA KÍCH HOẠT";
    case "COMPLETED":
      return "HOÀN THÀNH";
    case "PENDING":
      return "CHƯA NỘP";
    case "PAY":
      return "PHIẾU THU";
    case "REI":
      return "PHIẾU CHI";
    case "HW":
      return "Bài tập";
    case "DOC":
      return "Tài liệu";
    case "ADMIN":
      return "Chủ trung tâm";
    case "EMPLOYEE":
      return "Nhân viên";
    case "TEACHER":
      return "Giảng viên";
    case "STUDENT":
      return "Học viên";
    default:
      return status;
  }
};

export default handleStatus;
