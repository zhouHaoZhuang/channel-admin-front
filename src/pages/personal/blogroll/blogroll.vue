<template>
  <div class="friendship-container">
    <div class="head">
      <a-tabs type="card" @change="callback" style="width:100%">
        <a-tab-pane key="1" tab="友情链接管理">
          <div class="btn-head">
            <a-button type="primary" icon="plus" class="btn" @click="addfriend">
              添加友情链接
            </a-button>
            <a-button icon="delete" class="btn" @click="deleteinbatches">
              批量删除
            </a-button>
            <a-button icon="check" class="btn">
              显示
            </a-button>
            <a-button icon="stop" class="btn">
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
              <div slot="tableNumber" slot-scope="text, record, index">
                {{ index * listQuery.currentPage + 1 }}
              </div>
              <div class="status" slot="status" slot-scope="text">
                <div v-if="text === 0" class="dot"></div>
                <div v-else class="dot dot-err"></div>
                {{ text === 0 ? "正常" : "冻结" }}
              </div>
              <div slot="bottomShow" slot-scope="text">
                <div v-if="text === 0"></div>
                <div v-else-if="text === 1"></div>
                {{ text === 0 ? "全站展示" : "只显示首页" }}
              </div>
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="action" slot-scope="text">
                <a-button type="link" @click="updatePrice(text)">
                  修改
                </a-button>
                <a-divider type="vertical" />
                <a-button type="link" @click="handleDel(text)">
                  删除
                </a-button>
              </span>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="友情链接分类管理">
          <div class="btn-head">
            <a-button
              type="primary"
              icon="plus"
              class="btn"
              @click="addclassify"
            >
              添加分类
            </a-button>
            <a-button icon="column-height" class="btn">
              排序
            </a-button>
          </div>
          <div class="table-content">
            <a-table :columns="columnss" :data-source="friendshipdata" rowKey="id">
               <div slot="tableNumber" slot-scope="text, record, index">
                {{ index * listQuery.currentPage + 1 }}
              </div>
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="action" slot-scope="text">
                <a-button type="link" @click="amendclassify(text)">
                  修改
                </a-button>
                <a-divider type="vertical" />
                <a-button type="link" @click="handleDels(text)">
                  删除
                </a-button>
              </span>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
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
          dataIndex: "tableNumber",
          key: "tableNumber",
          scopedSlots: { customRender: "tableNumber" }
        },
        {
          title: "所属分类",
          dataIndex: "linkTypeName",
          key: "linkTypeName"
        },
        {
          title: "名称",
          dataIndex: "linkName",
          key: "linkName"
        },
        {
          title: "链接URL",
          dataIndex: "linkUrl",
          key: "linkUrl"
        },
        {
          title: "展示位置",
          dataIndex: "bottomShow",
          key: "bottomShow",
          scopedSlots: { customRender: "bottomShow" }
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
      columnss: [
        {
          title: "ID",
          dataIndex: "tableNumber",
          scopedSlots: { customRender: "tableNumber" }
        },
        {
          title: "名称",
          dataIndex: "linkTypeName",
          key: "linkTypeName"
        },
        {
          title: "友情链接数量",
          dataIndex: "linkCount",
          key:"linkCount"
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
      // 友情管理表
      friendshipdata:[],
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
    this.getfriendshipList();
  },
  methods: {
    callback(key) {
      // console.log(key);
    },
    //查询数据表格
    getList() {
      this.$store.dispatch("blogroll/getList").then(res => {
        console.log(res);
        this.data = [...res.data.list];
      });
    },
    //查询友情数据表格
    getfriendshipList() {
      this.$store.dispatch("blogroll/getfriendshipList").then(res => {
        console.log('aa',res);
        this.friendshipdata = [...res.data.list];
      });
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
    //修改
    updatePrice(text) {
      this.$router.push({
        path: "/personal/account/amend-blogroll",
        query: {
          id: text
        }
      });
    },
    //删除
    handleDel(id) {
      console.log(id);
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("blogroll/delPrice", id).then(val => {
            // this.$message.success("操作成功");
            console.log(val, 9090);
            this.getList();
          });
        }
      });
    },
    handleDels(id){
      console.log(id);
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("blogroll/delPrices", id).then(val => {
            // this.$message.success("操作成功");
            console.log(val, 9090);
            this.getLists();
          });
        }
      });
    },
    //批量删除
    deleteinbatches() {
      // console.log(this.selectedRowKeys.toString());
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("blogroll/delPrice", this.selectedRowKeys.toString())
            .then(val => {
              this.$message.success("操作成功");
              this.getList();
            });
        }
      });
    },
    //添加
    addfriend() {
      this.$router.push("/personal/account/add-blogroll");
    },
    //添加
    addclassify() {
      this.$router.push("/personal/account/add-classify");
    },
    //修改
    amendclassify(text) {
      this.$router.push({
        path:"/personal/account/amend-classify",
        query:{
          id:text
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.friendship-container {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .head {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    .btn {
      margin-right: 5px;
    }
    .table-content {
      margin-top: 10px;
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
}
</style>
