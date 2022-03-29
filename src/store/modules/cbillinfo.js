import request from "@/utils/request";

const cbillinfo = {
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
    getOne({ commit, state }, params) {
      return request({
        url: `/channelInvoiceRecord/${params.id}`,
        method: "get",
        params,
      });
    },
    // 取消
    del({ commit, state }, data) {
      return request({
        url: `/channelInvoiceRecord/receive/${data.id}`,
        method: "delete",
      });
    },
    // 增加信息
    add({ commit, state }, data) {
      return request({
        url: "/channelInvoiceRecord",
        method: "post",
        data,
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/channelInvoiceRecord/${data.id}`,
        method: "put",
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

export default cbillinfo;
