<template>
  <div class="home-container">
    <div style="background-color: #f0f2f5; padding: 20px; padding-left: 0">
      <div class="top-header">
        <div class="left">
          <img
            src="https://tcs-devops.aliyuncs.com/thumbnail/112ba1538eba7923507a4e75c569d754eb5a/w/200/h/200"
            alt=""
            class="left-img"
          />
          <div class="con">
            <div class="user">早安，云小二 [超级管理员]，祝你开心每一天！</div>
            <div class="info">
              您的上次登录信息: {{ userInfo.lastIP }} (IP地址)
              {{ userInfo.lastLogin | formatDate }}
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
      <a-row type="flex" :gutter="16">
        <a-col :flex="1">
          <a-card title="注册客户" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/frontPage/register.png"
                  alt=""
                />
                <span>
                  <a>{{ loginDay }}</a> 人
                </span>
              </div>
              <p class="moon-num">
                <span>本月注册客户</span><span>{{ loginMonth }}人</span>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :flex="1">
          <a-card title="成交客户" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/frontPage/makeadeal.png"
                  alt=""
                />
                <span>
                  <a>{{ clinchDay }}</a> 人
                </span>
              </div>
              <p class="moon-num">
                <span>本月成交客户</span><span>{{ clinchMonth }}人</span>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :flex="1">
          <a-card title="订单数" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/frontPage/workOrder.png"
                  alt=""
                />
                <span>
                  <a>{{ registerDay }}</a> 笔
                </span>
              </div>
              <p class="moon-num">
                <span>本月订单数</span><span>{{ registerMonth }}笔</span>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :flex="1">
          <a-card title="消费金额" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/frontPage/Consumption.png"
                  alt=""
                />
                <span>
                  <a>{{ orderSumDay }}</a> 元
                </span>
              </div>
              <p class="moon-num">
                <span>本月用户消费金额</span><span>{{ orderSumMonth }}元</span>
              </p>
            </div>
          </a-card>
        </a-col>
        <a-col :flex="1">
          <a-card title="工单" :bordered="false">
            <a slot="extra" href="#">今日</a>
            <div>
              <div class="day-num">
                <img
                  width="70px"
                  src="@/assets/img/frontPage/Order.png"
                  alt=""
                />
                <span>
                  <a>{{ dayWorkOrder }}</a> 单
                </span>
              </div>
              <p class="moon-num">
                <span>本月待解决工单</span><span>{{ monthWorkOrder }}单</span>
              </p>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="home-info">
      <div class="home-info-left">
        <div class="business-statistics">
          <h1>消息提醒</h1>
          <div class="message-info">
            <p
              v-for="(item, index) in messageList"
              :key="index"
              @click="massageInfo(item.id)"
            >
              {{ item.title }}
            </p>
          </div>
        </div>
        <!-- 业务统计模块 -->
        <div class="business-statistics">
          <h1>业务统计</h1>
          <div class="business-info">
            云服务器（当月{{ SuccessCountNum }}台）
          </div>
        </div>
      </div>
      <!-- 消息提醒页面 -->
      <div class="outbox">
        <h1 style="font-weight: 600">专属客服</h1>
        <div v-if="customerInfo != undefined" class="flexbox">
          <img width="140px" class="imgclass" :src="customerInfo.wechatUrl" />
          <ul class="right-box">
            <li><a-icon type="user" class="left-icon" />客服姓名:</li>
            <li>
              <a-icon type="phone" :rotate="90" class="left-icon" />联系方式:
            </li>
            <li><a-icon type="qq" class="left-icon" />qq号:</li>
            <li><a-icon type="wechat" class="left-icon" />微信号:</li>
          </ul>
          <ul class="right-box">
            <li>{{ customerInfo.name }}</li>
            <li>{{ customerInfo.phone }}</li>
            <li>{{ customerInfo.qq }}</li>
            <li>{{ customerInfo.wechat }}</li>
          </ul>
          <span class="bottom-title">客服微信二维码</span>
        </div>
        <div v-else>
          <span>暂无客服信息</span>
        </div>
      </div>
    </div>
    <!-- <Tinymce @tinymceinput="tinymceinput" /> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import moment from "moment";
// import Tinymce from "@/components/Tinymce/index.vue";
export default {
  // components: { Tinymce },
  data() {
    return {
      moment,
      registerDay: "",
      registerMonth: "",
      clinchDay: "",
      clinchMonth: "",
      loginDay: "",
      loginMonth: "",
      orderSumDay: "",
      orderSumMonth: "",
      SuccessCountNum: "",
      listQuery: {
        id: undefined,
        search: "",
        currentPage: 1,
        pageSize: 5,
        total: 0,
        "qp-status-eq": "0",
      },
      messageList: null,
      dayWorkOrder: "",
      monthWorkOrder: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      customerInfo: (state) => state.customer.customerInfo,
    }),
    ...mapGetters(["token"]),
  },
  created() {
    this.getRegister(this.currentDay(), "day");
    this.getRegister(this.currentMonth(), "month");
    this.getBasicCompanyInfo(this.currentDay(), "day");
    this.getBasicCompanyInfo(this.currentMonth(), "month");
    this.coountInfo(this.currentDay(), "day");
    this.coountInfo(this.currentMonth(), "month");
    this.orderSumInfo(this.currentDay(), "day");
    this.orderSumInfo(this.currentMonth(), "month");
    this.getSuccessCount(this.currentMonth());
    this.getMessageList();
    this.getDayWorkOrder();
    this.getMonthWorkOrder();
  },
  mounted() {
    this.userInfo.lastLogin = this.userInfo.lastLogin?.slice(0, 19);
    // console.log(this.userInfo.lastLogin, "后");
  },
  methods: {
    currentMonth() {
      // //获取当前月份
      return {
        startTime: this.moment().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.moment().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
      };
    },
    // 跳转消息详情
    massageInfo(id) {
      this.$router.push({
        path: "/user/center/detail",
        query: { id },
      });
    },
    // 获取消息列表
    getMessageList() {
      this.$store.dispatch("message/getList", this.listQuery).then((res) => {
        // console.log(res);
        this.messageList = res.data.list;
      });
    },
    currentDay() {
      // //获取当前日
      return {
        startTime: this.moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.moment().startOf("day").format("YYYY-MM-DD 23:59:59"),
      };
    },
    // 获取交易订单数
    getRegister(date, type) {
      this.$store.dispatch("frontPage/orderCountNum", date).then((val) => {
        if (type == "day") {
          this.registerDay = val.data;
        }
        if (type == "month") {
          this.registerMonth = val.data;
        }
        // console.log(val);
      });
    },
    // 注册客户
    getBasicCompanyInfo(date, type) {
      this.$store
        .dispatch("frontPage/getBasicCompanyInfo", date)
        .then((val) => {
          if (type == "day") {
            this.loginDay = val.data;
          }
          if (type == "month") {
            this.loginMonth = val.data;
          }
        });
    },
    // 成交客户
    coountInfo(date, type) {
      this.$store.dispatch("frontPage/coountInfo", date).then((val) => {
        if (type == "day") {
          this.clinchDay = val.data;
        }
        if (type == "month") {
          this.clinchMonth = val.data;
        }
      });
    },
    // 消费金额
    orderSumInfo(date, type) {
      this.$store.dispatch("frontPage/orderSumInfo", date).then((val) => {
        if (type == "day") {
          this.orderSumDay = val.data;
        }
        if (type == "month") {
          this.orderSumMonth = val.data;
        }
      });
    },
    // 统计今日工单
    getDayWorkOrder() {
      this.$store.dispatch("frontPage/getDayWorkOrder").then((res) => {
        console.log(res, "----");
        this.dayWorkOrder = res.data;
      });
    },
    // 获取本月工单统计
    getMonthWorkOrder() {
      this.$store.dispatch("frontPage/getMonthWorkOrder").then((res) => {
        console.log(res, "----");
        this.monthWorkOrder = res.data;
      });
    },
    // getSuccessCount获取当日云服务器台数
    getSuccessCount(date) {
      this.$store.dispatch("frontPage/getSuccessCount", date).then((val) => {
        this.SuccessCountNum = val.data;
        // console.log(val);
      });
    },
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
    span {
      display: block;
      height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .home-info-left {
    width: 68.6%;
  }
  .top-header {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 24px;
    margin-bottom: 20px;
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
    background-color: #fff;
    padding-bottom: 24px;
    .message-info {
      padding: 0 24px;
      p {
        border-bottom: 1px solid #e3e3e3;
        padding-bottom: 10px;
      }
    }
    h1 {
      padding: 24px;
      font-size: 25px;
      color: #000;
      font-weight: 400;
      border-bottom: 1px solid #e3e3e3;
    }
    .business-info {
      padding-left: 24px;
    }
  }
  .business-statistics:nth-child(1) {
    margin-top: 0px;
  }
  .home-info {
    display: flex;
    justify-content: space-between;
    width: 98.6%;
    .outbox {
      width: 30.2%;
      // min-width: 420px;
      height: 290px;
      background-color: #ffffff;
      padding: 30px 30px;
      position: relative;
      // margin-left: 20px;
      .flexbox{
        display: flex;
        justify-content:flex-start;
      }
      .imgclass {
        display: inline-block;
        float: left;
        width: 140px;
        height: 140px;
      }
      .right-box {
        margin-top: -10px;
        float: left;
        list-style: none;
        line-height: 40px;
        font-size: 12px;
        color: #000000;
        padding: 0;
        white-space: nowrap;
        margin-right: 6%;
        .left-icon {
          margin-right: 6px;
        }
      }
      .bottom-title {
        position: absolute;
        bottom: 50px;
        left: 60px;
        font-size: 12px;
        color: #000000;
      }
    }
  }
  .message-notification {
    width: 36%;
    background-color: #fff;
    padding-bottom: 24px;
    margin-left: 24px;
    h1 {
      padding: 24px;
      font-size: 25px;
      color: #000;
      font-weight: 400;
      border-bottom: 1px solid #e3e3e3;
    }
    .message-info {
      padding: 0 24px;
      p {
        border-bottom: 1px solid #e3e3e3;
        padding-bottom: 10px;
      }
    }
  }
}
</style>
