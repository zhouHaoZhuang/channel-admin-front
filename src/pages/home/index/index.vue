<template>
  <div class="home-container">
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
      <div class="right">
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
      </div>
    </div>
    <img
      style="width:100px;height:100px"
      src="https://yd-idc.oss-cn-beijing.aliyuncs.com/c8087d47-1d55-4e6d-974e-068bee35977d.jpg"
      alt=""
    />
    <Upload :defaultFileList="imgList" @change="imgChange" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Upload from "@/components/Upload/index";
export default {
  data() {
    return {
      imgList: [
        "http://yd-idc.oss-cn-beijing.aliyuncs.com/266a3b29-36c1-42ea-acaf-0d8ba0482ac2.jpg"
      ]
    };
  },
  components: {
    Upload
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["token"])
  },
  created() {},
  // activated() {
  //   this.getList();
  // },
  methods: {
    // 上传图片
    imgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.imgList = urlList;
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  background: #fff;
  margin-top: -24px;
  padding: 0 24px 24px;
  .top-header {
    display: flex;
    justify-content: space-between;
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
}
</style>
