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
          <a-select v-model="form.helpTypeCode">
            <a-select-option
              value='{"typeCode":"help_type_01","typeName":"帮助中心"}'
            >
              <span> |-帮助中心</span>
            </a-select-option>
            <a-select-option
              :value="
                JSON.stringify({
                  typeCode: item.typeCode,
                  typeName: item.typeName
                })
              "
              v-for="(item, index) in arr"
              :key="index"
            >
              <span :style="`margin-left: ${item.level}em;`">
                |-{{ item.typeName }}
              </span>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="标题" prop="title">
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="关键词" type="keyWords">
          <a-input v-model="form.keyWords" />
        </a-form-model-item>
        <a-form-model-item label="描述" type="describe">
          <a-input v-model="form.describe" />
        </a-form-model-item>
        <a-form-model-item label="推荐">
          <a-radio-group v-model="form.recommended">
            <a-radio :value="true">
              是
            </a-radio>
            <a-radio :value="false">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="置顶">
          <a-radio-group v-model="form.top">
            <a-radio :value="true">
              是
            </a-radio>
            <a-radio :value="false">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="热门">
          <a-radio-group v-model="form.hot">
            <a-radio :value="true">
              是
            </a-radio>
            <a-radio :value="false">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="内容">
          <div class="Deputy">
            <Tinymce @tinymceinput="tinymceinput" :tinyvalue="form.context" />
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
        title: "",
        keyWords: "",
        describe: "",
        recommended: true,
        top: true,
        hot: true,
        context: "",
        helpTypeCode: "",
        channelCode: "",
        feedback: 0,
        useful: 0,
        useless: 0
      },
      rules: {
        title: [
          {
            required: true,
            message: "必填，标题名称长度必须在2-50之间。",
            trigger: "blur"
          }
        ],
        keyWords: [
          {
            required: true,
            message: "必填，链接URL长度必须在2-50之间。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: [],
      arr: []
    };
  },
  components: {
    Tinymce
  },
  activated() {
    this.getAllType();
    this.resetForm();
  },
  methods: {
    getAllType() {
      this.$store.dispatch("helpCategory/getAllLevel").then(val => {
        console.log("获取所有分类------------", val.data);
        this.arr = val.data;
      });
    },
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.form.bannerPicture = firstImageUrl;
    },
    //上传富文本
    tinymceinput(value) {
      // console.log("富文本输入", value);
      this.form.context = value;
    },
    // 提交
    onSubmit() {
      // this.form.typeName = this.imgList.toString();
      this.arr.findIndex(item => {
        if (item.typeCode == this.form.helpTypeCode) {
          this.form.typeName = item.typeName;
        }
      });
      this.form.helpTypeName = JSON.parse(this.form.helpTypeCode).typeName;
      this.form.helpTypeCode = JSON.parse(this.form.helpTypeCode).typeCode;
      // console.log("提交的数据", this.form);

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("word/add", this.form)
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
        description: "",
        context: ""
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
