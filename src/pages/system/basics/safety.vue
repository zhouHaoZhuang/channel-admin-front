<template>
  <div class="member-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="网站开关">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="关闭网站">
              <a-radio-group v-model="form.off_site_switch">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>
      <div class="backstage">
        <!-- 后台操作保护 -->
        <!-- <a-form-model-item label="管理员密码" prop="linkName">
            <a-input v-model="form.linkName" />
          </a-form-model-item> -->
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button
            v-permission="'save'"
            type="primary"
            @click="onSubmit"
            :loading="loading"
          >
            保存设置
          </a-button>
        </a-form-model-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
      form: {
        off_site_switch:''
      },
      loading: false,
    };
  },
  created() {
    // console.log(this.formData, "this.formData");
    this.form = this.formData;
  },
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("emailSms/modifyAllConfig", this.form)
            .then(() => {
              this.loading = false
              this.$message.success("保存成功");
              // this.getEmailConfig();
            })
            .finally(() => {
              this.getData();
            });
        }
      });
    },
    // 修改成功之后获取最新的数据
    getData() {
      this.$store.dispatch("emailSms/getAllConfig").then(res => {
        console.log(res);
        this.form = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding-top: 12px;
  .backstage {
    background: #fff;
    padding-top: 15px;
  }
  .ant-collapse {
    background-color: white;
  }
  .gutter-box {
    margin-right: 10px;
  }
}
</style>
