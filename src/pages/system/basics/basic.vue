<template>
  <div class="basic-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-collapse
          default-active-key="1"
          :bordered="false"
          class="aa"
          :forceRender="true"
        >
          <a-collapse-panel key="1" header="网站基本信息">
            <a-form-model-item
              ref="websiteName"
              label="网站标题"
              prop="websiteName"
            >
              <a-input v-model="form.websiteName" />
            </a-form-model-item>
            <a-form-model-item label="网站名称" prop="title" ref="title">
              <a-input v-model="form.title" />
            </a-form-model-item>
            <a-form-model-item label="网站关键字" prop="keyWords">
              <a-input v-model="form.keyWords" />
            </a-form-model-item>
            <a-form-model-item label="网站描述">
              <a-input v-model="form.describe" type="textarea" />
            </a-form-model-item>
            <a-form-model-item
              label="交换地址链接"
              prop="internationalSiteAddress"
            >
              <a-input v-model="form.internationalSiteAddress" />
            </a-form-model-item>
            <a-form-model-item label="ICP备案" prop="recordNo">
              <a-input v-model="form.recordNo" />
            </a-form-model-item>
            <a-form-model-item label="公安备案" prop="publicSecurityRecord">
              <a-input v-model="form.publicSecurityRecord" />
            </a-form-model-item>
            <!-- <a-form-model-item
              label="国际站点地址"
              prop="internationalSiteAddress"
            >
              <a-input v-model="form.internationalSiteAddress" />
            </a-form-model-item> -->
            <a-form-model-item label="版权信息">
              <a-input v-model="form.copyRightInfo" />
            </a-form-model-item>
            <a-form-model-item label="底部信息">
              <a-input v-model="form.bottomInfo" type="textarea" />
            </a-form-model-item>
            <a-form-model-item label="百度统计">
              <a-textarea
                v-model="form.statisticalCode"
                :auto-size="{ minRows: 3 }"
              />
            </a-form-model-item>
          </a-collapse-panel>
          <!-- <a-collapse-panel key="2" header="网站模板">
            <a-form-model-item label="主题风格">
              <a-row>
                <a-col :span="7">
                  <a-form-model-item label="官网">
                    <a-select default-value="lucy" style="width: 120px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="7">
                  <a-form-model-item label="后台">
                    <a-select default-value="lucy" style="width: 120px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="10">
                  <a-form-model-item label="用户中心">
                    <a-select default-value="lucy" style="width: 120px">
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                      <a-select-option value="lucy">
                        Lucy
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="开启手机版">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="用户中心手机版">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-collapse-panel> -->
          <a-collapse-panel key="3" header="公司基本信息">
            <a-form-model-item label="公司名称" prop="companyName">
              <a-input v-model="form.companyName" />
            </a-form-model-item>
            <a-form-model-item label="公司地址" prop="companyAddress">
              <a-input v-model="form.companyAddress" />
            </a-form-model-item>
            <a-form-model-item label="邮编" prop="postCode">
              <a-input v-model="form.postCode" />
            </a-form-model-item>
            <a-form-model-item label="服务热线" prop="serverPhone">
              <a-input v-model="form.serverPhone" />
            </a-form-model-item>
            <a-form-model-item label="商务洽谈" prop="businessPhone">
              <a-input v-model="form.businessPhone" />
            </a-form-model-item>
            <a-form-model-item label="QQ号码" prop="qqNumber">
              <a-input v-model="form.qqNumber" />
            </a-form-model-item>
            <a-form-model-item label="QQ类型">
              <a-radio-group v-model="form.qqType">
                <a-radio :value="0">
                  营销QQ
                </a-radio>
                <a-radio :value="1">
                  个人QQ/企业员工QQ
                </a-radio>
                <a-radio :value="2">
                  企点QQ
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <!-- <a-form-model-item label="微博链接地址">
              <a-input v-model="form.webLink" />
            </a-form-model-item> -->
            <a-form-model-item label="邮箱" prop="email">
              <a-input v-model="form.email" />
            </a-form-model-item>
            <a-form-model-item label="公司账户开户行">
              <a-input v-model="form.openBank" />
            </a-form-model-item>
            <a-form-model-item label="公司银行账号" prop="bankAccount">
              <a-input v-model="form.bankAccount" />
            </a-form-model-item>
          </a-collapse-panel>
          <a-collapse-panel key="4" header="网站logo信息">
            <div class="addimages">
              <a-form-model-item label="上传用户中心小LOGO">
                <Upload
                  :defaultFile="form.userCenterMiniLogo"
                  @change="
                    ({ urlList, firstImageUrl }) =>
                      imgChange(urlList, firstImageUrl, 'userCenterMiniLogo')
                  "
                />
                <span>注：推荐尺寸:37*36</span>
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="上传用户中心大LOGO">
                <Upload
                  :defaultFile="form.userCenterLogo"
                  @change="
                    ({ urlList, firstImageUrl }) =>
                      imgChange(urlList, firstImageUrl, 'userCenterLogo')
                  "
                />
                <span>注：推荐尺寸:107*38</span>
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="官网LOGO">
                <Upload
                  :defaultFile="form.websiteLogo"
                  @change="
                    ({ urlList, firstImageUrl }) =>
                      imgChange(urlList, firstImageUrl, 'websiteLogo')
                  "
                />
                <span>注：推荐尺寸:122*44</span>
              </a-form-model-item>
            </div>
            <!-- <div class="addimages">
              <a-form-model-item label="手机网站logo">
                <Upload
                  :defaultFile="form.phoneLogo"
                  @change="
                    ({ urlList, firstImageUrl }) =>
                      imgChange(urlList, firstImageUrl, 'phoneLogo')
                  "
                />
                <span>注：推荐尺寸:130*40</span>
              </a-form-model-item>
            </div> -->
            <!-- <div class="addimages">
              <a-form-model-item label="关注微信二维码">
                <Upload
                  :defaultFile="form.wechatQrCode"
                  @change="
                    ({ urlList, firstImageUrl }) =>
                      imgChange(urlList, firstImageUrl, 'wechatQrCode')
                  "
                />
                <span>注：推荐尺寸:120*120</span>
              </a-form-model-item>
            </div> -->
            <div class="addimages">
              <a-form-model-item label="网站ICO图标">
                <Upload
                  :defaultFile="form.websitieIcon"
                  @change="
                    ({ urlList, firstImageUrl }) =>
                      imgChange(urlList, firstImageUrl, 'websitieIcon')
                  "
                />
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="管理平台logo" help="推荐尺寸114*50px">
                <Upload
                  :defaultFile="form.adminCenterLogo"
                  @change="
                    ({ urlList, firstImageUrl }) =>
                      imgChange(urlList, firstImageUrl, 'adminCenterLogo')
                  "
                />
              </a-form-model-item>
            </div>
          </a-collapse-panel>
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
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 13 },
      form: {
        websiteName: "",
        title: "",
        keyWords: "",
        describe: "",
        recordNo: "",
        internationalSiteAddress: "",
        copyRightInfo: "",
        bottomInfo: "",
        statisticalCode: "",
        userCenterMiniLogo: "",
        adminCenterLogo: "",
        userCenterLogo: "",
        websiteLogo: "",
        wechatQrCode: "",
        websitieIcon: "",
        companyName: "",
        postCode: "",
        serverPhone: "",
        businessPhone: "",
        qqNumber: "",
        qqType: 0,
        companyAddress: "",
        webLink: "",
        email: "",
        openBank: "",
        bankAccount: "",
        id: "",
        phoneLogo: "",
        publicSecurityRecord: "",

        linkName: "",
        status: 0
      },
      rules: {
        websiteName: [
          {
            required: true,
            message: "必填，用于网站首页的标题展示，且长度在2-100字以内。",
            trigger: "blur"
          },
          { min: 2, max: 100, message: "长度在2-100个字符内", trigger: "blur" }
        ],
        title: [
          {
            required: true,
            message:
              "必填，用于站内需显示网站名称的地方，此处以填XX云为例，如：首页的了解XX云，为什么选择XX云，注册时的《XX云服务协议》等，网站名称限制中英文数字以及短横线（-）、下划线（_）。",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2-20个字符内", trigger: "blur" }
        ],
        keyWords: [
          {
            required: true,
            message:
              "必填，代表了网站的市场定位，可用于搜索引擎的条件，如填写XX云，百度搜索XX云，将出现本站点首页，关键词限制中英文数字以及短横线（-）、下划线（_）、半角逗号（,）,且长度在2-300个字符内。",
            trigger: "blur"
          },
          { min: 2, max: 300, message: "长度在2-300个字符内", trigger: "blur" }
        ],
        recordNo: [
          { min: 2, max: 100, message: "长度在2-100个字符内", trigger: "blur" }
        ],
        companyName: [
          {
            required: true,
            message: "公司名称为必填",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2-30个字符内", trigger: "blur" }
        ],
        companyAddress: [
          {
            required: true,
            message: "公司地址为必填",
            trigger: "blur"
          },
          { min: 2, max: 100, message: "长度在2-100个字符内", trigger: "blur" }
        ],
        postCode: [
          {
            required: true,
            message: "邮编为必填",
            trigger: "blur"
          },
          { min: 0, max: 6, message: "长度在0-6个字符内", trigger: "blur" },
          { pattern: /^[0-9]*$/, message: "请输入数字", trigger: "blur" }
        ],
        serverPhone: [
          { min: 5, max: 30, message: "长度在5-30个字符内", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9()-/]*$/,
            message:
              "请输入正确格式,服务热线格式可由短横杆（-）、半角括号()、数字、英文字母组成，多个服务热线请使用 / 分隔",
            trigger: "blur"
          }
        ],
        qqNumber: [
          { pattern: /^[0-9]*$/, message: "请输入数字", trigger: "blur" }
        ],
        businessPhone: [
          {
            pattern: /^[A-Za-z0-9()-/]*$/,
            message:
              "请输入正确格式,服务热线格式可由短横杆（-）、半角括号()、数字、英文字母组成，多个服务热线请使用 / 分隔",
            trigger: "blur"
          },
          { min: 11, max: 35, message: "长度在11-35个字符内", trigger: "blur" }
        ],
        email: [
          // {
          //   required: true,
          //   message: "邮箱为必填",
          //   trigger: "blur"
          // },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        bankAccount: [
          {
            pattern: /^[0-9]*$/,
            message: "请输入数字",
            trigger: "blur"
          }
        ],
        internationalSiteAddress: [
          {
            pattern: /(http|https):\/\/([\w.]+\/?)\S*/,
            message: "网址格式不正确,应该以http或https开头",
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
  created() {
    this.getInfo();
    this.getBasicCompanyInfo();
  },
  methods: {
    imgChange(urlList, firstImageUrl, type) {
      console.log("上传图片回调", urlList, firstImageUrl, type);
      this.form[type] = firstImageUrl;
    },
    onSubmit() {
      // console.log(this.form);
      this.$refs.ruleForm.validate(valid => {
        console.log(valid);
        if (valid) {
          this.$store.dispatch("globalBasic/amendInfo", this.form).then(res => {
            // console.log(res, "--------");
            this.$message.success("网站信息保存成功");
            this.getInfo();
          });
          this.$store
            .dispatch("globalBasic/amendBasicCompanyInfo", this.form)
            .then(res => {
              this.$message.success("公司信息保存成功");
              this.getBasicCompanyInfo();
            });
        }
      });
    },
    getInfo() {
      this.$store.dispatch("globalBasic/getInfo").then(res => {
        // 获取网站详情、网站logo信息
        this.form = { ...this.form, ...res.data };
        this.form.gid = res.data.id;
      });
    },
    getBasicCompanyInfo() {
      this.$store.dispatch("globalBasic/getBasicCompanyInfo").then(res => {
        // 获取公司基本信息接口
        this.form = {
          ...this.form,
          ...res.data
        };
        this.form.cid = res.data.id;
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
