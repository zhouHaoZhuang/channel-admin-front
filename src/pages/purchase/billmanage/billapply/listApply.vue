<template>
  <div class="list-apply">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="发票类型" prop="name">
        <a-radio-group v-model="form.resource">
          <a-radio value="1">
            增值税普通发票
          </a-radio>
          <a-radio value="2">
            增值税专用发票
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="请选择发票抬头" prop="name">
        <a-table
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :data-source="data"
        >
          <div slot="action">
            <a-button type="link">编辑</a-button>
          </div>
        </a-table>
        <a-button type="link" icon="plus">新增开票信息</a-button>
      </a-form-model-item>
      <a-form-model-item label="订单信息">
        <a-table :columns="columnsOrder" :data-source="dataOrder">
          <div slot="action">
            <a-button type="link">删除</a-button>
          </div>
        </a-table>
        <a-button type="link" icon="plus">添加订单</a-button>
      </a-form-model-item>
      <a-form-model-item label="订单信息">
        <span>
          <b style="color:#f59a23d8">￥500.00</b>
          元，您选取了
          {{ 5 }}
          条单据开具发票(若选中多条订单，填写开票金额将合并开具到一张票据中)
        </span>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          确认提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRowKeys: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
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
      data: [],
      columns: [
        {
          title: "发票抬头",
          dataIndex: "billTitle"
        },
        {
          title: "发票类型",
          dataIndex: "taxType"
        },
        {
          title: "税务登记号",
          dataIndex: "taxNumber"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action"
          }
        }
      ],
      dataOrder: [],
      columnsOrder: [
        {
          title: "资源池订单ID",
          dataIndex: "id"
        },
        {
          title: "云商城订单ID",
          dataIndex: "yunorderId"
        },
        {
          title: "产品名称",
          dataIndex: "name"
        },
        {
          title: "客户名称",
          dataIndex: "customerName"
        },
        {
          title: "可开票金额",
          dataIndex: "canInvoiceAmount"
        },
        {
          title: "订单创建时间",
          dataIndex: "createTime"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action"
          }
        }
      ]
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
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    }
  }
};
</script>

<style lang="less" scoped>
.list-apply {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
