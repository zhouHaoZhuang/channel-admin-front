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
            <p
              @click="onChange"
              :id="index"
              v-for="(item, index) in data"
              :key="index"
              :class="{
                'sort-list-item': true,
                'sort-ash': index === sortSwitch * 1,
              }"
            >
              {{ index + 1 }}、{{ item.newTypeName }}
            </p>
          </div>
        </div>
        <div>
          <span type="link">
            操作
          </span>
          <a-space>
            <a-button type="primary" @click="topClick">
              移至第一
            </a-button>
            <a-button @click="moveUp" type="primary">
              <a-icon type="arrow-up" />上移
            </a-button>
            <a-button @click="moveDown" type="primary">
              <a-icon type="arrow-down" />下移
            </a-button>
            <a-button @click="moveBottom" type="primary">
              移至最后
            </a-button>
          </a-space>
        </div>
      </a-modal>
      <div class="category-list-table">
        <a-table
          :columns="columns"
          :data-source="dataList"
          :pagination="paginationProps"
          rowKey="newTypeCode"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="newsCount" slot-scope="text">
            <span v-if="text.newsCount===0">--</span>
            <router-link v-else :to="`/personal/news/newslist?newTypeCode=${text.newTypeCode}&newTypeName=${text.newTypeName}`">{{ text.newsCount }}篇</router-link>
          </div>
          <div slot="status" slot-scope="text" v-if="text!=undefined" >
            {{ text === 0 ? "启用" : "禁用" }}
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
          dataIndex: "id",
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
          // dataIndex: "newsCount",
          key: "newsCount",
          scopedSlots: { customRender: "newsCount" },
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
      dataList: [],
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
      sortSwitch: "",
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    onChange(e) {
      // console.log('checked = ',e.path[0].id);
      this.sortSwitch = e.path[0].id;
    },
    topClick() {
      // console.log("移至第一");
      this.data.unshift(this.data.splice(this.sortSwitch, 1)[0]);
      this.sortSwitch = 0;
    },
    moveUp() {
      // console.log("上移");
      if (this.sortSwitch * 1 === 0) {
        return;
      }
      let temp = this.data.splice(this.sortSwitch, 1)[0];
      this.data.splice(this.sortSwitch - 1, 0, temp);
      this.sortSwitch--;
    },
    moveDown() {
      // console.log("下移");
      if (this.sortSwitch * 1 === this.data.length - 1) {
        return;
      }
      let temp = this.data.splice(this.sortSwitch, 1)[0];
      this.data.splice(this.sortSwitch + 1, 0, temp);
      this.sortSwitch++;
    },
    moveBottom() {
      // console.log("移至最后");
      this.data.push(this.data.splice(this.sortSwitch, 1)[0]);
      this.sortSwitch = this.data.length - 1;
    },
    handleOk(e) {
      this.confirmLoading = true;
      for (let index = 0; index < this.data.length; index++) {
        this.data[index].sort = index + 1;
      }
      this.$store.dispatch("newsType/sortList", this.data).then((res) => {
        console.log(res);
        this.getList();
        this.visible = false;
        this.confirmLoading = false;
        this.$message.success("修改顺序成功");
      });
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
      this.$confirm({
        title: `确认删除吗？`,
        onOk: () => {
          this.$store.dispatch("newsType/delList", { id }).then((res) => {
            this.$message.success("删除成功");
            this.getList();
          });
        },
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
        let dataList = JSON.stringify(res.data.list);
        this.dataList = JSON.parse(dataList);
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
    .sort-list-item {
      width: 400px;
      margin-bottom: 10px;
      background-color: #fff;
    }
    .sort-ash {
      background-color: #cecece;
    }
  }
  margin-bottom: 10px;
}
</style>
