<template>
  <div class="unsubscribe-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="可退款金额">
        <span>{{ form.tradePrice }}元</span>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-textarea
          v-model="form.remark"
          placeholder="请填写备注信息"
          :auto-size="{ minRows: 7 }"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      form: {
        tradePrice: "",
        remark: "",
        id: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ],
        remark: {
          required: true,
          message: "备注不能为空",
          trigger: "blur"
        }
      }
    };
  },
  activated() {
    this.resetForm();
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch("business/getUnsubscribeInfo", this.$route.query.id)
        .then(res => {
          // console.log(res, "000000000");
          this.form = res.data;
        });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm({
            title: "确定要保存设置吗？",
            onOk: () => {
              this.form.id = this.$route.query.id;
              this.$store
                .dispatch("business/unsubscribeServe", this.form)
                .then(res => {
                  console.log(res);
                  this.$message.success("退订成功,请稍等",3);
                })
                .finally(() => {
                  setTimeout(() => {
                    this.$router.back();
                  }, 3000);
                });
            }
          });
        }
      });
    },
    resetForm() {
      //   this.$refs.ruleForm.resetFields();
      this.form = {
        tradePrice: "",
        remark: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.unsubscribe-container {
  background-color: #fff;
  margin: 0 10px;
  padding: 10px;
}
</style>
