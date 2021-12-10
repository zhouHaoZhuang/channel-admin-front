<template>
  <div class="add-banner-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="类型">
          <a-select v-model="form.bannerType" placeholder="首页banner">
            <a-select-option :value="0">
              首页banner
            </a-select-option>
            <a-select-option :value="1">
              云服务器banner
            </a-select-option>
            <a-select-option :value="2">
              帮助中心banner
            </a-select-option>
            <a-select-option :value="3">
              新闻公告banner
            </a-select-option>
            <a-select-option :value="4">
              关于我们banner
            </a-select-option>
            <a-select-option :value="5">
              登录banner
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="标题" prop="title">
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="describe">
          <a-input v-model="form.describe" />
        </a-form-model-item>
        <a-form-model-item label="PC版标题和描述">
          <a-radio-group v-model="form.display">
            <a-radio :value="true">
              展示
            </a-radio>
            <a-radio :value="false">
              隐藏
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="PC版按钮名称">
          <a-input v-model="form.pcButtonName" />
        </a-form-model-item>
        <a-form-model-item label="PC版按钮链接">
          <a-input v-model="form.pcButtonLink" />
        </a-form-model-item>
        <a-form-model-item label="全图链接">
          <a-input v-model="form.pictureLink" />
        </a-form-model-item>
        <a-form-model-item label="链接打开方式">
          <a-radio-group v-model="form.openLinkType">
            <a-radio :value="0">
              新标签
            </a-radio>
            <a-radio :value="1">
              当前页面
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              正常
            </a-radio>
            <a-radio :value="1">
              不显示
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input v-model="form.sort" />
          <span>注：越小越靠前</span>
        </a-form-model-item>
        <!-- 传图片 -->
        <a-form-model-item label="上传PC图片">
          <div class="addimages">
            <Upload :defaultFileList="imgList" @change="imgChange" />
            <span>注：推荐尺寸:1920*660，不超过500kb</span>
          </div>
        </a-form-model-item>
        <a-form-model-item label="上传手机图片">
          <div class="addimages">
            <Upload :defaultFileList="imgList" @change="imgChange" />
            <span>注：推荐尺寸:640*560,不超过500kb</span>
          </div>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            确定添加
          </a-button>
        </a-form-model-item>
      </a-form-model>
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
      wrapperCol: { span: 18 },
      form: {
        bannerType: 0,
        title: "",
        describe: "",
        display: true,
        pcButtonName: "",
        pcButtonLink: "",
        openLinkType: "",
        status: 0,
        sort: 0
      },
      rules: {
        title: [
          {
            required: true,
            message: "必填，长度为1-15个字符。",
            trigger: "blur"
          }
        ],
        describe: [
          {
            required: true,
            message: "非必填，可输入0-100个字符。",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  components: {
    Upload
  },
  methods: {
    //上传图片
    imgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.imgList = urlList;
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("banner/add", this.form)
            .then(res => {
              this.$message.success("新增列表成功");
              this.resetForm();
              this.$router.back();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {};
    }
  }
};
</script>

<style lang="less" scoped>
.add-banner-container {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
    // .addimages {
    //   margin-left: 150px;
    // }
  }
}
</style>
