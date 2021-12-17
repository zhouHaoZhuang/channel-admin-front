<template>
  <div class="banner-container">
    <div class="btn-head">
      <a-button type="primary"
                icon="plus"
                class="btn"
                @click="addbanner">
        添加Banner
      </a-button>
      <a-button icon="delete"
                class="btn"
                @click="deleteinbatches">
        批量删除
      </a-button>
      <a-button icon="check"
                class="btn">
        显示
      </a-button>
      <a-button icon="stop"
                class="btn">
        隐藏
      </a-button>
      <a-button icon="column-height"
                class="btn">
        排序
      </a-button>
    </div>
    <div class="table-content">
      <a-table :row-selection="rowSelection"
               :columns="columns"
               :data-source="data"
               rowKey="id"
               :pagination="paginationProps"
               :scroll="{ x: 1300 }">
        <div slot="bannerType"
             slot-scope="text">
          <div v-if="text === 0"></div>
          <div v-else-if="text === 1"></div>
          {{ text === 0 ? "首页banner" : "云服务器banner" }}
        </div>
        <div class="status"
             slot="status"
             slot-scope="text">
          <div v-if="text === 0"
               class="dot"></div>
          <div v-else
               class="dot dot-err"></div>
          {{ text === 0 ? "正常" : "冻结" }}
        </div>
        <span slot="action"
              slot-scope="text">
          <a-button type="link"
                    @click="updatePrice(text)">
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button type="link"
                    @click="handleDel(text)">
            删除
          </a-button>
        </span>
        <a slot="name"
           slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          console.log(this.selectedRowKeys);
        }
      };
    }
  },
  created () { },
  data () {
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
          key: ""
        },
        {
          title: "类型",
          dataIndex: "bannerType",
          key: "bannerType",
          scopedSlots: { customRender: "bannerType" }
        },
        {
          title: "标题",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "描述",
          dataIndex: "describe",
          key: "describe"
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
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
  activated () {
    this.getList();
  },
  methods: {
    //查询
    // search(){
    //   this.listQuery.currentPage = 1;
    //   this.getList();
    // },
    //查询数据表格
    getList () {
      this.$store.dispatch("banner/getList").then(res => {
        console.log(res);
        this.data = [...res.data.list];
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
    quickJump (currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    //表格分页切换每页条数
    onShowSizeChange (current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    //添加banner
    addbanner () {
      this.$router.push("/personal/account/add-banner");
    },
    //修改
    updatePrice (text) {
      this.$router.push({
        path: "/personal/account/amend-banner",
        query: {
          id: text
        }
      });
    },
    //删除
    handleDel (id) {
      console.log(id);
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("banner/delPrice", id).then(val => {
            this.$message.success("操作成功");
            this.getList();
          });
        }
      });
    },
    //批量删除
    deleteinbatches () {
      // console.log(this.selectedRowKeys.toString());
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要删除的数据");
        return;
      }
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("banner/delPrice", this.selectedRowKeys.toString()).then(val => {
            this.$message.success("操作成功");
            // this.$store.dispatch("操作成功").then(val => {
            //   this.reqAfter(val);
            // });
            this.getList();
          });
        }
      });
    }
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
