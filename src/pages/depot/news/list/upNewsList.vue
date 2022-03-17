<template>
  <div class="channel-list-add">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分类" prop="newTypeName">
          <a-select v-model="form.newTypeCode" placeholder="请选择">
            <a-select-option
              v-for="item in typeList"
              :value="item.newTypeCode"
              :key="item.newTypeCode"
            >
              {{ item.newTypeName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="属性" prop="newTypeEn">
          <a-checkbox-group v-model="type">
            <a-checkbox value="newsRoll" name="type">
              首页滚动
            </a-checkbox>
            <a-checkbox value="firstTop" name="type">
              优先置顶
            </a-checkbox>
            <a-checkbox value="userCore" name="type">
              用户中心
            </a-checkbox>
            <a-checkbox value="websiteJump" name="type">
              网址跳转
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="发布时间" prop="newsPublishTime">
          <a-date-picker
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            @change="onChange"
            v-model="newsPublishTime"
          />
        </a-form-model-item>
        <a-form-model-item label="标题" prop="newsTitle">
          <a-input v-model="form.newsTitle" />
        </a-form-model-item>
        <a-form-model-item label="SEO关键词">
          <a-input v-model="form.seoKeywords" />
        </a-form-model-item>
        <a-form-model-item label="SEO描述">
          <a-input v-model="form.seoDescribe" type="textarea" />
        </a-form-model-item>
        <a-form-model-item label="新闻LOGO">
          <Upload :defaultFile="form.tittleImage" @change="pcImgChange" />
        </a-form-model-item>
        <a-form-model-item v-if="isWebsiteJump" label="跳转到">
          <a-input v-model="WebsiteJumpUrl" />
        </a-form-model-item>
        <a-form-model-item v-if="!isWebsiteJump" label="内容" :wrapper-col="{ span: 20 }">
          <Tinymce :tinyvalue="form.context" @tinymceinput="tinymceinput" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 10, offset: 3 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Tinymce from "@/components/Tinymce/index.vue";
import Upload from "@/components/Upload/index";

export default {
  components: {
    Tinymce,
    Upload
  },
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 10 },
      type: [],
      form: {
        newsCode: "",
        newTypeCode: "",
        newTypeEn: "",
        type: [],
        newsTitle: "",
        seoKeywords: "",
        seoDescribe: "",
        websiteJump: "",
        context: "",
        newsPublishTime: null, //发布时间
        tittleImage: "" //新闻LOGO
      },
      rules: {
        newTypeCode: [
          {
            required: true,
            message: "请输入分类",
            trigger: "blur"
          }
        ],
        newsTitle: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        newsPublishTime: [
          { required: true, message: "发布时间不能为空", trigger: "change" }
        ]
      },
      loading: false,
      typeList: [],
      WebsiteJumpUrl: ""
    };
  },
  created() {
    this.$nextTick(() => {
      this.resetForm();
    });
    this.getAllType();
    this.getOne();
  },

  activated() {
    this.$nextTick(() => {
      this.resetForm();
    });
    this.getAllType();
    this.getOne();
  },
  computed: {
    newsPublishTime: {
      get() {
        if (this.form.newsPublishTime) {
          return moment(this.form.newsPublishTime, "YYYY-MM-DD HH:mm:ss");
        } else {
          return null;
        }
      },
      set(val) {
        this.form.newsPublishTime = val;
      }
    },
    isWebsiteJump() {
      return this.type.includes("websiteJump");
    }
  },
  methods: {
    tinymceinput(value) {
      // console.log("富文本输入", value);
      this.form.context = value;
    },
    pcImgChange({ urlList, firstImageUrl }) {
      // console.log("上传图片回调99999", urlList, firstImageUrl);
      this.form.tittleImage = firstImageUrl;
    },
    // 获取日期
    onChange(date, dateString) {
      console.log("dadsada", dateString);
      this.form.newsPublishTime = dateString;
    },
    // 提交
    onSubmit() {
      for (let index = 0; index < this.type.length; index++) {
        this.form[this.type[index]] = 1;
      }
      console.log(this.form, "提交");
      if (this.form.websiteJump == 1) {
        this.form.websiteJump = this.WebsiteJumpUrl;
        this.form.context = "";
      }
      if (this.form.context) {
        this.form.websiteJump = 0;
      }
      this.form.newsPublishTime = this.form.newsPublishTime.replace("T", " ");
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("newsList/changeList", {
              ...this.form,
              id: this.$route.query.id
            })
            .then(res => {
              this.$message.success("修改新闻列表成功");
              this.resetForm();
              this.$router.back();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    getAllType() {
      this.$store.dispatch("newsType/getAllType").then(res => {
        this.typeList = res.data;
      });
    },
    getOne() {
      this.$store
        .dispatch("newsList/getOne", this.$route.query.id)
        .then(res => {
          this.form = { ...res.data };
          let {
            newsCode,
            newTypeCode,
            newsPublishTime,
            newsTitle,
            seoKeywords,
            seoDescribe,
            websiteJump,
            context,
            tittleImage
          } = res.data;
          this.form = {
            newsCode,
            newTypeCode,
            newTypeEn: "",
            newsPublishTime,
            newsTitle,
            seoKeywords,
            seoDescribe,
            websiteJump,
            context,
            tittleImage
          };
          let list = ["newsRoll", "firstTop", "userCore", "websiteJump"];
          this.form.type = [];
          for (let index = 0; index < list.length; index++) {
            if (res.data[list[index]] == 1) {
              this.form.type.push(list[index]);
            }
          }
          this.type = this.form.type;
          console.log(this.form, "获取单个");
        });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        newsCode: "",
        newTypeCode: "",
        newTypeEn: "",
        type: [],
        newsTitle: "",
        seoKeywords: "",
        seoDescribe: "",
        websiteJump: "",
        context: "",
        newsPublishTime: null //发布时间
      };
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-add {
  background: #fff;
  padding: 24px;
}
</style>
