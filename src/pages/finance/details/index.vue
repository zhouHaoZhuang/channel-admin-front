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
        <a-select v-model="listQuery.detailType"
                  style="width: 120px"
                  @change="handleChange">
          <a-select-option value="0">
            款项类型
          </a-select-option>
          <a-select-option v-for="(value,key) in detailTypeMapData"
                           :value="key"
                           :key="key">
            {{ value }}
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
            <span>{{detailTypeMapData[text]}}</span>
          </div>
          <div slot="action"
               slot-scope="text">
            <a-button type="link"
                      @click="selectPool(text)">
              查看
            </a-button>
          </div>
          <div slot="payTime"
               slot-scope="text">
            {{ text | formatDate }}
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { detailTypeMapData } from '@/utils/enum.js';
export default {
  data () {
    return {
      isfilter: false,
      title: 'customerCode',
      detailTypeMapData,
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        detailType: '0',
        startTime: '',
        endTime: ''
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
        }
      ];
    },
  },
  created () {
    this.getList();
  },
  methods: {
    // 获取开始日期
    changeStart (date, dateString) {
      this.startValue = dateString;
      this.listQuery.startTime = dateString;
    },
    changeEnd (date, dateString) {
      this.endValue = dateString;
      this.listQuery.endTime = dateString;
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
        this.$getList("financialDetails/getList", this.listQuery)
          .then(res => {
            this.data = res.data.list;
            this.paginationProps.total = res.data.total * 1;
          });
      } else {
        this.$getList("financialDetails/getList", this.listQuery).then(res => {
          // console.log(res, "请求结果");
          this.data = res.data.list;
          this.paginationProps.total = res.data.total * 1;
        }).finally(() => {
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
      this.$getList("financialDetails/getList", this.listQuery).then(res => {
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
