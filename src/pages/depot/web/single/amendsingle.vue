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
        <a-form-model-item label="关键词" type="keyWords" prop="keyWords">
          <a-input v-model="form.keyWords" />
        </a-form-model-item>
        <a-form-model-item label="描述" type="describe" prop="describe">
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
        <a-form-model-item label="状态" prop="status">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              开启
            </a-radio>
            <a-radio :value="1">
              关闭
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="内容" :wrapper-col="{ span: 20 }">
          <div class="Deputy">
            <Tinymce @tinymceinput="tinymceinput" :tinyvalue="form.context" />
          </div>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 10, offset: 3 }">
          <a-button
            v-permission="'modify'"
            type="primary"
            @click="onSubmit"
            :loading="loading"
          >
            确定修改
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
import Tinymce from "@/components/Tinymce/index.vue";

export default {
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 10 },
      form: {
        bannerPicture: "",
        // channelCode:"",
        context: "",
        describe: "",
        keyWords: "",
        modeFileName: "",
        pageName: "",
        pageTitle: "",
        resourceAddress: "",
        status: "",
        id: ""
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
        pageName: [
          {
            required: true,
            message: "请填写页面名称",
            trigger: "blur"
          }
        ],
        pageTitle: [
          {
            required: true,
            message: "请填写页面标题",
            trigger: "blur"
          }
        ],
        keyWords: [
          {
            required: true,
            message: "请填写关键词",
            trigger: "blur"
          }
        ],
        describe: [
          {
            required: true,
            message: "请填写描述",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "必选",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: []
    };
  },
  components: {
    Upload,
    Tinymce
  },
  // created() {
  //   this.form.id = this.$route.query.id;
  //   this.getList();
  // },
  activated() {
    this.form.id = this.$route.query.id;
    this.getList();
  },
  methods: {
    //查询数据表格
    getList() {
      this.$store.dispatch("page/getId", this.form.id).then(res => {
        // console.log(res);
        this.form = res.data;
      });
    },
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      // console.log('上传图片回调', urlList, firstImageUrl);
      this.form.bannerPicture = firstImageUrl;
    },
    //上传富文本
    tinymceinput(value) {
      console.log("富文本输入", value);
      this.form.context = value;
    },
    // 提交
    onSubmit() {
      // this.form.linkLogo = this.imgList.toString();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("page/edit", this.form).then(res => {
            this.$message.success("提交成功");
            // this.resetForm();
            this.$router.back();
          });
        }
      });
    }
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
}
</style>
