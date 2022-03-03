<template>
  <div class="header-right">
    <a-icon class="icon" type="home" @click="handleGoCloudMall" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDomainUrl } from "@/utils/index";
export default {
  name: "HeaderRight",
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return {};
  },
  methods: {
    // 跳转云商城
    handleGoCloudMall() {
      const url = `http://${getDomainUrl()}`;
      window.open(url, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.header-right {
  display: flex;
  align-items: center;
  margin-right: 30px;
  .icon {
    font-size: 24px;
  }
}
</style>
