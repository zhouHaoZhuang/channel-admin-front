<template>
  <div>
    <a-modal
      :title="detailInfo?'提现申请详情':'新建提现申请'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          ref="accountName"
          label="银行名称"
          prop="accountName"
        >
          <a-input v-model="form.accountName" placeholder="请输入银行名称" />
        </a-form-model-item>

        <a-form-model-item label="银行卡号" prop="accountNo">
          <a-input v-model="form.accountNo" placeholder="请输入银行卡号" />
          <span class="tigs">请确保符合银行卡号规则</span>
        </a-form-model-item>
        <a-form-model-item label="银行卡绑定人" prop="receiverName">
          <a-input
            v-model="form.receiverName"
            placeholder="请输入银行卡绑定人姓名"
          />
          <span class="tigs">请确保符合银行卡绑定人正确</span>
        </a-form-model-item>
        <a-form-model-item label="提现金额" prop="dealAmount">
          <a-input
            v-model="form.dealAmount"
            placeholder="请输入需要提现的金额"
          />
          <span class="tigs">请确保符合当前账号下余额充足</span>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="memo">
          <a-input
            v-model="form.memo"
            type="textarea"
            placeholder="请填写备注信息"
          />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button type="primary" @click="handleOk('save')">保存</a-button>
        <a-button @click="handleOk('submit')" type="primary">提交</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  model: {
    event: "changeVisible",
    prop: "visible"
  },
  props: {
    visible: {},
    // 申请提现详情
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  // watch: {
  //   detailInfo: {
  //     handler(newVal) {
  //        this.title = newVal ? "提现申请详情":'新建提现申请';
  //       },
  //     deep: true, 
  //     immediate:true
  //   },
  // },
  data() {
    return {
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        status: 2,
        accountName: "",
        accountNo: "",
        dealAmount: "",
        receiverName: "",
        memo: ""
      },
      rules: {
        accountName: [
          {
            required: true,
            message: "银行名称未填写",
            trigger: "blur"
          }
        ],
        accountNo: [
          {
            required: true,
            message: "银行卡号不符合编号规则",
            trigger: "blur"
            //    银行卡校验：/^(\d{16}|\d{19}|\d{17})$/
          }
        ],
        dealAmount: [
          {
            required: true,
            message: "当前无足够余额可以进行提现，请核对剩余余额",
            trigger: "blur"
          }
        ],
        receiverName: [
          {
            required: true,
            message: "银行卡绑定人不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created(){
    console.log(111111111);
    if(this.detailInfo){
      console.log('shide');
      this.form = this.detailInfo
    }else{
      this.resetForm()
    }
  },
  methods: {
    // 保存,提交新增申请
    handleOk(val) {
      this.confirmLoading = true;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let title;
          if (val == "save") {
            title = "确认保存申请吗?";
            this.form.status = 0;
          }
          if (val == "submit") {
            title = "确认提交申请吗?";
            this.form.status = 2;
          }
          this.$confirm({
            title: title,
            onOk: () => {
              this.$store
                .dispatch("withdraw/addRecord", this.form)
                .then(res => {
                  this.$message.success("提交成功");
                  this.$emit("changeVisible", false);
                  this.$emit("success");
                })
                .catch(err => {
                  this.confirmLoading = false;
                });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      setTimeout(() => {
        // this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.form = {
        accountName: "",
        accountNo: "",
        dealAmount: "",
        receiverName: "",
        memo: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.tigs {
  color: #ccc;
  font-size: 13px;
}
</style>
