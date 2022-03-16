<template>
  <common-layout class="login-container">
    <div class="login-wrap">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/img/logo.png" />
          <span class="title">瑶池</span>
        </div>
      </div>
      <div class="login">
        <a-tabs size="large" style="margin-left:20px">
          <a-tab-pane tab="账号密码登录">
            <a-form-model
              ref="ruleForm"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :model="form"
              :rules="rules"
            >
              <a-form-model-item prop="username">
                <a-input
                  v-model="form.username"
                  v-number-evolution
                  placeholder="请输入账号"
                  size="large"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="password">
                <a-input
                  v-model="form.password"
                  v-password-input
                  placeholder="请输入密码"
                  type="password"
                  :max-length="20"
                  size="large"
                  @pressEnter="onSubmit"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="verificationCode">
                <a-input
                  type="text"
                  v-model="form.verificationCode"
                  placeholder="请输入图形验证码"
                  :max-length="4"
                  style="width:250px"
                  size="large"
                >
                  <a-icon slot="prefix" type="smile" />
                </a-input>
                <div @click="refreshCode()" class="code" title="点击切换验证码">
                  <Identify :identifyCode="identifyCode" />
                </div>
              </a-form-model-item>
              <!-- <a-form-model-item class="code-wrap" prop="code">
              <a-input
                v-model="form.code"
                style="width:250px"
                placeholder="输入验证码"
                v-number-evolution
                :max-length="6"
              >
                <a-icon slot="prefix" type="smile" />
              </a-input>
              <CodeBtn :phone="form.username" />
            </a-form-model-item> -->
              <a-form-model-item class="login-btn">
                <a-button
                  style="width:100%"
                  type="primary"
                  size="large"
                  :loading="loading"
                  @click="onSubmit"
                >
                  登录
                </a-button>
              </a-form-model-item>
              <a-form-model-item class="btn-box">
                <a-button
                  size="large"
                  class="btn1"
                  type="link"
                  @click="resetPassword"
                >
                  重置密码
                </a-button>
                <a-button
                  size="large"
                  class="btn2"
                  type="link"
                  @click="handleJumpRegister"
                >
                  注册账户
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
// import CodeBtn from "@/components/CodeBtn/index";
import Identify from "@/components/Identify";
import { getRandomCode } from "@/utils/index";
export default {
  name: "Login",
  components: { CommonLayout, Identify },
  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 24, offset: 0 },
      form: {
        username: "",
        password: "",
        code: "",
        verificationCode: "" //输入的图片验证码
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
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
    // 更新验证码
    refreshCode() {
      this.identifyCode = getRandomCode();
    },
    // 登录
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then(res => {
              this.$message.success("登录成功");
              this.$router.push("/");
            })
            .catch(() => {
              this.refreshCode();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 跳转注册
    handleJumpRegister() {
      this.$router.push("/register");
    },
    // 跳转重置密码
    resetPassword() {
      this.$router.push("/resetpassword");
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    margin-top: -50px;
  }
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
  }
  .login {
    width: 400px;
    margin: 0 auto;
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
.login-container {
  .login-btn {
    margin-bottom: 10px;
  }
  .code-wrap,
  .btn-box {
    .ant-form-item-children {
      display: flex;
      justify-content: space-between;
      .btn1 {
        padding-left: 0;
      }
      .btn2 {
        padding-right: 0;
      }
    }
  }
}
</style>
