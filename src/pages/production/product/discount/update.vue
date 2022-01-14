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
        <a-form-model-item
          v-if="type === 'add'"
          label="产品名称"
          prop="productCode"
        >
          <a-select
            style="width:100%"
            allowClear
            v-model="form.productCode"
            placeholder="产品名称"
          >
            <a-select-option
              v-for="item in productList"
              :key="item.productCode"
              :value="item.productCode"
            >
              {{ item.productName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="产品名称">
          {{ form.productName }}
        </a-form-model-item>
        <a-form-model-item label="折扣方式" prop="discountType">
          <a-radio-group v-model="form.discountType">
            <a-radio value="0">
              固定价格
            </a-radio>
            <a-radio value="1">
              比例折扣
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          v-if="form.discountType === '1'"
          label="折扣比例"
          prop="discountPrice"
        >
          <a-input
            style="width:150px"
            v-model="form.discountPrice"
            v-number-evolution="{ value: 2, min: 0, max: 100 }"
            addon-after="%"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
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
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: undefined
      },
      rules: {
        productCode: [
          {
            required: true,
            message: "请选择产品",
            trigger: "blur"
          }
        ],
        discountType: [
          {
            required: true,
            message: "请选择折扣方式",
            trigger: "change"
          }
        ],
        discountPrice: [
          {
            required: true,
            message: "请输入折扣比例",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: [],
      productList: []
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path === "/production/product/updateDiscount") {
          this.resetForm();
          this.getProductList();
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
  methods: {
    // 获取产品列表
    getProductList() {
      this.$store
        .dispatch("member/getProductList", { currentPage: 1, pageSize: 999 })
        .then(res => {
          this.productList = [...res.data.list];
        });
    },
    // 获取详情
    getDetail() {
      this.$store
        .dispatch("product/getProductDiscountDetail", {
          id: this.$route.query.id
        })
        .then(res => {
          this.form = { ...res.data };
        });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const newFrom = {
            ...this.form,
            productName: this.$getArrOnceData(
              this.form.productCode,
              this.productList,
              "productCode"
            ).productName
          };
          this.$store
            .dispatch(
              this.type === "add"
                ? "product/addProductDiscount"
                : "product/editProductDiscount",
              newFrom
            )
            .then(res => {
              this.$message.success(
                this.type === "add" ? "新增产品折扣成功" : "编辑产品折扣成功"
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
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.member-discount-update {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
