<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    title="新增域名"
    wrapClassName="add-domain-container"
    okText="确定"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="域名" prop="domain">
        <a-input
          v-model="form.domain"
          placeholder="请输入域名，例如：www.aliyun.com"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value"
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      }
    }
  },
  data() {
    const validateDomain = (rule, value, callback) => {
      if (!this.urlReg.test(value)) {
        callback(new Error("请输入正确格式的域名"));
      }
      callback();
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      loading: false,
      domainReg: "",
      form: {
        domain: ""
      },
      rules: {
        domain: [
          {
            required: true,
            message: "请输入域名",
            tigger: ["blur", "change"]
          },
          {
            validator: validateDomain,
            tigger: ["blur", "change"]
          }
        ]
      },
      urlReg: /^(http|https):\/\/[\w\-_\u4E00-\u9FA5:/]+(\.[\w\-_\u4E00-\u9FA5]+)+([\u4E00-\u9FA5\w\-.,@?^=%&:/~+#]*[\u4E00-\u9FA5\w\-@?^=%&/~+#])?$/
    };
  },
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        domain: ""
      };
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("domain/add", this.form)
            .then(res => {
              this.$message.success("新增域名成功");
              this.$emit("success");
              this.$emit("changeVisible", false);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
