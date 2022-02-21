import request from "@/utils/request";

const notice = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取通知模板列表
    getList({ commit, state }, params) {
      return request({
        url: "/mcChannelTemplate/getConfiguration",
        method: "get",
        params
      });
    },
    // 获取详情
    getDisCountDetail({ commit, state }, data) {
      // console.log(data,'-------');
      return request({
        url: `/messageTemplate/one`,
        method: "get",
        data
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
