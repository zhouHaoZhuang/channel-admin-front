import axios from "axios";
import env from "@/config/env";
import message from "ant-design-vue/es/message";
import store from "@/store";
import { getDomainUrl } from "@/utils/index";
const axiosSource = axios.CancelToken.source();
const { AuthenticationClient } = require("authing-js-sdk");
const authenticationClient = new AuthenticationClient({
  appId: env.appId,
  appHost: env.appHost
});
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: env.VUE_APP_BASE_URL,
  timeout: 5000 // 请求超时时间
});
// 下载请求地址集合
const downloadUrl = [];
// 白名单请求地址集合-无需校验登录状态的接口
const whileRequestUrl = [
  "/user/channelRegister",
  "/sms/sendSms",
  "/user/channelUserLogin"
];

// 异常拦截处理器
const errorHandler = error => {
  console.log("error", error.response);
  return Promise.reject(error);
};

// request interceptor 请求拦截
request.interceptors.request.use(async config => {
  config.cancelToken = axiosSource.token;
  config.headers.domain = getDomainUrl();
  const token = store.state.user.token;
  // 每次请求时需要判断登录状态，未登录直接跳转登录页，并且取消本次请求
  if (whileRequestUrl.indexOf(config.url) === -1) {
    const data = await authenticationClient.checkLoginStatus(token);
    if (data.code !== 200) {
      axiosSource.cancel("取消请求");
      store.dispatch("user/logout");
      window.location.replace("/");
    }
  }
  if (token) {
    // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
    config.headers["token"] = token;
  }
  // 头部携带ip
  const ip = localStorage.getItem("Ip");
  config.headers["ip"] = ip;
  return config;
}, errorHandler);

// response interceptor  响应拦截
request.interceptors.response.use(response => {
  if (
    response.config.url &&
    downloadUrl.some(item => response.config.url.indexOf(item) > -1)
  ) {
    console.log("export", response.config.url);
    return response;
  }
  const data = response.data;
  const errno = data.code;
  const errmsg = data.msg;
  if (errno !== "000000") {
    message.warning(errmsg);
    // if (errno === 10001 || errno === 10006 || errno === 3) {
    //   store.dispatch("user/logout").then(() => {
    //     location.reload();
    //   });
    // }
    return Promise.reject(data);
  }
  return data;
}, errorHandler);

export default request;
