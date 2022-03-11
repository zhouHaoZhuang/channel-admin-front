<template>
  <div class="recharge-centre-container">
    <a-tabs default-active-key="1" @change="callback" :animated="false">
      <a-tab-pane key="1" tab="在线充值">
        <Online></Online>
      </a-tab-pane>
      <!-- <a-tab-pane key="2" tab="Tab 2" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">
        Content of Tab Pane 3
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script>
import Online from "./online/index.vue";
export default {
  components: {
    Online
  },
  data() {
    return {};
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>

<style lang="less" scoped>
.recharge-centre-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  margin: 0 20px;
}
</style>
