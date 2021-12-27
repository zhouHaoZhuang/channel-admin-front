<template>
  <div class="add-word-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分类">
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
        <a-form-model-item label="标题" prop="pageName">
          <a-input v-model="form.pageName" />
        </a-form-model-item>
        <a-form-model-item label="关键词" type="keyWords">
          <a-input v-model="form.keyWords" />
        </a-form-model-item>
        <a-form-model-item label="描述" type="describe">
          <a-input v-model="form.describe" />
        </a-form-model-item>
        <a-form-model-item label="访问地址" type="resourceAddress">
          <a-input v-model="form.resourceAddress" />
        </a-form-model-item>
        <a-form-model-item label="推荐">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              是
            </a-radio>
            <a-radio :value="1">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="置顶">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              是
            </a-radio>
            <a-radio :value="1">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="热门">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              是
            </a-radio>
            <a-radio :value="1">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="内容">
          <div class="Deputy">
            <Tinymce @tinymceinput="tinymceinput" />
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
import Tinymce from "@/components/Tinymce/index.vue";
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        bannerPicture: "",
        channelCode: "",
        context: "",
        describe: "",
        keyWords: "",
        modeFileName: "",
        pageName: "",
        pageTitle: "",
        resourceAddress: "",
        status: ""
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
    Tinymce
  },
  created() {
    this.getList();
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
          this.loading = true;
          this.$store
            .dispatch("page/add", this.form)
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
      this.form = {
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.add-word-container {
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
