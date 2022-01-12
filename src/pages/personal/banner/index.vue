<template>
  <div class="banner-container">
    <div class="btn-head">
      <a-button
        type="primary"
        icon="plus"
        class="btn"
        @click="updateBanner('add')"
      >
        添加Banner
      </a-button>
      <a-button icon="delete" class="btn" @click="handleBatchDel">
        批量删除
      </a-button>
      <a-button icon="check" class="btn" @click="handleChangeShow('show')">
        显示
      </a-button>
      <a-button icon="stop" class="btn" @click="handleChangeShow('hide')">
        隐藏
      </a-button>
      <a-button icon="column-height" class="btn">
        排序
      </a-button>
    </div>
    <div class="table-content">
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
        :scroll="{ x: 1300 }"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <div slot="bannerType" slot-scope="text">
          {{ text === 0 ? "首页banner" : "云服务器banner" }}
        </div>
        <div class="status" slot="status" slot-scope="text">
          <div v-if="text === 0" class="dot"></div>
          <div v-else class="dot dot-err"></div>
          {{ text === 0 ? "正常" : "冻结" }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button type="link" @click="updateBanner('edit', record)">
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="handleDelBanner(record)">
            删除
          </a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          console.log(this.selectedRowKeys);
        }
      };
    }
  },
  created() {},
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "编号",
          dataIndex: "id"
        },
        {
          title: "类型",
          dataIndex: "bannerType",
          scopedSlots: { customRender: "bannerType" }
        },
        {
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "描述",
          dataIndex: "describe"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
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
      selectedRowKeys: []
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    //查询数据表格
    getList() {
      this.$store
        .dispatch("banner/getList")
        .then(res => {
          this.data = [...res.data.list];
        })
        .finally(() => {});
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    //添加/修改banner
    updateBanner(type, record) {
      this.$router.push({
        path: "/personal/account/update",
        query: {
          id: type === "add" ? undefined : record.id
        }
      });
    },
    //删除
    handleDelBanner(record) {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("banner/delPrice", record.id).then(res => {
            this.$message.success("操作成功");
            this.getList();
          });
        }
      });
    },
    //批量删除
    handleBatchDel() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要删除的数据");
        return;
      }
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("banner/delPrice", this.selectedRowKeys)
            .then(res => {
              this.$message.success("操作成功");
              this.getList();
            });
        }
      });
    },
    // 显示/隐藏
    handleChangeShow(type) {
      this.$confirm({
        title: `确定要批量${type === "show" ? "显示" : "隐藏"}吗?`,
        onOk: () => {
          this.$store
            .dispatch("banner/delPrice", this.selectedRowKeys)
            .then(res => {
              this.$message.success("操作成功");
              this.getList();
            });
        }
      });
    }
    // 排序
  }
};
</script>

<style lang="less" scoped>
.banner-container {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .btn-head {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    .btn {
      margin-right: 12px;
    }
  }
  .table-content {
    .status {
      display: flex;
      align-items: center;
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: green;
        margin-right: 5px;
      }
      .dot-err {
        background: red;
      }
    }
  }
}
</style>
