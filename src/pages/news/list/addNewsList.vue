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
          <a-select v-model="form.newTypeName" placeholder="请选择">
            <a-select-option value="shanghai">
              Zone one
            </a-select-option>
            <a-select-option value="beijing">
              Zone two
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
        <a-form-model-item label="发布时间">
          <a-date-picker
            show-time
            format="YYYY-MM-DD HH:MM:SS"
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
        <a-form-model-item label="内容">
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
export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
      form: {
        newTypeName: "",
        newTypeEn: "",
        sort: "",
        status: 0,
        newsTitle: "",
        context: "",
        newsPublishTime: "",//发布时间
      },
      rules: {
        newTypeName: [
          {
            required: true,
            message: "请输入分类",
            trigger: "blur",
          },
        ],
        newsTitle: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  activated() {
    this.resetForm();
    // this.getData();
  },
  methods: {
    tinymceinput(value) {
      console.log("富文本输入", value);
    },
    // 获取日期
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    getData() {
      this.$getList("newsType/getList").then((res) => {
        // console.log(res.data.totalCount, "获取列表");
      });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("newsType/addList", this.form)
            .then((res) => {
              this.$message.success("新增渠道成功");
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
        newTypeName: "",
        newTypeEn: "",
        sort: "",
        status: 0,
      };
    },
  },
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
