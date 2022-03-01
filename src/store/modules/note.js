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
        url: "/imMessageSign/getStatus",
        method: "get",
        params
      });
    },
    // 修改短信签名配置
    modifyNoteConfig({ commit, state }, data) {
      return request({
        url: `/imMessageSign`,
        method: "post",
        data
      });
    },
   
  }
};

export default note;
