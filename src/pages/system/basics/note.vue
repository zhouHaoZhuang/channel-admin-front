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
            <a-form-model-item label="首选通道" prop="zkeys">
              <a-select default-value="ZKEYS短信" v-model="form.zkeys" style="width: 120px">
                <a-select-option value="ZKEYS短信">
                  ZKEYS短信
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <!-- <a-form-model-item label="备用通道">
              <a-select default-value="ZKEYS短信" style="width: 120px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
              </a-select>
            </a-form-model-item> -->
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
        </a-collapse-panel>
        <a-collapse-panel key="3" header="短信签名配置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="签名" prop="sign_name">
              <div slot="help">
                签名发送自带【】符号，无需添加【】，(),[]符号，避免重复<br />
                请勿填写如“客户服务”，“友情提醒”等过于宽泛内容、以及“测试”字样的签名。签名/模板申请规范
              </div>
              <a-input
                v-model="form.sign_name"
                placeholder="长度限2-12个字符，建议为用户真实应用名/网站名/功能名"
              />
            </a-form-model-item>
            <a-form-model-item
              label="签名来源"
              help="未上线应用测试阶段可先申请企事业单位名，待应用上线后再申请应用签名"
              prop="sign_source"
            >
              <a-select v-model="form.sign_source" placeholder="请选择签名来源">
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
                placeholder="请填写场景说明，可提升通过率"
                type="textarea"
              />
            </a-form-model-item>
            <a-form-model-item label="三证合一" prop="threeCert">
              <div slot="help">
                请上传签名归属方的企业营业执照、组织机构代码证、税务登记证
                <a
                  href="https://img.alicdn.com/tfs/TB1_HiGeLDH8KJjy1XcXXcpdXXa-950-1430.jpg"
                  target="_blank"
                  >三证合一</a
                >的证明支持jpg、png、gif、jpeg格式的图片，每张图片不大于2MB
              </div>
              <Upload
                :defaultFile="form.threeCert"
                :size='2'
                @change="
                  ({ urlList, firstImageUrl,base64List }) =>
                    pcImgChange(urlList, firstImageUrl, base64List,'threeCert')
                "
              />
            </a-form-model-item>
            <a-form-model-item label="委托授权书" prop="entrust">
              <div slot="help">
                下载
                <a
                  href="https://files.alicdn.com/tpsservice/8d2adf3abd677b668b70cf50c0d53bc4.doc"
                  download="委托授权书模板.doc"
                >
                  委托授权书模板
                </a>
                ，点击查看
                <a @click="tzminwin">授权委托书使用方式</a>
                <br />
                支持jpg、png、gif、jpeg格式的图片，每张图片不大于2MB
              </div>
              <Upload
                :defaultFile="form.entrust"
                @change="
                  ({ urlList, firstImageUrl }) =>
                    pcImgChange(urlList, firstImageUrl, 'entrust')
                "
              />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
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
import Upload from "@/components/Upload/index";
export default {
  components: {
    Upload
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
      form: {
        sign_name: "",
        sign_source: "",
        remark: "",
        aisle: "",

        threeCert: "",
        entrust: "",
        zkeys: "ZKEYS短信",
        linkSort: ""
      },
      rules: {
        zkeys: [
          {
            required: true,
            message: "必选，用于设置首选通道",
            trigger: "change"
          }
        ],
        sign_name: [
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
        sign_source: [
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
        threeCert: [
          {
            required: true,
            trigger: ["change", "blur"],
            message: "必传，请选择证书"
          }
        ],
        entrust: [
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
  methods: {
    pcImgChange(urlList, firstImageUrl,base64List, type) {
      console.log("上传图片回调99999", urlList, base64List,firstImageUrl);
      this.form[type] = firstImageUrl;
    },
    tzminwin() {
      window.open(
        "//help.aliyun.com/document_detail/56741.htm",
        "newwindow",
        "height=700, width=600, top=100, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=0,location=no, status=no"
      );
    },
    // 获取短信签名配置
    getNoteConfig() {
      this.$store.dispatch("note/getNoteConfig").then(res => {
        this.form = res.data;
      });
    },
    onSubmit() {
      // this.$confirm({
      //   title: "确定要删除吗?",
      //   onOk: () => {
      //     this.$store.dispatch("helpCategory/delList", id).then(val => {
      //       this.$message.success("操作成功");
      //       this.getList();
      //     });
      //   }
      // });
      this.$refs.ruleForm.validate(valid => {
        // console.log(valid);
        console.log(this.form);
        if (valid) {
          this.$confirm({
            title: "确定要保存设置吗？",
            onOk: () => {
              this.$store
                .dispatch("note/modifyNoteConfig", this.form)
                .then(() => {
                  this.$message.success("保存成功");
                })
                .finally(() => {
                  this.getNoteConfig();
                });
            }
          });
        }
      });
      // this.$confirm({
      //   title: "确定要保存设置吗？",
      //   onOk: () => {
      //     this.$refs.ruleForm.validate(valid => {
      //       // console.log(valid);
      //       console.log(this.form);
      //       if (valid) {
      //         // this.$store
      //         //   .dispatch("note/modifyNoteConfig", this.form)
      //         //   .then(() => {
      //         //     this.$message.success("保存成功");
      //         //   })
      //         //   .finally(() => {
      //         //     this.getNoteConfig();
      //         //   });
      //       }
      //     });
      //   }
      // });
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
