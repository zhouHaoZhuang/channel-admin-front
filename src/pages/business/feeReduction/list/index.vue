<template>
  <div class="feeRed-container">
    <div class="feeRed-title">
      <a-select style="width:120px" allowClear placeholder="请选择">
        <a-select-option value="用户ID">
          用户ID
        </a-select-option>
        <a-select-option value="云服务器ID">
          云服务器ID
        </a-select-option>
      </a-select>
      <span>
        <a-input placeholder="搜索关键词"></a-input>
      </span>
      <a-select style="width:120px" allowClear placeholder="状态">
        <a-select-option value="待降配">
          待降配
        </a-select-option>
        <a-select-option value="已完成">
          已完成
        </a-select-option>
      </a-select>
      <div>
        <span class="date-picker"
          ><a-date-picker placeholder="开始日期"></a-date-picker
        ></span>
        <span class="date-picker left5"
          ><a-date-picker placeholder="结束日期"></a-date-picker
        ></span>
      </div>
      <a-button type="primary">
        查询
      </a-button>
    </div>
    <div class="feeRed-table">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="orderNo"
        :pagination="paginationProps"
        :scroll="{ x: 1200 }"
      >
        <div slot="runningStatus" slot-scope="text">
          {{ renewalStatusEnum[text] }}
        </div>
        <a slot="action" slot-scope="text" @click="addChannel(text)">查看</a>
      </a-table>
    </div>
  </div>
</template>

<script>
import { renewalStatusEnum } from "@/utils/enum";
export default {
  data() {
    return {
      renewalStatusEnum,
      isfilter: false,
      title: "accountCode",
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      data: [],
      tableLoading: false,
      columns: [
        {
          title: "ID",
          dataIndex: "id"
        },
        {
          title: "用户ID",
          dataIndex: "corporationCode"
        },
        {
          title: "服务器",
          dataIndex: "instanceName"
        },
        {
          title: "创建时间",
          dataIndex: "createTimeStr",
          sorter: true,
          sortOrder: true
        },
        {
          title: "执行时间",
          dataIndex: "endTimeStr",
          sorter: true,
          sortOrder: true
        },
        {
          title: "状态",
          dataIndex: "runningStatus",
          scopedSlots: { customRender: "runningStatus" }
        },
        {
          title: "操作",
          dataIndex: "id",
          key: "action",
          fixed: "right",
          width: 100,
          scopedSlots: { customRender: "action" }
        }
      ],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,

        total: 1,
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
  created() {
    this.getList();
  },
  methods: {
    //查询表格数据
    getList() {
      this.$getList("renew/getList", this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
      });
      // .finally(() => {
      //   this.tableLoading = false;
      //   this.listQuery = {
      //     key: undefined,
      //     search: "",
      //     currentPage: 1,
      //     pageSize: 10,
      //     total: 0,
      //     sorter: ""
      //   };
      // });
    },
    //排序
    handleChange(pagination, filters, sorter) {
      if (sorter && sorter.order) {
        if (sorter.columnKey === "createTime") {
          this.listQuery.createTimeSort = sorter.order.replace("end", "");
        } else if (sorter.columnKey === "corporationCode") {
          this.listQuery.corporationCodeSort = sorter.order.replace("end", "");
        }
        this.getList();
      }
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
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      this.getList();
    },
    // onShowSizeChange(current, pageSize) {
    //   // console.log("改变了分页的大小", current, pageSize);
    //   this.paginationProps.current = current;
    //   this.paginationProps.pageSize = pageSize;
    //   this.getList();
    // },
    // selectPool (text, i) {
    //   this.$router.push({
    //     path: "/finance/index/orderInfo",
    //     query: {
    //       id: text.orderNo
    //     }
    //   });
    // },
    secectClick() {
      this.listQuery.key = this.title;
        let startTime = this.startValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        let endTime = this.endValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        // console.log(this.title, this.search, startTime, endTime);
        this.$store
          .dispatch("renew/selectList", {
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
        this.$getList("financialOrder/getList", this.listQuery).then(val => {
          // console.log(val, "时间请求结果");
          this.paginationProps.total = val.data.totalCount * 1;
          this.paginationProps.current = val.data.currentPage * 1;
          this.dataAll = val.data.list;
          this.data = this.dataAll.slice(0, this.paginationProps.pageSize);
          // this.listQuery.search = tempSearch;
        });
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
    addChannel(orderNo) {
      this.$router.push({
        path: "/business/cloudservers/feeReduction-examine",
        query: { orderNo }
      });
    }
  
};
</script>

<style lang="less" scoped>
.feeRed-container {
  background-color: #fff;
  margin-left: 20px;
  padding: 20px;
  .feeRed-title {
    display: flex;
    width: 890px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .left5 {
      margin-left: 5px;
    }
  }
}
</style>
