import request from "@/utils/request";

const user = {
  namespaced: true,
  state: {
    token: "",
    userInfo: {},
    perms: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = { ...userInfo };
    },
    SET_PERMS: (state, perms) => {
      state.perms = [...perms];
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
    // 获取角色列表
    getRoleList({ commit, state }, params) {
      return request({
        url: `/manageUser/queryUserRoles/${params.id}`,
        method: "get"
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
    // 向邮箱发送验证码
    sendEmail({ commit, state }, data) {
      return request({
        url: `/imMessageRecord/testEmail`,
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
            const token = res.data.token;
            commit("SET_TOKEN", token);
            commit("SET_USERINFO", res.data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登录后获取当前用户的权限数据
    getUserPerms({ commit, state }) {
      commit("SET_PERMS", [{ code: "*:*" }]);
      // return new Promise((resolve, reject) => {
      //   request({
      //     url: `/user/listAuthorizedResources`,
      //     method: "get"
      //   })
      //     .then(res => {
      //       commit("SET_PERMS", res.data.list);
      //       resolve();
      //     })
      //     .catch(error => {
      //       reject(error);
      //     });
      // });
    },
    // 登出
    logout({ commit, state }) {
      return new Promise(resolve => {
        commit("SET_USERINFO", {});
        commit("SET_PERMS", []);
        commit("SET_TOKEN", "");
        resolve();
      });
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        request({
          url: "/user/getByToken",
          method: "get"
        })
          .then(res => {
            commit("SET_USERINFO", res.data);
            resolve(res.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //修改密码
    changePassword({ commit, state }, data) {
      return request({
        url: "/user/updatePassword",
        method: "post",
        data
      });
    },
    // 重置密码
    resetPassword({ commit, state }, data) {
      return request({
        url: "/user/channelFindPassword",
        method: "post",
        data
      });
    },
    // 上传图片
    uploadImg({ commit, state }, data) {
      return request({
        url: "/ccOss/uploadFile",
        method: "post",
        data
      });
    }
  }
};

export default user;
