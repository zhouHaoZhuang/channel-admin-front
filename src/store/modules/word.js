import request from "@/utils/request";

const word = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 类别管理列表---------------------------------------------------------
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccHelpDocument",
        method: "get",
        params
      });
    },
    // 新增
    add({ commit, state }, data) {
      return request({
        url: `/ccHelpDocument`,
        method: "post",
        data
      });
    },
    // 删除
    delPrice({ commit, state }, id) {
      return request({
        url: `/ccHelpDocument/${id}`,
        method: "delete",
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/ccHelpDocument/${data.id}`,
        method: "patch",
        data
      });
    },
    //获取
    getId({ commit, state }, id) {
        return request({
          url: `/ccHelpDocument/${id}`,
          method: "get",
        });
      },
  }
};

export default word;
