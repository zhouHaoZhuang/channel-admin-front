import request from "@/utils/request";

const newsType = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccNewsType",
        method: "get",
        params
      });
    },
    getAllType({ commit, state }) {
      return request({
        url: "/ccNewsType/AllNewsList",
        method: "get",
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/ccNewsType/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/ccNewsType/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, data) {
      return request({
        url: "/ccNewsType",
        method: "post",
        data,
      });
    },
    getOne({ commit, state }, params) {
      console.log(state);
      return request({
        url: `/ccNewsType/${params.id}`,
        method: "get",
        params,
      });
    }
  }
};

export default newsType;
