<template>
  <div class="whole-container">
    <div style="width: 1100" class="paging">
      <a-tabs default-active-key="1" :tab-position="tabPosition">
        <a-tab-pane key="1" tab="基本">
          Content of Tab 1
        </a-tab-pane>
        <a-tab-pane key="2" tab="会员">
          Content of Tab 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="充值">
          Content of Tab 3
        </a-tab-pane>
         <a-tab-pane key="4" tab="邮件">
          Content of Tab 3
        </a-tab-pane>
         <a-tab-pane key="5" tab="短信">
          Content of Tab 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "left"
    };
  },
  methods: {
    callback(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
.whole-container {
  background: #fff;
  padding: 20px;
  .content {
    width: 600px;
  }
}
</style>
