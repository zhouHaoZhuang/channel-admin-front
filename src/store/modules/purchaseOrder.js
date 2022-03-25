import request from "@/utils/request";

const purchaseOrder = {
  namespaced: true,
  state: {
    poolList: [],
    userInfo: {}
  },

  mutations: {
    SET_POOL: (state, poolList) => {
      state.poolList = poolList;
      // console.log(state.poolList,'state');
    }
  },

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: `/tcOrder/store`,
        method: "get",
        params
      });
    },
    getAllList({ commit, state }, params) {
      return request({
        url: `/tcOrder?pageSize=${params.pageSize}`,
        method: "get",
        params
      });
    },
    selectList({ commit, state }, params){
      return request({
        url: `/tcOrder?key=createTime&search=${params.startTime}&currentPage=1&pageSize=10&total=0&qp-createTime-gt=${params.startTime}&qp-createTime-lt=${params.endTime}`,
        method: "get",
        params
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/tcOrder/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/tcOrder/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/tcOrder",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/tcOrder/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default purchaseOrder;
