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
            style="width:280px"
            placeholder="输入验证码"
            v-number-evolution
            :max-length="6"
            size="large"
          />
          <CodeBtn
            ref="child"
            :phone="form.phone"
            codeType="1"
            sendType="0"
            size="large"
            @validate="validateImgCode"
            @showValidate="showValidate"
          />
        </a-form-model-item>
        <!-- <a-form-model-item prop="verificationCode" v-show="showVerfication">
          <a-input
            type="text"
            ref="verificationCode"
            v-model="form.verificationCode"
            placeholder="请输入图形验证码"
            :max-length="4"
            style="width:280px"
            size="large"
             @keyup="getCode"
          />
          <div @click="refreshCode()" class="code" title="点击切换验证码">
            <Identify :identifyCode="identifyCode" />
          </div>
        </a-form-model-item> -->
        <a-form-model-item prop="password">
          <a-input-password
            v-model="form.password"
            v-password-input
            type="password"
            :max-length="20"
            autoComplete="new-password"
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
// import Identify from "@/components/Identify";
import { getRandomCode } from "@/utils/index";
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
        confirmPassword: "",
        verificationCode: "" //输入的图片验证码
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
      identifyCode: "", //要核对的验证码
      showVerfication: false //是否进行图片验证码
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
                this.refreshCode();
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
        confirmPassword: "",
        verificationCode: ""
      };
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
    // 更新验证码
    refreshCode() {
      this.identifyCode = getRandomCode();
    },
    // 是否显示图片校验
    showValidate(callback) {
      let isShow = true;
      this.showVerfication = true;
      callback(isShow);
    },
    //是否调用发送验证码接口
    getCode() {
      if (this.$refs.verificationCode.value.toLowerCase() == this.identifyCode.toLowerCase()) {
        console.log("相等");
        this.$refs.child.getMsg();
      }
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
.code {
  cursor: pointer;
  position: absolute;
  right: -122px;
  top: -10px;
}
</style>
