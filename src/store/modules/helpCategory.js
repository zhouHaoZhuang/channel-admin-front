import request from "@/utils/request";

const helpCategory = {
  namespaced: true,
  state: {
    poolList: [],
    userInfo: {}
  },

  mutations: {
    SET_POOL: (state, poolList) => {
      state.poolList = poolList;
    }
  },

  actions: {
    // 获取列表
    getList ({ commit, state }, params) {
      return request({
        url: `/ccHelpType`,
        method: "get",
        params
      });
    },
    // getAllList({ commit, state }, params) {
    //   return request({
    //     url: `/order?pageSize=${params.pageSize}`,
    //     method: "get",
    //     params
    //   });
    // },
    selectList ({ commit, state }, params) {
      return request({
        url: `/ccHelpType`,
        method: "get",
        params
      });
    },
    delList ({ commit, state }, id) {
      return request({
        url: `/ccHelpType/${id}`,
        method: "delete"
      });
    },
    changeList ({ commit, state }, data) {
      return request({
        url: `/ccHelpType/${data.id}`,
        method: "put",
        data
      });
    },
    addList ({ commit, state }, params) {
      return request({
        url: "/ccHelpType",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne ({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/ccHelpType/${id}`,
        method: "get"
      });
    }
  }
};

export default helpCategory;
