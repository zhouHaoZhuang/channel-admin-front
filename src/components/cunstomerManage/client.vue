<template>
  <a-modal
    :visible="value"
    width="760px"
    centered
    title="选择客户"
    wrapClassName="add-domain-container"
    okText="确定"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model layout="inline" :model="listQuery">
      <a-form-model-item>
        <a-input v-model="listQuery.search" placeholder="请输入姓名" />
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="listQuery.search" placeholder="请输入企业" />
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="listQuery.search" placeholder="请输入手机号" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="searchClick"> 查询 </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="id"
      :pagination="paginationProps"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
    </a-table>
  </a-modal>
</template>

<script>
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value",
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      },
    },
  },
  data() {
    const validateDomain = (rule, value, callback) => {
      if (!this.urlReg.test(value)) {
        callback(new Error("请输入正确格式的域名"));
      }
      callback();
    };
    return {
      labelCol: { span: 15 },
      wrapperCol: { span: 6 },
      loading: false,
      domainReg: "",
      data: [],
      selectedRowKeys: [],
      form: {
        domain: "",
      },
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        sorter: "",
      },
      columns: [
        {
          title: "用户ID",
          dataIndex: "realNames",
        },
        {
          title: "姓名",
          dataIndex: "realName",
        },
        {
          title: "企业",
          dataIndex: "realNamess",
        },
        {
          title: "手机号",
          dataIndex: "phoneNumber",
        },
      ],
      rules: {
        domain: [
          {
            required: true,
            message: "请输入域名",
            tigger: ["blur", "change"],
          },
          {
            validator: validateDomain,
            tigger: ["blur", "change"],
          },
        ],
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
        onShowSizeChange: this.onShowSizeChange,
      },
      urlReg:
        /^[\w\-_\u4E00-\u9FA5:/]+(\.[\w\-_\u4E00-\u9FA5]+)+([\u4E00-\u9FA5\w\-.,@?^=%&:/~+#]*[\u4E00-\u9FA5\w\-@?^=%&/~+#])?$/,
    };
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        domain: "",
      };
    },
    searchClick() {
      console.log("查询事件");
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("domain/add", this.form)
            .then((res) => {
              this.$message.success("新增域名成功");
              this.$emit("success");
              this.$emit("changeVisible", false);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped></style>







