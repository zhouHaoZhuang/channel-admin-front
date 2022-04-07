import request from "@/utils/request";

const customer = {
  namespaced: true,

  actions: {
    // 添加客服
    add({ commit, state }, data) {
      return request({
        url: "/customerAdvocate",
        method: "post",
        data
      });
    },
    // 分配客服
    distribute({ commit, state }, data) {
      return request({
        url: "/corporationCustomerAdvocate/assign",
        method: "post",
        data
      });
    },
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/customerAdvocate",
        method: "get",
        params
      });
    },
    // 编辑客服信息
    editor({ commit, state }, data) {
      return request({
        url: `/customerAdvocate/${data.id}`,
        method: "patch",
        data
      });
    }
  }
};
export default customer;
