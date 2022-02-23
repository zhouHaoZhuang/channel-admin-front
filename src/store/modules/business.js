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
        params
      });
    },
    // 获取退订详情(退订金额)
    getUnsubscribeInfo({ commit, state }, id){
      return request({
        url: `/scEcsStock/unsubscribeEcsPrice/${id}`,
        method: "post",
      });
    },
    // 服务器退订
    unsubscribeServe({ commit, state }, data){
      return request({
        url: `/scEcsStock/unsubscribeEcs/${data.id}`,
        method: "post",
        data
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
