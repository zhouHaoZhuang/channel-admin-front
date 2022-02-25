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
        data,
      });
    },
    // 获取详情
    getDisCountDetail({ commit, state }, id) {
      // console.log(data,'-------');
      return request({
        url: `/messageTemplate/${id}`,
        method: "get",
      });
    },

    // 编辑
    editDisCount({ commit, state }, data) {
      return request({
        url: `/mcChannelTemplate`,
        method: "post",
        data,
      });
    },
  },
};

export default notice;
