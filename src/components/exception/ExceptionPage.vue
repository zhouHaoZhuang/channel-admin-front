<template>
  <div class="exception-page">
    <div class="img">
      <img :src="config[type].img" />
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="action">
        <a-button
          v-if="firstPath && firstPath !== '/404'"
          type="primary"
          @click="backHome"
        >
          返回首页
        </a-button>
        <a-button v-else type="primary" @click="backLogin">
          重新登录
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "./typeConfig";
import { mapState } from "vuex";
export default {
  name: "ExceptionPage",
  props: ["type", "homeRoute"],
  computed: {
    ...mapState("setting", ["firstPath"])
  },
  data() {
    return {
      config: Config
    };
  },
  methods: {
    backHome() {
      this.$router.push("/");
      this.$emit("backHome", this.type);
    },
    backLogin() {
      this.$store.dispatch("user/logout").then(res => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.exception-page {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: @base-bg-color;
  .img {
    padding-right: 52px;
    zoom: 1;
    img {
      max-width: 430px;
    }
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: @text-color-second;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
