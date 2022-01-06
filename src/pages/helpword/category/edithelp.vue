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
          <a-select v-model="form.typeCode">
            <a-select-option
              :value="item.typeCode"
              v-for="(item, index) in arr"
              :key="index"
            >
              <span v-if="item.typeCode" :style="`margin-left: ${item.typeCode.length - 12}ex;`">
                |-{{ item.typeName }}
              </span>
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
        typeCode: "",
        typeName: "",
        typeNameEn: "",
        typeIcon: "",
      },
      rules: {
        typeName: [
          {
            required: true,
            message: "必填，名称必须是中文或英文组成，且在20个字以内。",
            trigger: "blur",
          },
        ],
        typeNameEn: [
          {
            required: true,
            message: "必填，名称必须是中文或英文组成，且在20个字以内。",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      arr: [],
    };
  },
  components: {
    Upload,
  },
  created() {
    this.getAllType();
    this.getInfo();
    console.log(this.$route.query.id);
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    getInfo() {
      this.$store.dispatch("helpCategory/getOne",{id:this.$route.query.id}).then((val) => {
        console.log("获取详情", val);
        this.form = val.data;
      });
    },
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调99999", urlList, firstImageUrl);
      this.form.typeIcon = firstImageUrl;
    },
    // 请求到所有分类
    getAllType() {
      this.$store.dispatch("helpCategory/getList").then((val) => {
        this.arr = val.data.list;
        this.arr.reverse()
      });
    },
    // 提交
    onSubmit() {
      this.form.id = this.$route.query.id;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("helpCategory/changeList", this.form)
            .then((res) => {
              this.$message.success("修改帮助类别成功");
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
        typeCode: "",
        typeName: "",
        typeNameEn: "",
        typeIcon: "",
      };
    },
  },
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
