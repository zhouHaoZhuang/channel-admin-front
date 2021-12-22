<template>
  <div class="channel-list-add">
    <div class="content">
      <a-form-model ref="ruleForm"
                    :model="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label="组别名称"
                           prop="cutomerName">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>
        <a-form-model-item label="组别状态"
                           prop="cutomerName">
          <!-- <a-input v-model="form.cutomerName" /> -->
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              启用
            </a-radio>
            <a-radio value="2">
              关闭
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="备注说明">
          <a-input v-model="form.addressProject" />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary"
                    @click="onSubmit"
                    :loading="loading">
            添加
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: "",
        resource: ""
      },
      rules: {
        cutomerName: [
          {
            required: true,
            message: "请输入组别名称",
            trigger: "blur"
          }
        ],
      },
      loading: false
    };
  },
  activated () {
    this.resetForm();
  },
  methods: {
    // 提交
    onSubmit () {
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
    resetForm () {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-add {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
