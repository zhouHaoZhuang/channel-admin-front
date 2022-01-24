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
          <a-select v-model="form.parentCode">
            <a-select-option value="help_type_01">
              <span> |-帮助中心</span>
            </a-select-option>
            <a-select-option
              :value="item.typeCode"
              v-for="(item, index) in arr"
              :key="index"
            >
              <span :style="`margin-left: ${item.level}em;`">
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
          <a-button
            v-permission="'add'"
            type="primary"
            @click="onSubmit"
            :loading="loading"
          >
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
        parentCode: "help_type_01",
        typeName: "",
        typeNameEn: "",
        typeIcon: ""
      },
      rules: {
        typeName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            pattern: /^[\u4e00-\u9fa5_0-9]+$/,
            message: "请输入中文名称",
            trigger: "blur"
          }
        ],
        typeNameEn: [
          {
            required: true,
            message: "请输入英文名称不能为空",
            trigger: "blur"
          },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: "请输入英文名称",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      arr: [],
      objarr: [],
      jibie: 0
    };
  },
  components: {
    Upload
  },
  activated() {
    this.resetForm();
    // console.log(this.form.typeIcon, "55555555555");
    this.form.parentCode = this.$route.query.typeCode;
    this.getAllType();
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      // console.log("上传图片回调99999", urlList, firstImageUrl);
      this.form.typeIcon = firstImageUrl;
    },
    getAllType() {
      this.$store.dispatch("helpCategory/getAllLevel").then(val => {
        console.log("获取所有分类------------", val.data);
        this.arr = val.data;
      });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("helpCategory/addList", this.form)
            .then(res => {
              this.$message.success("新增帮助类别成功");
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
        parentCode: "",
        typeName: "",
        typeNameEn: "",
        typeIcon: ""
      };
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
