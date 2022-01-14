import request from "@/utils/request";

const member = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccCorporation",
        method: "get",
        params
      });
    },
    // 获取产品列表
    getProductList({ commit, state }, params) {
      return request({
        url: "/icProduct",
        method: "get",
        params,
        // jadepool: true
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
        url: `/ccCorporation/${id}`,
        method: "get"
      });
    },
    // 会员折扣
    // 获取列表
    getDisCountList({ commit, state }, params) {
      return request({
        url: "/ccCorportionPrice",
        method: "get",
        params
      });
    },
    // 获取详情
    getDisCountDetail({ commit, state }, data) {
      return request({
        url: `/ccCorportionPrice/${data.id}`,
        method: "get"
      });
    },
    // 新增
    addDisCount({ commit, state }, data) {
      return request({
        url: "/ccCorportionPrice",
        method: "post",
        data
      });
    },
    // 编辑
    editDisCount({ commit, state }, data) {
      return request({
        url: `/ccCorportionPrice/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除
    delDisCount({ commit, state }, data) {
      return request({
        url: `/ccCorportionPrice/${data.id}`,
        method: "delete",
        data
      });
    }
  }
};

export default member;
