import request from "@/utils/request";

const reconciliation = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取退订记录列表
    getList({ commit, state }, data) {
      return request({
        url: "/bill/doPage",
        method: "post",
        data,
        billService: true
      });
    },
    // 获取详情
    getData({ commit, state }, id) {
      return request({
        url: `/customer/${id}`,
        method: "get"
      });
    },
    // 删除
    del({ commit, state }, id) {
      return request({
        url: `/customer/${id}`,
        method: "delete"
      });
    },
    // 确认
    confirm({ commit, state }, data) {
      return request({
        url: "/tcOrder/unSubscrube/confirm",
        method: "post",
        data
      });
    },
    // 退回
    goBack({ commit, state }, data) {
      return request({
        url: "/tcOrder/unSubscrube/back",
        method: "post",
        data
      });
    },
    // 新增建议添加项
    addSteerItem({ commit, state }, data) {
      return request({
        url: "/tcOrder/unSubscrube/addSteerItem",
        method: "post",
        data
      });
    },
    // 获取开票明细
    getsteerList({ commit, state }, data) {
      return request({
        url: "/billDetail/getInitData",
        method: "post",
        data
      });
    }
  }
};

export default reconciliation;
