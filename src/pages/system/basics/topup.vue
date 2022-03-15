<template>
  <div class="topup-container">
    <div class="content">
      <!-- 支付宝设置窗口 -->
      <a-modal
        title="修改支付宝设置"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 15, offset: 0 }"
        >
          <a-form-model-item label="签名方式">
            <a-radio-group :value="2">
              <!-- <a-radio :value="0">
                  MD5
                </a-radio>
                <a-radio :value="1">
                  RSA
                </a-radio> -->
              <!-- 固定第三个 -->
              <a-radio :value="2">
                RSA2
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="支付宝合作ID" prop="aliAppId">
            <a-input v-model="form.aliAppId" />
          </a-form-model-item>
          <a-form-model-item label="支付宝公钥" prop="alipayPublicKey">
            <a-input v-model="form.alipayPublicKey" />
          </a-form-model-item>
          <a-form-model-item label="支付宝商户私钥" prop="merchantPrivateKey">
            <a-input v-model="form.merchantPrivateKey" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <!-- 充值 -->
      <div>
        <a-form-model
          ref="ruleFormRecharge"
          :model="formRecharge"
          :rules="rulesRecharge"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="首选充值方式">
            <a-radio-group v-model="formRecharge.first_payment">
              <a-radio value="wxpay">
                微信
              </a-radio>
              <a-radio value="alipay">
                支付宝
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="支付宝PC充值开关">
            <a-radio-group v-model="formRecharge.alipay_switch">
              <a-radio value="1">
                开启
              </a-radio>
              <a-radio value="0">
                关闭
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="微信PC充值开关">
            <a-radio-group v-model="formRecharge.wxpay_switch">
              <a-radio value="1">
                开启
              </a-radio>
              <a-radio value="0">
                关闭
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="最小充值金额" prop="min_recharge">
            <a-input
              type="number"
              v-model="formRecharge.min_recharge"
              suffix="元"
            />
          </a-form-model-item>
          <a-form-model-item label="订单在线支付" prop="online_pay">
            <a-radio-group v-model="formRecharge.online_pay">
              <a-radio value="1">
                开启
              </a-radio>
              <a-radio value="0">
                关闭
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <!-- 后台操作保护 -->
          <!-- <a-form-model-item label="管理员密码" prop="linkName">
            <a-input v-model="form.linkName" />
          </a-form-model-item> -->
          <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
            <a-button
              v-permission="'save'"
              type="primary"
              @click="enterPay"
              :loading="loading"
            >
              保存设置
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <!-- 微信设置窗口 -->
      <a-modal
        title="修改微信支付设置"
        :visible="visibleWechat"
        :confirm-loading="confirmLoadingWechat"
        @ok="handleOkWechat"
        @cancel="handleCancelWechat"
      >
        <a-form-model
          ref="ruleForm"
          :model="formWechatPay"
          :rules="rulesWechatPay"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 15, offset: 0 }"
        >
          <a-form-model-item label="API v3密钥" prop="wechatApiV3">
            <a-input v-model="formWechatPay.wechatApiV3" />
          </a-form-model-item>
          <a-form-model-item label="微信应用ID" prop="wechatAppId">
            <a-input v-model="formWechatPay.wechatAppId" />
          </a-form-model-item>
          <a-form-model-item label="证书序列号" prop="wechatCertNo">
            <a-input v-model="formWechatPay.wechatCertNo" />
          </a-form-model-item>
          <a-form-model-item label="微信商户号" prop="wechatMchId">
            <a-input v-model="formWechatPay.wechatMchId" />
          </a-form-model-item>
          <a-form-model-item label="微信证书key" prop="wechatCertKey">
            <a-textarea :auto-size="{ minRows: 3, maxRows: 5 }" v-model="formWechatPay.wechatCertKey" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="支付宝设置">
          <a-form-model
            ref="ruleForm"
            :model="data"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="签名方式">
              <a-radio-group :value="2">
                <a-radio :value="2">
                  RSA2
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="支付宝合作ID">
              <span>{{ data.aliAppId }}</span>
            </a-form-model-item>
            <a-form-model-item label="支付宝公钥">
              <span>{{ data.alipayPublicKey }}</span>
            </a-form-model-item>
            <a-form-model-item label="支付宝商户私钥">
              <span>{{ data.merchantPrivateKey }}</span>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
              <a-button type="primary" @click="showModal">
                修改设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
          <!-- <a-form-model-item label="支付宝银行支付开关">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="支付宝手机充值开关">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item> -->
        </a-collapse-panel>
        <a-collapse-panel key="2" header="微信支付设置">
          <a-form-model
            ref="ruleForm"
            :model="getWechatPay"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="API v3密钥">
              <span>{{ getWechatPay.wechatApiV3 }}</span>
            </a-form-model-item>
            <a-form-model-item label="微信应用ID">
              <span>{{ getWechatPay.wechatAppId }}</span>
            </a-form-model-item>
            <a-form-model-item label="微信证书key">
              <span>{{ getWechatPay.wechatCertKey }}</span>
            </a-form-model-item>
            <a-form-model-item label="证书序列号">
              <span>{{ getWechatPay.wechatCertNo }}</span>
            </a-form-model-item>
            <a-form-model-item label="微信商户号">
              <span>{{ getWechatPay.wechatMchId }}</span>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
              <a-button type="primary" @click="showModalWechat">
                修改设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>
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
      formRecharge: {
        first_payment: "",
        alipay_switch: "",
        min_recharge: "",
        online_pay: "",
        wxpay_switch: ""
      },
      getWechatPay: {
        wechatApiV3: "",
        wechatAppId: "",
        wechatCertKey: "",
        wechatCertNo: "",
        wechatMchId: ""
      },
      formWechatPay: {
        wechatApiV3: "",
        wechatAppId: "",
        wechatCertKey: "",
        wechatCertNo: "",
        wechatMchId: ""
      },
      rules: {
        linkName: [
          {
            required: true,
            message:
              "必填，用于站内需显示网站名称的地方，此处以填XX云为例，如：首页的了解XX云，为什么选择XX云，注册时的《XX云服务协议》等，网站名称限制中英文数字以及短横线（-）、下划线（_），且长度在2-20个字符内。",
            trigger: "blur"
          }
        ],
        linkUrl: [
          {
            required: true,
            message: "必填，用于网站首页的标题展示，且长度在2-100字以内。",
            trigger: "blur"
          }
        ],
        linkDescribe: [
          {
            required: true,
            message:
              "必填，代表了网站的市场定位，可用于搜索引擎的条件，如填写XX云，百度搜索XX云，将出现本站点首页，关键词限制中英文数字以及短横线（-）、下划线（_）、半角逗号（,）,且长度在2-300个字符内。",
            trigger: "blur"
          }
        ],
        aliAppId: [
          {
            required: true,
            message: "支付宝合作ID为必填，用于支付宝APP支付。",
            trigger: "blur"
          }
        ],
        alipayPublicKey: [
          {
            required: true,
            message: "支付宝公钥为必填，用于支付宝APP支付。",
            trigger: "blur"
          }
        ],
        merchantPrivateKey: [
          {
            required: true,
            message: "支付宝商户私钥为必填，用于支付宝APP支付。",
            trigger: "blur"
          }
        ]
      },
      rulesRecharge: {
        min_recharge: [
          {
            required: true,
            message: "最小充值金额不能为空。",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value < 1) {
                callback(new Error("最小充值金额不能小于1"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        online_pay: [
          {
            required: true,
            message: "在线支付开关为必选。",
            trigger: "change"
          }
        ]
      },
      rulesWechatPay: {
        wechatApiV3: [
          {
            required: true,
            message: "微信API V3为必填，用于微信支付。",
            trigger: "blur"
          }
        ],
        wechatAppId: [
          {
            required: true,
            message: "微信APPID为必填，用于微信支付。",
            trigger: "blur"
          }
        ],
        wechatCertKey: [
          {
            required: true,
            message: "微信商户证书私钥为必填，用于微信支付。",
            trigger: "blur"
          }
        ],
        wechatCertNo: [
          {
            required: true,
            message: "微信商户证书序列号为必填，用于微信支付。",
            trigger: "blur"
          }
        ],
        wechatMchId: [
          {
            required: true,
            message: "微信商户号为必填，用于微信支付。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: {
        aliAppId: "",
        alipayPublicKey: "",
        merchantPrivateKey: ""
      },
      visible: false,
      visibleWechat: false,
      confirmLoading: false,
      confirmLoadingWechat: false
    };
  },
  components: {
    // Upload
  },
  created() {
    this.getAlipay();
    this.getWechat();
    console.log(this.formData, "this.formData");
    for (let key in this.formRecharge) {
      this.formRecharge[key] = this.formData[key];
    }
    console.log(this.formRecharge, "this.formRecharge");
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
    // 修改支付宝设置
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          this.form.accountType = "ali";
          this.form.accountConfig = {
            aliAppId: this.form.aliAppId,
            merchantPrivateKey: this.form.merchantPrivateKey,
            alipayPublicKey: this.form.alipayPublicKey
          };
          // console.log(this.form);
          this.$store
            .dispatch("globalBasic/updateAlipayConfig", this.form)
            .then(() => {
              this.$message.success("保存成功");
              this.visible = false;
              this.confirmLoading = false;
              this.form = {
                aliAppId: "",
                alipayPublicKey: "",
                merchantPrivateKey: ""
              };
              this.getAlipay();
            });
        }
      });
    },
    // 修改支付设置
    enterPay() {
      this.$refs.ruleFormRecharge.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("emailSms/modifyAllConfig", this.formRecharge)
            .then(() => {
              this.$message.success("保存成功");
            })
            .finally(() => {
              this.loading = false;
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
    },
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.form.pcPicture = firstImageUrl;
    },
    // 获取支付宝设置
    getAlipay() {
      this.$store
        .dispatch("globalBasic/getAlipayConfig", { accountType: "ali" })
        .then(res => {
          console.log(res);
          this.data = { ...res.data.accountConfig };
        });
    },
    // 获取微信设置
    getWechat() {
      this.$store
        .dispatch("globalBasic/getAlipayConfig", { accountType: "wechat" })
        .then(res => {
          console.log(res, "----------");
          this.getWechatPay = {
            ...res.data.accountConfig,
            ...this.getWechatPay
          };
        });
    },
    showModal() {
      this.visible = true;
    },
    // 修改微信设置回调
    showModalWechat() {
      this.visibleWechat = true;
    },
    handleOk(e) {
      this.onSubmit();
    },
    // 微信支付成功之后的回调
    handleOkWechat(e) {
      // this.visibleWechat = false;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.formWechatPay, "this.formWechatPay");
          this.$store
            .dispatch("globalBasic/updateAlipayConfig", {
              accountConfig: this.formWechatPay,
              accountType: "wechat"
            })
            .then(res => {
              this.$message.success("保存成功");
              this.$refs.ruleForm.resetFields();
              this.getWechat();
              this.visibleWechat = false;
            });
        }
      });
    },
    // 微信支付关闭之后的回调
    handleCancelWechat(e) {
      this.visibleWechat = false;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
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
