<template>
  <div class="single-container">
    <div class="btn-head">
      <a-button
        v-permission="'add'"
        type="primary"
        icon="plus"
        class="btn"
        @click="addsingle"
      >
        添加单页
      </a-button>
      <a-button
        v-permission="'batch-del'"
        icon="delete"
        class="btn"
        :disabled="selectedRowKeys.length === 0"
        @click="deleteinbatches"
      >
        批量删除
      </a-button>
      <!-- <a-button v-permission="'view'" icon="check" class="btn">
        显示
      </a-button>
      <a-button v-permission="'disable'" icon="stop" class="btn">
        隐藏
      </a-button> -->
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
        <span slot="status" slot-scope="text">
          {{ text == 1 ? "关闭" : "开启" }}
        </span>

        <span slot="action" slot-scope="text">
          <a-button
            v-permission="'modify'"
            type="link"
            @click="updatePrice(text)"
          >
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button v-permission="'del'" type="link" @click="handleDel(text)">
            删除
          </a-button>
        </span>
        <div slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="modifyTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <!-- <a slot="name"
           slot-scope="text">{{ text }}</a> -->
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
          this.selectedRowKeys = selectedRowKeys;
        }
      };
    }
  },
  created() {},
  data() {
    return {
      listQuery: {
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "编号",
          dataIndex: "id",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "页面名称",
          dataIndex: "pageName"
        },
        {
          title: "访问路径",
          dataIndex: "resourceAddress"
        },
        // {
        //   title: "模板",
        //   dataIndex: "modeFileName"
        // },
        {
          title: "创建时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" }
        },
        {
          title: "修改时间",
          dataIndex: "modifyTime",
          scopedSlots: { customRender: "modifyTime" }
        },
        {
          title: "开启状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          key: "action",
          dataIndex: "id",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      friendshipdata: [],
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
    //添加单页
    addsingle() {
      this.$router.push("/depot/web/add-single");
    },
    getList() {
      this.$store.dispatch("page/getList", this.listQuery).then(res => {
        console.log(res);
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
    quickJump(page) {
      this.listQuery.currentPage = page;
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.listQuery.pageSize = pageSize;
      this.listQuery.currentPage = current;
      this.getList();
    },
    //修改单页
    updatePrice(id) {
      this.$router.push({
        path: "/depot/web/amend-single",
        query: {
          id: id
        }
      });
    },
    // 删除单页
    handleDel(id) {
      console.log(id);
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("page/delPrice", id).then(val => {
            this.$message.success("操作成功");
            this.getList();
          });
        }
      });
    },
    //批量删除
    deleteinbatches() {
      console.log(this.selectedRowKeys.toString());
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("page/delPrice", this.selectedRowKeys.toString())
            .then(val => {
              this.$message.success("操作成功");
              this.getList();
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.single-container {
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
}
</style>
