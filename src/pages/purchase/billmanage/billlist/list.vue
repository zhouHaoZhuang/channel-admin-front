<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input style="width:200px" placeholder="请输入发票订单ID进行搜索" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">查询</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table :columns="columns" :data-source="data">
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action">
          <a-button type="link">详情</a-button>
          <a-button type="link">修改地址</a-button>
          <a-button type="link">取消</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: "",
        startTime: "",
        endTime: "",
        accountType: ""
      },
      columns: [
        {
          title: "发票ID",
          dataIndex: "id"
        },
        {
          title: "发票抬头",
          dataIndex: "title"
        },
        {
          title: "开票金额",
          dataIndex: "amount"
        },
        {
          title: "申请状态",
          dataIndex: "status"
        },
        {
          title: "申请时间",
          dataIndex: "applyTime"
        },
        {
          title: "反馈时间",
          dataIndex: "createTime"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            default: "action"
          }
        }
      ],
      data: []
    };
  },
  methods: {
    startValue(date, dateString) {
      // this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      // this.listQuery.endTime = dateString;
    }
  }
};
</script>

<style lang="less" scoped>
.bill-manage {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
