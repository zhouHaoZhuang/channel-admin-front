import request from "@/utils/request";

const page = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 单页管理列表---------------
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccPage",
        method: "get",
        params
      });
    },
    // 新增
    add({ commit, state }, data) {
      return request({
        url: "/ccPage",
        method: "post",
        data
      });
    },
    // 删除
    delPrice({ commit, state }, id) {
      return request({
        url: `/ccPage/${id}`,
        method: "delete",
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/ccPage/${data.id}`,
        method: "patch",
        data
      });
    },
    //获取id
    getId({ commit, state }, id) {
        return request({
          url: `/ccPage/${id}`,
          method: "get",
        });
      },
  }
};

export default page;
