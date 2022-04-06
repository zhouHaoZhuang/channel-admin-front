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
        <a-form-model-item label="分配方式选择" prop="corporationCode">
          <a-select
            style="width: 100%"
            allowClear
            v-model="form.corporationCode"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in distributeList"
              :key="item.id"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="选择客服" prop="productCode">
          <a-select
            style="width: 100%"
            allowClear
            v-model="form.productCode"
            placeholder="请选择"
            @change="handleProductChange"
          >
            <a-select-option
              :value="
                JSON.stringify({
                  productCode: item.productCode,
                  productName: item.productName,
                })
              "
              v-for="(item, index) in productList"
              :key="index"
            >
              {{ item.productName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="选择客户" prop="supplierProductCode">
          <a-select v-model="form.productTypeCode" @change="handleTypeChange">
            <a-select-option
              v-for="item in productTypeList"
              :value="item.productTypeCode"
              :key="item.productTypeCode"
            >
              {{ item.productTypeName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 11 }">
          <a-space :size="80">
            <a-button type="primary" @click="onSubmit" :loading="loading">
              确认
            </a-button>
            <a-button @click="onSubmit" :loading="loading"> 取消 </a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
      <div class="content-two">
        <p class="title">客户列表（以下客户对应客服发生变更）</p>
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300 }"
          rowKey="id"
          :pagination="paginationProps"
        >
          <span slot="name" slot-scope="text">{{ text }}</span>
          <span
            :class="{ status0: text == 0, status1: text == 1, status: true }"
            slot="status"
            slot-scope="text"
            v-if="text"
            >{{ text == 0 ? "冻结" : "正常" }}</span
          >
          <span
            :class="{ status0: text == 1, status1: text == 0, status: true }"
            slot="loginLock"
            slot-scope="text"
            v-if="text"
            >{{ text == 0 ? "正常" : "锁定" }}</span
          >
          <span
            :class="{ status0: text != 1, status1: text == 1, status: true }"
            slot="certificationStatus"
            slot-scope="text"
            >{{ text == 1 ? "已认证" : "未认证" }}</span
          >
          <span slot="action" slot-scope="text" class="action">
            <a-button
              v-permission="'view'"
              type="link"
              class=""
              @click="selectInfo(text.id)"
            >
              查看
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "add",
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      distributeList: [
        {
          label: "指定客户",
          value: 0,
        },
        {
          label: "指定替换",
          value: 1,
        },
        {
          label: "随机替换",
          value: 2,
        },
        {
          label: "平均分配",
          value: 3,
        },
      ],
      form: {
        corporationCode: undefined,
        corporationName: "",
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: undefined,
        productTypeCode: undefined,
      },
      columns: [
        {
          title: "客服ID",
          dataIndex: "corporationCode",
          scopedSlots: { customRender: "corporationCode" },
          width: 190,
        },
        {
          title: "客服姓名",
          dataIndex: "realName",
          width: 120,
        },
        {
          title: "工号",
          dataIndex: "phoneNumbers",
          width: 120,
        },
        {
          title: "联系方式",
          dataIndex: "phoneNumber",
          width: 120,
        },
        {
          title: "QQ",
          dataIndex: "qq",
          width: 120,
        },
        {
          title: "微信号",
          dataIndex: "email",
          width: 180,
        },
        {
          title: "权限",
          dataIndex: "ecsCount",
          width: 100,
          scopedSlots: { customRender: "ecsCount" },
        },

        {
          title: "关联子账号",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: 110,
        },
        {
          title: "客户",
          dataIndex: "statuss",
          width: 110,
        },
        {
          title: "操作",
          Index: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" },
          width: 200,
        },
      ],
      rules: {
        corporationCode: [
          {
            required: true,
            message: "请选择企业",
            trigger: "change",
          },
        ],
        supplierProductCode: [
          {
            required: true,
            message: "请选择客户",
            trigger: "blur",
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
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange,
      },
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
            this.getDetail();
          } else {
            this.type = "add";
            this.getMemberList();
            this.getProductList();
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 查询会员列表数据
    getMemberList() {
      this.$store
        .dispatch("member/getList", { currentPage: 1, pageSize: 999 })
        .then((res) => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        });
    },
    getProductList() {
      this.$store
        .dispatch("member/getProductList", { currentPage: 1, pageSize: 999 })
        .then((res) => {
          this.productList = [...res.data.list];
        });
    },
    // 获取详情
    getDetail() {
      this.$store
        .dispatch("member/getDisCountDetail", { id: this.$route.query.id })
        .then((res) => {
          this.form = { ...res.data };
          this.inputUnit = res.data.chargeUnit;
        });
    },
    // 产品切换
    handleProductChange(val) {
      const newVal = JSON.parse(val);
      const productObj = this.productList.find(
        (ele) => ele.productCode === newVal.productCode
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
    // 产品分类切换
    handleTypeChange(val) {
      const newObj = this.productTypeList.find(
        (ele) => ele.productTypeCode === val
      );
      this.inputUnit = newObj.chargeUnit;
    },
    handleRadioChange() {
      this.form.discountPrice = "";
    },
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
          console.log(this.form, "this.form", this.type, this.type === "add");
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
    // 表格分页快速跳转n页
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
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
    width: 600px;
    .content-two {
      width: 1300px;
      left: 50%;
      margin-left: -50%;
      .title {
        font-size: 20px;
        font-weight: 600;
        color: black;
      }
    }
  }

  .member-contenttable {
    .status {
      font-size: 12px;
      color: #ffffff;
      border-radius: 2px;
      padding: 0 4px;
      line-height: 18px;
    }
    .status0 {
      background-color: #ccc;
    }
    .status1 {
      background-color: #16b841;
    }
  }
}
</style>
