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

    getVipList({ commit, state }, params) {
      return request({
        url: "/pcOfflineRecharge/corporation",
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
    changeReview({ commit, state }, data) {
      return request({
        url: `/pcOfflineRecharge/modifyStatus/${data.id}`,
        method: "patch",
        data
      });
    },
    addList({ commit, state }, data) {
      return request({
        url: "/pcOfflineRecharge",
        method: "post",
        data
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
