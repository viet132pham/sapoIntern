import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import setAuthToken from "../../utils/setAuthToken";
import { message } from "antd";

message.config({ maxCount: 1 });
const errorMsg = (msg) => {
  message.error(msg, 2);
};
const successMsg = (msg) => {
  message.success(msg, 2);
};

const errorHandle = (msg) => {
  errorMsg(msg);
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  delete axios.defaults.headers.common["Authorization"];
};

// reducer bất đồng bộ loadUser
export const loadUser = createAsyncThunk("auth/loaduser", async () => {
  axios.defaults.headers.common["Authorization"] =
    localStorage[LOCAL_STORAGE_TOKEN_NAME];
  try {
    const response = await axios.get(`${apiUrl}/auth`);
    if (response.status !== 200) {
      errorHandle("Tài khoản không tồn tại hoặc sai thông tin đăng nhập");
      return null;
    } else
      try {
        setAuthToken();
        const user = await axios.get(
          `${apiUrl}/api/user/find/${response.data}`
        );
        if (!user) {
          errorHandle("Tài khoản không tồn tại hoặc sai thông tin đăng nhập");
          return null;
        } else {
          const lowerRoles = user.data.roles.map((role) => role.toLowerCase());
          if (lowerRoles.includes(sessionStorage.role)) {
            successMsg("Xin chào, " + user.data.fullName + "!");
            return user.data;
          } else {
            errorHandle("Tài khoản không tồn tại hoặc sai thông tin đăng nhập");
            return null;
          }
        }
      } catch (error) {
        errorHandle("Có lỗi xảy ra");
      }
  } catch (error) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    delete axios.defaults.headers.common["Authorization"];
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: {
      authLoading: false,
      isAuthenticated: false,
      id: null,
      user: null,
      fullName: null,
      roles: [],
    },
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      state.authState = {
        authLoading: false,
        isAuthenticated: false,
        id: null,
        user: null,
        fullName: null,
        roles: [],
      };
    },
  },
  extraReducers: {
    [loadUser.pending]: (state) => {
      state.authState.authLoading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      if (action.payload) {
        const lowerRoles = action.payload.roles.map((role) =>
          role.toLowerCase()
        );
        state.authState = {
          authLoading: false,
          isAuthenticated: true,
          id: action.payload.id,
          user: action.payload.username,
          fullName: action.payload.fullName,
          roles: lowerRoles,
        };
      } else {
        state.authState = {
          authLoading: false,
          isAuthenticated: false,
          id: null,
          user: null,
          fullName: null,
          roles: [],
        };
      }
    },
    [loadUser.rejected]: (state) => {
      state.authState = {
        authLoading: false,
        isAuthenticated: false,
        id: null,
        user: null,
        fullName: null,
        roles: [],
      };
    },
  },
});

//reducer
const authReducer = authSlice.reducer;

//selector
export const authSelector = (state) => state.authReducer.authState;

// actions
export const { logoutUser } = authSlice.actions;

export default authReducer;
