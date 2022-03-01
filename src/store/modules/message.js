import request from '@/utils/request';

const message = {
  namespaced: true,
  state: {},

  mutations: {},
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: '/imMessageRecord',
        method: 'get',
        params,
      });
    },
    // 全部已读接口
    readAll({ commit, state }, params) {
      return request({
        url: '/imMessageRecord/updateAll',
        method: 'get',
        params,
      });
    },
    // 修改详细状态为已读
    changeList({ commit, state }, data) {
      return request({
        url: `/imMessageRecord/update/${data.id}`,
        method: 'patch',
        data,
      });
    },
  //  删除接口 批量删除
    delList({ commit, state }, data) {
      return request({
        url: `/imMessageRecord/${data.id}`,
        method: 'delete',
      });
    },


    getOne({ commit, state }, params) {
      // console.log(params,'params');
      return request({
        url: `/imMessageRecord/${params.id}`,
        method: 'get',
      });
    },
    // 获取详情
    getDisCountDetail({ commit, state }, data) {
      return request({
        url: `/imMessageRecord/${data.id}`,
        method: 'get',
      });
    },
    // 添加消息接口
    addMessage({ commit, state }, data) {
      return request({
        url: `/imMessageRecord/onSite`,
        method: 'post',
        data,
      });
    },
  },
};

export default message;
