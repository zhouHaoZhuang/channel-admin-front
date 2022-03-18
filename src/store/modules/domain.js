import request from "@/utils/request";

const domain = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccDomain",
        method: "get",
        params
      });
    },
    // 新增域名
    add({ commit, state }, data) {
      return request({
        url: "/ccDomain",
        method: "post",
        data
      });
    },
    // 获取记录值
    getRecord({ commit, state }, data) {
      return request({
        url: "/aliyun/dcdn/describeDcdnVerifyContent",
        method: "post",
        data
      });
    },
    // 验证域名
    verify({ commit, state }, data) {
      return request({
        url: `/ccDomain/verifyDcdnDomain`,
        method: "post",
        data
      });
    },
    // 删除
    del({ commit, state }, id) {
      return request({
        url: `/ccDomain/${id}`,
        method: "delete"
      });
    },
    // 查询当前域名的https配置
    getDomainHttps({ commit, state }, params) {
      return request({
        url: `/aliyun/dcdn/selectHttpsConfig/${params.domain}`,
        method: "get"
      });
    },
    // 配置当前域名的https配置
    saveDomainHttps({ commit, state }, data) {
      return request({
        url: "/aliyun/dcdn/handleDcdnDomainCertificate",
        method: "post",
        data
      });
    }
  }
};

export default domain;
