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
        <a-form-model-item label="所属分类">
          <a-select v-model="form.typeCode" placeholder="顶级分类">
            <a-select-option :value="0">
              顶级分类
            </a-select-option>
            <a-select-option :value="1">
              注册与购买
            </a-select-option>
            <a-select-option :value="2">
              云服务器问题
            </a-select-option>
            <a-select-option :value="3">
              备案问题
            </a-select-option>
            <a-select-option :value="4">
              使用规则
            </a-select-option>
            <a-select-option :value="5">
              法律法规
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="名称" prop="typeName">
          <a-input v-model="form.typeName" />
        </a-form-model-item>
        <a-form-model-item label="英文名称" prop="typeNameEn">
          <a-input v-model="form.typeNameEn" />
        </a-form-model-item>
        <!-- 传图片 -->
        <a-form-model-item label="ICON图标">
          <div class="addimages">
            <Upload :defaultFile="form.typeIcon" @change="pcImgChange" />
            <span>注:推荐尺寸:1920*660，不超过500kb</span>
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
        typeSort: 0,
        typeIcon: "",
        typeNameEn:"",
        typeName:"",
        typeCode:"",
        parentCode:"",
        channelCode:"",
        phonePicture: ""
      },
      rules: {
        typeName: [
          {
            required: true,
            message: "必填，名称必须是中文或英文组成，且在20个字以内。",
            trigger: "blur"
          }
        ],
        typeNameEn: [
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
      this.form.typeIcon = firstImageUrl;
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
            .dispatch("category/add", this.form)
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
