import request from "@/utils/request";

const blogroll = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 友情列表---------------------------------------------------------
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccLink",
        method: "get",
        params
      });
    },
    // 新增友情
    add({ commit, state }, data) {
      return request({
        url: "/ccLink",
        method: "post",
        data
      });
    },
    // 删除友情
    delPrice({ commit, state }, id) {
      return request({
        url: `/ccBanner/${id}`,
        method: "delete",
      });
    },
    // 编辑友情
    edit({ commit, state }, data) {
      return request({
        url: `/ccLink/${data.id}`,
        method: "put",
        data
      });
    },
    //获取id
    getId({ commit, state }, id) {
        return request({
          url: `/ccLink/${id}`,
          method: "get",
        });
      },
    //友情分类列表
    getLists({ commit, state }, params) {
        return request({
          url: "/ccLinkType",
          method: "get",
          params
        });
      },
       // 新增友情
    adds({ commit, state }, data) {
        return request({
          url: "/ccLinkType",
          method: "post",
          data
        });
      },
      // 删除友情
    delPrices({ commit, state }, id) {
        return request({
          url: `/ccLinkType/${id}`,
          method: "delete",
        });
      },
      // 编辑友情
    edits({ commit, state }, data) {
        return request({
          url: `/ccLinkType/${data.id}`,
          method: "put",
          data
        });
      },
  }
};

export default blogroll;
