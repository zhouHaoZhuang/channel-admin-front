import request from "@/utils/request";

const message = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/messageRecord",
        method: "get",
        params
      });
    },
    // 获取产品列表
    getProductList({ commit, state }, params) {
      return request({
        url: "/messageRecord",
        method: "get",
        params,
        jadepool: true
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/messageRecord/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/messageRecord/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/messageRecord",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, params) {
      // console.log(params,'params');
      return request({
        url: `/messageRecord/${params.id}`,
        method: "get"
      });
    },
    // 获取详情
    getDisCountDetail({ commit, state }, data) {
      return request({
        url: `/messageRecord/${data.id}`,
        method: "get"
      });
    },
    // 新增
    addDisCount({ commit, state }, data) {
      return request({
        url: "/messageRecord",
        method: "post",
        data
      });
    },
    // 编辑
    editDisCount({ commit, state }, data) {
      return request({
        url: `/messageRecord/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除
    delDisCount({ commit, state }, data) {
      return request({
        url: `/messageRecord/${data.id}`,
        method: "delete",
        data
      });
    }
  }
};

export default message;
