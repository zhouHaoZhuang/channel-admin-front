<template>
  <div class="channel-list-add">
    <div class="content">
      <a-form-model ref="ruleForm"
                    :model="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label="姓名"
                           prop="cutomerName">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>
        <a-form-model-item label="手机"
                           prop="cutomerName">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>
        <a-form-model-item label="邮箱"
                           prop="cutomerName">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>

        <a-form-model-item label="工号">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>
        <a-form-model-item label="密码"
                           prop="cutomerName">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>
        <a-form-model-item label="确认密码"
                           prop="cutomerName">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>
        <a-form-model-item label="角色">
          <a-select v-model="form.region"
                    placeholder="请选择">
            <a-select-option value="shanghai">
              系统管理员
            </a-select-option>
            <a-select-option value="beijing">
              客服经理
            </a-select-option>
            <a-select-option value="beijing">
              客服专员
            </a-select-option>
            <a-select-option value="beijing">
              技术支持
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="状态"
                           prop="cutomerName">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              正常
            </a-radio>
            <a-radio value="2">
              禁用
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <div>
          <hr>
          <span>后台操作保护</span>

        </div>
        <a-form-model-item label="管理员密码">
          <a-input v-model="form.addressProject" />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span:8, offset: 8 }">
          <a-button type="primary"
                    @click="onSubmit"
                    :loading="loading">
            确定
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
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
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

  .content {
  }
}
</style>
