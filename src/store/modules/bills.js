import request from "@/utils/request";

const bills = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    //---------------------------------------------------------账单管理
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/resource/bill",
        method: "get",
        params
      });
    },
    // 新增
    add({ commit, state }, data) {
      return request({
        url: `/resource/bill`,
        method: "post",
        data
      });
    },
    // 删除
    del({ commit, state }, id) {
      return request({
        url: `/resource/bill/${id}`,
        method: "delete",
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/resource/bill/${data.id}`,
        method: "patch",
        data
      });
    },
    //获取
    getId({ commit, state }, id) {
        return request({
          url: `/resource/bill/${id}`,
          method: "get",
        });
      },
  }
};

export default bills;
