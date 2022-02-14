import request from "@/utils/request";

const emailSms = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取配置
    getAllConfig({ commit, state }, params) {
      return request({
        url: "/ccConfig/allConfig",
        method: "get",
        params,
      });
    },
    // 批量修改配置
    modifyAllConfig({ commit, state }, data) {
      return request({
        url: "/ccConfig/batchUpdateProperty",
        method: "post",
        data,
      });
    },
  },
};

export default emailSms;
