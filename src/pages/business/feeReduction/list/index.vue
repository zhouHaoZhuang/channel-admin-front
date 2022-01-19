<template>
  <div class="feeRed-container">
    <div class="feeRed-title">
      <a-select
        v-model="listQuery.key"
        style="width:120px"
        allowClear
        placeholder="请选择"
      >
        <a-select-option value="corporationCode">
          用户ID
        </a-select-option>
        <a-select-option value="instanceName">
          云服务器
        </a-select-option>
      </a-select>
      <span>
        <a-input v-model="listQuery.search" placeholder="搜索关键词" />
      </span>
      <a-select
        v-model="listQuery.runningStatus"
        style="width:120px"
        allowClear
        placeholder="状态"
      >
        <a-select-option value="待降配">
          待降配
        </a-select-option>
        <a-select-option value="已完成">
          已完成
        </a-select-option>
      </a-select>
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
        <div slot="action" slot-scope="text, record">
          <a-button type="link" @click="handleSelectDetail(record)">
            查看
          </a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { renewalStatusEnum } from "@/utils/enum";
export default {
  data() {
    return {
      renewalStatusEnum,
      listQuery: {
        key: undefined,
        search: "",
        startTime: "",
        endTime: "",
        runningStatus: undefined,
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
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
          dataIndex: "createTimeStr"
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
  methods: {
    //查询表格数据
    getList() {
      this.tableLoading = true;
      this.$getList("renew/getList", this.listQuery)
        .then(res => {
          console.log(res);
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
        path: "/business/cloudservers/feeReduction-examine",
        query: { orderNo: record.orderNo }
      });
    }
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
