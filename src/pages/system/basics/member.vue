<template>
  <div class="member-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="注册">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="开启注册">
              <a-radio-group v-model="form.enable_register">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item
              required
              label="密码长度"
              help="注意：密码长度在6-20位！"
            >
              <a-form-model-item class="model-item" prop="pwd_min_length">
                <a-input-number
                  :min="6"
                  :max="19"
                  v-model="form.pwd_min_length"
                />
              </a-form-model-item>
              <span class="model-item">-</span>
              <a-form-model-item prop="pwd_max_length" class="model-item">
                <a-input-number :max="20" v-model="form.pwd_max_length" />
              </a-form-model-item>
            </a-form-model-item>
            <a-form-model-item label="每个IP限制注册" prop="linkUrl">
              <a-input-number
                :min="1"
                v-model="form.register_num"
                style="width:100px"
                class="model-item"
              />
              <div class="model-item">个账号，在</div>
              <a-input-number
                :min="1"
                v-model="form.register_hour"
                style="width:100px"
                class="model-item"
              />
              <div class="model-item">小时内</div>
            </a-form-model-item>
            <!-- <a-form-model-item label="注册成功送现金" prop="linkDescribe">
              <a-input v-model="form.linkName" />
            </a-form-model-item> -->
            <!-- <a-form-model-item label="开启注册推荐码">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item> -->
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="登录">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="开启登录">
              <a-radio-group v-model="form.enable_login">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="开启异地登录验证">
              <a-radio-group v-model="form.enable_elsewhere_login">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <!-- <a-form-model-item label="会员登录">
              <a-radio-group v-model="form.status">
                <a-checkbox>
                  ID
                </a-checkbox>
                <a-checkbox>
                  已认证邮箱
                </a-checkbox>
                <a-checkbox>
                  已认证手机
                </a-checkbox>
              </a-radio-group>
            </a-form-model-item> -->
            <a-form-model-item label="密码错误次数达到" required>
              <a-form-model-item
                prop="pwd_fail_times"
                class="model-item"
                style="width:100px"
              >
                <a-input-number :min="1" v-model="form.pwd_fail_times" />
              </a-form-model-item>
              <div class="model-item">次，锁定账号，锁定</div>
              <a-form-model-item
                prop="pwd_fail_minutes"
                class="model-item"
                style="width:100px"
              >
                <a-input-number :min="1" v-model="form.pwd_fail_minutes" />
              </a-form-model-item>
              <div class="model-item">分钟</div>
            </a-form-model-item>
            <!-- <a-form-model-item label="登录失败次数达到" prop="linkUrl">
              <a-input-number
                :min="1"
                v-model="form.login_fail_times"
                class="model-item"
                style="width:100px"
              />
              <div class="model-item">次，锁定IP，锁定</div>
              <a-input-number
                :min="1"
                v-model="form.login_fail_minutes"
                class="model-item"
                style="width:100px"
              />
              <div class="model-item">分钟</div>
            </a-form-model-item> -->
          </a-form-model>
        </a-collapse-panel>
        <!-- <a-collapse-panel key="3" header="实名认证">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="手机版号实名通道">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="手机号码通道实名认证价格">
              <a-input v-model="form.linkName" />
            </a-form-model-item>
            <a-form-model-item label="银行卡实名认证通道">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="银行卡通道实名认证价格">
              <a-input v-model="form.linkUrl" />
            </a-form-model-item>
            <a-form-model-item label="支付宝人脸识别实名通道">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="腾讯云人脸识别实名通道">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="支付宝人脸识别实名认证价格">
              <a-input v-model="form.linkDescribe" />
            </a-form-model-item>
            <a-form-model-item label="腾讯云人脸识别实名认证价格">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="实名认证接口">
              <a-select default-value="云引擎官方" style="width: 120px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="手机三要素验证APP ID">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="银行卡四要素验证APP ID">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="支付宝人脸识别验证APP ID">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="腾讯云人脸识别验证APP ID">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="最大认证次数">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="新用户免费认证次数">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel> -->
        <!-- <a-collapse-panel key="4" header="会员组">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="会员组">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="会员组折扣时">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel> -->
        <a-collapse-panel key="5" header="短信/邮件">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="每个IP/会员限发送短信验证码" required>
              <a-form-model-item
                prop="send_msm_times"
                class="model-item"
                style="width:100px"
              >
                <a-input-number :min="1" v-model="form.send_msm_times" />
              </a-form-model-item>
              <div class="model-item">次，在</div>
              <a-form-model-item
                prop="send_msm_hour"
                class="model-item"
                style="width:100px"
              >
                <a-input-number :min="0.1" v-model="form.send_msm_hour" />
              </a-form-model-item>
              <div class="model-item">小时内</div>
            </a-form-model-item>
            <a-form-model-item label="每个IP/会员限发送邮件验证码" required>
              <a-form-model-item
                prop="send_email_times"
                class="model-item"
                style="width:100px"
              >
                <a-input-number :min="1" v-model="form.send_email_times" />
              </a-form-model-item>
              <div class="model-item">次，在</div>
              <a-form-model-item
                prop="send_email_hour"
                class="model-item"
                style="width:100px"
              >
                <a-input-number :min="0.1" v-model="form.send_email_hour" />
              </a-form-model-item>
              <div class="model-item">小时内</div>
            </a-form-model-item>
            <a-form-model-item label="每小时全站限制验证码发送条数" required>
              <a-form-model-item
                prop="hour_limit"
                class="model-item"
                style="width:100px"
              >
                <a-input-number :min="1" v-model="form.hour_limit" />
              </a-form-model-item>
              <div class="model-item">条</div>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <!-- <a-collapse-panel key="6" header="客服">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="开启专属客服专员">
              <a-radio-group v-model="form.enable_commissioner">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel> -->
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
        // 注册
        enable_register: "",
        pwd_min_length: "",
        pwd_max_length: "",
        register_num: "",
        register_hour: "",
        // 登录
        enable_login: "",
        enable_elsewhere_login: "",
        pwd_fail_times: "",
        pwd_fail_minutes: "",
        // login_fail_times: "",
        // login_fail_minutes: "",
        // 短信邮件
        send_msm_times: "",
        send_msm_hour: "",
        send_email_times: "",
        send_email_hour: "",
        hour_limit: ""
        // 客服
        // enable_commissioner: ""
      },
      rules: {
        linkName: [
          {
            required: true,
            message: "必填，限制用户注册时的密码长度。",
            trigger: "blur"
          }
        ],
        pwd_min_length: [
          {
            required: true,
            message: "必填，限制用户注册时的密码最小长度。",
            trigger: "blur"
          }
        ],
        pwd_max_length: [
          {
            required: true,
            message: "必填，限制用户注册时的密码最大长度。",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value * 1 <= this.form.pwd_min_length * 1) {
                callback(new Error("最大长度不能小于最小长度"));
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ],
        pwd_fail_times: [
          {
            required: true,
            message: "必填，限制用户登录失败次数。",
            trigger: "blur"
          }
        ],
        pwd_fail_minutes: [
          {
            required: true,
            message: "必填，限制用户登录失败时间。",
            trigger: "blur"
          }
        ],
        send_msm_times: [
          {
            required: true,
            message: "必填，限制会员发送短信验证码次数。",
            trigger: "blur"
          }
        ],
        send_msm_hour: [
          {
            required: true,
            message: "必填，限制会员发送短信验证码的时间。",
            trigger: "blur"
          }
        ],
        send_email_times: [
          {
            required: true,
            message: "必填，限制会员发送邮件验证码次数。",
            trigger: "blur"
          }
        ],
        send_email_hour: [
          {
            required: true,
            message: "必填，限制会员发送邮件验证码的时间。",
            trigger: "blur"
          }
        ],
        hour_limit: [
          {
            required: true,
            message: "必填，限制验证码发送次数。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: []
    };
  },
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    console.log(this.formData, "this.formData");
    for (let key in this.form) {
      this.form[key] = this.formData[key];
    }
    console.log(this.form, "this.form");
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        console.log(valid, "valid");
        if (valid) {
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
  .model-item {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
