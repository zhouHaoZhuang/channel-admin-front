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
        <a-form-model-item label="分类名称" prop="linkTypeName">
          <a-input v-model="form.linkTypeName" :maxLength="50" />
        </a-form-model-item>
        <a-form-model-item label="排序" prop="linkTypeSort">
          <a-input
            v-model="form.linkTypeSort"
            v-number-evolution="{ value: 0, min: 0, max: 32767 }"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button
            v-permission="'add'"
            type="primary"
            @click="onSubmit"
            :loading="loading"
          >
            确定
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/depot/web/updateCategory") {
          this.resetForm();
          if (newVal.query.id) {
            this.type = "edit";
            this.getDetail();
          } else {
            this.type = "add";
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        linkTypeName: "",
        linkTypeSort: 0
      },
      rules: {
        linkTypeName: [
          {
            required: true,
            message: "必填，分类名称长度必须在1-50之间",
            trigger: "blur"
          }
        ],
        linkTypeSort: [
          {
            required: true,
            message: "必填，排序范围在0-32767之间。值越小越靠前",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    // 获取友情链接分类详情
    getDetail() {
      this.$store
        .dispatch("links/getCategoryDetail", this.$route.query.id)
        .then(res => {
          this.form = {
            ...res.data
          };
        });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch(
              this.type === "add" ? "links/addCategory" : "links/editCategory",
              this.form
            )
            .then(res => {
              this.$message.success(
                `${this.type === "add" ? "添加" : "编辑"}友情链接分类成功`
              );
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
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
      this.form = {
        cutomerName: "",
        shortName: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.add-blogroll-container {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
