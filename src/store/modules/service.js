import request from "@/utils/request";

const service = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取工单配置
    getWorkOrderConfig({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params,
      });
    },
    // 修改工单配置
    modifyWorkOrderConfig({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "put",
        data,
      });
    },
    // 获取增值服务配置
    getServiceConfig({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params,
      });
    },
    // 修改增值服务配置
    modifyServiceConfig({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "put",
        data,
      });
    },
  },
};

export default service;
