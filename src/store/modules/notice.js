import request from "@/utils/request";

const notice = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取通知模板列表
    getList({ commit, state }, data) {
      return request({
        url: "/mcChannelTemplate/getConfiguration",
        method: "post",
        data
      });
    },
    // 获取详情
    getDisCountDetail({ commit, state }, params) {
      // console.log(data,'-------');
      return request({
        url: `/messageTemplate/one`,
        method: "get",
        params
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
