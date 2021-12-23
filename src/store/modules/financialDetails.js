import request from "@/utils/request";

const financialDetails = {
  namespaced: true,
  actions: {
    // 财务明细列表------------------------
    // 获取列表
    getList ({ commit, state }, params) {
      return request({
        url: "/customerAccountLog",
        method: "get",
        params,
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
        url: `/customerAccountLog?key=createTime&search=${params.startTime}&currentPage=1&pageSize=10&total=0&qp-createTime-gt=${params.startTime}&qp-createTime-lt=${params.endTime}`,
        method: "get",
        // pay:true
      });
    },
  }
};

export default financialDetails;
