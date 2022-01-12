import request from "@/utils/request";

const banner = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
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
    // 删除banner
    delPrice({ commit, state }, id) {
      return request({
        url: `/ccBanner/${id}`,
        method: "delete"
      });
    },
    // 编辑banner
    edit({ commit, state }, data) {
      return request({
        url: `/ccBanner/${data.id}`,
        method: "put",
        data
      });
    },
    //获取轮播图详情
    getDetail({ commit, state }, id) {
      return request({
        url: `/ccBanner/${id}`,
        method: "get"
      });
    }
  }
};

export default banner;
