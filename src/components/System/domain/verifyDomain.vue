<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    title="验证域名所有权"
    wrapClassName="verify-domain-container"
    okText="已添加，验证域名"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="top-domain">
      {{ detail.domain }}
    </div>
    <div class="content-box">
      <div class="info mb15">
        开启CDN需验证域名的归属权，验证通过后才可开启CDN。
      </div>
      <div class="info">您可以通过DNS解析验证域名，DNS验证操作步骤如下：</div>
      <div class="info">1：登录域名解析控制台</div>
      <div class="info mb15">
        2：进入ydidc.com解析页面，点击解析设置，将以下记录值添加到解析记录值
      </div>
      <div class="info">记录类型：TXT</div>
      <div class="info">
        主机记录：verification
        <a-button
          class="copy-btn"
          type="link"
          @click="handleCopy('verification')"
        >
          复制
        </a-button>
      </div>
      <div class="info">
        记录值：{{ recordValue }}
        <a-button class="copy-btn" type="link" @click="handleCopy(recordValue)">
          复制
        </a-button>
      </div>
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
    }
  },
  data() {
    return {
      loading: false,
      recordValue: ""
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          this.getRecord();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取记录值
    getRecord() {
      this.$store
        .dispatch("domain/getRecord", { domainName: this.detail.domain })
        .then(res => {
          this.recordValue = res.data;
        });
    },
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 点击复制
    handleCopy(txt) {
      this.$copyText(txt)
        .then(() => {
          this.$message.success("已成功复制到剪切板");
        })
        .catch(() => {
          this.$message.warning("复制失败");
        });
    },
    // 弹窗提交
    handleOk() {
      this.loading = true;
      this.$store
        .dispatch("domain/verify", { domain: this.detail.domain })
        .then(res => {
          this.$emit("success", "success");
          this.$emit("changeVisible", false);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.verify-domain-container {
  .top-domain {
    color: #000;
    height: 50px;
    line-height: 50px;
    background: #f2f2f2;
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .content-box {
    color: #000;
    .info {
      font-size: 16px;
      color: #000;
      height: 32px;
      line-height: 32px;
      .copy-btn {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .mb15 {
      margin-bottom: 15px;
    }
  }
}
</style>
