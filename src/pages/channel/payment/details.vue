<template>
  <div class="details-container">
    <h1 class="details-title">财务信息</h1>
    <div class="details-info" v-if="data">
      <div>
        <span class="details-type">入款会员:</span
        ><span class="details-value">{{ data.dealAmount }}</span>
      </div>
      <div>
        <span class="details-type">管理员:</span
        ><span class="details-value" v-if="data.afterAmount">{{
          data.afterAmount.toFixed(2)
        }}</span>
      </div>
      <div>
        <span class="details-type">申请时间:</span
        ><span class="details-value" v-if="data.afterAmount">{{
          data.afterAmount.toFixed(2)
        }}</span>
      </div>
      <div>
        <span class="details-type">处理状态:</span
        ><span class="details-value" v-if="data.afterAmount">{{
          data.afterAmount.toFixed(2)
        }}</span>
      </div>
      <div>
        <span class="details-type">操作金额:</span
        ><span class="details-value" v-if="data.afterAmount">{{
          data.afterAmount.toFixed(2)
        }}</span>
      </div>
      <div>
        <span class="details-type">款项类型:</span
        ><span class="details-value" v-if="data.afterAmount">{{
          data.afterAmount.toFixed(2)
        }}</span>
      </div>
      <div>
        <span class="details-type">备注信息:</span
        ><span class="details-value">{{ data.createTime | formatDate }}</span>
      </div>
      <div>
        <span class="details-type">入款凭证:</span
        ><span class="details-value">{{ data.actualAmount }}----</span>
      </div>
    </div>
    <h1 class="details-title">审核过程</h1>
    <a-table :columns="columns" rowKey="ID" :scroll="{ x: 1000 }">
      <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
    </a-table>
    <h1 class="details-title">备注</h1>
    <a-textarea placeholder="" :rows="4" />
    <div class="btn">
      <a-button type="primary" class="btn1">
        备注
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          title: "步骤",
          dataIndex: "productName",
          key: "productName"
        },
        {
          title: "审核节点",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" }
        },
        {
          title: "审核状态",
          key: "productConfig",
          scopedSlots: { customRender: "productConfig" }
        },
        {
          title: "审核人",
          dataIndex: "quantity",
          key: "quantity"
        },
        {
          title: "审核意见",
          dataIndex: "chargeModel",
          key: "chargeModel"
        }
      ]
    };
  },
  created() {
    let id = this.$route.query.id;
    this.getList(id);
  },
  methods: {
    getList(id) {
      this.$store.dispatch("financialDetails/getOne", id).then(res => {
        console.log(res);
        this.data = res.data;
      });
      console.log(id);
    }
  }
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
    // font-size: 14px;
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
  .ant-input {
    margin-left: 30px;
    width: 450px;
    height: 130px;
  }
  .btn {
    margin-top: 20px;
    .btn1 {
      margin-left: 30px;
    }
  }
}
</style>
