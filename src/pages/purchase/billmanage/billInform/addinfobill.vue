<template>
  <div>
    <div class="add-billinfo">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="发票类型" prop="invoiceType">
          <a-radio-group v-model="form.invoiceType">
            <a-radio :value="1"> 增值税普通发票 </a-radio>
            <a-radio :value="2">
              增值税专用发票
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <!-- <a-form-model-item label="开票类型" prop="issueType">
          <a-radio-group v-model="form.issueType" @change="checkIssueType">
            <a-radio :value="1"> 个人 </a-radio>
            <a-radio :value="2"> 企业 </a-radio>
          </a-radio-group>
        </a-form-model-item> -->
        <a-form-model-item label="发票抬头" prop="invoiceTitle">
          <a-input v-model="form.invoiceTitle" />
        </a-form-model-item>
        <a-form-model-item label="税务登记号" prop="registerNo">
          <a-input v-model="form.registerNo" />
        </a-form-model-item>
        <a-form-model-item
          label="基本开户银行名称"
          prop="bank"
          :required="form.invoiceType === 2"
        >
          <a-input v-model="form.bank" />
        </a-form-model-item>
        <a-form-model-item
          label="基本开户银行账号"
          prop="bankNo"
          :required="form.invoiceType === 2"
        >
          <a-input v-model="form.bankNo" />
        </a-form-model-item>
        <a-form-model-item
          label="公司地址"
          prop="companyLicenseAddress"
          :required="form.invoiceType === 2"
        >
          <a-input v-model="form.companyLicenseAddress" />
        </a-form-model-item>
        <a-form-model-item
          help="格式：021-60016001或者手机号"
          label="联系电话"
          prop="concatPhone"
          :required="form.invoiceType === 2"
        >
          <a-input v-model="form.concatPhone" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="onSubmit"> 保存信息 </a-button>
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
      wrapperCol: { span: 14 },
      form: {
        invoiceTitle: "",
        invoiceType: 1,
        registerNo: "",
        bank: "",
        bankNo: "",
        concatPhone: "",
        companyLicenseAddress: ""
      },
      rules: {
        invoiceTitle: [
          {
            required: true,
            message: "发票抬头不能为空",
            trigger: ["blur", "change"]
          }
        ],
        invoiceType: [
          {
            required: true,
            message: "发票类型不能为空",
            trigger: ["blur", "change"]
          }
        ],
        registerNo: [
          {
            required: true,
            message: "税务登记号不能为空",
            trigger: ["blur", "change"]
          },
          {
            pattern: /[0-9A-Z]{18}/,
            message: "税务登记号只能是数字和大写字母且为18位",
            trigger: ["blur", "change"]
          }
        ],
        bank: [
          {
            validator: (rule, value, callback) => {
              if (this.form.invoiceType === 2) {
                if (!value) {
                  callback(new Error("基本开户银行名称不能为空"));
                }
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ],
        bankNo: [
          {
            validator: (rule, value, callback) => {
              if (this.form.invoiceType === 2) {
                if (!value) {
                  callback(new Error("基本开户银行账号不能为空"));
                }
              }
              callback();
            },
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[0-9]*$/,
            message: "基本开户银行账号只能是数字",
            trigger: ["blur", "change"]
          }
        ],
        companyLicenseAddress: [
          {
            validator: (rule, value, callback) => {
              if (this.form.invoiceType === 2) {
                if (!value) {
                  callback(new Error("公司地址不能为空"));
                }
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ],
        concatPhone: [
          {
            validator: (rule, value, callback) => {
              if (this.form.invoiceType === 2) {
                if (!value) {
                  callback(new Error("联系电话不能为空"));
                }
              }
              callback();
            },
            trigger: ["blur", "change"]
          },
          {
            pattern: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
            message: "请输入正确的联系电话",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  activated() {
    this.$nextTick(() => {
      this.resetForm();
      if (this.$route.query.id) {
        this.getDetail();
      }
    });
  },
  methods: {
    checkIssueType() {
      if (this.form.issueType === 1) {
        this.form.invoiceType = 1;
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        console.log(valid, this.form);
        if (valid) {
          if (this.$route.query.id) {
            this.update();
            return;
          }
          this.$store.dispatch("cbillinfo/add", this.form).then(() => {
            this.$message.success("添加成功");
            this.$router.back();
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.form = {
        issueType: 1,
        invoiceTitle: "",
        invoiceType: 1,
        registerNo: "",
        bank: "",
        bankNo: "",
        concatPhone: "",
        companyLicenseAddress: ""
      };
    },
    update() {
      this.$store.dispatch("cbillinfo/edit", this.form).then(() => {
        this.$message.success("修改成功");
        this.$router.back();
      });
    },
    // 获取单个记录详情
    getDetail() {
      this.$store
        .dispatch("cbillinfo/getOne", { id: this.$route.query.id })
        .then(res => {
          this.form = res.data;
        });
    }
  }
};
</script>

<style>
.add-billinfo {
  padding: 20px;
  background-color: #fff;
  margin: 0 20px;
}
</style>
