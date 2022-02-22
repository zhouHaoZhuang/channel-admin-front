<template>
  <div class="record">
    <a-table
      :loading="tableLoading"
      :columns="columns"
      :data-source="data"
      rowKey="id"
      :pagination="paginationProps"
    >
      <div slot="createTime" slot-scope="text">
        {{ text | formatDate }}
      </div>
      <a slot="action" v-permission="'view'">
        <a-button type="link">
          编辑
        </a-button>
        <!-- <a-divider type="vertical" />
        <a-button type="link">
          删除
        </a-button> -->
      </a>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      data: [],
      columns: [
        {
          title: "产品名称",
          dataIndex: "name",
          width: 220
        },
        {
          title: "订单编号",
          dataIndex: "id",
          width: 220
        },
        {
          title: "IP地址",
          dataIndex: "ip",
          key: "status",
          scopedSlots: {
            customRender: "status"
          }
        },
        {
          title: "退款金额",
          dataIndex: "jine",
          key: "jine"
        },
        {
          title: "申请日期",
          dataIndex: "id",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "退款原因",
          dataIndex: "a",
          key: "tuikuan"
        },
        {
          title: "状态",
          dataIndex: "b",
          key: "zhuangtai"
        }
      ],
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
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
    // this.getList();
  },
  methods: {
    getList() {
      this.tableLoading = true;
      this.$getList("specification/getList", this.listQuery).then(res => {
        console.log(res, "获取列表");
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
        this.tableLoading = false;
      });
    },
    // 表格分页快速跳转n页
    quickJump(current) {
      this.listQuery.currentPage = current;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.record{
    margin: 0 20px;
    padding: 20px;
    background-color: #fff;
}
</style>
