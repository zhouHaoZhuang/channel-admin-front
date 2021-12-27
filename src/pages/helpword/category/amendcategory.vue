<template>
  <div class="add-category-container">
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
        <a-form-model-item label="名称" prop="title">
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="英文名称" prop="describe">
          <a-input v-model="form.describe" />
        </a-form-model-item>
        <!-- 传图片 -->
        <a-form-model-item label="ICON图标">
          <div class="addimages">
            <Upload :defaultFile="form.pcPicture" @change="pcImgChange" />
            <span>注：推荐尺寸:1920*660，不超过500kb</span>
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
        sort: 0,
        pcPicture: "",
        phonePicture: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "必填，名称必须是中文或英文组成，且在20个字以内。",
            trigger: "blur"
          }
        ],
        describe: [
          {
            required: true,
            message: "必填，名称必须是中文或英文组成，且在20个字以内。",
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
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.form.pcPicture = firstImageUrl;
    },
    // 上传手机图片
    mbImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调asaswasas", urlList, firstImageUrl);
      this.form.phonePicture = firstImageUrl;
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("banner/add", this.form)
            .then(res => {
              this.$message.success("新增轮播图成功");
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
.add-category-container {
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
