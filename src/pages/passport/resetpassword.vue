<template>
  <common-layout class="register-container">
    <div class="register">
      <div class="title">重置密码</div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item prop="phone" label="手机号">
          <a-input
            v-model="form.phone"
            addon-before="+86"
            placeholder="11位手机号"
            v-number-evolution
            :max-length="11"
            size="large"
          />
        </a-form-model-item>
        <a-form-model-item prop="verificationCode" label="图形验证码">
          <a-input
            type="text"
            v-model="form.verificationCode"
            placeholder="请输入图形验证码"
            :max-length="4"
            style="width:180px"
            size="large"
          />
          <div @click="refreshCode()" class="code" title="点击切换验证码">
            <Identify :identifyCode="identifyCode" />
          </div>
        </a-form-model-item>
        <a-form-model-item class="code-wrap" prop="code" label="验证码">
          <a-input
            v-model="form.code"
            style="width:180px"
            placeholder="输入验证码"
            v-number-evolution
            :max-length="6"
            size="large"
          />
          <CodeBtn
            codeType="3"
            sendType="0"
            :phone="form.phone"
            size="large"
            @validate="validateImgCode"
          />
        </a-form-model-item>
        <a-form-model-item prop="password" label="登陆密码">
          <a-input-password
            v-model="form.password"
            v-password-input
            type="password"
            :max-length="20"
            placeholder="6 - 20位密码，区分大小写"
            autoComplete="new-password"
            size="large"
            @keydown.native="keydown($event)"
          />
        </a-form-model-item>
        <a-form-model-item prop="confirmPassword" label="确认密码">
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
        <a-form-model-item :wrapper-col="{ span: 24, offset: 0 }">
          <a-button
            type="primary"
            style="width: 145px;"
            @click="handleRegister"
            :loading="loading"
          >
            确认
          </a-button>
          <a-button style="margin-left: 96px;" @click="handleJumpLogin">
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
import Identify from "@/components/Identify";
import { getRandomCode } from "@/utils/index";

export default {
  components: { CommonLayout, CodeBtn, Identify },
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        phone: "",
        code: "",
        password: "",
        confirmPassword: "",
        verificationCode: ""
      },
      pwdReg: /(?=.*[0-9])(?=.*[a-z]).{6,20}/,
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
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
        ],
        verificationCode: [
          {
            required: true,
            message: "请输入图形验证码",
            trigger: ["blur", "change"]
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.identifyCode) {
                callback(new Error("图形验证码不正确"));
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ]
      },
      loading: false,
      identifyCode: "" //要核对的验证码
    };
  },
  mounted() {
    this.refreshCode();
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
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/resetPassword", this.form)
            .then(res => {
              this.$message.success("重置密码成功");
              this.$router.push("/login");
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
        confirmPassword: "",
        verificationCode: ""
      };
    },
    // 获取验证码组件校验图形验证
    validateImgCode(callback) {
      let flag = false;
      this.$refs.ruleForm.validateField(
        "verificationCode",
        err => (flag = err ? false : true)
      );
      callback(flag);
    },
    // 更新验证码
    refreshCode() {
      this.identifyCode = getRandomCode();
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
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      width: 160px;
      border-bottom: 1px solid #585858;
      color: #000;
    }
    .submit-btn {
      width: 200px;
    }
  }
  .code {
    cursor: pointer;
    position: absolute;
    right: -122px;
    top: -10px;
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
