<template>
  <div>
    <div class="purchase-list-container">
      <div>
        <p class="purchase-list-title">
          <span
            :class="{
              'purchase-title-active': selectkey === text.key
            }"
            v-for="(text, index) in titleList"
            :key="index"
            @click="changeRunningstatus(text)"
          >
            {{ text.title }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectkey: "",
      titleList: [
        {
          key: "",
          title: "全部"
        },
        {
          key: 6,
          title: "处理中"
        },
        {
          key: 3,
          title: "未处理"
        },
        {
          key: -1,
          title: "已解决"
        }
      ]
    };
  },
  methods: {
    changeRunningstatus(text) {
      this.selectkey = text.key;
      // this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.purchase-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .purchase-list-title {
    height: 40px;
    // margin: 0;
    border-bottom: 1px solid #e8e8e8;
    span {
      display: inline-block;
      padding: 0 20px;
      line-height: 38px;
      text-align: center;
      border: 1px solid transparent;
    }
    .purchase-title-active {
      border-color: #1890ff;
      color: #1890ff;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>
