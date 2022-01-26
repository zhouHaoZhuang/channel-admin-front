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
          <a-checkbox-group v-model="form.type">
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
        <a-form-model-item v-if="isWebsiteJump" label="跳转到">
          <a-input v-model="form.WebsiteJumpUrl" />
        </a-form-model-item>
        <a-form-model-item label="新闻LOGO">
          <!-- <a-input v-model="form.tittleImage" /> -->
          <Upload :defaultFile="form.tittleImage" @change="pcImgChange" />
        </a-form-model-item>
        <a-form-model-item v-if="!isWebsiteJump" label="内容">
          <Tinymce @tinymceinput="tinymceinput" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 19, offset: 4 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce/index.vue";
import Upload from "@/components/Upload/index";

export default {
  components: {
    Tinymce,
    Upload
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
      form: {
        newTypeCode: "",
        newTypeEn: "",
        sort: "",
        type: [],
        status: 0,
        newsTitle: "",
        context: "",
        newsPublishTime: "", //发布时间
        WebsiteJumpUrl: "", //跳转到
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
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }
        ],
        newsPublishTime: [
          { required: true, message: "发布时间不能为空", trigger: "change" }
        ]
      },
      loading: false,
      typeList: []
    };
  },
  computed: {
    isWebsiteJump() {
      return this.form.type.includes("websiteJump");
    }
  },
  created() {
    this.$nextTick(() => {
      this.resetForm();
    });
    this.getAllType();
  },
  activated() {
    this.$nextTick(() => {
      this.resetForm();
    });
    this.getAllType();
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
      console.log(date, dateString);
      this.form.newsPublishTime = dateString;
    },
    // 提交
    onSubmit() {
      for (let index = 0; index < this.form.type.length; index++) {
        this.form[this.form.type[index]] = 1;
      }
      if (this.form.WebsiteJump == 1) {
        this.form.WebsiteJump = this.form.WebsiteJumpUrl;
        this.form.context = "";
        return;
      }
      if (this.form.context) {
        this.form.WebsiteJump = "";
      }
      console.log(this.form, "提交");
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("newsList/addList", this.form)
            .then(res => {
              this.$message.success("新增新闻列表成功");
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
        console.log(res.data, "获取分类");
        this.typeList = res.data;
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        newTypeCode: "",
        newTypeEn: "",
        sort: "",
        type: [],
        status: 0,
        newsTitle: "",
        context: "",
        newsPublishTime: "" //发布时间
      };
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-add {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
