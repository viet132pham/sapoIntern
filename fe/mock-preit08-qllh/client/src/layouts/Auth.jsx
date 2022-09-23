import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, loadUser } from "../features/reducers/authSlice";
import LoginForm from "../components/auth/LoginForm";

const Auth = () => {
  const authState = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  if (authState.authLoading) {
    return (
      <div>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 50,
              }}
              spin
            />
          }
        />
      </div>
    );
  } else if (authState.isAuthenticated) {
    return <Navigate to="/" replace="true" />;
  } else
    return <LoginForm/>;
};

export default Auth;
