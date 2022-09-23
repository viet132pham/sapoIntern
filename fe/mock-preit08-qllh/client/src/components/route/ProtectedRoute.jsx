import { Navigate, Outlet } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/reducers/authSlice";

// ***** D O N E ***********

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const authState = useSelector(authSelector);
  if (authState.authLoading)
    return (
      <div style={{ height: "100vh" }} className="flex-center">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                color: "var(--darker)",
                fontSize: 50,
              }}
              spin
            />
          }
        />
      </div>
    );
  if (authState.isAuthenticated) {
    for (let i = 0; i < authState.roles.length; i++) {
      if (role === authState.roles[i]) return <Outlet />;
    }
    if (role === "all") {
      return <Outlet />;
    } else return <Navigate to="/" />;
  } else return <Navigate to="/login" />;
};

export default ProtectedRoute;
