<template>
  <div class="details-container">
    <h1 class="details-title">财务信息</h1>
    <div class="details-info">
      <div><span class="details-type">发生金额：</span><span class="details-value">100.00</span></div>
      <div><span class="details-type">当前金额：</span><span class="details-value">100.00</span></div>
      <div><span class="details-type">时间：</span><span class="details-value">2021.12.12</span></div>
      <div><span class="details-type">会员ID：</span><span class="details-value">1100023</span></div>
      <div><span class="details-type">类型：</span><span class="details-value">赠送</span></div>
      <div><span class="details-type">具体详情：</span><span class="details-value">具体时间</span></div>
      <div><span class="details-type">款项描述：</span><span class="details-value">10.00</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

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
      width: 100px;
      text-align: left;
      color: #292929;
      font-weight: normal;
      font-size: 12px;
      padding: 4px 0;
    }
  }
}
</style>