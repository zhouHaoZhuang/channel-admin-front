<template>
  <div class="note-container">
    <div class="content">
      <div>
        <p>
          当前短信签名：{{ "赛拉云" }}<a @click="showModal">变更短信签名</a>
        </p>
        <p>
          变更时间：<span v-if="changeTime">{{ changeTime | formatDate }}</span>
        </p>
      </div>
      <a-modal
        title="变更短信签名"
        :forceRender="true"
        :centered="true"
        width="80%"
        :visible="visible"
        :confirm-loading="confirmLoading"
        okText="提交"
        @ok="onSubmit"
        @cancel="handleCancel"
      >
        <!-- <a-collapse-panel
          key="2"
          header="模板信息设置"
          forceRender
        >
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item
              label="网站名称"
              help="注：网站名称将用于短信邮件模板中,标签为 {firmName}"
            >
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item
              label="网站地址"
              help="注：网站地址将用于短信邮件模板中，格式如 http://www.apayun.com,标签为 {firmUrl}"
            >
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item
              label="服务热线"
              help="注：服务热线将用于短信邮件模板中,标签为 {firmPhone}"
            >
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel> -->
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="签名" prop="signName">
            <div slot="help">
              签名不区分大小写字母，请避免申请重复签名<br />
              签名发送自带【】符号，无需添加【】，(),[]符号，避免重复<br />
              请勿填写如“客户服务”，“友情提醒”等过于宽泛内容、以及“测试”字样的签名。
            </div>
            <a-input
              v-model="form.signName"
              placeholder="长度限2-12个字符，建议为用户真实应用名/网站名/公司名"
            />
          </a-form-model-item>
          <a-form-model-item label="签名来源" prop="signSource">
            <a-select v-model="form.signSource" placeholder="请选择签名来源">
              <a-select-option
                :value="item.key"
                v-for="item in signSourceList"
                :key="item.key"
              >
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="场景说明" prop="remark">
            <a-input
              v-model="form.remark"
              placeholder="下单通知、付款通知、发货通知、留言通知、评论通知"
              type="textarea"
            />
          </a-form-model-item>
          <a-form-model-item label="三证合一" prop="certificates">
            <div slot="help">
              请上传签名归属方执照，注意：1、公章为红色且清晰；2、上传有效期内执照；3、执照请勿自行涂改；4、支持jpg、png、gif、jpeg格式，图片不大于2MB
            </div>
            <div class="sample-graph">
              <Upload
                class="upload"
                :defaultFile="form.certificates"
                :size="2"
                :limit="3"
                @change="
                  ({ urlList, firstImageUrl, base64List }) =>
                    pcImgChange(
                      urlList,
                      firstImageUrl,
                      base64List,
                      'certificates'
                    )
                "
              />
              <div class="sample-img">
                <a
                  href="https://img.alicdn.com/tfs/TB1_HiGeLDH8KJjy1XcXXcpdXXa-950-1430.jpg"
                  target="_blank"
                >
                  <img
                    width="50px"
                    src="https://img.alicdn.com/tfs/TB1_HiGeLDH8KJjy1XcXXcpdXXa-950-1430.jpg"
                    alt=""
                  />
                </a>
                <div>示例图</div>
              </div>
            </div>
          </a-form-model-item>
          <a-form-model-item label="委托授权书" prop="authorizations">
            <div slot="help">
              下载
              <a
                href="https://files.alicdn.com/tpsservice/8d2adf3abd677b668b70cf50c0d53bc4.doc"
                download="委托授权书模板.doc"
              >
                委托授权书模板 </a
              >，注意：1、授权双方不可颠倒；2、信息填写需完整；3、需签字、加盖红章；4、支持jpg、png、gif、jpeg格式，图片不大于2MB
            </div>
            <Upload
              :defaultFile="form.authorizations"
              :size="2"
              @change="
                ({ urlList, firstImageUrl, base64List }) =>
                  pcImgChange(
                    urlList,
                    firstImageUrl,
                    base64List,
                    'authorizations'
                  )
              "
            />
          </a-form-model-item>
        </a-form-model>
        <!-- <a-form-model-item label="审核结果" prop="status">
            <a-radio-group v-model="form.status">
              <a-radio :value="0" :disabled="form.status !== 0">
                审核中
              </a-radio>
              <a-radio :value="1" :disabled="form.status !== 1">
                审核成功
              </a-radio>
              <a-radio :value="2" :disabled="form.status !== 2">
                审核未通过
              </a-radio>
            </a-radio-group>
          </a-form-model-item> -->
        <!-- <a-collapse-panel key="3" header="短信通道一">
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
        </a-collapse-panel>-->
        <!-- <div class="backstage">
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
        </div> -->
      </a-modal>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
export default {
  components: {
    Upload
  },
  data() {
    return {
      changeTime: undefined,
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      form: {
        signName: "",
        signSource: "",
        remark: "",
        aisle: "",
        signFileList: [],
        certificates: "",
        certificatesBase64List: [],
        authorizations: "",
        authorizationsBase64List: [],
        zkeys: "赛拉云短信",
        linkSort: ""
      },
      visible: false,
      confirmLoading: false,
      rules: {
        zkeys: [
          {
            required: true,
            message: "必选，用于设置首选通道",
            trigger: "change"
          }
        ],
        signName: [
          {
            required: true,
            message: "必填，用于设置短信签名",
            trigger: ["change", "blur"]
          },
          {
            min: 2,
            max: 12,
            message: "长度限2-12个字符",
            trigger: ["change", "blur"]
          }
        ],
        signSource: [
          {
            required: true,
            message: "必选，用于设置短信签名来源",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: true,
            message: "必填，用于设置短信场景说明",
            trigger: ["change", "blur"]
          }
        ],
        certificates: [
          {
            required: true,
            trigger: ["change", "blur"],
            message: "必传，请选择证书"
          }
        ],
        authorizations: [
          {
            required: true,
            trigger: ["change", "blur"],
            message: "必传，请选择委托授权书"
          }
        ],
        linkName: [
          {
            required: true,
            message:
              "必填，用于站内需显示网站名称的地方，此处以填XX云为例，如：首页的了解XX云，为什么选择XX云，注册时的《XX云服务协议》等，网站名称限制中英文数字以及短横线（-）、下划线（_），且长度在2-20个字符内。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: [],
      headImg: "",
      imageUrl: "",
      type: "",
      signSourceList: [
        {
          title: "企事业单位的全称或简称",
          key: 0
        },
        {
          title: "工信部备案网站的全称或简称",
          key: 1
        },
        {
          title: "App应用的全称或简称",
          key: 2
        },
        {
          title: "公众号或小程序的全称或简称",
          key: 3
        },
        {
          title: "电商平台店铺名的全称或简称",
          key: 4
        },
        {
          title: "商标名的全称或简称",
          key: 5
        }
      ]
    };
  },
  created() {
    this.getChangeTime();
  },
  methods: {
    showModal() {
      this.visible = true;
      this.getNoteConfig();
    },
    // 获取变更时间
    getChangeTime() {
      this.$store.dispatch("note/getChangeTime").then(res => {
        this.changeTime = res.data.modifyTime;
      });
    },
    pcImgChange(urlList, firstImageUrl, base64List, type) {
      console.log("上传图片回调99999", urlList, base64List, firstImageUrl);
      this.form[type + "Base64List"] = base64List;
      this.form[type] = urlList.toString();
    },
    handleOk(e) {
      // this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    // 获取短信签名配置
    getNoteConfig() {
      this.$store.dispatch("note/getNoteConfig").then(res => {
        this.form = { ...this.form, ...res.data };
        if (this.form.certificates.length > 0) {
          this.form.certificates = this.form.certificates.split(",");
        } else {
          this.form.certificates = [];
        }
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true;
          this.form.certificates = this.form.certificates.toString();
          this.form.signFileList = [
            ...this.form.certificatesBase64List,
            ...this.form.authorizationsBase64List
          ];
          console.log(this.form);
          this.$store
            .dispatch("note/modifyNoteConfig", this.form)
            .then(() => {
              this.visible = false;
              this.confirmLoading = false;
              this.$message.success("保存成功");
            })
            .finally(() => {
              this.getNoteConfig();
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
.sample-graph {
  display: flex;
  .upload {
    width: 120px;
  }
  .sample-img {
    text-align: center;
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
  }
}
</style>
