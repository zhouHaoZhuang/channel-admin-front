<template>
  <div class="header-right">
    <a-icon class="icon" type="home" @click="handleGoCloudMall" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderRight",
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.getDomain();
  },
  methods: {
    // 获取默认云商城域名
    getDomain() {
      this.$store
        .dispatch("domain/getList", {
          currentPage: 1,
          pageSize: 999
        })
        .then(res => {
          const newRes = [...res.data.list];
          const data =
            newRes.length > 2
              ? newRes
                  .slice(newRes.length - 2)
                  .filter(
                    ele => ele.cnameStatus !== -1 && ele.cnameStatus === 0
                  )
              : newRes.filter(
                  ele => ele.cnameStatus !== -1 && ele.cnameStatus === 0
                );
          this.url = data[0].domain;
        });
    },
    // 跳转云商城
    handleGoCloudMall() {
      const url = `http://${this.url}`;
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
