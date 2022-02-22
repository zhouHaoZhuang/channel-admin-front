import request from "@/utils/request";

const frontPage = {
  namespaced: true,
  state: {
    poolList: [],
    userInfo: {},
  },

  mutations: {
    SET_POOL: (state, poolList) => {
      state.poolList = poolList;
    },
  },

  actions: {
    // 获取首页-----交易订单数
    orderCountNum({ commit, state }, params) {
      return request({
        url: "/tcOrder/orderCount",
        method: "get",
        params,
      });
    },
    // 成交客户数
    coountInfo({ commit, state }, params) {
      return request({
        url: `/tcOrder/count`,
        method: "get",
        params,
      });
    },
    // 注册客户数
    getBasicCompanyInfo({ commit, state }, params) {
      return request({
        url: "/ccCorporation/count",
        method: "get",
        params,
      });
    },
    // 消费金额数
    orderSumInfo({ commit, state }, params) {
      return request({
        url: `/tcOrder/orderSum`,
        method: "get",
        params,
      });
    },
    // 获取今日工单统计
    getDayWorkOrder({ commit, state }, params) {
      return request({
        url: `/workOrder/count/day`,
        method: "get",
        params,
      });
    },
    // 获取本月工单统计
    getMonthWorkOrder({ commit, state }, params) {
      return request({
        url: `/workOrder/count/month`,
        method: "get",
        params,
      });
    },
     // 获取所在企业终端客户的售出的云服务器台数
     getSuccessCount({ commit, state }, params) {
      return request({
        url: `/scEcsStock/getSuccessCount`,
        method: "get",
        params,
      });
    },
 
  },
};

export default frontPage;
