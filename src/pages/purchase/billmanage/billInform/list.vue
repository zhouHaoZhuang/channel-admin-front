<template>
  <div class="bill-inform">
    <div style="margin-bottom: 20px;">
      <a-button
        type="primary"
        icon="plus"
        @click="$router.push('/purchase/billmanage/addbillInform')"
      >
        新增发票信息
      </a-button>
    </div>
    <div>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="paginationProps"
        rowKey="id"
      >
        <div slot="invoiceType" slot-scope="text">
          {{ invoiceTypeMap[text] }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              $router.push('/purchase/billmanage/addbillInform?id=' + record.id)
            "
          >
            编辑
          </a-button>
          <a-button
            style="margin-left:10px"
            type="link"
            @click="del(record.id)"
          >
            删除
          </a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      invoiceTypeMap: {
        1: "增值税普通发票",
        2: "增值税专用发票"
      },
      columns: [
        {
          title: "发票抬头",
          dataIndex: "invoiceTitle"
        },
        {
          title: "发票类型",
          dataIndex: "invoiceType",
          scopedSlots: { customRender: "invoiceType" }
        },
        {
          title: "税务登记号",
          dataIndex: "registerNo"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: ""
      },
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
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
    //查询数据表格
    getList() {
      this.$getList("cbillinfo/getList", this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
    // 删除
    del(id) {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("cbillinfo/del", { ids: id }).then(() => {
            this.$message.success("删除成功");
            this.getList();
          });
        }
      });
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.bill-inform {
  margin-top: 20px;
  background-color: #fff;
  width: 100%;
  margin: 0 20px;
  padding: 20px;
}
</style>
