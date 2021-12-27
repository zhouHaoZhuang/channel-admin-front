<template>
  <div class="details-container">
    <h1 class="details-title">财务信息</h1>
    <div class="details-info">
      <div>
        <span class="details-type">发生金额：</span><span class="details-value">{{ data.dealAmount.toFixed(2) }}</span>
      </div>
      <div>
        <span class="details-type">当前金额：</span><span class="details-value">{{ data.afterAmount.toFixed(2) }}</span>
      </div>
      <div>
        <span class="details-type">时间：</span><span class="details-value">{{ data.createTime | formatDate }}</span>
      </div>
      <div>
        <span class="details-type">会员ID：</span><span class="details-value">{{ data.customerCode }}</span>
      </div>
      <div>
        <span class="details-type">类型：</span><span class="details-value">{{ data.memo }}</span>
      </div>
      <div>
        <span class="details-type">具体详情：</span><span class="details-value">{{ data.actualAmount }}----</span>
      </div>
      <div>
        <span class="details-type">款项描述：</span><span class="details-value">{{ data.actualAmount }}----</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: null,
    };
  },
  created () {
    let id = this.$route.query.id;
    this.getList(id);
  },
  methods: {
    getList (id) {
      // this.$store.dispatch('financialDetails/getOne', id).then(res => {
      //   console.log(res);
      //   this.data = res.data
      // })
      this.data = this.$store.state.financialDetails.detailedinfo;
      // console.log(this.data, 'this.data');
    },
  },
};
</script>

<style lang="less" scoped>
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
