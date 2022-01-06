import request from "@/utils/request";

const helpCategory = {
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
    // 获取列表
    getList ({ commit, state }, params) {
      return request({
        url: `/ccHelpType`,
        method: "get",
        params
      });
    },
    // 获取所有的类别  没有参数获取所有类别，有参数获取当前类别下面的子类别
    getAll ({ commit, state }, params) {
      return request({
        url: `/ccHelpType/getChildByCode`,
        method: "get",
        params
      });
    },
    // 查询一个资源对象
    getOne ({ commit, state }, params) {
      return request({
        url: `/ccHelpType/${params.id}`,
        method: "get",
        params
      });
    },
    // 删除一个资源对象或多个资源对象
    delList ({ commit, state }, id) {
      return request({
        url: `/ccHelpType/${id}`,
        method: "delete"
      });
    },
    // 强制删除一个资源对象或多个资源对象
    forceDelete({ commit, state }, id){
      return request({
        url: `/ccHelpType/batchDeleteNodeAndChildNode/${id}`,
        method: "delete"
      });
    },
    sortList ({ commit, state }, data) {
      return request({
        url: `/ccHelpType/sort`,
        method: "post",
        data
      });
    },
    // 修改一个资源对象
    changeList ({ commit, state }, data) {
      return request({
        url: `/ccHelpType/${data.id}`,
        method: "patch",
        data
      });
    },
    // 新增一个资源对象
    addList ({ commit, state }, data) {
      return request({
        url: "/ccHelpType",
        method: "post",
        data
      });
    },
  }
};

export default helpCategory;
