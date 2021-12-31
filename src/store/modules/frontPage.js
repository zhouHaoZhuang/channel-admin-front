import request from "@/utils/request";

const frontPage = {
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
    // 获取首页-----交易订单数
    orderCountNum({ commit, state }, params) {
      return request({
        url: "/tcOrder/orderCount",
        method: "get",
				params
      });
    },
		// 成交客户数
    coountInfo({ commit, state }, params) {
      return request({
        url: `/tcOrder/coount`,
        method: "get",
				params
      });
    },
		// 注册客户数
		getBasicCompanyInfo({ commit, state }, params) {
      return request({
        url: "/ccCorporation/count",
        method: "get"
      });
    },
		// 修改公司基本信息接口
		amendBasicCompanyInfo({ commit, state }, data) {
      return request({
        url: `/ccCompanyInfo/${data.id}`,
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

export default frontPage;
