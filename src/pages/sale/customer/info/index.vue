<template>
  <div class="memberIndex">
    <!-- <ul>
      <li :class="{ switchto: atv == 'Infoindex' }">
        <a @click="switchTo('/sale/customer/Info/Infoindex', 'Infoindex')"
          >会员详情</a
        >
      </li>
      <li :class="{ switchto: atv == 'realName' }">
        <a @click="switchTo('/sale/customer/Info/realName', 'realName')"
          >实名认证</a
        >
      </li>
      <li :class="{ switchto: atv == 'memberapi' }">
        <a @click="switchTo('/sale/customer/Info/memberapi', 'memberapi')"
          >会员API</a
        >
      </li>
    </ul> -->
    <div class="card-container">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="会员详情">
          <div>
            <Info></Info>
          </div>
        </a-tab-pane>
        <!-- <a-tab-pane key="2" tab="实名认证">
          <p>实名认证</p>
        </a-tab-pane>
        <a-tab-pane key="3" tab="会员API">
          <p>会员API</p>
        </a-tab-pane> -->
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      atv: "Infoindex"
    };
  },
  components: {
    Info: () => import("./info.vue")
  },
  methods: {
    switchTo(url, atv) {
      this.$router.push(url);
      this.atv = atv;
    }
  }
};
</script>

<style lang="less" scoped>
.memberIndex {
  color: #666;
  margin-left: 20px;
  font-size: 13px;
  background-color: #fff;
  ul {
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    list-style: none;
    display: flex;
    height: 40px;
    > li {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: 1px solid #e0e0e0;

      background-color: #fff;
      a {
        color: #666666;
      }
    }
    .switchto {
      border: #0066ff solid 1px;
      border-bottom: 1px solid #fff;
      a {
        color: #0066ff;
        font-weight: bold;
      }
    }
  }
}
</style>
