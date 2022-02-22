<template>
  <common-layout class="register-container">
    <div class="register">
      <div class="title">注册成为渠道商</div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item prop="phone">
          <a-input
            v-model="form.phone"
            addon-before="+86"
            placeholder="11位手机号"
            v-number-evolution
            :max-length="11"
            size="large"
          />
        </a-form-model-item>
        <a-form-model-item class="code-wrap" prop="code">
          <a-input
            v-model="form.code"
            style="width:250px"
            placeholder="输入验证码"
            v-number-evolution
            :max-length="6"
            size="large"
          />
          <CodeBtn :phone="form.phone" size="large" />
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input-password
            v-model="form.password"
            v-password-input
            type="password"
            :max-length="20"
            placeholder="6 - 20位密码，区分大小写"
            size="large"
            @keydown.native="keydown($event)"
          />
        </a-form-model-item>
        <a-form-model-item prop="confirmPassword">
          <a-input-password
            v-model="form.confirmPassword"
            v-password-input
            type="password"
            :max-length="20"
            placeholder="确认密码"
            size="large"
            @keydown.native="keydown($event)"
          />
        </a-form-model-item>
        <a-form-model-item class="btn-box">
          <a-button
            class="submit-btn"
            type="primary"
            size="large"
            @click="handleRegister"
            :loading="loading"
          >
            注册
          </a-button>
          <a-button
            type="link"
            style="padding-right:0"
            size="large"
            @click="handleJumpLogin"
          >
            使用已有账户登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import CodeBtn from "@/components/CodeBtn/index";
export default {
  components: { CommonLayout, CodeBtn },
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
      labelCol: { span: 0 },
      wrapperCol: { span: 24, offset: 0 },
      form: {
        phone: "",
        code: "",
        password: "",
        confirmPassword: ""
      },
      pwdReg: /(?=.*[0-9])(?=.*[a-z]).{6,20}/,
      rules: {
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
        ],
        password: [{ validator: validatePass, trigger: ["blur", "change"] }],
        confirmPassword: [
          { validator: validatePass2, trigger: ["blur", "change"] }
        ]
      },
      loading: false
    };
  },
  methods: {
    // 跳转登录
    handleJumpLogin() {
      this.$router.push("/login");
    },
    // 禁止输入空格
    keydown(event) {
      if (event.keyCode == 32) {
        event.returnValue = false;
      }
    },
    handleRegister() {
      console.log("点击", this.form);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/register", this.form)
            .then(res => {
              if (res.data?.id) {
                this.$message.success("注册成功");
                this.$router.push("/login");
              } else {
                this.$message.warning("注册失败");
              }
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
        phone: "",
        code: "",
        password: "",
        confirmPassword: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 450px;
    // background: #fff;
    border-radius: 8px;
    padding: 30px 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    .title {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .submit-btn {
      width: 200px;
    }
  }
}
</style>
<style lang="less">
.beauty-scroll {
  overflow-y: auto !important;
}
.register-container {
  .code-wrap,
  .btn-box {
    .ant-form-item-children {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
