<template>
  <common-layout class="login-container">
    <div class="login">
      <a-form-model
        ref="ruleForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
        :rules="rules"
      >
        <a-form-model-item prop="phone">
          <a-input v-model="form.phone" v-number-evolution placeholder="账户">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input
            v-model="form.password"
            placeholder="密码"
            type="password"
            :max-length="120"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
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
          <CodeBtn :phone="form.phone" />
        </a-form-model-item> -->
        <a-form-model-item class="login-btn">
          <a-button
            style="width:100%"
            type="primary"
            :loading="loading"
            @click="onSubmit"
          >
            登录
          </a-button>
        </a-form-model-item>
        <a-form-model-item class="btn-box">
          <a-button class="btn1" type="link">
            重置密码
          </a-button>
          <a-button class="btn2" type="link" @click="handleJumpRegister">
            注册账户
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
// import CodeBtn from "@/components/CodeBtn/index";
export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 22, offset: 1 },
      form: {
        phone: "",
        password: "",
        code: ""
      },
      rules: {
        phone: [
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
        ]
      },
      loading: false
    };
  },
  methods: {
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
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 跳转注册
    handleJumpRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background: #26a6f5;
  .login {
    width: 460px;
    // height: 320px;
    height: 270px;
    border-radius: 4px;
    padding: 30px 20px 40px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
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
