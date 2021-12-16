import request from "@/utils/request";
const { AuthenticationClient } = require("authing-js-sdk");
import env from "@/config/env";

const user = {
  namespaced: true,
  state: {
    token: "",
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = { ...userInfo };
    }
  },

  actions: {
    // 注册
    register({ commit, state }, data) {
      return request({
        url: "/user/channelRegister",
        method: "post",
        data
      });
    },
    // 发送验证码
    sendCode({ commit, state }, data) {
      return request({
        url: "/sms/sendSms",
        method: "post",
        data
      });
    },
    // 登录
    login({ commit, state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: "/user/channelUserLogin",
          method: "post",
          data
        })
          .then(res => {
            console.log("login", res);
            // const token = res.data.token;
            // commit("SET_TOKEN", token);
            // dispatch("getUserInfo");
            // resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    logout({ commit, state }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        const authenticationClient = new AuthenticationClient({
          appId: env.appId,
          appHost: env.appHost,
          token: state.token
        });
        authenticationClient.logout();
        resolve();
      });
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
      const authenticationClient = new AuthenticationClient({
        appId: env.appId,
        appHost: env.appHost,
        token: state.token
      });
      authenticationClient.getCurrentUser().then(user => {
        commit("SET_USERINFO", user);
      });
    },
    //修改密码
    changePassword({ commit, state }, data) {
      return request({
        url: "/user/updatePassword",
        method: "post",
        data
      });
    }
  }
};

export default user;
