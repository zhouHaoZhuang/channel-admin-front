<template>
  <div class="mail-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="邮箱设置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="SMTP服务器" prop="linkDescribe">
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="2">
                  <a-tooltip
                    title="必填，用于邮件发送，填写完整信息后将可发送邮件给用户，发件人显示名称可为中文，若需修改模板可在通知模板中自行修改。使用详情可参考：邮件设置说明，或各邮件供应商的SMTP设置使用方法。"
                  >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="发送邮箱地址" prop="linkDescribe">
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="2">
                  <a-tooltip
                    title="必填，用于邮件发送，填写完整信息后将可发送邮件给用户，发件人显示名称可为中文，若需修改模板可在通知模板中自行修改。使用详情可参考：邮件设置说明，或各邮件供应商的SMTP设置使用方法。"
                  >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="发件人显示名称" prop="linkDescribe">
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="2">
                  <a-tooltip
                    title="必填，用于邮件发送，填写完整信息后将可发送邮件给用户，发件人显示名称可为中文，若需修改模板可在通知模板中自行修改。使用详情可参考：邮件设置说明，或各邮件供应商的SMTP设置使用方法。"
                  >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item
              label="发件邮箱密码"
              prop="linkDescribe"
              help="注:留空则不修改"
            >
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="2">
                  <a-tooltip
                    title="必填，用于邮件发送，填写完整信息后将可发送邮件给用户，发件人显示名称可为中文，若需修改模板可在通知模板中自行修改。使用详情可参考：邮件设置说明，或各邮件供应商的SMTP设置使用方法。"
                  >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="加密方式" prop="linkDescribe">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
              <a-tooltip
                title="必选，由于合作商的环境配置略有差异，这里提供的两种加密方式，若确认填写的邮件配置无误，测试发件不成功时，可尝试更换一种加密方式。"
              >
                <a-icon type="question-circle" />
              </a-tooltip>
            </a-form-model-item>
            <a-form-model-item label="邮箱SSL端口">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  25
                </a-radio>
                <a-radio :value="1">
                  465
                </a-radio>
                <a-radio :value="2">
                  其他
                </a-radio>
              </a-radio-group>
              <a-tooltip
                title="邮箱发送服务器端口，可为空，默认TLS模式为25，SSL为465，如需其他端口可自行设置"
              >
                <a-icon type="question-circle" />
              </a-tooltip>
            </a-form-model-item>
            <a-form-model-item label="测试收件箱">
              <a-row :gutter="1">
                <a-col :span="19">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="3">
                  <a-button type="primary">
                    测试发件
                  </a-button>
                </a-col>
                <a-col :span="2">
                  <div>
                    <a-tooltip
                      title="邮件信息设置完成后，可在此处填写一个测试收件的邮箱，点击测试发件，成功后填写的邮箱将收到一封测试邮件，若失败，请检查填写的内容是否正确，填写的位置是否准确。"
                    >
                      <a-icon type="question-circle" />
                    </a-tooltip>
                  </div>
                </a-col>
              </a-row>
            </a-form-model-item>
            <!-- <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
              <a-button type="primary" @click="onSubmit">
                修改设置
              </a-button>
            </a-form-model-item> -->
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>
      <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
        <a-button type="primary" @click="onSubmit">
          修改设置
        </a-button>
      </a-form-model-item>
      <!-- <div class="backstage">
        后台操作保护
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="管理员密码" prop="linkName">
            <a-input v-model="form.linkName" />
          </a-form-model-item>
        </a-form-model>
      </div> -->
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
    // this.getEmailConfig();
  },
  methods: {
    getEmailConfig() {
      this.$store.dispatch("emailSms/getEmailConfig").then(res => {
        this.form = res.data;
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("emailSms/modifyEmailConfig", this.form)
            .then(() => {
              this.$message.success("保存成功");
              this.getEmailConfig();
            });
        }
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
}
</style>
