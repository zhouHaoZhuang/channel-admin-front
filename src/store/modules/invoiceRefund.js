import request from "@/utils/request";

const invoiceRefund = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取发票配置
    getBillConfig({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params,
      });
    },
    // 修改发票配置
    modifyBillConfig({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "put",
        data,
      });
    },
    // 获取退款配置
    getRefundConfig({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params,
      });
    },
    // 修改退款配置
    modifyRefundConfig({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "put",
        data,
      });
    },
  },
};

export default invoiceRefund;
