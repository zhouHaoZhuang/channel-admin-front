<template>
  <div class="orderInfo">
    <!-- 订单信息 -->
    <div class="channel">
      <p>订单信息</p>
      <ul>
        <li>
          <span>退单编号:</span>
          <span>{{ orderInfo.orderNo }}</span>
        </li>
        <li>
          <span>订单编号:</span>
          <span>{{ orderInfo.orderNo }}</span>
        </li>
        <li>
          <span>订单类型:</span>
          <span>{{ orderTypeMap[orderInfo.tradeType] }} </span>
        </li>
        <li>
          <span>创建时间:</span>
          <span>{{ orderInfo.createTime | formatDate }}</span>
        </li>
        <li>
          <span>退款原因:</span>
          <span>{{ orderInfo.remark }}</span>
        </li>
      </ul>
    </div>
    <!-- 退款信息 -->
    <div class="channel">
      <p>退款信息</p>
      <ul>
        <li>
          <span>退款金额:</span>
          <span>{{ orderInfo.actualAmount }}</span>
        </li>
        <li>
          <span>退款状态:</span>
          <span>{{ orderStatusEnum[orderInfo.tradeStatus] }}</span>
        </li>
      </ul>
    </div>
    <!-- 产品信息 -->
    <div class="channel">
      <p>产品信息</p>
      <div class="config">
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="corporationCode"
          :pagination="false"
        >
          <div slot="chargingType" slot-scope="text">
            {{ charingStatus[text] }}
          </div>
          <div slot="ecsPrice" slot-scope="text, record">
            <div v-if="record.chargingType == 'AfterPay'">
              {{ record.productName }}功能开通：按流量计费
            </div>
            <div v-if="record.chargingType == 'BeforePay'">
              <div>CPU：{{ text.cpu }}</div>
              <div>内存：{{ text.memory }}</div>
              <!-- <div>磁盘：{{ diskLength }}</div> -->
              <div>系统盘:{{ systemDiskSize }}G</div>
              <div>数据盘:{{ dataDiskSize }}G</div>
              <div>带宽：{{ text.internetMaxBandwidthOut }}</div>
              <div>防御：{{ "20G" }}</div>
              <div>镜像：{{ text.imageId }}</div>
              <div>所在区：{{ regionDataEnum[text.regionId] }}</div>
            </div>
          </div>
          <span slot="chargeModel">包年包月</span>
        </a-table>
      </div>
    </div>

    <!-- 客户信息 -->
    <div class="channel">
      <p>客户信息</p>
      <ul>
        <li>
          <span>客户ID:</span>
          <span>{{ data[0].corporationCode }} </span>
        </li>
        <li>
          <span>客户名称:</span>
          <span>{{ data[0].corporationName }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  orderStatusEnum,
  orderTypeMap,
  regionDataEnum,
  orderStatus,
  charingStatus
} from "@/utils/enum.js";
export default {
  data() {
    return {
      orderInfo: null,
      data: [],
      diskLength: 0,
      orderStatusEnum,
      charingStatus,
      orderStatus,
      orderTypeMap,
      regionDataEnum,
      systemDiskSize: 0,
      dataDiskSize: 0,
      columns: [
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName",
          width: 100
        },
        {
          title: "具体配置",
          dataIndex: "ecsPrice",
          key: "ecsPrice",
          scopedSlots: { customRender: "ecsPrice" }
        },
        {
          title: "计费方式",
          dataIndex: "chargingType",
          key: "chargingType",
          scopedSlots: { customRender: "chargingType" }
        },
        {
          title: "订单金额",
          dataIndex: "actualAmount",
          key: "actualAmount"
        },
        {
          title: "退款金额",
          dataIndex: "actualAmount",
          key: "actualAmount1"
        }
      ]
    };
  },
  activated() {
    this.dataDiskSize = 0;
    this.systemDiskSize = 0;
    let id = this.$route.query.id;
    this.$store.dispatch("purchaseOrder/getProOne", id).then(res => {
      if (res.data.ecsPrice) {
        let dataDisk = res.data.ecsPrice.dataDisk;
        this.systemDiskSize = res.data.ecsPrice.systemDisk.size;
        dataDisk.forEach(element => {
          this.dataDiskSize += element.size;
        });
      }
      this.orderInfo = res.data;
      this.data = [res.data];
    });
  }
};
</script>

<style lang="less" scoped>
.orderInfo {
  // background-color: #fff;
  margin: 0 24px;
  // padding: 16px;
  .channel {
    margin-bottom: 20px;
    background-color: #fff;
    > p {
      font-size: 16px;
      padding: 16px;
      padding-left: 30px;
      font-weight: 650;
      margin: 0;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding-left: 10px;
      > li {
        list-style: none;
        width: 32%;
        > span:nth-child(1) {
          display: inline-block;
          width: 80px;
          text-align: right;
          padding-right: 8px;
          font-size: 14px;
          font-weight: 400;
          line-height: 65px;
          color: rgba(0, 0, 0, 0.847);
        }
      }
    }
    .allocation {
      display: inline-block;
      width: 80px;
      text-align: right;
      margin-right: 5px;
      line-height: 65px;
    }
    .config {
      > div {
        > span:nth-child(1) {
          display: inline-block;
          width: 80px;
          text-align: right;
          margin-right: 5px;
          line-height: 65px;
        }
      }
    }
    .green {
      background-color: rgb(115, 209, 61);
      color: rgb(255, 255, 255);
      display: inline-block;
      font-size: 12px;
      width: 52px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
    .blue {
      display: inline-block;

      background-color: rgb(64, 169, 255);
      color: rgb(255, 255, 255);
      font-size: 12px;
      width: 52px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
  }
}
</style>
