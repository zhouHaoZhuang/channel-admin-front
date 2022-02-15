<template>
  <div class="work-record-container">
    <div class="title">沟通记录</div>
    <div class="record-list">
      <div v-for="item in recordList" :key="item.id" class="item">
        <div class="left">
          <div class="ava">
            <img
              v-if="item.identityType === 1"
              src="@/assets/img/workOrder/user.png"
              alt=""
            />
            <img v-else src="@/assets/img/workOrder/customer.png" alt="" />
          </div>
          <div class="info-box">
            <div :class="`top-title ${getClassName(item.identityType)}`">
              问题描述
            </div>
            <div class="info-txt">
              {{ item.replyDetail }}
            </div>
            <div class="info-img">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <div class="right">
          {{ item.createTime | formatDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 消息记录列表
    recordList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // 根据用户类型返回不同类名
    getClassName() {
      return function(val) {
        if (val === 1) {
          return "";
        }
        if (val === 2) {
          return "info-txt";
        }
        if (val === 3) {
          return "sys-txt";
        }
        return "";
      };
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.work-record-container {
  padding-bottom: 24px;
  margin-bottom: 18px;
  background: #fff;
  font-size: 12px;
  .title {
    border-bottom: 1px solid #ebebeb;
    padding-left: 32px;
    height: 48px;
    line-height: 48px;
    margin-bottom: 10px;
    text-indent: 0;
    font-size: 14px;
    background-color: #fff;
    color: #292929;
  }
  .record-list {
    .item {
      margin: 0 25px;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ebebeb;
      .left {
        display: flex;
        .ava {
          width: 64px;
          height: 64px;
          margin-right: 25px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info-box {
          .top-title {
            font-weight: bold;
            color: #555;
          }
          .customer-txt {
            color: #00aaff;
          }
          .sys-txt {
            color: #ff8800;
          }
          .info-txt {
            color: #999;
          }
          .info-img {
            display: flex;
            margin-top: 10px;
            img {
              margin-right: 6px;
              width: 100px;
              height: 100px;
              object-fit: cover;
            }
          }
        }
      }
      .right {
        color: #999;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
