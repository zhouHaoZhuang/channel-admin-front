<template>
  <div class="add-blogroll">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分类">
          <a-select v-model="form.region" placeholder="公有云商">
            <a-select-option value="shanghai">
              公有云商
            </a-select-option>
            <a-select-option value="beijing">
              测速分类
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="链接名称" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="链接URL" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="介绍" type="textarea">
          <a-input v-model="form.addressProject" />
        </a-form-model-item>
        <a-form-model-item label="站点底部展示">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              全站显示
            </a-radio>
            <a-radio value="2">
              只显示首页
            </a-radio>
            <a-radio value="3">
              不显示
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              正常
            </a-radio>
            <a-radio value="2">
              不显示
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
         <a-form-model-item label="排序">
          <a-input v-model="form.description" />
          <span>注：越小越靠前</span>
        </a-form-model-item>
        <!-- 传图片 -->
        <a-form-model-item label="上传PC图片">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <span>注：推荐尺寸:1920*660，不超过500kb</span>
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
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      imageUrl: "",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: ""
      },
      rules: {
        cutomerName: [
          {
            required: true,
            message: "请输入渠道商全称",
            trigger: "blur"
          }
        ],
        shortName: [
          {
            required: true,
            message: "请输入简称",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("channel/add", this.form)
            .then(res => {
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
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: ""
      };
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.add-blogroll {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
