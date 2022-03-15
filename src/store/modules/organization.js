import request from "@/utils/request";

const channel = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取角色列表
    getRoleList({ commit, state }, params) {
      return request({
        url: "/role",
        method: "get",
        params
      });
    },
    // 新增角色
    addRole({ commit, state }, data) {
      return request({
        url: "/role",
        method: "post",
        data
      });
    },
    // 编辑角色
    editRole({ commit, state }, data) {
      return request({
        url: `/role/${data.id}`,
        method: "patch",
        data
      });
    },
    // 删除角色
    delRole({ commit, state }, data) {
      return request({
        url: `/role/${data.id}`,
        method: "delete"
      });
    },
    // 获取角色详情
    getRoleDetail({ commit, state }, params) {
      return request({
        url: `/role/${params.id}`,
        method: "get"
      });
    },
    // 获取当前角色权限map数据或默认无选择权限map数据
    getRolePermMap({ commit, state }, params) {
      return request({
        url: `/role/${params.code}`,
        method: "get"
      });
    },
    // 获取子账号列表
    getModalUserList({ commit, state }) {
      return request({
        url: "/manageUser/getChannelUsers",
        method: "get"
      });
    },
    // 新增子账号
    addAccount({ commit, state }, data) {
      return request({
        url: "/user/createUser",
        method: "post",
        data
      });
    },
    // 编辑子账号
    editAccount({ commit, state }, data) {
      return request({
        url: `/resource/modifyPermission`,
        method: "put",
        data
      });
    },
    // 删除子账号
    delAccount({ commit, state }, data) {
      return request({
        url: `/resource/${data.code}`,
        method: "delete"
      });
    }
  }
};

export default channel;
