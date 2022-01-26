<template>
  <div class="note-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="通道设置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="首选通道">
              <a-select default-value="ZKEYS短信" style="width: 120px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="备用通道">
              <a-select default-value="ZKEYS短信" style="width: 120px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="模板信息设置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="网站名称">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="网站地址">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="服务热线">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="短信通道一">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="通道">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="Apild">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="密钥(ApiKey)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="签名(Signature)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="测试通道">
              <a-row :gutter="5">
                <a-col :span="14">
                  <a-input v-model="form.linkSort" />
                </a-col>
                <a-col :span="10">
                  <a-button type="primary">
                    测试发送
                  </a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="短信通道二">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="通道">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="账号(Acount)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="密码(Password)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="授权码(AuthCode)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="接口白名单IP">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="通道编码(Channel)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="签名(Signature)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="测试通道">
              <a-row :gutter="5">
                <a-col :span="14">
                  <a-input v-model="form.linkSort" />
                </a-col>
                <a-col :span="10">
                  <a-button type="primary">
                    测试发送
                  </a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="5" header="短信通道三">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="通道">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="AppId">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="签名(SignName)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="测试通道">
              <a-row :gutter="5">
                <a-col :span="14">
                  <a-input v-model="form.linkSort" />
                </a-col>
                <a-col :span="10">
                  <a-button type="primary">
                    测试发送
                  </a-button>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="6" header="短信通道四">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="通道">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="请求地址">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="会员ID">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="接口秘钥">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="签名(SignName)">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="测试通道">
              <a-row :gutter="5">
                <a-col :span="14">
                  <a-input v-model="form.linkSort" />
                </a-col>
                <a-col :span="10">
                  <a-button type="primary">
                    测试发送
                  </a-button>
                </a-col>
              </a-row>
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
  components: {},
  methods: {
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.form.pcPicture = firstImageUrl;
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
