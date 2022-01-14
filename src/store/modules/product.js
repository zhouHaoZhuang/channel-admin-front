import request from "@/utils/request";

const product = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取产品折扣列表
    getProductDiscountList({ commit, state }, params) {
      return request({
        url: "/ccCorporation",
        method: "get",
        params
      });
    },
    // 获取产品折扣详情
    getProductDiscountDetail({ commit, state }, params) {
      return request({
        url: "/ccCorporation",
        method: "get",
        params
      });
    },
    // 添加产品折扣
    addProductDiscount({ commit, state }, params) {
      return request({
        url: "/icProduct",
        method: "get",
        params
      });
    },
    // 编辑产品折扣
    editProductDiscount({ commit, state }, id) {
      return request({
        url: `/ccCorporation/${id}`,
        method: "put"
      });
    }
  }
};

export default product;
