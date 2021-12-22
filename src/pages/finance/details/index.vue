<template>
  <div class="Content">
    <div class="orderTop">
      <a-space>
        <a-select style="width:150px"
                  v-model="title"
                  @change="changeKey">
          <a-select-option :value="v.dataIndex"
                           v-for="v in useColumns"
                           :key="v.title">
            {{ v.title }}
          </a-select-option>
        </a-select>
        <div class="sechkey">
          <a-input :disabled="!isTime"
                   placeholder="搜索关键词"
                   v-model="listQuery.search" />
        </div>
        <div>
          <a-date-picker v-model="startValue"
                         :disabled-date="disabledStartDate"
                         show-time
                         format="YYYY-MM-DD HH:mm:ss"
                         placeholder="开始时间"
                         :disabled="isTime"
                         @openChange="handleStartOpenChange" />
          <span class="zhi">至</span>
          <a-date-picker v-model="endValue"
                         :disabled="isTime"
                         :disabled-date="disabledEndDate"
                         show-time
                         format="YYYY-MM-DD HH:mm:ss"
                         placeholder="结束时间"
                         @openChange="handleEndOpenChange" />
        </div>
        <a-select style="width:150px"
                  v-model="title"
                  @change="changeKey">
          <a-select-option :value="v.dataIndex"
                           v-for="v in useMoneyColumns"
                           :key="v.title">
            {{ v.title }}
          </a-select-option>
        </a-select>
        <a-button type="primary"
                  @click="secectClick">
          查询
        </a-button>
        <a-button>
          <a-icon type="setting" />
          自定义列表
        </a-button>
        <a-button>
          <a-icon type="export" />
          导出
        </a-button>
      </a-space>
    </div>
    <!-- 表格 -->
    <div class="orderTable">
      <div>
        <a-table :columns="columns"
                 :data-source="data"
                 rowKey="id"
                 @change="handleChange"
                 :pagination="paginationProps"
                 :scroll="{ x: 1400 }">
          <a slot="name"
             slot-scope="text">{{ text }}</a>
          <div slot="originAmount"
               slot-scope="v">
            {{ v.toFixed(2) }}
          </div>
          <div slot="action"
               slot-scope="v">
            <a-button type="link"
                      @click="selectPool(v)">
              查看
            </a-button>
          </div>
          <div slot="payTime"
               slot-scope="v">
            {{ v | formatDate }}
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isfilter: false,
      title: '1',
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "编号ID",
          dataIndex: "orderNo",
          key: "orderNo",
          sorter: true,
          sortDirections: ["ascend", "descend"],
        },
        {
          title: "会员ID",
          dataIndex: "vipID",
          key: "",
        },
        {
          title: "发生金额",
          dataIndex: "dealAmount",
        },
        {
          title: "当时余额",
          dataIndex: "afterAmount",
          scopedSlots: { customRender: "tradeType" },
        },
        {
          title: "款项类型",
          dataIndex: "memo",
          scopedSlots: { customRender: "memo" },
        },
        {
          title: "交易描述",
          dataIndex: "actualAmount",
          key: "actualAmount",
          scopedSlots: { customRender: "actualAmount" },
        },
        {
          title: "发生时间",
          dataIndex: "createTime",
          key: "createTime",
          scopedSlots: { customRender: "createTime" }
        },
        {
          title: "订单ID",
          key: "selects",
          scopedSlots: { customRender: "select" }
        },
        {
          title: "操作管理员",
          dataIndex: "modifyUserName",
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
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
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      num: "",
      startValue: null,
      endValue: null,
      endOpen: false,
      isTime: true
    };
  },
  computed: {
    useColumns () {
      return [
        {
          title: "全部",
          dataIndex: "1",
        },
        {
          title: "账号ID",
          dataIndex: "orderNo",
        },
        {
          title: "会员ID",
          dataIndex: "vipID",
        },
        {
          title: "业务ID",
          dataIndex: "payStatus",
        },
        {
          title: "推广人ID",
          dataIndex: "createTime",
        },
        {
          title: "交易描述",
          dataIndex: "mo",
        }
      ];
    },
    useMoneyColumns () {
      return [
        {
          title: "款项类型",
          dataIndex: "1",
        },
        {
          title: "消费",
          dataIndex: "xiaofei",
        },
        {
          title: "充值",
          dataIndex: "chongzhi",
        },
        {
          title: "提现",
          dataIndex: "tixxian",
        },
        {
          title: "退款",
          dataIndex: "tuikuan",
        },
        {
          title: "交易",
          dataIndex: "jiaoyi",
        },
        {
          title: "手续费",
          dataIndex: "shouxv",
        },
        {
          title: "佣金",
          dataIndex: "yongjin",
        }
      ];
    }
  },
  created () {
    this.getList();
  },
  methods: {
    // 点击排序之后的回调
    handleChange (pagination, filters, sorter) {
      if (sorter && sorter.order) {
        this.listQuery.key = sorter.columnKey;
        // this.listQuery.sorter = sorter.order.replace('end', '') + `-${sorter.columnKey}`;
        // this.getList();
        console.log("排序被点击了", sorter.columnKey, sorter.order);
      }
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open;
    },
    secectClick () {
      this.listQuery.key = this.title;
      if (this.title == "createTime") {
        let startTime = this.startValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        let endTime = this.endValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        // console.log(this.title, this.search, startTime, endTime);
        this.$store
          .dispatch("financialOrder/selectList", {
            startTime,
            endTime
          })
          .then(val => {
            // console.log(val, "时间请求结果");
            this.paginationProps.total = val.data.totalCount * 1;
            this.paginationProps.current = val.data.currentPage * 1;
            this.dataAll = val.data.list;
            this.data = this.dataAll.slice(0, this.paginationProps.pageSize);
          });
      } else {
        // this.$getList(this.title, this.search, this.startValue, this.endValue);
        let tempSearch = this.listQuery.search;
        if (this.title == "tradeType") {
          if (this.listQuery.search == "销售") {
            this.listQuery.search = 5;
          }
          if (this.listQuery.search == "采购") {
            this.listQuery.search = 1;
          }
        }
        if (this.title == "payStatus") {
          if (this.listQuery.search == "支付") {
            this.listQuery.search = 1;
          }
          if (this.listQuery.search == "未支付") {
            this.listQuery.search = 0;
          }
        }
        this.$getList("financialOrder/getList", this.listQuery).then(val => {
          // console.log(val, "时间请求结果");
          this.paginationProps.total = val.data.totalCount * 1;
          this.paginationProps.current = val.data.currentPage * 1;
          this.listQuery.search = tempSearch;
        });
      }
    },
    changeKey (val) {
      // console.log(val);
      this.title = val;
      if (this.title !== "createTime") {
        this.isTime = true;
      } else {
        this.isTime = false;
      }
    },
    // 通用写法
    quickJump (current) {
      this.listQuery.currentPage = current;
      this.getList();
    },
    onShowSizeChange (current, pageSize) {
      this.listQuery.pageSize = pageSize;
      this.listQuery.currentPage = current;
      this.getList();
    },
    getList () {
      this.$store.dispatch("financialDetails/getList", this.listQuery).then(res => {
        console.log(res, "获取列表");
        // this.data = res.data.list;
        // this.paginationProps.total = res.data.total;
      });
    },
    onSearch (value) {
      this.listQuery.search = value;
      console.log(value, this.listQuery.key);
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.Content {
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
    [type='button'] {
      margin-left: 20px;
    }
    .zhi {
      margin: 10px;
    }
  }
}
</style>
