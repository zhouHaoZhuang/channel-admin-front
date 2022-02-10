import request from "@/utils/request";

const emailSms = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取邮件配置
    getEmailConfig({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params,
      });
    },
    // 修改邮件配置
    modifyEmailConfig({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "put",
        data,
      });
    },
    // 获取短信配置
    getSmsConfig({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params,
      });
    },
    // 修改短信配置
    modifySmsConfig({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "put",
        data,
      });
    },
  },
};

export default emailSms;
