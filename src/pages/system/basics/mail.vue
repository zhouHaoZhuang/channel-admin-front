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
            <a-form-model-item label="SMTP服务器" required>
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-form-model-item prop="smtp">
                    <a-input v-model="form.smtp" />
                  </a-form-model-item>
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
            <a-form-model-item label="发送邮箱地址" required>
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-form-model-item prop="email_address">
                    <a-input v-model="form.email_address" />
                  </a-form-model-item>
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
            <a-form-model-item label="发件人显示名称" required>
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-form-model-item prop="email_username">
                    <a-input v-model="form.email_username" />
                  </a-form-model-item>
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
              help="注:留空则不修改"
              required
            >
              <a-row :gutter="5">
                <a-col :span="22">
                  <a-form-model-item prop="email_password">
                    <a-input-password
                      autoComplete="new-password"
                      v-model="form.email_password"
                    />
                  </a-form-model-item>
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
            <a-form-model-item label="加密方式" prop="smtp_secure">
              <a-radio-group
                v-model="form.smtp_secure"
                @change="encryptionChange"
              >
                <a-radio value="TLS">
                  TLS
                </a-radio>
                <a-radio value="SSL">
                  SSL
                </a-radio>
              </a-radio-group>
              <a-tooltip
                title="必选，由于合作商的环境配置略有差异，这里提供的两种加密方式，若确认填写的邮件配置无误，测试发件不成功时，可尝试更换一种加密方式。"
              >
                <a-icon type="question-circle" />
              </a-tooltip>
            </a-form-model-item>
            <a-form-model-item label="邮箱SSL端口">
              <a-radio-group v-model="form.email_port">
                <a-radio value="25">
                  25
                </a-radio>
                <a-radio value="465">
                  465
                </a-radio>
                <a-radio value="">
                  其他
                </a-radio>
              </a-radio-group>
              <a-form-model-item style="display: inline-block;">
                <a-input-number
                  v-if="form.email_port === ''"
                  v-model="form.email_port_other"
                  :min="1"
                  :max="65535"
                />
              </a-form-model-item>
              <a-tooltip
                title="邮箱发送服务器端口，可为空，默认TLS模式为25，SSL为465，如需其他端口可自行设置"
              >
                <a-icon type="question-circle" />
              </a-tooltip>
            </a-form-model-item>
            <a-form-model-item label="测试收件箱">
              <a-row :gutter="5">
                <a-col :span="10">
                  <a-form-model-item prop="email_address">
                    <a-input type="email" v-model="email" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="4">
                  <a-button
                    :loading="sendLoading"
                    style="margin-left: 10px;"
                    type="primary"
                    @click="sendEmail"
                  >
                    {{ btnTxt }}
                  </a-button>
                </a-col>
                <a-col :span="2">
                  <a-tooltip
                    title="用于测试您的邮箱是否可以正常发送邮件，测试发件不成功时，可尝试更换邮箱。"
                  >
                    <a-icon type="question-circle" />
                  </a-tooltip>
                </a-col>
              </a-row>
            </a-form-model-item>
            <!-- <a-form-model-item label="测试收件箱">
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
            </a-form-model-item> -->
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
      form: {
        smtp: "",
        email_address: "",
        email_username: "",
        email_password: "",
        smtp_secure: "",
        email_port: ""
      },
      rules: {
        linkDescribe: [
          {
            required: true,
            message:
              "必填，新用户注册成功时，该项的值将会直接增加到用户的余额内，为0时代表不赠送金额，注册成功送现金金额为0~1000000。",
            trigger: "blur"
          }
        ],
        smtp: [
          {
            required: true,
            message: "必填，请填写SMTP服务器地址",
            trigger: "blur"
          }
        ],
        email_address: [
          {
            required: true,
            message: "必填，请填写发件邮箱地址",
            trigger: "blur"
          }
        ],
        email_username: [
          {
            required: true,
            message: "必填，请填写发件邮箱发件人名称",
            trigger: "blur"
          }
        ],
        email_password: [
          {
            required: true,
            message: "必填，请填写发件邮箱发件人密码",
            trigger: "blur"
          }
        ],
        smtp_secure: [
          {
            required: true,
            message: "必填，请选择发件邮箱加密方式",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: [],
      btnTxt: "测试发件",
      sendLoading: false,
      time: null,
      timeCount: 60
    };
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  created() {
    console.log(this.formData, "this.formData");
    this.form = this.formData;
    if (this.form.email_port !== "25" && this.form.email_port !== "465") {
      this.form.email_port_other = this.form.email_port;
      this.form.email_port = "";
    }
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
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.form.email_port === "") {
            this.form.email_port = this.form.email_port_other;
          }
          this.$store
            .dispatch("emailSms/modifyAllConfig", this.form)
            .then(() => {
              this.$message.success("保存成功");
              // this.getEmailConfig();
            })
            .finally(() => {
              this.getData();
            });
        }
      });
    },
    // 测试发送邮件
    sendEmail() {
      if (this.email) {
        this.sendLoading = true;
        this.$store
          .dispatch("user/sendEmail", { email: this.email })
          .then(() => {
            this.$message.success("发送成功");
            this.startTime();
          })
          .catch(() => {
            this.sendLoading = false;
          });
      }
    },
    startTime() {
      this.time = setInterval(() => {
        if (this.timeCount - 1 === 0) {
          clearInterval(this.time);
          this.btnTxt = "测试发件";
          this.timeCount = 60;
          this.sendLoading = false;
          return;
        }
        this.timeCount -= 1;
        this.btnTxt = this.timeCount + "S";
      }, 1000);
    },
    encryptionChange() {
      if (this.form.smtp_secure === "SSL") {
        this.form.email_port = "465";
      } else if (this.form.smtp_secure === "TLS") {
        this.form.email_port = "25";
      }
    },
    // 修改成功之后获取最新的数据
    getData() {
      this.$store.dispatch("emailSms/getAllConfig").then(res => {
        console.log(res);
        this.form = res.data;
        if (this.form.email_port !== "25" && this.form.email_port !== "465") {
          this.form.email_port_other = this.form.email_port;
          this.form.email_port = "";
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
