<template>
  <div class="details-container">
    <h1 class="details-title">交易信息</h1>
    <div class="details-info">
      <div><span class="details-type">充值ID：</span><span class="details-value">c00001</span></div>
      <div><span class="details-type">充值方式：</span><span class="details-value">线上充值</span></div>
      <div><span class="details-type">充值金额：</span><span class="details-value">交易号</span></div>
      <div><span class="details-type">充值时间：</span><span class="details-value">2021-12-17</span></div>
      <div><span class="details-type">充值状态：</span><span class="details-value">充值成功</span></div>
      <div><span class="details-type">充值渠道：</span><span class="details-value">微信</span></div>
      <div><span class="details-type">操作人：</span><span class="details-value">用户</span></div>
    </div>
    <div class="placeholder">

    </div>
    <h1 class="details-title">会员信息</h1>
    <div class="details-info">
      <div><span class="details-type">会员ID：</span><span class="details-value">c00001</span></div>
      <div><span class="details-type">会员姓名：</span><span class="details-value">线上充值</span></div>
      <div><span class="details-type">手机号码：</span><span class="details-value">交易号</span></div>
      <div><span class="details-type">邮箱：</span><span class="details-value">2021-12-17</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: null
    }
  },
  created () {
    let id = this.$route.query.id
    // this.getList(id)
  },
  methods: {
    getList (id) {
      this.$store.dispatch('financialDetails/getOne', id).then(res => {
        console.log(res);
        this.data = res.data
      })
      console.log(id);
    }
  },
}
</script>

<style lang='less' scoped>
.details-container {
  margin: 10px 20px;
  background-color: #fff;
  padding-bottom: 20px;
  .details-title {
    border-bottom: 1px solid #ebebeb;
    padding-left: 32px;
    height: 48px;
    line-height: 48px;
    margin-bottom: 10px;
    text-indent: 0;
    font-size: 14px;
    background-color: #fff;
    color: #292929;
  }
  .placeholder {
    height: 20px;
    background-color: #f0f2f5;
  }
  .details-info {
    display: flex;
    margin-left: 32px;
    width: 100%;
    flex-wrap: wrap;
    div {
      width: 32%;
      height: 32px;
    }
    .details-type {
      display: inline-block;
      line-height: 24px;
      width: 100px;
      text-align: left;
      color: #a3a3a3;
      font-weight: normal;
      font-size: 12px;
      padding: 4px 0;
    }
    .details-value {
      display: inline-block;
      line-height: 24px;
      width: 180px;
      text-align: left;
      color: #292929;
      font-weight: normal;
      font-size: 12px;
      padding: 4px 0;
    }
  }
}
</style>