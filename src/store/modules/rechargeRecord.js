import request from "@/utils/request";

const rechargeRecord = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取充值记录列表
    getList({ commit, state }, params) {
      return request({
        url: "/rechargeRecord",
        method: "get",
        params
      });
    },
    // 新增采购
    getOne({ commit, state }, id) {
      return request({
        url: `/rechargeRecord/${id}`,
        method: "get",
      });
    },
  }
};

export default rechargeRecord;
