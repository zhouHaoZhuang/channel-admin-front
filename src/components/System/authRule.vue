<template>
  <div class="public-box">
    <div class="public-title">
      <div class="left-tit">已授权规则</div>
       <a-space>
        <a-button type="primary">添加授权</a-button>
      </a-space>
    </div>
    <div class="public-con">
      <div class="table-box">
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="false"
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
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "用户信息",
          dataIndex: "code"
        },
        {
          title: "手机号",
          dataIndex: "descripation"
        },
        {
          title: "邮箱",
          dataIndex: "desacription"
        },
        {
          title: "最后登录时间",
          dataIndex: "createdAt",
          scopedSlots: { customRender: "createdAt" }
        },
        {
          title: "登录次数",
          dataIndex: "description"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      tableLoading: false
    };
  },
  methods: {
    // 查询已授权用户列表
    getAuthUserList() {
      this.tableLoading = true;
      this.$store
        .dispatch("system/getAuthUserList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
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
    justify-content: space-between;
    .left-tit {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .public-con {
    padding: 24px 32px;
    display: flex;
    flex-wrap: wrap;
    .table-box {
      width: 100%;
    }
  }
}
</style>
