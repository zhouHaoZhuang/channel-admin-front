import request from "@/utils/request";

const financialDetails = {
  namespaced: true,
  actions: {
    // 财务明细列表------------------------
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/customerAccountLog",
        method: "get",
        params
      });
    },
    //获取id
    getOne({ commit, state }, id) {
        return request({
          url: `/customerAccountLog/${id}`,
          method: "get",
        });
      },
  }
};

export default financialDetails;
