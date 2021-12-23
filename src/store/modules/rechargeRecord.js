import request from "@/utils/request";

const rechargeRecord = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取充值记录列表
    getList({ commit, state }, params) {
      return request({
        url: "/purchaseAccount",
        method: "get",
        params
      });
    },
    // 新增采购
    add({ commit, state }, data) {
      return request({
        url: "/purchaseAccount",
        method: "post",
        data
      });
    },
  }
};

export default rechargeRecord;
