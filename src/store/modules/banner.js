import request from "@/utils/request";

const banner = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // banner列表---------------------------------------------------------
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccBanner",
        method: "get",
        params
      });
    },
    // 新增banner
    add({ commit, state }, data) {
      return request({
        url: "/ccBanner",
        method: "post",
        data
      });
    },
    // 获取详情
    getDetail({ commit, state }, data) {
      return request({
        url: `/channelCustomer/${data.id}`,
        method: "get"
      });
    },
    // 编辑banner
    edit({ commit, state }, data) {
      return request({
        url: `/channelCustomer/${data.id}`,
        method: "put",
        data
      });
    },
  }
};

export default banner;
