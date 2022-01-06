<template>
  <div class="system-role-detail-container">
    <div class="public-box">
      <div class="public-title">
        <div class="left-tit">基本信息</div>
      </div>
      <div class="public-con">
        <div class="item">
          <div class="label">角色Code：</div>
          <div class="value">goods</div>
        </div>
        <div class="item">
          <div class="label">角色描述：</div>
          <div class="value">商品管理员</div>
        </div>
      </div>
    </div>
    <!-- 已授权用户 -->
    <div class="public-box">
      <div class="public-title">
        <div class="left-tit">已授权用户</div>
      </div>
      <div class="public-con">
        <div class="table-box">
          <a-table
            :loading="tableLoading"
            :columns="columns"
            :data-source="data"
            rowKey="id"
            :pagination="paginationProps"
          >
            <span slot="createdAt" slot-scope="text">
              {{ text | formatDate }}
            </span>
            <span slot="action" slot-scope="text, record">
              <a-button type="link" @click="handleGoDetail(record)">
                详情
              </a-button>
              <a-divider type="vertical" />
              <a-button type="link" @click="handleDel(record)">
                删除
              </a-button>
            </span>
          </a-table>
        </div>
      </div>
    </div>
    <!-- 已授权规则 -->
    <div class="public-box">
      <div class="public-title">
        <div class="left-tit">已授权规则</div>
      </div>
      <div class="public-con">
        <div class="item">
          <div class="label"></div>
          <div class="value"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.system-role-detail-container {
  background: #fff;
  padding: 24px 24px 4px;
  color: #000;
  .public-box {
    box-shadow: 0 6px 12px 0 #fbfcfd;
    border-radius: 8px;
    border: 1px solid #eee;
    margin-bottom: 24px;
    .public-title {
      height: 65px;
      padding: 0 32px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      .left-tit {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .public-con {
      padding: 24px 32px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        display: flex;
        align-items: center;
        .label {
          color: #9fabcb;
        }
        .value {
          margin-left: 5px;
        }
      }
      .rule-item {
      }
    }
  }
}
</style>
