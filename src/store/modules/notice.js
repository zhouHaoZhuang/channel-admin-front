import request from "@/utils/request";

const notice = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取通知模板列表
    getList({ commit, state }, params) {
      return request({
        url: "/mcChannelTemplate",
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
    
    // 编辑
    editDisCount({ commit, state }, data) {
      return request({
        url: `/mcChannelTemplate`,
        method: "patch",
        data
      });
    },
  }
};

export default notice;
