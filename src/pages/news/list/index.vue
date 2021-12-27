<template>
  <div class="news-list-container">
    <div>
      <div>
        <a-row :gutter="8">
          <a-col :span="2">
            <a-button type="primary" @click="addNewsList"> <a-icon type="plus" />添加新闻 </a-button>
          </a-col>
          <a-col :span="2">
            <a-select v-model="listQuery.key" style="width: 120px">
              <a-select-option value="newsTitle">
                标题
              </a-select-option>
              <a-select-option value="context">
                内容
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="2">
            <a-input placeholder="搜索关键词" />
          </a-col>
          <a-col :span="6">
            <a-date-picker
              v-model="startValue"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="开始日期"
              @change="changeStart"
              @openChange="handleStartOpenChange"
            />
            <a-date-picker
              v-model="endValue"
              :disabled-date="disabledEndDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="结束日期"
              :open="endOpen"
              @change="changeEnd"
              @openChange="handleEndOpenChange"
            />
          </a-col>

          <a-col :span="2">
            <a-select default-value="jack" style="width: 120px">
              <a-select-option value="jack">
                分类
              </a-select-option>
            </a-select>
          </a-col>
          <a-button type="primary">
            查询
          </a-button>
        </a-row>
      </div>
      <div class="news-list-table">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="paginationProps"
          rowKey="newsCode"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot-scope="text" slot="createTime">{{text | formatDate}}</div>
          <div slot="actions" slot-scope="text">
            <a-button type="link" @click="change(text)">
              修改
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link">
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
      startValue: null,
      endValue: null,
      endOpen: false,
      listQuery: {
        key: "newsTitle",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: "",
      },
      data: [],
      columns: [
        {
          title: "ID",
          dataIndex: "newsCode",
          scopedSlots: { customRender: "id" },
        },
        {
          title: "标题",
          dataIndex: "newsTitle",
        },
        {
          title: "分类",
          dataIndex: "newTypeName",
        },
        {
          title: "添加时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" },
        },
        {
          title: "置顶状态",
          dataIndex: "firstTop",
        },
        {
          title: "跳转状态",
          dataIndex: "websiteJump",//有就跳转  数据为地址
        },
        {
          title: "操作",
          dataIndex: "newsCode",
          key: "actions",
          scopedSlots: { customRender: "actions" },
        },
      ],
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
  methods: {
    addNewsList() {
      this.$router.push("/personal/news/addnewslist");
    },
    changeStart(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    changeEnd(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    change(text) {
      console.log(text);
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
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
      this.$getList("newsList/getList", this.listQuery).then((res) => {
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
.news-list-container {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  margin-left: 20px;
}
.news-list-table {
  margin-top: 10px;
}
</style>
