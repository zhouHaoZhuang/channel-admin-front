<template>
  <div class="work-top-container">
    <div class="title">基本信息</div>
    <div class="item-list">
      <div class="item">
        <div class="label">标题：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">工单编号：</div>
        <div class="value">
          {{ detail.workOrderNo }}
        </div>
      </div>
      <div class="item">
        <div class="label">工单分类：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">会员ID：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">联系电话：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">联系QQ：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">创建时间：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">响应时间：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">接单客服：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">工单状态：</div>
        <div class="value">
          <!-- 待接单 -->
          <div v-if="detail.status === 1" class="wait status">
            {{ workOrderStatusEnum[detail.status] }}
          </div>
          <!-- 处理中 -->
          <div v-if="detail.status === 2" class="center status">
            {{ workOrderStatusEnum[detail.status] }}
          </div>
          <!-- 处理完成 -->
          <div v-if="detail.status === 3" class="ok status">
            {{ workOrderStatusEnum[detail.status] }}
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">结束时间：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">工单评论:</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">业务ID:</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">业务IP:</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">业务类型：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item actions">
        <div class="label">操作：</div>
        <div class="value">
          <a-space>
            <a-button
              type="primary"
              v-if="detail.status !== 3"
              :loading="loading"
              @click="handleCloseWorkOrder"
            >
              接单
            </a-button>
            <a-button
              type="primary"
              v-if="detail.status !== 3"
              :loading="loading"
              @click="handleCloseWorkOrder"
            >
              移动工单
            </a-button>
            <a-button
              type="primary"
              v-if="detail.status !== 3"
              :loading="loading"
              @click="handleCloseWorkOrder"
            >
              关闭工单
            </a-button>
          </a-space>
        </div>
      </div>
      <div class="item">
        <div class="label">客户是否已读：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { workOrderStatusEnum } from "@/utils/enum";
export default {
  props: {
    // 工单详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      workOrderStatusEnum,
      loading: false
    };
  },
  methods: {
    // 关闭工单
    handleCloseWorkOrder() {
      this.$confirm({
        title: "确认要关闭工单吗？",
        onOk: () => {
          this.loading = true;
          this.$store
            .dispatch("workorder/closeWorkOrder", {
              workOrderNo: this.detail.workOrderNo
            })
            .then(res => {
              this.$message.success("关闭工单成功");
              this.$emit("success");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.work-top-container {
  padding-bottom: 24px;
  margin-bottom: 18px;
  background: #fff;
  position: relative;
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
  .item-list {
    margin-top: 10px;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item {
    width: 33.33%;
    display: flex;
    margin-bottom: 13px;
    .label {
      color: #a0a2a3;
    }
  }
  .actions {
    align-items: center;
  }
  .wait {
    color: #262829;
    .icon {
      color: #00aaff;
      font-size: 18px;
    }
  }
  .center {
    color: #faad14;
    .icon {
      color: #faad14;
      font-size: 16px;
    }
  }
  .ok {
    color: #2bbe22;
    .icon {
      color: #2bbe22;
      font-size: 16px;
    }
  }
}
</style>
