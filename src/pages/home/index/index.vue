<template>
  <div class="home-container">
    <div style="background-color: #F0F2F5; padding: 20px; padding-left: 0;">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-card title="注册客户" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/passport/register.png"
                  alt=""
                />
                <span><a>232</a> 人</span>
              </div>
              <p class="moon-num">
                <span>本月注册用户</span><span>2341人</span>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="成交客户" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/passport/makeadeal.png"
                  alt=""
                />
                <span>232人</span>
              </div>
              <p class="moon-num">
                <span>本月成交用户</span><span>2341人</span>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="订单数" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/passport/Order.png"
                  alt=""
                />
                <span>232人</span>
              </div>
              <p class="moon-num">
                <span>本月成交用户</span><span>2341人</span>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="消费金额" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/passport/Consumption.png"
                  alt=""
                />
                <span>232人</span>
              </div>
              <p class="moon-num">
                <span>本月成交用户</span><span>2341人</span>
              </p>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="top-header">
      <div class="left">
        <img
          src="https://tcs-devops.aliyuncs.com/thumbnail/112ba1538eba7923507a4e75c569d754eb5a/w/200/h/200"
          alt=""
          class="left-img"
        />
        <div class="con">
          <div class="user">
            早安，云小二 [超级管理员]，祝你开心每一天！
          </div>
          <div class="info">
            您的上次登录信息: 115.196.230.183 (IP地址) 2021-10-23 18:14:56
            (登录时间)
          </div>
        </div>
      </div>
      <!-- <div class="right">
        <div class="item">
          <span>企业数量</span>
          <span>56</span>
        </div>
        <div class="line"></div>
        <div class="item">
          <span>渠道数</span>
          <span>6</span>
        </div>
        <div class="line"></div>
        <div class="item">
          <span>企业数量</span>
          <span>2,250</span>
        </div>
      </div> -->
    </div>
    <!-- 业务统计模块 -->
    <div class="business-statistics">
      <h1>业务统计</h1>
      <div class="business-info">
        云服务器（3台）
      </div>
    </div>
    <!-- 消息提醒页面 -->
    <div class="message-notification">
      <h1>消息提醒</h1>
      <div class="message-info">
        <p>关于‘2021金秋上云季’活动下线通知</p>
      </div>
    </div>
    <!-- <Tinymce @tinymceinput="tinymceinput" /> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import Tinymce from "@/components/Tinymce/index.vue";
export default {
  // components: { Tinymce },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    ...mapGetters(["token"]),
  },
  created() {},
  // activated() {
  //   this.getList();
  // },
  methods: {
    // tinymceinput(value) {
    //   console.log("富文本输入", value);
    // }
    //获得本月的开端日期
    // function getMonthStartDate(){
    //     var monthStartDate = new Date(nowYear, nowMonth, 1);
    //     return formatDate(monthStartDate);
    // }
    // //获得本月的停止日期
    // function getMonthEndDate(){
    //     var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    //     return formatDate(monthEndDate);
    // }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  background: #f0f2f5;
  margin-top: -24px;
  padding: 0 24px 24px;
  .day-num {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 24px;
    border-bottom: 1px solid #ececec;
    a {
      font-size: 32px;
      color: #000;
      font-weight: 400;
    }
  }
  .moon-num {
    margin: 0;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .top-header {
    display: flex;
    justify-content: space-between;
    width: 60%;
    background-color: #fff;
    padding: 24px;
    .left {
      display: flex;
      align-items: center;
      .left-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 20px;
      }
      .con {
        .user {
          font-size: 18px;
          color: #000;
          font-weight: 500;
        }
        .info {
          font-size: 14px;
          color: #929292;
          margin-top: 10px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        span:nth-child(1) {
          font-size: 14px;
          color: #929292;
        }
        span:nth-child(2) {
          font-size: 24px;
          color: #000;
          font-weight: 500;
        }
      }
      .line {
        height: 30px;
        width: 1px;
        margin: 0 30px;
        background: #ccc;
      }
    }
  }
  .business-statistics {
    margin-top: 24px;
    width: 60%;
    background-color: #fff;
    padding-bottom: 24px;
    h1 {
      padding: 24px;
      font-size: 25px;
      color: #000;
      font-weight: 400;
      border-bottom: 1px solid #e3e3e3;
    }
    .business-info{
      padding-left: 24px;
    }
  }
  .message-notification {
    position: absolute;
    top: 255px;
    right: 45px;
    margin-top: 24px;
    width: 36%;
    background-color: #fff;
    padding-bottom: 24px;
    h1 {
      padding: 24px;
      font-size: 25px;
      color: #000;
      font-weight: 400;
      border-bottom: 1px solid #e3e3e3;
    }
    .message-info{
      padding-left: 24px;
    }
  }
}
</style>
