import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // Attach token to headers
    let auth = JSON.parse(localStorage.getItem("persist:root"))?.auth;
    let token = JSON.parse(auth)?.token?.token;
    // console.log(token);

    config.headers = {
      Authorization: token ? `Bearer ${token}` : null,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    // console.log(`Lỗi ở axios: ` + error);
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  function (response) {
    // refresh token

    return response;
  },
  function (error) {
    // Do something with request error
    // console.log(`Lỗi ở axios: ` + error);
    return Promise.reject(error);
  }
);

export default instance;
