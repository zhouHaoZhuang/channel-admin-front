import request from "@/utils/request";

const product = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取产品折扣列表
    getProductDiscountList({ commit, state }, params) {
      return request({
        url: "/ccCorportionPrice/getChannelProductPriceList",
        method: "get",
        params
      });
    },
    // 获取产品折扣详情
    getProductDiscountDetail({ commit, state }, params) {
      return request({
        url: `/ccCorportionPrice/${params.id}`,
        method: "get"
      });
    },
    // 添加产品折扣
    addProductDiscount({ commit, state }, data) {
      return request({
        url: "/ccCorportionPrice",
        method: "post",
        data
      });
    },
    // 编辑产品折扣
    editProductDiscount({ commit, state }, data) {
      return request({
        url: `/ccCorportionPrice/${data.id}`,
        method: "put",
        data
      });
    }
  }
};

export default product;
