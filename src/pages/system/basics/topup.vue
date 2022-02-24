<template>
  <div class="topup-container">
    <div class="content">
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
      <div>
        <a-form-model
          ref="ruleForm"
          :model="formRecharge"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="首选充值方式">
            <a-radio-group v-model="formRecharge.first_payment">
              <!-- <a-radio :value="0">
                微信
              </a-radio> -->
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
          <a-form-model-item label="最小充值金额">
            <a-input v-model="formRecharge.min_recharge" suffix="元" />
          </a-form-model-item>
          <a-form-model-item label="订单在线支付">
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
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="支付宝设置" v-if="data">
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
        <!-- <a-collapse-panel key="2" header="微信支付设置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="微信PC充值开关">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="微信H5充值开关">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="微信公众号充值开关">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="微信商户号">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="微信密钥">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="微信AppID">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
             <a-form-model-item label="微信Secret">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
             <a-form-model-item label="二维码中央小LOGO">
               <Upload :defaultFile="form.pcPicture" @change="pcImgChange" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel> -->
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
        online_pay: ""
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
      loading: false,
      data: null,
      visible: false,
      confirmLoading: false
    };
  },
  components: {
    // Upload
  },
  created() {
    this.getAlipay();
    console.log(this.formData, "this.formData");
    this.formRecharge = this.formData;
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
      this.$refs.ruleForm.validate(valid => {
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
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.onSubmit();
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
