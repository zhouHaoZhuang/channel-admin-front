<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    title="验证域名所有权"
    wrapClassName="verify-result-container"
    @cancel="handleCancel"
  >
    <div slot="footer">
      <a-button type="primary" @click="handleCancel">知道了</a-button>
    </div>
    <div class="top-domain">
      {{ detail.domain }}
    </div>
    <div class="content-box">
      <div class="title">域名验证{{ typeTitle }}</div>
      <div class="info">设置解析到解析生效存在一定的时间差，请稍后再试</div>
      <div class="info1">请确认域名是否已添加记录值</div>
    </div>
  </a-modal>
</template>

<script>
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value"
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false
    },
    // 单个域名详情
    detail: {
      type: Object,
      default: () => {}
    },
    // 弹窗类型，成功还是失败
    type: {
      type: String,
      default: ""
    }
  },
  computed: {
    typeTitle() {
      return this.type === "success" ? "成功" : "失败";
    }
  },
  data() {
    return {};
  },
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    }
  }
};
</script>
<style lang="less" scoped>
.verify-result-container {
  .top-domain {
    color: #000;
    height: 50px;
    line-height: 50px;
    background: #f2f2f2;
    text-align: center;
    font-size: 20px;
  }
  .content-box {
    color: #000;
    text-align: center;
    .title {
      font-size: 24px;
      font-weight: 600;
      margin: 10px 20px;
    }
    .info {
      font-size: 18px;
      margin-bottom: 15px;
      color: #000;
    }
    .info1 {
      font-size: 16px;
      color: #aaa;
    }
  }
}
</style>
