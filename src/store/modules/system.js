import request from "@/utils/request";

const channel = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取权限列表
    getAdminList({ commit, state }, data) {
      return request({
        url: "/resource/queryPage",
        method: "post",
        data
      });
    },
    // 新增权限
    addAdmin({ commit, state }, data) {
      return request({
        url: "/resource/addPermission",
        method: "post",
        data
      });
    },
    // 编辑权限
    editAdmin({ commit, state }, data) {
      return request({
        url: `/resource/modifyPermission`,
        method: "put",
        data
      });
    },
    // 删除权限
    delAdmin({ commit, state }, data) {
      return request({
        url: `/resource/${data.code}`,
        method: "delete"
      });
    },
    // 获取角色列表
    getRoleList({ commit, state }, data) {
      return request({
        url: "/role/queryPage",
        method: "post",
        data
      });
    },
    // 新增角色
    addRole({ commit, state }, data) {
      return request({
        url: "/role/addRole",
        method: "post",
        data
      });
    },
    // 编辑角色
    editRole({ commit, state }, data) {
      return request({
        url: `/role/modifyRole`,
        method: "put",
        data
      });
    },
    // 删除角色
    delRole({ commit, state }, data) {
      return request({
        url: `/role/${data.code}`,
        method: "delete"
      });
    },
    // 获取角色详情
    getRoleDetail({ commit, state }, data) {
      return request({
        url: "/role/getByCode",
        method: "post",
        data
      });
    },
    // 获取已授权用户列表
    getAuthUserList({ commit, state }, params) {
      return request({
        url: `/role/${params.code}`,
        method: "get"
      });
    },
    // 添加授权用户
    addAuthUser({ commit, state }, data) {
      return request({
        url: "/role/addUsers",
        method: "post",
        data
      });
    },
    // 取消授权用户
    cancelAuthUser({ commit, state }, data) {
      return request({
        url: "/role/removeUser",
        method: "post",
        data
      });
    },
    // 获取已授权规则
    getRuleList({ commit, state }, params) {
      return request({
        url: `/role/permissionList/${params.code}`,
        method: "get"
      });
    },
    // 添加授权规则
    addRule({ commit, state }, data) {
      return request({
        url: "/role/addPermissions",
        method: "post",
        data
      });
    },
    // 取消授权规则
    cancelRule({ commit, state }, data) {
      return request({
        url: "/role/revokeResource",
        method: "post",
        data
      });
    },
    // 根据权限获取对应权限的所有操作
    getPremActions({ commit, state }, params) {
      return request({
        url: `/resource/${params.id}`
      });
    },
    // 弹窗中用户列表/子账号列表
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
