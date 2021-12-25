import request from "@/utils/request";

const financialDetails = {
  namespaced: true,
  actions: {
    // 财务明细列表------------------------
    // 获取列表
    getList ({ commit, state }, data) {
      return request({
        url: "/customerAccountLog/qu",
        method: "post",
        data,
        // pay:true
      });
    },
    //根据id获取详情
    getOne ({ commit, state }, id) {
      return request({
        url: `/customerAccountLog/${id}`,
        method: "get",
        pay: true,
      });
    },
    selectList ({ commit, state }, params) {
      return request({
        url: `/customerAccountLog`,
        method: "get",
        params,
        // pay:true
      });
    },
  }
};

export default financialDetails;
