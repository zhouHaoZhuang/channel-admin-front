<template>
  <div class="member-discount-update">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="客服姓名" prop="corporationCode">
          <a-input v-model="form.productTypeCode"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="工号" prop="productCode">
          <a-input v-model="form.productTypeCode"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="联系方式" prop="supplierProductCode">
          <a-input v-model="form.productTypeCode"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="QQ类型" prop="discountType">
          <a-radio-group v-model="form.discountType">
            <a-radio value="0"> 个人QQ </a-radio>
            <a-radio value="1"> 企业QQ </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="QQ号" prop="supplierProductCode">
          <a-input v-model="form.productTypeCode"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="微信类型" prop="discountType">
          <a-radio-group v-model="form.discountType">
            <a-radio value="0"> 个人微信 </a-radio>
            <a-radio value="1"> 企业微信 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="微信号" prop="supplierProductCode">
          <a-space :size="40">
            <a-input v-model="form.productTypeCode" />
            <span class="preview-code">预览二维码</span>
          </a-space>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 9 }">
          <a-space :size="70">
            <a-button type="primary" @click="onSubmit" :loading="loading">
              提交
            </a-button>
            <a-button @click="onSubmit" :loading="loading"> 取消 </a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        corporationCode: undefined,
        corporationName: "",
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: undefined,
        productTypeCode: undefined,
      },
      rules: {
        corporationCode: [
          {
            required: true,
            message: "请选择企业",
            trigger: "change",
          },
        ],
        productCode: [
          {
            required: true,
            message: "请选择产品",
            trigger: "blur",
          },
        ],
        discountType: [
          {
            required: true,
            message: "请选择折扣方式",
            trigger: "change",
          },
        ],
        discountPrice: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      data: [],
      productList: [],
      productTypeList: [],
      inputUnit: "",
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path === "/sale/customer/addcustomer") {
          this.$nextTick(() => {
            this.resetForm();
          });
          if (newVal.query.id) {
            this.type = "edit";
          } else {
            this.type = "add";
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // this.loading = true;
          // 查找企业名称的对象
          const corporation = this.data.find(
            (ele) => ele.corporationCode === this.form.corporationCode
          );
          let newFrom = {};
          if (this.type === "add") {
            newFrom = {
              ...this.form,
              corporationName: corporation.corporationName,
            };
            newFrom.productName = JSON.parse(newFrom.productCode).productName;
            newFrom.productCode = JSON.parse(newFrom.productCode).productCode;
          } else {
            newFrom = { ...this.form };
            // console.log('newFromelse');
          }
          this.$store
            .dispatch(
              this.type === "add"
                ? "member/addDisCount"
                : "member/editDisCount",
              newFrom
            )
            .then((res) => {
              this.$message.success("添加客服成功");
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
        corporationCode: undefined,
        corporationName: "",
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: undefined,
        productTypeCode: undefined,
      };
      this.productTypeList = [];
      this.inputUnit = "";
    },
  },
};
</script>

<style lang="less" scoped>
.member-discount-update {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 400px;
    .preview-code {
      color: #169bd5;
      cursor: pointer;
    }
  }
}
</style>
