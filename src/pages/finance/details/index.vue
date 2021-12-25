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
          <a-date-picker :disabled-date="disabledStartDate"
                         show-time
                         format="YYYY-MM-DD HH:mm:ss"
                         placeholder="开始时间"
                         :disabled="isTime"
                         @change="changeStart"
                         @openChange="handleStartOpenChange" />
          <span class="zhi">至</span>
          <a-date-picker :disabled="isTime"
                         :disabled-date="disabledEndDate"
                         show-time
                         @change="changeEnd"
                         format="YYYY-MM-DD HH:mm:ss"
                         placeholder="结束时间"
                         @openChange="handleEndOpenChange" />
        </div>

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
          <div slot="dealAmount"
               slot-scope="text">
            {{ text.toFixed(2) }}
          </div>
          <div slot="afterAmount"
               slot-scope="text">
            {{ text.toFixed(2) }}
          </div>
          <div slot="createTime"
               slot-scope="text">
            {{ text | formatDate }}
          </div>
          <div slot="detailType"
               slot-scope="text">
            <span v-if="text==1">在线充值</span>
            <span v-else-if="text==2">线下充值</span>
            <span v-else-if="text==3">下单</span>
            <span v-else-if="text==4">退款</span>
          </div>
          <div slot="action"
               slot-scope="text">
            <a-button type="link"
                      @click="selectPool(text)">
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
      title: 'customerCode',
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
          dataIndex: "paymentLineId",
          sorter: true,
          sortDirections: ["ascend", "descend"],
          width: 180
        },
        {
          title: "会员ID",
          dataIndex: "customerCode",
        },
        {
          title: "发生金额(元)",
          dataIndex: "dealAmount",
          scopedSlots: { customRender: "dealAmount" },
        },
        {
          title: "当时余额(元)",
          dataIndex: "afterAmount",
          scopedSlots: { customRender: "afterAmount" },
        },
        {
          title: "款项类型",
          dataIndex: "detailType",
          scopedSlots: { customRender: "detailType" },
        },
        // {
        //   title: "交易描述",
        //   dataIndex: "actualAmount",
        //   key: "actualAmount",
        //   scopedSlots: { customRender: "actualAmount" },
        // },
        {
          title: "发生时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" },
          width: 180
        },
        // {
        //   title: "订单ID",
        //   key: "selects",
        //   scopedSlots: { customRender: "select" }
        // },
        {
          title: "操作管理员",
          dataIndex: "modifyUserName",
        },
        {
          title: "操作",
          // dataIndex: "id",
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
          title: "会员ID",
          dataIndex: "customerCode",
        },
        {
          title: "业务ID",
          dataIndex: "paymentLineId",
        },
        {
          title: "起始日期",
          dataIndex: "createTime",
        },
        {
          title: "款项类型",
          dataIndex: "detailType",
        },
      ];
    },
  },
  created () {
    this.getList();
  },
  methods: {
    changeStart (date, dateString) {
      // console.log(date, dateString);
      this.startValue = dateString
    },
    changeEnd (date, dateString) {
      // console.log(date, dateString);
      this.endValue = dateString
    },
    // 点击排序之后的回调
    handleChange (pagination, filters, sorter) {
      if (sorter && sorter.order) {
        this.listQuery.key = sorter.columnKey;
        this.listQuery.sorter = sorter.order.replace('end', '') + `-${sorter.columnKey}`;
        this.getList();
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
    // 查询的回调
    secectClick () {
      this.listQuery.key = this.title;
      console.log(`查询的值是: ${this.listQuery.key}`);
      if (this.title == "createTime") {
        // console.log(this.startValue, this.endValue);
        this.$store.dispatch("financialDetails/getList", {
          startTime: this.startValue,
          endTime: this.endValue,
        })   //此处需要改变financialDetails.js文件
          .then(res => {
            // console.log(res, "时间请求结果");
            this.data = res.data.list;
            this.paginationProps.total = res.data.total * 1;
          });
      } else {
        this.listQuery.search = this.listQuery.search.trim();
        this.listQuery[this.listQuery.key] = this.listQuery.search
        if (this.listQuery.key == 'detailType') {
          let search = '';
          if (this.listQuery.search == '在线充值') {
            search = 1
          } else if (this.listQuery.search == '线下充值') {
            search = 2
          } else if (this.listQuery.search == '下单') {
            search = 3
          } else if (this.listQuery.search == '退款') {
            search = 4
          } else {
            this.$message.warning('不支持当前关键字查询');
            return;
          }
          this.listQuery[this.listQuery.key] = search;
        }
        // console.log('---' + this.listQuery.search + '---');
        this.$getList("financialDetails/getList", this.listQuery).then(res => {
          // console.log(res, "请求结果");
          this.data = res.data.list;
          this.paginationProps.total = res.data.total * 1;
        }).finally(() => {
          this.listQuery[this.listQuery.key] = null
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
        this.data = res.data.list;
        this.paginationProps.total = res.data.total * 1;
      });
    },
    selectPool (data) {
      localStorage.setItem("detailedinfo", JSON.stringify(data));
      this.$router.push({
        path: `/finance/index/detailedinfo`,
        query: {
          id: data.id,
        }
      })
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
