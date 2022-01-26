<template>
  <div class="whole-container">
    <div style="width: 1100" class="paging">
      <a-tabs default-active-key="1" :tab-position="tabPosition">
        <a-tab-pane key="1" tab="基本">
          <div class="big-block-title">基本</div>
          <Basic />
        </a-tab-pane>
        <a-tab-pane key="2" tab="会员">
          <div class="big-block-title">会员</div>
          <Member />
        </a-tab-pane>
        <a-tab-pane key="3" tab="充值">
          <div class="big-block-title">充值</div>
          <Topup />
        </a-tab-pane>
        <a-tab-pane key="4" tab="邮件">
          <div class="big-block-title">邮件</div>
          <Mail />
        </a-tab-pane>
        <a-tab-pane key="5" tab="短信">
          <div class="big-block-title">短信</div>
          <Note />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import Basic from "./basic.vue";
import Member from "./member.vue";
import Topup from "./topup.vue";
import Mail from "./mail.vue";
import Note from "./note.vue";

export default {
  data() {
    return {
      tabPosition: "left"
    };
  },
  components: {
    Basic,
    Member,
    Topup,
    Mail,
    Note
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
  .big-block-title {
    color: #292929;
    font-size: 18px;
  }
}
</style>
