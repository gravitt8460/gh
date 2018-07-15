import axios from "axios";

export default (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
