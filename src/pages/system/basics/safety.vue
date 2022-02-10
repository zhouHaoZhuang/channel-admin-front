<template>
  <div class="member-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="网站开关">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="关闭网站">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  是
                </a-radio>
                <a-radio :value="1">
                  否
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
        linkTypeName: "",
        linkTypeCode: "",
        linkName: "",
        linkUrl: "",
        linkDescribe: "",
        bottomShow: 0,
        status: 0,
        linkSort: "",
        channelCode: "",
        linkLogo: "",
        linkTypeSort: 0
      },
      rules: {
        linkName: [
          {
            required: true,
            message: "必填，限制用户注册时的密码长度。",
            trigger: "blur"
          }
        ],
        linkUrl: [
          {
            required: true,
            message:
              "必填，限制同一IP在规定时间内的注册次数，防止恶意注册，注册次数为0时代表不做限制，可输入1-13位的数字。",
            trigger: "blur"
          }
        ],
        linkDescribe: [
          {
            required: true,
            message:
              "必填，新用户注册成功时，该项的值将会直接增加到用户的余额内，为0时代表不赠送金额，注册成功送现金金额为0~1000000。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: []
    };
  },
  created() {
    // this.getSafetyConfig();
  },
  methods: {
    onSubmit() {//保存设置
      console.log(this.form);
      this.$refs.ruleForm.validate(valid => {
        // console.log(valid);
        if (valid) {
          this.$store
            .dispatch("invoiceRefund/modifySafetyConfig", this.form)
            .then(res => {
              // console.log(res, "--------");
              this.$message.success("安全信息修改成功");
              this.getSafetyConfig();
            });
        }
      });
    },
     // 获取安全信息
    getSafetyConfig() {
      this.$store.dispatch("safety/getSafetyConfig").then(res => {
        // console.log(res, "--------");
        this.form = res.data;
      });
    },

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
