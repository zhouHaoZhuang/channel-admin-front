import request from "@/utils/request";

const renew = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取充值记录列表
    getList({ commit, state }, params) {
      return request({
        url: "/scEcsStock/query/renew/ecsPage",
        method: "get",
        params
      });
    },
    inquireList({ commit, state }, params) {
      return request({
        url: `/scEcsStock/orderLog/${params.orderNo}`,
        method: "get",
        
      });
    },
  }
};

export default renew;
