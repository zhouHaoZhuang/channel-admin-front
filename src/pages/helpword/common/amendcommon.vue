<template>
  <div class="add-common-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="名称">
          <span>{{ typeName }}</span>
        </a-form-model-item>
        <a-form-model-item label="热点" prop="typeSort">
          <a-input v-model="form.typeSort" />
          <span>注:数字越大位置越前</span>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            确定添加
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
      labelCol: { span: 6 },
      wrapperCol: { span: 6 },
      form: {
        typeSort: ""
      },
      rules: {
        typeSort: [
          {
            required: true,
            message: "必填，排序范围在0-100之间，数值越大越靠前。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      typeName: ""
    };
  },
  activated() {
    this.typeName = this.$route.query.typeName;
  },
  methods: {
    // 提交
    onSubmit() {
      this.form.id = this.$route.query.id;
      this.$refs.ruleForm.validate(valid => {
        this.$store.dispatch("category/edit", this.form).then(res => {
          this.$message.success("提交成功");
          this.resetForm();
          this.$router.back();
        });
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        typeSort: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.add-common-container {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
    // .addimages {
    //   margin-left: 150px;
    // }
  }
}
</style>
