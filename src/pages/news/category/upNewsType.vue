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
        <a-form-model-item label="名称" prop="newTypeName">
          <a-input v-model="form.newTypeName" />
        </a-form-model-item>
        <a-form-model-item label="英文名" prop="newTypeEn">
          <a-input v-model="form.newTypeEn" />
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input v-model="form.sort" />
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              启用
            </a-radio>
            <a-radio :value="1">
              禁用
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 15, offset: 6 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      form: {
        newTypeName: "",
        newTypeEn: "",
        sort: "",
        status: 0,
      },
      rules: {
        newTypeName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        newTypeEn: [
          {
            required: true,
            message: "请输入英文名",
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
    this.getData();
  },
  methods: {
    getData(){
      this.$store.dispatch("newsType/getOne",{id:this.$route.query.id}).then((res) => {
        console.log(res);
        this.form = {...res.data};
      });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("newsType/changeList", this.form)
            .then((res) => {
              this.$message.success("修改类型成功");
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
