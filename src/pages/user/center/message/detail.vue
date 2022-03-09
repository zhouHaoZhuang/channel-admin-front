<template>
  <div class="message-detail-container" v-if="massageData">
    <div class="title">{{ massageData.title }}</div>
    <div class="date">{{ massageData.sendTime | formatDate }}</div>
    <div class="line"></div>
    <div class="con-box">
      <div class="start-title"></div>
      <p v-html="massageData.content" class="txt txt-indent">
      </p>
      <p class="txt txt-indent txt-right">{{ massageData.createUserName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      massageData: null
    };
  },
  activated() {
    this.getInfo();
    console.log(this.$route.query.id);
  },
  methods: {
    getInfo() {
      this.$store
        .dispatch("message/getOne", { id: this.$route.query.id })
        .then(res => {
          console.log(res);
          this.massageData = res.data;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.message-detail-container {
  background: #fff;
  height: 500px;
  margin: 0 24px;
  padding: 24px;
  color: #000;
  font-size: 14px;
  .title {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  .date {
    text-align: center;
  }
  .line {
    height: 2px;
    background: #ccc;
    margin: 20px 0;
  }
  .start-title {
    margin-bottom: 10px;
  }
  .txt {
    margin: 0;
    line-height: 22px;
  }
  .txt-indent {
    text-indent: 2em;
  }
  .txt-right {
    margin-top: 30px;
    width: 90%;
    text-align: right;
  }
}
</style>
