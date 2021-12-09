<template>
  <div class="add-blogroll">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分类名称" prop="cutomerName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="排序" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        cutomerName: "",
        shortName: "",
      },
      rules: {
        cutomerName: [
          {
            required: true,
            message: "必填，分类名称长度必须在1-50之间",
            trigger: "blur"
          }
        ],
        shortName: [
          {
            required: true,
            message: "必填，排序范围在0-32767之间。值越小越靠前",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("channel/add", this.form)
            .then(res => {
              this.$message.success("新增渠道成功");
              this.resetForm();
              this.$router.back();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        cutomerName: "",
        shortName: "",
      };
    },
  }
};
</script>

<style lang="less" scoped>
.add-blogroll {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
