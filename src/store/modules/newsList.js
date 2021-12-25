import request from "@/utils/request";

const newsList = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccNews",
        method: "get",
        params
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/ccNews/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/ccNews/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, data) {
      return request({
        url: "/ccNews",
        method: "post",
        data,
      });
    },
    getOne({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/ccNews/${id}`,
        method: "get"
      });
    }
  }
};

export default newsList;
