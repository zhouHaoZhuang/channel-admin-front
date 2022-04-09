<template>
  <div class="header-right">
    <img class="icon-two" width="24px" src="@/assets/img/workOrder/phone.png" />
    <div class="outbox">
      <h1 style="font-weight: 600">专属客服</h1>
      <img
        width="140px"
        class="imgclass"
        src="@/assets/img/workOrder/weixinphoto.png"
      />
      <ul class="right-box">
        <li><a-icon type="user" class="left-icon" />客服姓名:</li>
        <li><a-icon type="phone" :rotate="90" class="left-icon" />联系方式:</li>
        <li><a-icon type="qq" class="left-icon" />qq号:</li>
        <li><a-icon type="wechat" class="left-icon" />微信号:</li>
      </ul>
      <ul class="right-box">
        <li>王大富</li>
        <li>15201010202</li>
        <li>11111111</li>
        <li>wff033001</li>
      </ul>
      <span class="bottom-title">客服微信二维码</span>
    </div>
    <a-icon class="icon" type="home" @click="handleGoCloudMall" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderRight",
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      customerInfo: (state) => state.customer.customerInfo,
    }),
  },
  data() {
    return {
      url: "",
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
          pageSize: 999,
        })
        .then((res) => {
          const newRes = [...res.data.list];
          const data =
            newRes.length > 2
              ? newRes
                  .slice(newRes.length - 2)
                  .filter(
                    (ele) => ele.cnameStatus !== -1 && ele.cnameStatus === 0
                  )
              : newRes.filter(
                  (ele) => ele.cnameStatus !== -1 && ele.cnameStatus === 0
                );
          this.url = data[0].domain;
        });
    },
    // 跳转云商城
    handleGoCloudMall() {
      const url = `http://${this.url}`;
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
.header-right {
  display: flex;
  align-items: center;
  margin-right: 30px;
  position: relative;
  .icon {
    font-size: 24px;
  }
  .icon-two {
    font-size: 24px;
    margin-right: 26px;
    cursor: pointer;
    margin-top: 4px;
  }

  .outbox {
    width: 440px;
    height: 280px;
    background-color: #ffffff;
    position: absolute;
    left: -310px;
    top: 64px;
    padding: 0 30px;
    display: none;
    box-shadow: 0px 0px 12px 4px rgba(59, 119, 227, 0.1);
    .imgclass {
      display: inline-block;
      float: left;
    }
    .right-box {
      margin-top: -10px;
      float: left;
      list-style: none;
      line-height: 40px;
      font-size: 12px;
      color: #000000;
      .left-icon {
        margin-right: 6px;
      }
    }
    .bottom-title {
      position: absolute;
      bottom: 10px;
      left: 60px;
      font-size: 12px;
      color: #000000;
    }
  }
  .icon-two:hover + .outbox {
    display: inline-block !important;
  }
}
</style>
