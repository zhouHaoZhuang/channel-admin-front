<template>
  <div class="orderList">
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-select
            style="width:150px"
            :placeholder="title"
            v-model="title"
            @change="changeKey"
          >
            <a-select-option
              :value="v.key"
              v-for="v in useColumns"
              :key="v.title"
            >
              {{ v.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            :disabled="!isTime"
            placeholder="搜索关键词"
            allow-clear
            v-model="listQuery.search"
          />
        </a-form-model-item>

        <a-form-model-item>
          <a-select
            style="width: 120px"
            defaultValue="0"
            placeholder=" 订单类型"
            allowClear
            v-model="listQuery['qp-tradeType-eq']"
          >
            <a-select-option
              :value="index"
              v-for="(item, index) in orderTypeMap"
              :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            style="width: 130px"
            defaultValue="0"
            placeholder=" 订单状态"
            allowClear
            v-model="listQuery['qp-tradeStatus-eq']"
          >
            <a-select-option
              :value="index"
              v-for="(item, index) in orderStatus"
              :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            style="width: 130px"
            defaultValue="0"
            placeholder=" 计费方式"
            allowClear
            v-model="listQuery['qp-chargingType-eq']"
          >
            <a-select-option
              :value="index"
              v-for="(item, index) in charingStatus"
              :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            v-model="startValue"
            :disabled-date="disabledStartDate"
            show-time
            format="YYYY-MM-DD 00:00:00"
            placeholder="开始时间"
            @change="changeStart"
            @openChange="handleStartOpenChange"
          />
          <span class="zhi">至</span>
          <a-date-picker
            v-model="endValue"
            :disabled-date="disabledEndDate"
            show-time
            format="YYYY-MM-DD 00:00:00"
            placeholder="结束时间"
            @change="changeEnd"
            @openChange="handleEndOpenChange"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="secectClick">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="public-table-wrap">
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
        :scroll="{ x: 1400 }"
        :loading="loading"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <div slot="originAmount" slot-scope="text">
          {{ text.toFixed(2) }}
        </div>
        <div slot="customerName" slot-scope="text, record">
          {{ record.customerName }}
          <br />
          {{ record.customerCode }}
        </div>
        <div slot="corporationCode" slot-scope="text, record">
          {{ record.corporationName }}
          <br />
          <span style="color:#ccc;">{{ record.corporationCode }}</span>
        </div>
        <div slot="chargingType" slot-scope="text">
          {{ charingStatus[text] }}
        </div>
        <div slot="actualAmount" slot-scope="text">
          {{ text.toFixed(2) }}
        </div>
        <div slot="tradeType" slot-scope="text">
          <span>{{ orderTypeMap[text] }}</span>
        </div>
        <div slot="action" slot-scope="text">
          <a-button type="link" @click="selectPool(text)">
            查看
          </a-button>
          <a-divider type="vertical" />
          <a-button
            type="link"
            @click="toPayment(text)"
            :disabled="
              text.chargingType !== 'AfterPay' && text.tradeStatus != 0
            "
          >
            继续支付
            <!-- 计费模式是预付费，同时订单状态为支付失败，可操作 -->
          </a-button>
        </div>
        <div slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="payTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="tradeStatus" slot-scope="text">
          {{ orderStatus[text] }}
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import {
  feeReduction,
  orderStatus,
  charingStatus,
  orderTypeMap
} from "@/utils/enum.js";
export default {
  data() {
    return {
      title: "orderNo",
      feeReduction,
      orderStatus,
      charingStatus,
      orderTypeMap,
      // search: "",
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "订单编号",
          dataIndex: "orderNo",
          key: "orderNo",
          width: 170
        },
        {
          title: "订单类型",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" },
          width: 150
        },
        {
          title: "所属终端客户",
          dataIndex: "corporationCode",
          key: "corporationCode",
          width: 180,
          scopedSlots: { customRender: "corporationCode" }
        },

        {
          title: "原价",
          dataIndex: "originAmount",
          key: "originAmount",
          scopedSlots: { customRender: "originAmount" },
          width: 100
        },
        {
          title: "成交价",
          dataIndex: "actualAmount",
          key: "actualAmount",
          scopedSlots: { customRender: "actualAmount" },
          width: 100
        },
        {
          title: "折扣率",
          dataIndex: "discountRate",
          key: "discountRate",
          scopedSlots: { customRender: "discountRate" },
          width: 100
        },
        {
          title: "状态",
          dataIndex: "tradeStatus",
          key: "tradeStatus",
          width: 130,
          scopedSlots: { customRender: "tradeStatus" }
        },
        {
          title: "计费方式",
          dataIndex: "chargingType",
          key: "chargingType",
          width: 100,
          scopedSlots: { customRender: "chargingType" }
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          width: 190,
          scopedSlots: { customRender: "createTime" }
        },

        {
          title: "支付时间",
          dataIndex: "payTime",
          key: "payTime",
          width: 250,
          scopedSlots: { customRender: "payTime" }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      dataAll: [],
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )}  页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange
      },
      num: "",
      startValue: null,
      endValue: null,
      endOpen: false,
      isTime: true,
      loading: false
    };
  },
  activated() {
    this.getList();
  },

  computed: {
    useColumns() {
      return [
        {
          title: "订单编号",
          dataIndex: "orderNo",
          key: "orderNo",
          width: 170
        }
        // {
        //   title: "终端客户名称",
        //   dataIndex: "corporationName",
        //   key: "corporationName",
        //   width: 150
        // },
        //  {
        //   title: "终端客户ID",
        //   dataIndex: "corporationCode",
        //   key: "corporationCode",
        //   width: 150
        // },
      ];
    }
  },
  methods: {
    getList() {
      this.loading = true;
      this.$store
        .dispatch("purchaseOrder/getProList", this.listQuery)
        .then(res => {
          this.paginationProps.total = res.data.totalCount * 1;
          this.data = res.data.list;
          this.loading = false;
        });
    },
    changeStart(date, dateString) {
      this.listQuery["qp-createTime-ge"] = dateString;
    },
    changeEnd(date, dateString) {
      this.listQuery["qp-createTime-le"] = dateString;
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    changepage(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    selectPool(v, i) {
      this.$router.push({
        path: "/purchase/order/detail",
        query: {
          id: v.id
        }
      });
    },
    secectClick() {
      this.listQuery.key = this.title;
      if (this.title == "createTime") {
        this.getList();
      } else {
        // this.$getListQp(this.title, this.search, this.startValue, this.endValue);
        // let tempSearch = this.listQuery.search;
        if (this.title == "payStatus") {
          if (this.listQuery.search == "支付") {
            this.listQuery.search = 1;
          }
          if (this.listQuery.search == "未支付") {
            this.listQuery.search = 0;
          }
        }
        this.$getListQp("purchaseOrder/getProList", this.listQuery).then(
          val => {
            // console.log(val, "时间请求结果");
            this.paginationProps.total = val.data.totalCount * 1;
            this.data = val.data.list;
          }
        );
      }
    },
    changeKey(val) {
      // console.log(val);
      this.title = val;
      if (this.title !== "createTime") {
        this.isTime = true;
      } else {
        this.isTime = false;
      }
    },
    //继续支付
    toPayment(val) {
      this.$confirm({
        title: "继续支付，将扣除余额内对应订单金额，是否继续？",
        onOk: () => {
          this.$store
            .dispatch("withdraw/receiveOrderNo", val.orderNo)
            .then(res => {
              this.$message.success("操作成功");
              this.getList();
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.orderList {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  .zhi {
    margin: 10px;
  }
  .orderTable {
    .green {
      background-color: rgb(115, 209, 61);
      color: rgb(255, 255, 255);
      font-size: 12px;
      width: 52px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
    .blue {
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
