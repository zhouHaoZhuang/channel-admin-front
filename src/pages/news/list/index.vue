<template>
  <div class="news-list-container">
    <div>
      <div class="news-list-top">
        <a-button type="primary" @click="addNewsList" v-permission="'add'">
          <a-icon type="plus" />添加新闻
        </a-button>
        <a-select v-model="listQuery.key" style="width: 120px">
          <a-select-option value="newsTitle">
            标题
          </a-select-option>
          <!-- <a-select-option value="context">
                内容
              </a-select-option> -->
        </a-select>
        <a-input
          v-model="listQuery.search"
          style="width: 160px"
          placeholder="搜索关键词"
        />
        <a-space size="small">
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
        </a-space>
        <a-select
          v-model="listQuery.newTypeCode"
          style="width: 120px"
          @change="sortType"
        >
          <a-select-option value="">
            分类
          </a-select-option>
          <a-select-option
            :value="item.newTypeCode"
            v-for="item in typeList"
            :key="item.newTypeCode"
          >
            {{ item.newTypeName }}
          </a-select-option>
        </a-select>
        <a-button type="primary" @click="selectNewsList">
          查询
        </a-button>
      </div>
      <div class="query-conditions" v-if="isCondition">
        <span>当前条件：</span>
        <a-select
          mode="multiple"
          :value="selectList"
          style="width: 95%"
          placeholder="当前无条件"
          @change="handleChange"
          :open="false"
        >
        </a-select>
      </div>
      <div class="news-list-table">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="paginationProps"
          rowKey="newsCode"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div v-if="text" slot-scope="text" slot="createTime">
            {{ text | formatDate }}
          </div>
          <div v-if="text" slot-scope="text" slot="firstTop">
            {{ text * 1 === 0 ? "不置顶" : "置顶" }}
          </div>
          <a slot="websiteJump" slot-scope="text" :href="text">{{ text }}</a>
          <div slot="actions" slot-scope="text">
            <a-button type="link" @click="change(text)" v-permission="'modify'">
              修改
            </a-button>
            <a-divider type="vertical" />
            <a-button
              type="link"
              @click="delNewsList(text)"
              v-permission="'del'"
            >
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
      selectList: [],
      isCondition: false,
      listQuery: {
        key: "newsTitle",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: "",
        newTypeCode: ""
      },
      data: [],
      columns: [
        {
          title: "ID",
          dataIndex: "newsCode",
          scopedSlots: { customRender: "id" }
        },
        {
          title: "标题",
          dataIndex: "newsTitle"
        },
        {
          title: "分类",
          dataIndex: "newTypeName"
        },
        {
          title: "添加时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" }
        },
        {
          title: "置顶状态",
          dataIndex: "firstTop",
          scopedSlots: { customRender: "firstTop" }
        },
        {
          title: "跳转状态",
          dataIndex: "websiteJump", //有就跳转  数据为地址
          scopedSlots: { customRender: "websiteJump" }
        },
        {
          title: "操作",
          dataIndex: "id",
          key: "actions",
          scopedSlots: { customRender: "actions" }
        }
      ],
      typeList: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )}  页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      typeName: ""
    };
  },
  activated() {
    this.getList();
    this.getAllType();
    if (this.$route.query.newTypeCode) {
      this.selectList = [];
      this.listQuery.newTypeCode = this.$route.query.newTypeCode;
      this.isCondition = true;
      this.selectList.push(`分类：${this.$route.query.newTypeName}`);
      this.getList();
    }
  },
  methods: {
    handleChange(value, a) {
      console.log(value, "前");
      this.selectList = value;
      console.log(value, "后");
      let selectString = value.toString();
      if (!selectString.includes("分类")) {
        this.listQuery.newTypeCode = "";
      }
      if (!selectString.includes("标题")) {
        this.listQuery.search = "";
      }
      if (!selectString.includes("开始时间")) {
        this.listQuery.startTime = "";
        this.startValue = null;
      }
      if (!selectString.includes("结束时间")) {
        this.listQuery.endTime = "";
        this.endValue = null;
      }
      if (this.selectList.length === 0) {
        this.isCondition = false;
      }
      this.getList();

      // console.log(a);
    },
    sortType(value, option) {
      this.typeName = option.componentOptions.children[0].text;
    },
    selectNewsList() {
      console.log(this.listQuery);
      this.isCondition = true;
      this.selectList = [];
      if (this.listQuery.startTime) {
        this.selectList.push(`开始时间：${this.listQuery.startTime}`);
      }
      if (this.listQuery.endTime) {
        this.selectList.push(`结束时间：${this.listQuery.endTime}`);
      }
      if (this.typeName) {
        this.selectList.push(`分类：${this.typeName}`);
      }
      if (this.listQuery.key == "newsTitle" && this.listQuery.search) {
        this.selectList.push(`标题：${this.listQuery.search}`);
      }
      this.getList();
    },
    addNewsList() {
      this.$router.push("/personal/news/addnewslist");
    },
    changeStart(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    changeEnd(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    change(id) {
      console.log(id);
      this.$router.push({
        path: "/personal/news/upnewslist",
        query: {
          id
        }
      });
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
      this.$getList("newsList/getList", this.listQuery).then(res => {
        console.log(res, "获取列表");
        this.data = res.data.list;
        this.paginationProps.total = res.data.total * 1;
      });
    },
    getAllType() {
      this.$store.dispatch("newsType/getAllType").then(res => {
        // console.log(res.data, "获取分类");
        this.typeList = res.data;
      });
    },
    delNewsList(id) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store
            .dispatch("newsList/delList", {
              id
            })
            .then(res => {
              this.$message.success("删除成功");
              this.getList();
            });
        }
      });
    },
    selectPool(data) {
      this.$router.push({
        path: `/personal/news/bannerinfo`,
        query: {
          id: data.id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.news-list-container {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  margin-left: 20px;
}
.news-list-top {
  display: flex;
  width: 1018px;
  justify-content: space-between;
}
.news-list-table {
  margin-top: 10px;
}
.query-conditions {
  margin: 10px 0;
}
</style>
