import request from "@/utils/request";

const category = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 类别管理列表---------------------------------------------------------
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "get",
        params
      });
    },
    // 新增
    add({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "post",
        data
      });
    },
    // 删除
    delPrice({ commit, state }, id) {
      return request({
        url: `/ccHelpType/${id}`,
        method: "delete",
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/ccHelpType/${data.id}`,
        method: "patch",
        data
      });
    },
    //获取
    getId({ commit, state }, id) {
        return request({
          url: `/ccHelpType/${id}`,
          method: "get",
        });
      },
  }
};

export default category;
