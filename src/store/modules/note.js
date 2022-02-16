import request from "@/utils/request";

const note = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 获取短信签名配置
    getNoteConfig({ commit, state }, params) {
      return request({
        url: "/ccNewsType",
        method: "get",
        params
      });
    },
    // 修改短信签名配置
    modifyNoteConfig({ commit, state }, data) {
      return request({
        url: `/ccNewsType/sort`,
        method: "post",
        data
      });
    },
   
  }
};

export default note;
