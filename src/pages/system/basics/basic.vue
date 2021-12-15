<template>
  <div class="basic-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="网站基本信息">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="网站名称" prop="linkName">
              <a-input v-model="form.linkName" />
            </a-form-model-item>
            <a-form-model-item label="首页标题" prop="linkUrl">
              <a-input v-model="form.linkUrl" />
            </a-form-model-item>
            <a-form-model-item label="网站关键字" prop="linkDescribe">
              <a-input v-model="form.linkDescribe" />
            </a-form-model-item>
            <a-form-model-item label="网站描述">
              <a-input v-model="form.linkSort" type="textarea" />
            </a-form-model-item>
            <a-form-model-item label="备案编号">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="国际站点地址">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="版权信息">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="底部信息">
              <a-input v-model="form.linkSort" type="textarea" />
            </a-form-model-item>
            <a-form-model-item label="统计代码">
              <a-input v-model="form.linkSort" type="textarea" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="网站模板">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="主题风格">
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
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="公司基本信息">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="公司名称">
              <a-input v-model="form.linkName" />
            </a-form-model-item>
            <a-form-model-item label="公司地址">
              <a-input v-model="form.linkUrl" />
            </a-form-model-item>
            <a-form-model-item label="邮编">
              <a-input v-model="form.linkDescribe" />
            </a-form-model-item>
            <a-form-model-item label="服务热线">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="商务洽谈">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="QQ号码">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="QQ类型">
              <a-radio-group v-model="form.status">
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
            <a-form-model-item label="微博链接地址">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="邮箱">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="公司账户开户行">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
            <a-form-model-item label="公司银行账号">
              <a-input v-model="form.linkSort" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="网站logo信息">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <div class="addimages">
              <a-form-model-item label="上传用户中心小LOGO">
                <Upload :defaultFileList="imgList" @change="imgChange" />
                <span>注：推荐尺寸:37*36</span>
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="上传用户中心大LOGO">
                <Upload :defaultFileList="imgList" @change="imgChange" />
                <span>注：推荐尺寸:107*38</span>
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="官网LOGO">
                <Upload :defaultFileList="imgList" @change="imgChange" />
                <span>注：推荐尺寸:122*44</span>
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="手机网站logo">
                <Upload :defaultFileList="imgList" @change="imgChange" />
                <span>注：推荐尺寸:130*40</span>
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="关注微信二维码">
                <Upload :defaultFileList="imgList" @change="imgChange" />
                <span>注：推荐尺寸:120*120</span>
              </a-form-model-item>
            </div>
            <div class="addimages">
              <a-form-model-item label="网站ICO图标">
                <Upload :defaultFileList="imgList" @change="imgChange" />
              </a-form-model-item>
            </div>
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>
      <div class="backstage">
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
            <a-form-model-item :wrapper-col="{span:18,offset:6}">
              <a-button type="primary" @click="onSubmit" :loading="loading">
                保存设置
              </a-button>
            </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
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
}
</style>
