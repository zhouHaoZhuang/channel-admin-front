import request from "@/utils/request";

const channel = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取权限列表
    getAdminList({ commit, state }, data) {
      return request({
        url: "/permission/queryPage",
        method: "post",
        data
      });
    },
    // 新增权限
    addAdmin({ commit, state }, data) {
      return request({
        url: "/permission/addPermission",
        method: "post",
        data
      });
    },
    // 编辑权限
    editAdmin({ commit, state }, data) {
      return request({
        url: `/permission/modifyPermission`,
        method: "put",
        data
      });
    },
    // 删除权限
    delAdmin({ commit, state }, data) {
      return request({
        url: `/permission/${data.code}`,
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
    }
  }
};

export default channel;
