import request from "@/utils/request";

const notice = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取通知模板列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccCorporation",
        method: "get",
        params
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

export default notice;
