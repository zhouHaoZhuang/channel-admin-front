<template>
  <div class="category-list-container">
    <div>
      <div>
        <a-space>
          <a-button type="primary" @click="addNewsType">
            <a-icon type="plus" />添加类别
          </a-button>
          <a-button>
            <span class="sort-icon">
              <a-icon type="swap" />
            </span>
            排序
          </a-button>
        </a-space>
      </div>
      <div class="category-list-table">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="paginationProps"
          rowKey="newTypeCode"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="status" v-if="text" slot-scope="text">
            {{ text === "0" ? "正常" : "不显示" }}
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
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
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
          dataIndex: "newTypeCode",
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
    change(newTypeCode) {
      console.log(newTypeCode);
      this.$router.push(
        {
          path: "/personal/news/upcategory",
          query: {
            newTypeCode: newTypeCode,
          },
        }
      );
    },
    deleteNews(newTypeCode) {
      console.log(newTypeCode);
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

<style>
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
</style>
