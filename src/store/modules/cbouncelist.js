import request from "@/utils/request";
// 采购  --  退票列表
const cbouncelist = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/channelInvoiceRecord/page",
        method: "get",
        params,
      });
    },
    // 获取详情
    getDetail({ commit, state }, params) {
      return request({
        url: `/channelInvoiceRecord/${params.id}`,
        method: "get",
        params,
      });
    },
    // 取消
    cancel({ commit, state }, data) {
      return request({
        url: `/channelInvoiceRecord/receive/${data.id}`,
        method: "patch",
        data,
      });
    },
    // 审核
    audit({ commit, state }, data) {
      return request({
        url: `/channelInvoiceRecord/examine/${data.id}`,
        method: "patch",
        data,
      });
    }
  },
};

export default cbouncelist;
