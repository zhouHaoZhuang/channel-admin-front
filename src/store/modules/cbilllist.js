import request from "@/utils/request";

const cbilllist = {
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
        url: `/channelInvoiceRecord/examine/${data.id}?status=${data.status}`,
        method: "patch",
        data,
      });
    }
  },
};

export default cbilllist;
