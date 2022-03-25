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
          label="企业名称"
          prop="corporationCode"
        >
          <a-select
            style="width:100%"
            allowClear
            v-model="form.corporationCode"
            placeholder="企业名称"
          >
            <a-select-option
              v-for="item in data"
              :key="item.id"
              :value="item.corporationCode"
            >
              {{ item.corporationName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
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
            @change="handleProductChange"
          >
            <a-select-option
              :value="
                JSON.stringify({
                  productCode: item.productCode,
                  productName: item.productName
                })
              "
              v-for="(item, index) in productList"
              :key="index"
            >
              {{ item.productName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          v-if="type === 'add'"
          label="产品分类"
          prop="supplierProductCode"
        >
          <a-select v-model="form.productTypeCode">
            <a-select-option
              v-for="item in productTypeList"
              :value="item.productTypeCode"
              :key="item.productTypeCode"
            >
              {{ item.productTypeName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="企业名称">
          {{ form.corporationName }}
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="产品名称">
          {{ form.productName }}
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="产品分类">
          {{ form.productTypeName }}
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
          v-show="form.discountType === '0'"
          label="固定价格"
          prop="discountPrice"
        >
          <a-input
            style="width:150px"
            v-model="form.discountPrice"
            v-number-evolution="{ value: 2, min: 0, max: 99999 }"
            :addon-after="'元/' + inputUnit"
          />
        </a-form-model-item>
        <a-form-model-item
          v-show="form.discountType === '1'"
          label="折扣比例"
          prop="discountPrice"
        >
          <a-input
            v-model="form.discountPrice"
            style="width:150px"
            addon-after="%"
            v-number-evolution="{ value: 2, min: 0, max: 100 }"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button
            v-permission="'add'"
            type="primary"
            @click="onSubmit"
            :loading="loading"
          >
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
        corporationCode: undefined,
        corporationName: "",
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: undefined,
        productTypeCode: undefined
      },
      rules: {
        corporationCode: [
          {
            required: true,
            message: "请选择企业",
            trigger: "change"
          }
        ],
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
            message: "请输入",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: [],
      productList: [],
      productTypeList: [],
      inputUnit: ""
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path === "/sale/customer/update") {
          this.$nextTick(() => {
            this.resetForm();
          });
          if (newVal.query.id) {
            this.type = "edit";
            this.getDetail();
          } else {
            this.type = "add";
            this.getMemberList();
            this.getProductList();
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 查询会员列表数据
    getMemberList() {
      this.$store
        .dispatch("member/getList", { currentPage: 1, pageSize: 999 })
        .then(res => {
          this.data = [...res.data.list];
        });
    },
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
        .dispatch("member/getDisCountDetail", { id: this.$route.query.id })
        .then(res => {
          this.form = { ...res.data };
          this.inputUnit = res.data.chargeUnit;
        });
    },
    // 产品切换
    handleProductChange(val) {
      const newVal = JSON.parse(val);
      console.log(JSON.parse(val), this.productList);
      const productObj = this.productList.find(
        ele => ele.productCode === newVal.productCode
      );
      const flag =
        Object.keys(productObj).includes("productType") &&
        productObj.productType.productTypes.length > 0;
      this.productTypeList = flag
        ? [...productObj.productType.productTypes]
        : [];
      if (!flag) {
        this.form.productTypeCode = undefined;
      } else {
        this.form.productTypeCode = this.productTypeList[0].productTypeCode;
        this.inputUnit = this.productTypeList[0].chargeUnit;
      }
    },
    handleRadioChange() {
      this.form.discountPrice = "";
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.loading = true;
          // 查找企业名称的对象
          const corporation = this.data.find(
            ele => ele.corporationCode === this.form.corporationCode
          );
          let newFrom = {};
          console.log(this.form, "this.form", this.type, this.type === "add");
          if (this.type === "add") {
            newFrom = {
              ...this.form,
              corporationName: corporation.corporationName
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
            .then(res => {
              this.$message.success(
                this.type === "add" ? "新增会员折扣成功" : "编辑会员折扣成功"
              );
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
        productTypeCode: undefined
      };
      this.productTypeList = [];
      this.inputUnit = "";
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
