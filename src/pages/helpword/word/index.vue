<template>
  <div class="word-container">
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-button
            type="primary"
            v-permission="'add'"
            icon="plus"
            class="btn"
            @click="addbanner"
          >
            添加文档
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            icon="delete"
            v-permission="'batch-del'"
            class="btn"
            @click="deleteinbatches"
          >
            批量删除
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            icon="check"
            v-permission="'hot-setting'"
            class="btn"
            @click="hotset"
          >
            热门设置
          </a-button>
        </a-form-model-item>
        <a-modal
          title="确认"
          :visible="hotvisible"
          :confirm-loading="hotconfirmLoading"
          @ok="hothandleOk"
          @cancel="hothandleCancel"
        >
          <p>是否热门</p>
          <a-radio-group v-model="ishot">
            <a-radio value="true">
              是
            </a-radio>
            <a-radio value="false">
              否
            </a-radio>
          </a-radio-group>
        </a-modal>
        <a-form-model-item>
          <a-button
            icon="check"
            class="btn"
            v-permission="'top-setting'"
            @click="topset"
          >
            置顶设置
          </a-button>
        </a-form-model-item>
        <a-modal
          title="确认"
          :visible="topvisible"
          :confirm-loading="topconfirmLoading"
          @ok="tophandleOk"
          @cancel="tophandleCancel"
        >
          <p>是否置顶</p>
          <a-radio-group v-model="istop">
            <a-radio value="true">
              是
            </a-radio>
            <a-radio value="false">
              否
            </a-radio>
          </a-radio-group>
        </a-modal>
        <a-form-model-item>
          <a-button
            icon="check"
            class="btn"
            @click="recommendedset"
            v-permission="'recommend-setting'"
          >
            推荐设置
          </a-button>
        </a-form-model-item>
        <a-modal
          title="确认"
          :visible="recvisible"
          :confirm-loading="recconfirmLoading"
          @ok="rechandleOk"
          @cancel="rechandleCancel"
        >
          <p>是否置顶</p>
          <a-radio-group v-model="isrec">
            <a-radio value="true">
              是
            </a-radio>
            <a-radio value="false">
              否
            </a-radio>
          </a-radio-group>
        </a-modal>
        <a-form-model-item>
          <a-select
            style="width:120px"
            v-model="listQuery.key"
            placeholder="请选择"
            class="btn"
          >
            <a-select-option
              v-for="item in columns.slice(0, columns.length - 3)"
              :key="item.dataIndex"
              :value="item.dataIndex"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            placeholder="搜索关键词"
            v-model="listQuery.value"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="secectClick" class="btn">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
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
        <div class="status" slot="hot" slot-scope="text">
          <div v-if="!text" class="dot"></div>
          <div v-else class="dot dot-err"></div>
          {{ text ? "开启" : "禁止" }}
        </div>
        <div class="status" slot="top" slot-scope="text">
          <div v-if="!text" class="dot"></div>
          <div v-else class="dot dot-err"></div>
          {{ text ? "开启" : "禁止" }}
        </div>
        <div class="status" slot="recommended" slot-scope="text">
          <div v-if="!text" class="dot"></div>
          <div v-else class="dot dot-err"></div>
          {{ text ? "开启" : "禁止" }}
        </div>
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
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
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
          this.selectHelpObj = selectedRows;
        }
      };
    }
  },
  created() {},
  data() {
    return {
      listQuery: {
        key: "id",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        value: ""
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          width: 180
        },
        {
          title: "标题",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "分类",
          dataIndex: "helpTypeName",
          key: ""
        },
        {
          title: "热门",
          dataIndex: "hot",
          key: "hot",
          scopedSlots: { customRender: "hot" }
        },
        {
          title: "置顶",
          dataIndex: "top",
          key: "top",
          scopedSlots: { customRender: "top" }
        },
        {
          title: "推荐",
          dataIndex: "recommended",
          key: "recommended",
          scopedSlots: { customRender: "recommended" }
        },
        // {
        //   title: "有用",
        //   dataIndex: "useful",
        //   key: "useful",
        //   sorter: (a, b) => a.useful - b.useful,
        //   scopedSlots: {}
        // },
        // {
        //   title: "没用",
        //   dataIndex: "useless",
        //   key: "useless",
        //   sorter: (a, b) => a.useless - b.useless,
        //   scopedSlots: {}
        // },
        {
          title: "反馈",
          dataIndex: "feedback",
          key: "feedback",
          sorter: (a, b) => a.feedback - b.feedback,
          scopedSlots: { customRender: "feedback" }
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
      selectedRowKeys: [],
      arr: [],
      selectHelpObj: [],
      hotvisible: false,
      hotconfirmLoading: false,
      ishot: "false",
      istop: "false",
      topvisible: false,
      topconfirmLoading: false,
      isrec: "false",
      recvisible: false,
      recconfirmLoading: false
    };
  },

  activated() {
    this.getList();
  },
  methods: {
    hothandleOk(e) {
      this.hotconfirmLoading = true;
      for (let index = 0; index < this.selectHelpObj.length; index++) {
        const element = this.selectHelpObj[index];
        element.hot = this.ishot;
        this.$store
          .dispatch("word/edit", element)
          .then(res => {})
          .finally(() => {
            if (index == this.selectHelpObj.length - 1) {
              this.hotvisible = false;
              this.hotconfirmLoading = false;
              this.$message.success("修改列表成功");
              this.getList();
            }
          });
      }
    },
    hothandleCancel(e) {
      this.hotvisible = false;
    },
    tophandleOk(e) {
      this.topconfirmLoading = true;
      for (let index = 0; index < this.selectHelpObj.length; index++) {
        const element = this.selectHelpObj[index];
        element.top = this.istop;
        this.$store
          .dispatch("word/edit", element)
          .then(res => {})
          .finally(() => {
            if (index == this.selectHelpObj.length - 1) {
              this.topvisible = false;
              this.topconfirmLoading = false;
              this.$message.success("修改列表成功");
              this.getList();
            }
          });
      }
    },
    tophandleCancel(e) {
      this.topvisible = false;
    },
    rechandleOk(e) {
      this.recconfirmLoading = true;
      for (let index = 0; index < this.selectHelpObj.length; index++) {
        const element = this.selectHelpObj[index];
        element.recommended = this.isrec;
        this.$store
          .dispatch("word/edit", element)
          .then(res => {})
          .finally(() => {
            if (index == this.selectHelpObj.length - 1) {
              this.recvisible = false;
              this.recconfirmLoading = false;
              this.$message.success("修改列表成功");
              this.getList();
            }
          });
      }
    },
    rechandleCancel(e) {
      this.recvisible = false;
    },
    //查询数据表格
    getList() {
      this.$getListQp("word/getList", this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
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
    //添加banner
    addbanner() {
      this.$router.push("/personal/helpword/add-word");
    },
    //修改
    updatePrice(text) {
      this.$router.push({
        path: "/personal/helpword/amend-word",
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
          this.$store.dispatch("word/delPrice", id).then(val => {
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
            .dispatch("word/delPrice", this.selectedRowKeys.toString())
            .then(val => {
              this.$message.success("操作成功");
              this.getList();
            });
        }
      });
    },
    // 查询
    secectClick() {
      if (
        this.listQuery.key === "hot" ||
        this.listQuery.key === "top" ||
        this.listQuery.key === "recommended"
      ) {
        if (this.listQuery.value === "开启") {
          this.listQuery.search = "true";
        } else if (this.listQuery.value === "关闭") {
          this.listQuery.search = "false";
        }
      } else {
        this.listQuery.search = this.listQuery.value;
      }
      this.listQuery.currentPage = 1;
      this.getList();
    },
    //热门设置
    hotset() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要热门的数据");
        return;
      }
      this.hotvisible = true;
    },
    //置顶设置
    topset() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要置顶的数据");
        return;
      }
      this.topvisible = true;
    },
    //推荐设置
    recommendedset() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要推荐的数据");
        return;
      }
      this.recvisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.word-container {
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
    .ant-form-item {
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
        background: red;
        margin-right: 5px;
      }
      .dot-err {
        background: green;
      }
    }
  }
}
</style>
