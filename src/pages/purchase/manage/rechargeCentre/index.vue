<template>
  <div class="recharge-centre-container">
    <a-tabs default-active-key="1" @change="callback" :animated="false">
      <a-tab-pane key="1" tab="在线充值">
        <Online></Online>
      </a-tab-pane>
      <a-tab-pane key="2" tab="">
        <!-- <Offline></Offline> -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Online from "./online/index.vue";
import Record from "./record/index.vue";
import Offline from "./offline/index.vue";
import Inquire from "./Inquire/index.vue";
export default {
  components: {
    Online,
    // Record,
    // Offline,
    // Inquire
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
