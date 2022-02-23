<template>
  <div class="system-admin-container">
    <div class="btns">
      <a-space>
        <a-button
          v-permission="'add'"
          type="primary"
          icon="plus"
          @click="handleAdd"
        >
          添加子账号
        </a-button>
      </a-space>
    </div>
    <div class="table-con">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="authingId"
        :pagination="false"
      >
        <span slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </span>
        <!-- <span slot="action">
          <a-button type="link" disabled>暂无操作</a-button>
          <a-button
            v-permission="'modify'"
            type="link"
            @click="handleEdit(record)"
          >
            编辑
          </a-button>
          <a-divider type="vertical" />
          <a-button v-permission="'del'" type="link" @click="handleDel(record)">
            删除
          </a-button>
        </span> -->
      </a-table>
    </div>
    <!-- 添加/编辑子账号弹窗 -->
    <UpdateAccountModal
      v-model="visible"
      :detail="modalDetail"
      @success="modalSuccess"
    />
  </div>
</template>

<script>
import UpdateAccountModal from "@/components/System/updateAccountModal";
export default {
  components: {
    UpdateAccountModal
  },
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isAll: false
      },
      columns: [
        // {
        //   title: "子账号名称",
        //   dataIndex: "username"
        // },
        {
          title: "手机号",
          dataIndex: "phone"
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" }
        }
        // {
        //   title: "操作",
        //   dataIndex: "action",
        //   scopedSlots: { customRender: "action" }
        // }
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      tableLoading: false,
      // 弹窗相关数据
      visible: false,
      modalDetail: {}
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 查询
    search() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    // 查询表格数据
    getList() {
      this.tableLoading = true;
      this.$store
        // .dispatch("system/getModalUserList", this.listQuery)
        .dispatch("system/getModalUserList")
        .then(res => {
          this.data = [...res.data];
          // this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 表格分页快速跳转n页
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 添加权限
    handleAdd() {
      this.modalDetail = {};
      this.visible = true;
    },
    // 编辑权限
    handleEdit(record) {
      this.modalDetail = { ...record };
      this.visible = true;
    },
    // 添加/编辑弹窗事件成功的回调
    modalSuccess() {
      this.getList();
    },
    // 删除
    handleDel(record) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store
            .dispatch("system/delAccount", { code: record.code })
            .then(res => {
              this.$message.success("删除成功");
              this.getList();
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.system-admin-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .btns {
    margin-bottom: 20px;
  }
  .table-con {
    .actions-wrap {
      .title {
        font-size: 16px;
      }
      .list {
        display: flex;
        margin-top: 10px;
        .item {
          margin: 0 8px 0 0;
          padding: 0 7px;
          font-size: 12px;
          line-height: 20px;
          white-space: nowrap;
          background: #fafafa;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
