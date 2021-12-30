import request from "@/utils/request";

const manualDeposit = {
  namespaced: true,
  state: {
  },

  mutations: {
  },
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/pcOfflineRecharge",
        method: "get",
        params
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/pcOfflineRecharge/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/pcOfflineRecharge/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/pcOfflineRecharge",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      // console.log(state);
      return request({
        url: `/pcOfflineRecharge/${id}`,
        method: "get"
      });
    }
  }
};

export default manualDeposit;
