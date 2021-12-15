import request from "@/utils/request";

const business = {
  namespaced: true,
  state: {
  },

  mutations: {
  },
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/scEcsStock/queryEcsPage",
        method: "get",
        data: params
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/scEcsStock/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/scEcsStock/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/scEcsStock",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      return request({
        url: `/scEcsStock/${id}`,
        method: "get"
      });
    }
  }
};

export default business;
