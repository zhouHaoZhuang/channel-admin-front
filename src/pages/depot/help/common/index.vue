<template>
  <div class="hotspot-container">
    <!-- <div class="btn-head">
      <a-button type="primary" icon="plus" class="btn" @click="addbanner">
        添加类别
      </a-button>
      <a-button icon="delete" class="btn" @click="deleteinbatches">
        批量删除
      </a-button>
      <a-button icon="column-height" class="btn" @click="sort">
        排序
      </a-button>
    </div> -->
    <div class="table-content">
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
        :scroll="{ x: 1300 }"
      >
        <div slot="bannerType" slot-scope="text">
          <div v-if="text === 0"></div>
          <div v-else-if="text === 1"></div>
          {{ text === 0 ? "首页banner" : "云服务器banner" }}
        </div>
        <div class="status" slot="status" slot-scope="text">
          <div v-if="text === 0" class="dot"></div>
          <div v-else class="dot dot-err"></div>
          {{ text === 0 ? "正常" : "冻结" }}
        </div>
        <span slot="action" slot-scope="text, record">
          <a-button
            v-permission="'modify'"
            type="link"
            @click="updatePrice(text, record.typeName)"
          >
            修改
          </a-button>
        </span>
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
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
          title: "ID",
          dataIndex: "id",
          key: ""
        },
        {
          title: "标题",
          dataIndex: "typeName",
          key: "typeName",
          scopedSlots: { customRender: "typeName" }
        },
        {
          title: "热点",
          dataIndex: "typeSort",
          key: "typeSort"
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
    //查询
    // search(){
    //   this.listQuery.currentPage = 1;
    //   this.getList();
    // },
    //查询数据表格
    getList() {
      this.$store.dispatch("category/getList",this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
      });
      // this.$getList("banner/getList",this.listQuery)
      // .then(res=>{
      //   this.data = [...res.data.list];
      //   this.paginationProps.total = res.data.totalCount * 1;
      // })
      // .finally(() =>{

      // })
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
    //添加banner
    addbanner() {
      this.$router.push("/depot/help/add-category");
    },
    //修改
    updatePrice(id, typeName) {
      this.$router.push({
        path: "/depot/help/amend-common",
        query: {
          id,
          typeName
        }
      });
    },
    //删除
    handleDel(id) {
      console.log(id);
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("category/delPrice", id).then(val => {
            this.$message.success("操作成功");
            this.getList();
          });
        }
      });
    },
    //批量删除
    deleteinbatches() {
      // console.log(this.selectedRowKeys.toString());
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要删除的数据");
        return;
      }
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("category/delPrice", this.selectedRowKeys.toString())
            .then(val => {
              this.$message.success("操作成功");
              // this.$store.dispatch("操作成功").then(val => {
              //   this.reqAfter(val);
              // });
              this.getList();
            });
        }
      });
    },
    //显示
    show() {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("category/delPrice", this.selectedRowKeys.toString())
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
.hotspot-container {
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
