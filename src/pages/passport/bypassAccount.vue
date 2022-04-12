<template>
  <common-layout class="login-container">
    <div class="login-wrap">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/img/logo.png" />
          <span class="title">瑶池子账号登陆</span>
        </div>
      </div>
      <div class="login">
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
              @pressEnter="onSubmit"
            >
              <a-icon slot="prefix" type="smile" />
            </a-input>
            <div @click="refreshCode()" class="code" title="点击切换验证码">
              <Identify :identifyCode="identifyCode" />
            </div>
          </a-form-model-item>
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
             <a-form-model-item class="login-btn">
            <a-button
              style="width:100%"
              size="large"
              @click="toPer"
            >
              主账号登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
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
  name: "bypassAccount",
  components: { CommonLayout, Identify },
  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 24, offset: 0 },
      form: {
        username: "",
        password: "",
        verificationCode: "" //输入的图片验证码
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: ["blur", "change"]
          }
          // {
          //   pattern: /^1[3456789]\d{9}$/,
          //   message: "手机号格式不正确",
          //   trigger: ["blur", "change"]
          // }
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
              if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
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
          if(!this.form.username.includes('@')){
            this.$message.warn("请确认账号是否正确");
            return
          }
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then(res => {
              this.$message.success("登录成功");
              this.$router.push("/");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 跳转主账号登录
    toPer() {
      this.$router.push("/login");
    },
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
    margin-bottom: 70px;
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
