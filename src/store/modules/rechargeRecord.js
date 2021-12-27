import request from "@/utils/request";

const rechargeRecord = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取充值记录列表
    getList({ commit, state }, params) {
      return request({
        url: "/customer/rechargeRecord",
        method: "get",
        params
      });
    },
    // 获取充值记录详情
    getOne({ commit, state }, id) {
      return request({
        url: `/customer/${id}`,
        method: "get",
      });
    },
  }
};

export default rechargeRecord;
