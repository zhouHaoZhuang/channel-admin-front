<template>
  <div class="add-blogroll-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="页面名称" prop="pageName">
          <a-input v-model="form.pageName" />
        </a-form-model-item>
        <a-form-model-item label="页面标题" prop="pageTitle">
          <a-input v-model="form.pageTitle" />
        </a-form-model-item>
        <a-form-model-item label="关键词" type="keyWords">
          <a-input v-model="form.keyWords" />
        </a-form-model-item>
         <a-form-model-item label="描述" type="describe" >
          <a-input v-model="form.describe" />
        </a-form-model-item>
        <a-form-model-item label="访问地址" type="resourceAddress">
          <a-input v-model="form.resourceAddress" />
        </a-form-model-item>
        <!-- <a-form-model-item label="模板文件名">
          <a-select v-model="form.modeFileName" placeholder="公有云商">
            <a-select-option
              v-for="item in data"
              :key="item.linkTypeCode"
              :value="item.linkTypeCode"
            >
              {{ item.linkTypeName }}
            </a-select-option>
          </a-select>
        </a-form-model-item> -->
         <a-form-model-item label="banner图">
          <div class="addimages">
            <Upload :defaultFile="form.bannerPicture" @change="pcImgChange" />
            <span>注：推荐尺寸:1920*660，不超过500kb</span>
          </div>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              开启
            </a-radio>
            <a-radio :value="1">
              关闭
            </a-radio>
          </a-radio-group>
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
          bannerPicture:"",
          // channelCode:"",
          context:"",
          describe:"",
          keyWords:"",
          modeFileName:"",
          pageName:"",
          pageTitle:"",
          resourceAddress:"",
          status:"",
          id:""
        // linkTypeName: "",
        // linkTypeCode: "",
        // linkName: "",
        // linkUrl: "",
        // linkDescribe: "",
        // bottomShow: 0,
        // status: 0,
        // linkSort: 0,
        // channelCode: "",
        // linkLogo: "",
        // linkTypeSort: 0
      },
      rules: {
        linkName: [
          {
            required: true,
            message: "必填，链接名称长度必须在2-50之间。",
            trigger: "blur"
          }
        ],
        linkUrl: [
          {
            required: true,
            message: "必填，链接URL长度必须在2-50之间。",
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
    this.getList();
     this.form.id = this.$route.query.id;
  },
  methods: {
    //查询数据表格
    getList() {
      this.$store.dispatch("page/getList").then(res => {
        console.log(res);
        this.data = res.data.list;
      });
    },
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.form.bannerPicture = firstImageUrl;
    },
    // 提交
    onSubmit() {
      // this.form.linkLogo = this.imgList.toString();
     this.$refs.ruleForm.validate(valid => {
        this.$store.dispatch("page/edit", this.form).then(res => {
          this.$message.success("提交成功");
          // this.resetForm();
          this.$router.back();
        });
      });
    },
    // 重置表单数据
    // resetForm() {
    //   this.$refs.ruleForm.clearValidate();
    //   this.form = {
    //     cutomerName: "",
    //     shortName: "",
    //     addressProject: "",
    //     contract: "",
    //     number: "",
    //     description: ""
    //   };
    // }
  }
};
</script>

<style lang="less" scoped>
.add-blogroll-container {
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
