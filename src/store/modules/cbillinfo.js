import request from "@/utils/request";

const cbillinfo = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/channelInvoiceInfo",
        method: "get",
        params
      });
    },
    // 获取详情
    getOne({ commit, state }, params) {
      return request({
        url: `/channelInvoiceInfo/${params.id}`,
        method: "get",
        params
      });
    },
    // 取消
    del({ commit, state }, params) {
      return request({
        url: `/channelInvoiceInfo/delete`,
        method: "delete",
        params
      });
    },
    // 增加信息
    add({ commit, state }, data) {
      return request({
        url: "/channelInvoiceInfo",
        method: "post",
        data
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/channelInvoiceInfo/${data.id}`,
        method: "patch",
        data
      });
    },
    // 审核
    audit({ commit, state }, data) {
      return request({
        url: `/channelInvoiceRecord/examine/${data.id}?status=${data.status}`,
        method: "patch",
        data
      });
    }
  }
};

export default cbillinfo;
