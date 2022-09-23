import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME } from "../common/constants";

const setAuthToken = () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;