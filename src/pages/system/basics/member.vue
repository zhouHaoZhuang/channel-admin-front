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
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="密码长度" prop="linkName">
              <a-row :gutter="1">
                <a-col :span="6">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="1">
                  -
                </a-col>
                <a-col :span="6">
                  <a-input v-model="form.linkName" />
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="每个IP限制注册" prop="linkUrl">
              <a-row :gutter="2">
                <a-col :span="6">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="3">
                  <div>个账号，在</div>
                </a-col>
                <a-col :span="6">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="4">
                  <div>小时内</div>
                </a-col>
              </a-row>
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
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="开启异地登录验证">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="会员登录">
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
            </a-form-model-item>
            <a-form-model-item label="密码错误次数达到" prop="linkName">
              <a-row :gutter="1">
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="5">
                  <div>次，锁定账号，锁定</div>
                </a-col>
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="5">
                  <div>分钟</div>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="登录失败次数达到" prop="linkUrl">
              <a-row :gutter="1">
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="5">
                  <div>次，锁定IP，锁定</div>
                </a-col>
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="5">
                  <div>分钟</div>
                </a-col>
              </a-row>
            </a-form-model-item>
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
            <a-form-model-item
              label="每个IP/会员限发送短信验证码"
              prop="linkName"
            >
              <a-row :gutter="1">
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="2">
                  <div>次，在</div>
                </a-col>
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="5">
                  <div>小时内</div>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item
              label="每个IP/会员限发送邮件验证码"
              prop="linkName"
            >
              <a-row :gutter="1">
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="2">
                  <div>次，在</div>
                </a-col>
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="5">
                  <div>小时内</div>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item
              label="每小时全站限制验证码发送条数"
              prop="linkName"
            >
              <a-row :gutter="1">
                <a-col :span="5">
                  <a-input v-model="form.linkName" />
                </a-col>
                <a-col :span="5">
                  <div>条</div>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="6" header="客服">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="开启专属客服专员">
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
        </a-collapse-panel>
      </a-collapse>
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
      imgList: [
        // "http://yd-idc.oss-cn-beijing.aliyuncs.com/266a3b29-36c1-42ea-acaf-0d8ba0482ac2.jpg"
      ],
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
  components: {},
  methods: {
    imgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.imgList = urlList;
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
