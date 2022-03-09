<template>
  <div class="friendship-container">
    <div class="head">
      <!-- 友情链接 -->
      <a-tabs type="card" style="width:100%">
        <a-tab-pane key="1" tab="友情链接管理">
          <div class="btn-head">
            <a-button
              v-permission="'add'"
              type="primary"
              icon="plus"
              class="btn"
              @click="updateLink('add')"
            >
              添加友情链接
            </a-button>
            <a-button
              v-permission="'batch-del'"
              icon="delete"
              class="btn"
              @click="handleBatchDelLink"
            >
              批量删除
            </a-button>
            <!-- <a-button v-permission="'view'" icon="check" class="btn">
              显示
            </a-button>
            <a-button v-permission="'disable'" icon="stop" class="btn">
              隐藏
            </a-button>
            <a-button v-permission="'sort'" icon="column-height" class="btn">
              排序
            </a-button> -->
          </div>
          <div class="table-content">
            <a-table
              :row-selection="rowSelection"
              :columns="linksColumns"
              :data-source="linksData"
              :pagination="false"
              rowKey="id"
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
              <div slot="action" slot-scope="text, record">
                <a-button
                  v-permission="'modify'"
                  type="link"
                  @click="updateLink('edit', record)"
                >
                  修改
                </a-button>
                <a-divider type="vertical" />
                <a-button
                  v-permission="'del'"
                  type="link"
                  @click="handleDelLink(record)"
                >
                  删除
                </a-button>
              </div>
            </a-table>
          </div>
        </a-tab-pane>
        <!-- 友情链接分类 -->
        <a-tab-pane key="2" tab="友情链接分类管理">
          <div class="btn-head">
            <a-button
              v-permission="'add-type'"
              type="primary"
              icon="plus"
              class="btn"
              @click="updateCategory('add')"
            >
              添加分类
            </a-button>
            <a-button v-permission="'type-sort'" icon="column-height" class="btn">
              排序
            </a-button>
          </div>
          <div class="table-content">
            <a-table
              :columns="categoryColumns"
              :data-source="categoryData"
              rowKey="id"
              :pagination="false"
            >
              <div slot="tableNumber" slot-scope="text, record, index">
                {{ index * listQuery.currentPage + 1 }}
              </div>
              <div slot="action" slot-scope="text, record">
                <a-button
                  v-permission="'type-modify'"
                  type="link"
                  @click="updateCategory('edit', record)"
                >
                  修改
                </a-button>
                <a-divider type="vertical" />
                <a-button
                  v-permission="'type-del'"
                  type="link"
                  @click="handleDelCategory(record)"
                >
                  删除
                </a-button>
              </div>
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
        }
      };
    }
  },
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 999
      },
      linksColumns: [
        {
          title: "编号",
          dataIndex: "tableNumber",
          scopedSlots: { customRender: "tableNumber" }
        },
        {
          title: "所属分类",
          dataIndex: "linkTypeName"
        },
        {
          title: "名称",
          dataIndex: "linkName"
        },
        {
          title: "链接URL",
          dataIndex: "linkUrl"
        },
        {
          title: "展示位置",
          dataIndex: "bottomShow",
          scopedSlots: { customRender: "bottomShow" }
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
      linksData: [],
      selectedRowKeys: [],
      categoryColumns: [
        {
          title: "ID",
          dataIndex: "tableNumber",
          scopedSlots: { customRender: "tableNumber" }
        },
        {
          title: "名称",
          dataIndex: "linkTypeName"
        },
        {
          title: "友情链接数量",
          dataIndex: "linkCount"
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      categoryData: []
    };
  },
  activated() {
    this.getLinkList();
    this.getCategoryList();
  },
  methods: {
    // 查询友情链接数据
    getLinkList() {
      this.$store.dispatch("links/getLinkList", this.listQuery).then(res => {
        this.linksData = [...res.data.list];
      });
    },
    // 查询友情分类数据
    getCategoryList() {
      this.$store
        .dispatch("links/getCategoryList", this.listQuery)
        .then(res => {
          this.categoryData = [...res.data.list];
        });
    },
    //添加/修改友情链接
    updateLink(type, record) {
      this.$router.push({
        path: "/depot/web/updateLink",
        query: {
          id: type === "add" ? undefined : record.id
        }
      });
    },
    //添加/修改友情分类
    updateCategory(type, record) {
      this.$router.push({
        path: "/depot/web/updateCategory",
        query: {
          id: type === "add" ? undefined : record.id
        }
      });
    },
    //删除友情链接
    handleDelLink(record) {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("links/delLink", record.id).then(res => {
            this.$message.success("删除成功");
            this.getLinkList();
          });
        }
      });
    },
    // 删除友情分类
    handleDelCategory(record) {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("links/delCategory", record.id).then(res => {
            this.$message.success("删除成功");
            this.getCategoryList();
          });
        }
      });
    },
    //批量删除友情链接
    handleBatchDelLink() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要删除的数据");
        return;
      }
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("links/delLink", this.selectedRowKeys)
            .then(res => {
              this.$message.success("操作成功");
              this.getLinkList();
            });
        }
      });
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
