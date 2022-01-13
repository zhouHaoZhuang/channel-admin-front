<template>
  <div class="orderList">
    <div class="orderTop">
      <a-space>
        <a-select
          style="width:150px"
          placeholder="请选择"
          v-model="listQuery.key"
        >
          <a-select-option
            :value="v.key"
            v-for="v in useColumns"
            :key="v.title"
          >
            {{ v.title }}
          </a-select-option>
        </a-select>
        <div class="sechkey">
          <a-input placeholder="搜索关键词" v-model="listQuery.search" />
        </div>
        <div>
          <a-range-picker
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            @change="datePickerOnOk"
          />
        </div>
        <a-button type="primary" @click="handleSearch">
          查询
        </a-button>
      </a-space>
    </div>
    <div class="orderTable">
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          :loading="tableLoading"
          rowKey="id"
          :pagination="paginationProps"
          :scroll="{ x: 1400 }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div v-if="text" slot="originAmount" slot-scope="text">
            {{ text.toFixed(2) }}
          </div>
          <div v-if="text" slot="actualAmount" slot-scope="text">
            {{ text.toFixed(2) }}
          </div>
          <div slot="tradeType" slot-scope="text">
            <span>{{ OrderTypeMap[text] }}</span>
          </div>
          <div slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
          <div slot="payTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
          <div
            :class="{ green: text === 1, blue: text !== 1 }"
            slot="tradeStatus"
            slot-scope="text"
          >
            {{ orderStatusEnum[text] }}
          </div>
          <div slot="action" slot-scope="text, record">
            <a-button type="link" @click="handleSelectDetail(record)">
              查看
            </a-button>
          </div>
          <div slot-scope="text" slot="cashPay" v-if="text != undefined">
            {{ text.toFixed(2) }}
          </div>
          <div slot-scope="text" slot="actualPrice" v-if="text != undefined" >
            {{ text.toFixed(2) }}
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { orderStatusEnum, OrderTypeMap } from "@/utils/enum.js";
export default {
  data() {
    return {
      orderStatusEnum,
      OrderTypeMap,
      listQuery: {
        key: undefined,
        search: "",
        startTime: "",
        endTime: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      columns: [
        {
          title: "订单编号",
          dataIndex: "orderNo",
          width: 170
        },
        {
          title: "会员ID",
          dataIndex: "corporationCode",
          width: 150
        },
        {
          title: "订单类型",
          dataIndex: "tradeType",
          scopedSlots: { customRender: "tradeType" },
          width: 100
        },
        {
          title: "原价",
          dataIndex: "originAmount",
          scopedSlots: { customRender: "originAmount" },
          width: 100
        },
        {
          title: "价格",
          dataIndex: "actualAmount",
          scopedSlots: { customRender: "actualAmount" },
          width: 100
        },
        {
          title: "状态",
          dataIndex: "tradeStatus",
          width: 100,
          scopedSlots: { customRender: "tradeStatus" }
        },
        {
          title: "现金支付",
          dataIndex: "cashPay",
          scopedSlots: { customRender: "cashPay" }
        },
        {
          title: "现金券支付",
          dataIndex: "actualPrice",
          scopedSlots: { customRender: "actualPrice" }
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          width: 190,
          scopedSlots: { customRender: "createTime" },
          sorter: true,
          sortDirections: ["ascend", "descend"]
        },
        {
          title: "支付时间",
          dataIndex: "payTime",
          width: 250,
          scopedSlots: { customRender: "payTime" }
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      }
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
        },
        {
          title: "会员ID",
          dataIndex: "corporationCode",
          key: "corporationCode",
          width: 150
        }
      ];
    }
  },
  methods: {
    //查询表格数据
    getList() {
      this.tableLoading = true;
      this.$getList("financialOrder/getList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 搜索
    handleSearch() {
      this.getList();
    },
    // 日期选择
    datePickerOnOk(value) {
      console.log(value);
      if (value.length !== 0) {
        this.listQuery.startTime = moment(value[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.listQuery.endTime = moment(value[1]).format("YYYY-MM-DD HH:mm:ss");
      } else {
        this.listQuery.startTime = "";
        this.listQuery.endTime = "";
      }
    },
    // 禁用日期--禁用当天之后+当天前一个月所有
    disabledDate(current) {
      return current > moment() || current < moment().subtract(1, "month");
    },
    // 表格分页快速跳转n页
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 查看详情
    handleSelectDetail(record) {
      this.$router.push({
        path: "/finance/index/orderInfo",
        query: {
          id: record.orderNo
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.orderList {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .orderTop {
    display: flex;
    margin-bottom: 25px;
    .sechkey {
      width: 200px;
      margin-right: 20px;
    }
    [type="button"] {
      margin-left: 20px;
    }
    .zhi {
      margin: 10px;
    }
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
