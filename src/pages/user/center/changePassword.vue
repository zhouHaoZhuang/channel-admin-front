<template>
  <div class="user-info-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- <a-form-model-item label="姓名">
        <span>{{ nameOrphone }}</span>
      </a-form-model-item> -->
      <a-form-model-item label="手机">
        <span>{{ userInfo.phone }}</span>
      </a-form-model-item>
      <!-- <a-form-model-item label="角色">
        <span>{{ form.name }}</span>
      </a-form-model-item> -->
      <a-form-model-item label="验证手机号" prop="phone">
        <a-input
          addon-before="+86"
          placeholder="11位手机号"
          v-number-evolution
          :max-length="11"
          v-model="form.phone"
        />
      </a-form-model-item>
      <a-form-model-item label="图片验证码" prop="verificationCode">
        <a-input
          type="text"
          v-model="form.verificationCode"
          placeholder="请在获取验证码之前进行图片验证"
          :max-length="6"
        />
        <div @click="refreshCode()" class="code" title="点击切换验证码">
          <Identify :identifyCode="identifyCode" />
        </div>
      </a-form-model-item>
      <a-form-model-item label="验证码" prop="code">
        <a-input
          v-model="form.code"
          style="width:250px"
          placeholder="输入验证码"
          v-number-evolution
          :max-length="6"
        >
          <a-icon slot="prefix" type="smile" />
        </a-input>
        <CodeBtn :phone="form.phone" codeType="3" @validate="validateImgCode" />
      </a-form-model-item>
      <a-form-model-item label="新密码" prop="newPassword">
        <a-input-password
          v-password-input
          v-model="form.newPassword"
          autoComplete="new-password"
        />
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="newTwoPassword">
        <a-input-password v-model="form.newTwoPassword" v-password-input />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 8, offset: 6 }">
        <a-button v-permission="'commit'" type="primary" @click="onSubmit">
          确定
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CodeBtn from "@/components/CodeBtn/index";
import Identify from "@/components/Identify";
import { getRandomCode } from "@/utils/index";
export default {
  components: { CodeBtn, Identify },
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
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      labelCol: { span: 6 },
      phone: "",
      wrapperCol: { span: 8 },
      isDisabled: false,
      form: {
        phone: "",
        newPassword: "",
        newTwoPassword: "",
        code: "",
        verificationCode: ""
      },
      pwdReg: /(?=.*[0-9])(?=.*[a-z]).{6,20}/,
      rules: {
        phone: [
          { required: true, message: "验证手机号为必填", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.userInfo.phone) {
                callback(new Error("请输入当前登录手机号"));
                this.isDisabled = true;
              } else {
                callback();
                this.isDisabled = false;
              }
            },
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "验证码为必填", trigger: "blur" }],
        newPassword: [
          { validator: validatePass, trigger: ["blur", "change"] },
          { min: 6, max: 20, message: "密码位数在6~20位", trigger: "blur" }
        ],
        newTwoPassword: [
          { validator: validatePass2, trigger: ["blur", "change"] },
          { min: 6, max: 20, message: "密码位数在6~20位", trigger: "blur" }
        ],
        verificationCode: [
          {
            required: true,
            message: "请输入图片图片校验码",
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
      identifyCode: "" //要核对的验证码
    };
  },
  created() {
    // this.getRoles()
  },
  mounted() {
    this.refreshCode();
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then(res => {
        this.$router.push("/login");
      });
    },
    onSubmit() {
      console.log("submit!", this.form);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.password = this.form.newPassword;
          this.$store
            .dispatch("user/changePassword", this.form)
            .then(() => {
              this.$message.success("修改成功");
              this.logout();
            })
            .catch(() => {
              this.refreshCode();
            });
        }
      });
    },
    getRoles() {
      this.$store
        .dispatch("user/getRoleList", { id: this.userInfo.userCode })
        .then(val => {
          console.log("获取角色", val);
        });
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
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    nameOrphone() {
      return this.userInfo.username ? this.userInfo.username.slice(0, 11) : "";
    }
  }
};
</script>

<style lang="less" scoped>
.user-info-container {
  background-color: #fff;
  margin: 0 20px;
  padding: 20px;
}
</style>
