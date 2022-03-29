<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input style="width:220px" placeholder="请输入发票订单ID进行搜索" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="getList">查询</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="paginationProps"
        rowKey="id"
      >
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              $router.push('/purchase/billmanage/bounceInfo?id=' + record.id)
            "
          >
            详情
          </a-button>
          <a-button type="link" @click="cancel(record.id)">取消</a-button>
          <a-button
            type="link"
            @click="
              $router.push('/purchase/billmanage/bounceapply?id=' + record.id)
            "
          >
            重新提交
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
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: ""
      },
      columns: [
        {
          title: "发票申请号",
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
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "退票申请时间",
          dataIndex: "applyTime"
        },
        {
          title: "备注",
          dataIndex: "remark"
        },
        {
          title: "退票申请反馈时间",
          dataIndex: "createTime"
        },
        {
          title: "退票申请反馈说明",
          dataIndex: "feedbackRemark"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            default: "action"
          }
        }
      ],
      data: [],
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
    // this.getList();
  },
  methods: {
    //查询数据表格
    getList() {
      this.$getList("cbouncelist/getList", this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
    // 取消
    cancel(id) {
      this.$confirm({
        title: "确定要取消吗?",
        onOk: () => {
          this.$store.dispatch("cbouncelist/cancel", { id }).then(res => {
            this.$message.success("取消成功");
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
.bill-manage {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
