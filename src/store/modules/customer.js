import request from "@/utils/request";

const customer = {
  namespaced: true,
  state: {
    //专属客服信息
    customerInfo: {}
  },
  mutations: {
    saveCustomerInfo: (state, payload) => {
      state.customerInfo = payload;
    }
  },
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
    // 获取客服列表
    getList({ commit, state }, data) {
      return request({
        url: "/customerAdvocate/getCustomerAdvocateList",
        method: "post",
        data
      });
    },
    //指定客户获取客服接口
    getInterfaceLists({ commit, state }, data) {
      return request({
        url: "/customerAdvocate/getCustomerAdvocateList",
        method: "post",
        data
      });
    },
    // 获取客服列表(新接口)
    getNewList({ commit, state }, params) {
      return request({
        url: "/customerAdvocate/list",
        method: "get",
        params
      });
    },
    //获取客户列表
    getCustomerList({ commit, state }, data) {
      return request({
        url: "/corporationCustomerAdvocate/getUnrelatedList",
        method: "post",
        data
      });
    },
    // 编辑客服信息
    editor({ commit, state }, data) {
      return request({
        url: `/customerAdvocate/${data.id}`,
        method: "patch",
        data
      });
    },
    //删除客服
    del({ commit, state }, id) {
      return request({
        url: `/customerAdvocate/${id}`,
        method: "delete"
      });
    },
    //过滤已经选择的客服
    getFilterCustomer({ commit, state }, data) {
      return request({
        url: "/customerAdvocate/filterList",
        method: "post",
        data
      });
    },
    //查询客服下方的客户
    getCustomerClient({ commit, state }, data) {
      return request({
        url: "/corporationCustomerAdvocate/getCorporationList",
        method: "post",
        data
      });
    },
    //获取专属客服信息
    getCustomerInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        request({
          url: "/customerAdvocate/getAdvocate",
          method: "get"
        })
          .then(res => {
            const data = res.data;
            console.log(data, "获取客服二维码信息");
            // commit("saveCustomerInfo", data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
export default customer;
