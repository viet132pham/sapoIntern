import "./App.less";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./layouts/Auth";
import SideLayout from "./layouts/SideLayout";
import StudentClasses from "./components/student/StudentClasses";
import StudentClassesDetail from "./components/student/StudentClassesDetail";
import StudentDocument from "./components/student/StudentDocument";
import TeacherClasses from "./components/teacher/TeacherClasses";
import TeacherDocument from "./components/teacher/TeacherDocument";
import TeacherClassesDetail from "./components/teacher/TeacherClassesDetail";
import EmployeeGuest from "./components/employee/EmployeeGuest";
import EmployeeClasses from "./components/employee/EmployeeClasses";
import Home from "./components/alluser/Home";
import Setting from "./components/alluser/Setting";
import AdminClass from "./components/admin/AdminClass";
import AdminCourse from "./components/admin/AdminCourse";
import AdminDepartment from "./components/admin/AdminDepartment";
import AdminPayment from "./components/admin/AdminPayment";
import AdminReceipt from "./components/admin/AdminReceipt";
import AdminUser from "./components/admin/AdminUser";
import AdminVoucher from "./components/admin/AdminVoucher";
import AdminClassDetail from "./components/admin/AdminClassDetail";
import ProtectedRoute from "./components/route/ProtectedRoute";
import StudentDocumentDetail from "./components/student/StudentDocumentDetail";
import AdminUpdateUserForm from "./components/admin/form/AdminUpdateUserForm";
import AdminAddUserForm from "./components/admin/form/AdminAddUserForm";
import TeacherDocumentUpload from "./components/teacher/TeacherDocumentUpload";
import TeacherDocumentDetail from "./components/teacher/TeacherDocumentDetail";
import UserUpdateInfoForm from "./components/alluser/form/UserUpdateInfoForm";
import UserUpdatePasswordForm from "./components/alluser/form/UserUpdatePasswordForm";
import AdminDepartmentDetail from "./components/admin/AdminDepartmentDetail";
import AdminCourseDetail from "./components/admin/AdminCourseDetail";
import AdminClassUpdate from "./components/admin/form/AdminClassUpdate";
import GuestPage from "./components/guest/GuestPage";
import AdminAddPaymentVoucher from "./components/admin/form/AdminAddPaymentVoucher";
import AdminAddReceiptVoucher from "./components/admin/form/AdminAddReceiptVoucher";
import EmployeeAddGuestForm from "./components/employee/EmployeeAddGuestForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Auth />}></Route>
        <Route exact path="/guest" element={<GuestPage />}></Route>
        <Route element={<ProtectedRoute role="all" />}>
          <Route exact path="/" element={<SideLayout content={<Home />} />} />
          <Route
            exact
            path="/settings"
            element={<SideLayout content={<Setting />} />}
          />
          <Route
            exact
            path="/settings/update-info"
            element={<SideLayout content={<UserUpdateInfoForm />} />}
          />
          <Route
            exact
            path="/settings/update-password"
            element={<SideLayout content={<UserUpdatePasswordForm />} />}
          />
        </Route>
        <Route element={<ProtectedRoute role="student" />}>
          <Route
            exact
            path="/student/classes"
            element={<SideLayout content={<StudentClasses />} />}
          />
          <Route
            exact
            path="/student/class/detail/:id"
            element={<SideLayout content={<StudentClassesDetail />} />}
          />
          <Route
            exact
            path="/student/document"
            element={<SideLayout content={<StudentDocument />} />}
          />
          <Route
            exact
            path="/student/document/:id"
            element={<SideLayout content={<StudentDocumentDetail />} />}
          />
        </Route>
        <Route element={<ProtectedRoute role="teacher" />}>
          <Route
            exact
            path="/teacher/classes"
            element={<SideLayout content={<TeacherClasses />} />}
          />
          <Route
            exact
            path="/teacher/class/detail/:id"
            element={<SideLayout content={<TeacherClassesDetail />} />}
          />
          <Route
            exact
            path="/teacher/document"
            element={<SideLayout content={<TeacherDocument />} />}
          />
          <Route
            exact
            path="/teacher/document/:id"
            element={<SideLayout content={<TeacherDocumentDetail />} />}
          />
          <Route
            exact
            path="/teacher/document/upload"
            element={<SideLayout content={<TeacherDocumentUpload />} />}
          />
        </Route>
        <Route element={<ProtectedRoute role="employee" />}>
          <Route
            exact
            path="employee/guest"
            element={<SideLayout content={<EmployeeGuest />} />}
          />
          <Route
            exact
            path="employee/classes"
            element={<SideLayout content={<EmployeeClasses />} />}
          />
          <Route
            exact
            path="employee/add/guest"
            element={<SideLayout content={<EmployeeAddGuestForm />} />}
          />
          <Route
            exact
            path="employee/payment/create"
            element={<SideLayout content={<AdminAddPaymentVoucher />} />}
          />
        </Route>
        <Route element={<ProtectedRoute role="admin" />}>
          <Route
            exact
            path="admin/user"
            element={<SideLayout content={<AdminUser />} />}
          />
          <Route
            exact
            path="admin/class"
            element={<SideLayout content={<AdminClass />} />}
          />
          <Route
            exact
            path="admin/class/update/:id"
            element={<SideLayout content={<AdminClassUpdate />} />}
          />
          <Route
            exact
            path="admin/course"
            element={<SideLayout content={<AdminCourse />} />}
          />
          <Route
            exact
            path="admin/payment"
            element={<SideLayout content={<AdminPayment />} />}
          />
          <Route
            exact
            path="admin/receipt"
            element={<SideLayout content={<AdminReceipt />} />}
          />
          <Route
            exact
            path="admin/voucher"
            element={<SideLayout content={<AdminVoucher />} />}
          />
          <Route
            exact
            path="admin/department"
            element={<SideLayout content={<AdminDepartment />} />}
          />
          <Route
            exact
            path="admin/department/detail/:id"
            element={<SideLayout content={<AdminDepartmentDetail />} />}
          />
          <Route
            exact
            path="admin/course/detail/:id"
            element={<SideLayout content={<AdminCourseDetail />} />}
          />
          <Route
            exact
            path="admin/add/user"
            element={<SideLayout content={<AdminAddUserForm />} />}
          />
          <Route
            exact
            path="admin/update/user/:id"
            element={<SideLayout content={<AdminUpdateUserForm />} />}
          />
          <Route
            exact
            path="admin/payment/create"
            element={<SideLayout content={<AdminAddPaymentVoucher />} />}
          />
          <Route
            exact
            path="admin/receipt/create"
            element={<SideLayout content={<AdminAddReceiptVoucher />} />}
          />

          <Route
            exact
            path="/admin/class/detail/:id"
            element={<SideLayout content={<AdminClassDetail />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
