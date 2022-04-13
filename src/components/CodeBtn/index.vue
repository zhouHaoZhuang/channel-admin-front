<template>
<div>
    <a-button
      class="code-btn"
      :size="size"
      :disabled="loading"
      @click="handleCode"
    >
      {{ btnTxt }}
    </a-button>
    <Verify ref="verify" @success="win()" :type="4" />
  </div>
</template>

<script>
import Verify from '@/components/verify/verify.vue'
export default {
  components: {
   Verify
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    phone: {
      type: [String, Number]
    },
    isCode: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "default"
    },
    codeType: {
      type: String,
      default: ""
    }
  },
  watch: {
    isDisabled: {
      handler(val) {
        this.loading = val;
      },
      immediate: true
    }
  },
  data() {
    return {
      btnTxt: "获取验证码",
      time: null,
      timeCount: 60,
      loading: false,
      phoneReg: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    };
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
     win () {
      this.graph = true
      this.$message.success("验证码已发送")
      this.getMsg()
    },
    check () {
      this.$refs.verify.open()
    },
    handleCode() {
      if (!this.phone) {
        this.$message.warning("请正确输入手机号");
        return;
      }
      if (!this.phoneReg.test(this.phone)) {
        this.$message.warning("手机号格式不正确");
        return;
      }
      this.check()
      // if (this.isCode) {
      //   this.$store
      //     .dispatch("user/getTest", {
      //       phone: this.phone
      //     })
      //     .then(res => {
      //       if (res.code === "000000") {
      //         this.$emit("showPicCode", true);
      //         this.$message.warning("请输入图形验证码");
      //       } else {
      //         this.$message.warning(res.msg);
      //       }
      //     });
      // }
      //判断父组件是否传递显示图片校验的方法
      // if (this.$listeners["showValidate"]) {
      //   let isShow;
      //   this.$emit("showValidate", val => {
      //     isShow = val;
      //   });
      //   if (!isShow) {
      //     return;
      //   }
      // }
      // //判断父组件是否传递图片校验的方法
      // if (this.$listeners["validate"]) {
      //   let flag;
      //   this.$emit("validate", val => {
      //     flag = val;
      //   });
      //   if (!flag) {
      //     return;
      //   }
      // }
      // if (this.loading) return;
      // this.getMsg();
    },
    startTime() {
      this.time = setInterval(() => {
        if (this.timeCount - 1 === 0) {
          clearInterval(this.time);
          this.btnTxt = "获取验证码";
          this.timeCount = 60;
          this.loading = false;
          return;
        }
        this.timeCount -= 1;
        this.btnTxt = this.timeCount + "S";
      }, 1000);
    },
    // 发送验证码
    getMsg() {
      this.loading = true;
      this.$store
        .dispatch("user/sendCode", {
          receiverAccount: this.phone,
          codeType: this.codeType
        })
        .then(res => {
          this.startTime();
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.code-btn {
  width: 110px;
}
</style>
