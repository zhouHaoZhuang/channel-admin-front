import request from "@/utils/request";

const safety = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取安全设置
    getSafetyConfig({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params,
      });
    },
    // 修改安全设置
    modifySafetyConfig({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "put",
        data,
      });
    },
  },
};

export default safety;
