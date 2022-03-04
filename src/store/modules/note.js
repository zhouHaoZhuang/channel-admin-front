import request from "@/utils/request";

const note = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 获取短信签名配置
    getNoteConfig({ commit, state }, params) {
      return request({
        url: "/imMessageSignRegister/getSign",
        method: "get",
        params
      });
    },
    // 获取变更时间
    getChangeTime({ commit, state }, params) {
      return request({
        url: "/imMessageSignRegister/getStatus",
        method: "get",
        params
      });
    },
    // 获取短信审核状态
    getNoteStatus({ commit, state }, params) {
      return request({
        url: "/imMessageSignRegister/registerHave",
        method: "get",
      });
    },
    // 获取审核
    getNoteSign({ commit, state }, params) {
      return request({
        url: "/imMessageSignRegister/registerStatus",
        method: "get",
        params
      });
    },
    // 修改短信签名配置
    modifyNoteConfig({ commit, state }, data) {
      return request({
        url: `/imMessageSignRegister`,
        method: "post",
        data
      });
    },
   
  }
};

export default note;
