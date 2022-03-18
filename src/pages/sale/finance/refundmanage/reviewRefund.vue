<template>
  <div class="bill-select">
    <div class="bill-info">
      <a-descriptions style="margin: 20px 0" title="申请信息">
        <a-descriptions-item label="发票ID">
          FP20220314001
        </a-descriptions-item>
        <a-descriptions-item label="客户名称"> 上海XX公司 </a-descriptions-item>
        <a-descriptions-item label="开具类型">
          企业
        </a-descriptions-item>
        <a-descriptions-item label="发票类型">
          增值税专用发票
        </a-descriptions-item>
        <a-descriptions-item label="发票抬头">
          上海XX公司
        </a-descriptions-item>
        <a-descriptions-item label="税务登记号">
          91000000000
        </a-descriptions-item>
        <a-descriptions-item label="开票金额">
          <b>￥500.00</b>
        </a-descriptions-item>
        <a-descriptions-item label="状态"> 已提交 </a-descriptions-item>
        <a-descriptions-item label="退票申请创建时间">
          2016-09-21 08:50:08
        </a-descriptions-item>
        <a-descriptions-item label="备注"> 测试备注 </a-descriptions-item>
      </a-descriptions>
      <a-descriptions style="margin: 20px 0" title="物流信息">
        <a-descriptions-item label="物流单号">
          SF45621000000000
        </a-descriptions-item>
        <a-descriptions-item label="寄件联系人">
          王三
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          13088888888
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div>
      <h2 style="margin: 20px 0">开票明细</h2>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="paginationProps"
        rowKey="id"
      >
      </a-table>
    </div>
    <div>
      <h2 style="margin: 20px 0">审核反馈</h2>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="反馈说明" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            确认
          </a-button>
          <a-button type="danger" style="margin-left: 10px;" @click="resetForm">
            拒绝
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          title: "订单ID",
          dataIndex: "orderId"
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "订单金额",
          dataIndex: "orderAmount"
        },
        {
          title: "可开票金额",
          dataIndex: "canInvoiceAmount"
        },
        {
          title: "订单创建时间",
          dataIndex: "orderCreateTime"
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ]
      },
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: "",
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
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    //查询数据表格
    getList() {
      this.$getListQp("word/getList", this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
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
    },
  }
};
</script>

<style lang="less" scoped>
.bill-select {
  width: 100%;
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
.bill-info {
  margin: 30px 0;
}
</style>
