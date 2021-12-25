import request from "@/utils/request";

const renew = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取充值记录列表
    getList({ commit, state }, params) {
      return request({
        url: "/scEcsStock/query/upDown/ecsPage",
        method: "get",
        params
      });
    },
  }
};

export default renew;
