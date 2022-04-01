import request from "@/utils/request";

const reconciliation = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取退订记录列表
    getList({ commit, state }, data) {
      return request({
        url: "/tcOrder/unSubscrube/list",
        method: "post",
        data
      });
    },
    // 获取详情
    getData({ commit, state }, id) {
      return request({
        url: `/customer/${id}`,
        method: "get"
      });
    }
  }
};

export default reconciliation;
