<template>
  <div class="details-container"
       v-if="data">
    <h1 class="details-title">交易信息</h1>
    <div class="details-info">
      <div>
        <span class="details-type">充值ID：</span><span class="details-value">{{ data.id }}</span>
      </div>
      <div>
        <span class="details-type">充值方式：</span><span class="details-value">{{ data.memo }}</span>
      </div>
      <div>
        <span class="details-type">充值金额：</span><span class="details-value">{{ data.amount }}</span>
      </div>
      <div>
        <span class="details-type">充值时间：</span><span class="details-value">{{ data.createTime }}</span>
      </div>
      <div>
        <span class="details-type">充值状态：</span><span class="details-value">{{ detailsMapData[data.status] }}</span>
      </div>
      <div>
        <span class="details-type">充值渠道：</span><span class="details-value">{{ data.channelCode }}</span>
      </div>
      <div>
        <span class="details-type">操作人：</span><span class="details-value">{{ data.createUserName }}</span>
      </div>
    </div>
    <div class="placeholder"></div>
    <h1 class="details-title">会员信息</h1>
    <div class="details-info">
      <div>
        <span class="details-type">会员ID：</span><span class="details-value">{{ data.customerCode }}</span>
      </div>
      <div>
        <span class="details-type">会员姓名：</span><span class="details-value">{{ data.realName }}</span>
      </div>
      <div>
        <span class="details-type">手机号码：</span><span class="details-value">{{ data.phoneNumber }}</span>
      </div>
      <div>
        <span class="details-type">邮箱：</span><span class="details-value">{{ data.email }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { detailsMapData } from "@/utils/enum.js";
export default {
  data () {
    return {
      data: null,
      detailsMapData,
    };
  },
  created () {
    this.getList();
  },
  activated () {
    this.getList();
  },
  methods: {
    getList () {
      this.$store
        .dispatch("rechargeRecord/getOne", this.$route.query.id)
        .then((res) => {
          console.log(res);
          this.data = res.data.list[0];
        });
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
