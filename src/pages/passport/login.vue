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
        <a-tabs
          size="large"
          style="margin-left:20px"
          default-active-key="pass"
          @change="callback"
        >
          <a-tab-pane tab="账号密码登录" key="pass">
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
                  v-password-input
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
                  <Identify
                    :identifyCode="identifyCode"
                    v-if="loginType == 'pass'"
                  />
                </div>
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
          <a-tab-pane tab="验证码登录" key="code" force-render>
            <a-form-model
              ref="ruleFormCode"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :model="formCode"
              :rules="rulesCode"
            >
              <a-form-model-item prop="phone">
                <a-input
                  v-model="formCode.phone"
                  addon-before="+86"
                  placeholder="11位手机号"
                  v-number-evolution
                  :max-length="11"
                  size="large"
                />
              </a-form-model-item>

              <a-form-model-item class="code-wrap" prop="code">
                <a-input
                  v-model="formCode.code"
                  style="width:280px"
                  placeholder="输入验证码"
                  v-number-evolution
                  :max-length="6"
                  size="large"
                />
                <CodeBtn
                  ref="child"
                  :phone="formCode.phone"
                  codeType="1"
                  sendType="0"
                  size="large"
                  :isCode="true"
                  @validate="validateImgCode"
                  @showValidate="showValidate"
                  @showPicCode="showPicCodes"
                />
              </a-form-model-item>
              <a-form-model-item
                prop="verificationCode"
                v-show="showVerfication && showPicCode"
              >
                <a-input
                  type="text"
                  ref="verificationCode"
                  v-model="formCode.verificationCode"
                  placeholder="请输入图形验证码"
                  :max-length="4"
                  style="width:240px"
                  size="large"
                  @keyup="getCode"
                />

                <div @click="refreshCode()" class="code" title="点击切换验证码">
                  <IdentifyCode
                    :identifyCode="identifyPicCode"
                    v-if="loginType == 'code'"
                  />
                </div>
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
        </a-tabs>
        <div class="login-btn">
          <a-button
            style="width:100%"
            type="primary"
            size="large"
            :loading="loading"
            @click="onSubmit"
          >
            登录
          </a-button>
        </div>
        <div class="btn-box">
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
            class="btn1"
            type="link"
            @click="bypassAccount"
          >
            子账号登陆
          </a-button>
          <a-button
            size="large"
            class="btn2"
            type="link"
            @click="handleJumpRegister"
          >
            注册账户
          </a-button>
        </div>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import CodeBtn from "@/components/CodeBtn/index";
import Identify from "@/components/Identify";
import IdentifyCode from "@/components/Identify";
import { getRandomCode } from "@/utils/index";
export default {
  name: "Login",
  components: { CommonLayout, Identify, CodeBtn, IdentifyCode },
  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 24, offset: 0 },
      loginType: "pass", //登陆方式
      showPicCode: false,
      form: {
        username: "",
        password: "",
        code: "",
        verificationCode: "" //输入的图片验证码
      },
      formCode: {
        phone: "",
        code: "",
        verificationCode: "" //输入的图片验证码
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
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
              if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                callback(new Error("图形验证码不正确"));
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ]
      },
      rulesCode: {
          phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              if (!/^1[3456789]\d{9}$/.test(value)) {
                callback(new Error('手机号格式不正确'))
              }
              callback()
            },
            trigger: ['blur', 'change']
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
              if (value.toLowerCase() !== this.identifyPicCode.toLowerCase()) {
                callback(new Error("图形验证码不正确"));
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ]
      },
      loading: false,
      identifyCode: "", //要核对的验证码
      identifyPicCode: "",
      showVerfication: false //是否进行图片验证码
    };
  },
  mounted() {
    this.refreshCode();
  },
  methods: {
    //切换tab
    callback(key) {
      this.loginType = key;
      // this.form = {}
      // this.formCode = {}
    },
    // 更新验证码
    refreshCode() {
      this.identifyCode = getRandomCode();
      this.identifyPicCode = getRandomCode();
    },
    // 登录
    onSubmit() {
      if (this.loginType == "pass") {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
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
      }
      if (this.loginType == "code") {
        this.$refs.ruleFormCode.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch("user/loginBycode", this.formCode)
              .then(res => {
                this.$message.success("登录成功");
                this.$router.push("/");
              })
              .finally(() => {
                this.loading = false;
              });
          }
        });
      }
    },
    // 获取验证码组件校验图形验证
    validateImgCode(callback) {
      let flag = false;
      // if (this.$refs.verificationCode.value) {
      // }
      this.$refs.ruleForm.validateField(
        "verificationCode",
        err => (flag = err ? false : true)
      );
      callback(flag);
    },
    // 是否显示图片校验
    showValidate(callback) {
      let isShow = true;
      this.showVerfication = true;
      callback(isShow);
    },
    showPicCodes(val) {
      this.showPicCode = val;
    },

    //是否调用发送验证码接口
    getCode() {
      if (
        this.$refs.verificationCode.value.toLowerCase() ==
        this.identifyPicCode.toLowerCase()
      ) {
        console.log("相等");
        this.$refs.child.getMsg();
      }
    },
    // 跳转注册
    handleJumpRegister() {
      this.$router.push("/register");
    },
    // 跳转重置密码
    resetPassword() {
      this.$router.push("/resetpassword");
    },
    // 跳转子账号登录
    bypassAccount() {
      this.$router.push("/bypassAccount");
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
.btn-box {
  display: flex;
  justify-content: space-between;
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
.login-container {
  .login-btn {
    margin-bottom: 10px;
  }
  .code-wrap {
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
