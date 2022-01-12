import request from "@/utils/request";

const links = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // -------------------------------友情链接
    // 查询友情链接数据
    getLinkList({ commit, state }, params) {
      return request({
        url: "/ccLink",
        method: "get",
        params
      });
    },
    // 新增友情链接
    addLink({ commit, state }, data) {
      return request({
        url: "/ccLink",
        method: "post",
        data
      });
    },
    // 编辑友情链接
    editLink({ commit, state }, data) {
      return request({
        url: `/ccLink/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除友情链接
    delLink({ commit, state }, id) {
      return request({
        url: `/ccLink/${id}`,
        method: "delete"
      });
    },
    //获取友情链接详情
    getLinkDetail({ commit, state }, id) {
      return request({
        url: `/ccLink/${id}`,
        method: "get"
      });
    },
    // -------------------------------友情分类
    // 查询友情分类数据
    getCategoryList({ commit, state }, params) {
      return request({
        url: "/ccLinkType",
        method: "get",
        params
      });
    },
    // 新增友情分类
    addCategory({ commit, state }, data) {
      return request({
        url: "/ccLinkType",
        method: "post",
        data
      });
    },
    // 编辑友情分类
    editCategory({ commit, state }, data) {
      return request({
        url: `/ccLinkType/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除友情分类
    delCategory({ commit, state }, id) {
      return request({
        url: `/ccLinkType/${id}`,
        method: "delete"
      });
    },
    //获取友情链接分类详情
    getCategoryDetail({ commit, state }, id) {
      return request({
        url: `/ccLinkType/${id}`,
        method: "get"
      });
    }
  }
};

export default links;
