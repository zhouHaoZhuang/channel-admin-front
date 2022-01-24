<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    :title="modalTitle"
    wrapClassName="update-account-container"
    okText="确定"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="手机号" prop="phone">
        <a-input
          v-model="form.phone"
          addon-before="+86"
          placeholder="11位手机号"
          v-number-evolution
          :max-length="11"
        />
      </a-form-model-item>
      <a-form-model-item label="验证码" class="code-wrap" prop="code">
        <a-input
          v-model="form.code"
          style="width:250px"
          placeholder="输入验证码"
          v-number-evolution
          :max-length="6"
        />
        <CodeBtn :phone="form.phone" />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password
          v-model="form.password"
          v-password-input
          type="password"
          :max-length="20"
          placeholder="6 - 20位密码，区分大小写"
          @keydown.native="keydown($event)"
        />
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="confirmPassword">
        <a-input-password
          v-model="form.confirmPassword"
          v-password-input
          type="password"
          :max-length="20"
          placeholder="确认密码"
          @keydown.native="keydown($event)"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import CodeBtn from "@/components/CodeBtn/index";
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value"
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false
    },
    // 单个子账号详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  components: { CodeBtn },
  computed: {
    modalTitle() {
      return this.type === "add" ? "添加子账号" : "修改子账号";
    }
  },
  watch: {
    detail: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== "{}") {
          this.type = "edit";
          this.form = { ...newVal };
        } else {
          this.type = "add";
        }
      },
      immediate: true
    },
    value: {
      handler(newVal) {
        if (!newVal) {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!this.pwdReg.test(value)) {
          callback(new Error("密码格式不正确"));
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      loading: false,
      form: {
        password: "",
        confirmPassword: "",
        phone: "",
        code: ""
      },
      pwdReg: /(?=.*[0-9])(?=.*[a-z]).{6,20}/,
      rules: {
        password: [{ validator: validatePass, trigger: ["blur", "change"] }],
        confirmPassword: [
          { validator: validatePass2, trigger: ["blur", "change"] }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"]
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        password: "",
        confirmPassword: "",
        phone: "",
        code: ""
      };
    },
    // 禁止输入空格
    keydown(event) {
      if (event.keyCode == 32) {
        event.returnValue = false;
      }
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const req =
            this.type === "add" ? "system/addAccount" : "system/editAccount";
          this.$store
            .dispatch(req, this.form)
            .then(res => {
              this.$message.success(this.modalTitle + "成功");
              this.$emit("success");
              this.$emit("changeVisible", false);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="less">
.update-account-container {
  .code-wrap {
    .ant-form-item-children {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
