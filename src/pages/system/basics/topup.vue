<template>
  <div class="topup-container">
    <div class="content">
      <div>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="首选充值方式">
            <a-radio-group v-model="form.status">
              <a-radio :value="0">
                微信
              </a-radio>
              <a-radio :value="1">
                支付宝
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="最小充值金额">
            <a-input v-model="form.linkSort" />
          </a-form-model-item>
          <a-form-model-item label="订单在线支付">
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
      </div>
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="支付宝设置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="支付宝PC充值开关">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="支付宝银行支付开关">
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
            </a-form-model-item>
            <a-form-model-item label="签名方式">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  MD5
                </a-radio>
                <a-radio :value="1">
                  RSA
                </a-radio>
                <a-radio :value="2">
                  RSA2
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="支付宝合作ID">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="支付宝密钥">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="微信支付设置">
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
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";

export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 5 },
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
        ]
      },
      loading: false,
      data: []
    };
  },
  components: {
    Upload
  },
   methods: {
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.form.pcPicture = firstImageUrl;
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
}
</style>
