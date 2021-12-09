import request from "@/utils/request";

const member = {
  namespaced: true,
  state: {
  },

  mutations: {
  },
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccCorporation",
        method: "get"
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/ccCorporation/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/ccCorporation/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/ccCorporation",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/ccCorporation/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default member;
