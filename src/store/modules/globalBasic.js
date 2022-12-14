import request from "@/utils/request";

const globalBasic = {
  namespaced: true,
  state: {
    poolList: [],
    userInfo: {}
  },

  mutations: {
    SET_POOL: (state, poolList) => {
      state.poolList = poolList;
    }
  },

  actions: {
    // 获取充值支付宝设置参数
    getAlipayConfig({ commit, state }, params) {
      return request({
        url: `/idcPay/business/one`,
        method: "get",
        params,
      });
    },
    // 更新充值支付宝设置参数
    updateAlipayConfig({ commit, state }, data) {
      return request({
        url: `/idcPay/updateByBusinessCodeAndAccountType`,
        method: "patch",
        data,
      });
    },

    // 获取网站详情、网站logo信息
    getInfo({ commit, state }, params) {
      return request({
        url: "/ccWebsiteInfo/getOne",
        method: "get"
      });
    },
		// 修改网站详情、网站logo信息
    amendInfo({ commit, state }, data) {
      return request({
        url: `/ccWebsiteInfo/${data.gid}`,
        method: "put",
				data
      });
    },
		// 获取公司基本信息接口
		getBasicCompanyInfo({ commit, state }, params) {
      return request({
        url: "/ccCompanyInfo/getOne",
        method: "get"
      });
    },
		// 修改公司基本信息接口
		amendBasicCompanyInfo({ commit, state }, data) {
      return request({
        url: `/ccCompanyInfo/${data.cid}`,
        method: "put",
				data
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/ccWebsiteInfo/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/ccWebsiteInfo/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/ccWebsiteInfo",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/ccWebsiteInfo/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default globalBasic;
