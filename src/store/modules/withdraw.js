import request from "@/utils/request";

const withdraw = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //------------------------向南天门申请
    // 查询提现申请记录
    getRecordList({ commit, state }, params) {
      return request({
        url: "/pcChannelWithdraw",
        method: "get",
        params
      });
    },
    // 新增申请
    addRecord({ commit, state }, data) {
      return request({
        url: "/pcChannelWithdraw",
        method: "post",
        data
      });
    },
    // 编辑申请
    editRecord({ commit, state }, data) {
      return request({
        url: `/pcChannelWithdraw/patchUserWithdraw/${data.id}`,
        method: "patch",
        data
      });
    },
    // 删除提现申请
    delRecord({ commit, state }, id) {
      return request({
        url: `/pcChannelWithdraw/${id}`,
        method: "delete"
      });
    },
    //获取提现申请详情
    getRecordDetail({ commit, state }, id) {
      return request({
        url: `/pcChannelWithdraw/${id}`,
        method: "get"
      });
    },
    //-------------------------------审核控制台的提现申请
     // 查询提现申请记录
     getApplyList({ commit, state }, params) {
      return request({
        url: "/pcWithdrawRecord",
        method: "get",
        params
      });
    },
    // 新增申请
    addApply({ commit, state }, data) {
      return request({
        url: "/pcWithdrawRecord",
        method: "post",
        data
      });
    },
    // 编辑申请
    editApply({ commit, state }, data) {
      return request({
        url: `/pcWithdrawRecord/patchUserWithdraw/${data.id}`,
        method: "patch",
        data
      });
    },
    // 删除提现申请
    delApply({ commit, state }, id) {
      return request({
        url: `/pcWithdrawRecord/${id}`,
        method: "delete"
      });
    },
    //获取提现申请详情
    getApplyDetail({ commit, state }, id) {
      return request({
        url: `/pcWithdrawRecord/${id}`,
        method: "get"
      });
    },
    //接收申请
    receiveApply({ commit, state }, id) {
      return request({
        url: `/pcWithdrawRecord/receive/${id}`,
        method: "get"
      });
    },
    //审批流程（驳回传3）
    approval({ commit, state }, data) {
      return request({
        url: `/pcWithdrawRecord/approval/${data.id}`,
        method: "patch",
        data
      });
    },
   //根据当前的订单号重新进行余额支付
   receiveOrderNo({ commit, state }, orderNo) {
    return request({
      url: `/idcPay/payAgainByOrderNo/${orderNo}`,
      method: "get"
    });
  },
  //查询余额
  getBalance({ commit, state }) {
    return request({
      url: `/pcChannelWithdraw/getBalance`,
      method: "get"
    });
  },

  }
};

export default withdraw;
