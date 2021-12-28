<template>
  <div class="category-list-container">
    <div>
      <div>
        <a-space>
          <a-button type="primary" @click="addNewsType">
            <a-icon type="plus" />添加类别
          </a-button>
          <a-button @click="showModal">
            <span class="sort-icon">
              <a-icon type="swap" />
            </span>
            排序
          </a-button>
        </a-space>
      </div>
      <a-modal
        title="排序"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div class="sort-container">
          <span>排序</span>
          <div class="sort-list">
            <a-radio-group v-model="value" @change="onChange" size="small">
              <a-radio-button value="a">
                Hangzhou
              </a-radio-button>
              <br />
              <a-radio-button value="b">
                Shanghai
              </a-radio-button>
              <br />
              <a-radio-button value="c">
                Beijing
              </a-radio-button>
              <br />
              <a-radio-button value="d">
                Chengdu
              </a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div>
          <span type="link">
            操作
          </span>
          <a-space>
            <a-button type="primary">
              移至第一
            </a-button>
            <a-button type="primary"> <a-icon type="arrow-up" />上移 </a-button>
            <a-button type="primary">
              <a-icon type="arrow-down" />下移
            </a-button>
            <a-button type="primary">
              移至最后
            </a-button>
          </a-space>
        </div>
      </a-modal>
      <div class="category-list-table">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="paginationProps"
          rowKey="newTypeCode"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="status" slot-scope="text">
            {{ text === 0 ? "正常" : "不显示" }}
          </div>
          <div slot="actions" slot-scope="text">
            <a-button type="link" @click="change(text)">
              修改
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="deleteNews(text)">
              删除
            </a-button>
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      visible: false,
      confirmLoading: false,
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      isSortView: true,
      columns: [
        {
          title: "ID",
          dataIndex: "newTypeCode",
          scopedSlots: { customRender: "id" },
          width: 230,
        },
        {
          title: "名称",
          dataIndex: "newTypeName",
        },
        {
          title: "英文",
          dataIndex: "newTypeEn",
        },
        {
          title: "新闻数量",
          dataIndex: "newsCount",
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "操作",
          dataIndex: "id",
          key: "actions",
          fixed: "right",
          scopedSlots: { customRender: "actions" },
        },
      ],
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )}  页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange,
      },
    };
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    onChange(e) {
      console.log(`checked = ${e.target.value}`);
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    change(id) {
      console.log(id);
      this.$router.push({
        path: "/personal/news/upcategory",
        query: {
          id,
        },
      });
    },
    deleteNews(id) {
      console.log(id);
      this.$confirm("确定删除该类型吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("newsType/deleteNews", {
              id,
            })
            .then((res) => {
              this.$message.success("删除成功");
              this.getList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addNewsType() {
      this.$router.push({
        path: "/personal/news/addcategory",
      });
    },
    quickJump(current) {
      this.listQuery.currentPage = current;
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.listQuery.pageSize = pageSize;
      this.listQuery.currentPage = current;
      this.getList();
    },
    getList() {
      this.$getList("newsType/getList", this.listQuery).then((res) => {
        console.log(res, "获取列表");
        this.data = res.data.list;
        this.paginationProps.total = res.data.total * 1;
      });
    },
    selectPool(data) {
      this.$router.push({
        path: `/personal/news/bannerinfo`,
        query: {
          id: data.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sort-icon {
  transform: rotate(90deg);
  margin-right: 10px;
}
.category-list-container {
  margin: 10px;
  padding: 10px;
  background-color: #fff;
}
.category-list-table {
  margin-top: 10px;
}
.sort-container {
  display: flex;
  .sort-list {
    margin-left: 10px;
  }
  margin-bottom: 10px;
}
</style>
