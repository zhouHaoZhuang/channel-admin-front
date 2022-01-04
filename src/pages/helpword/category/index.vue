<template>
  <div class="category-container">
    <div class="btn-head">
      <a-button type="primary" icon="plus" class="btn" @click="addbanner">
        添加类别
      </a-button>
      <a-button icon="delete" class="btn" @click="deleteinbatches">
        批量删除
      </a-button>
      <a-button icon="delete" class="btn" @click="deleteinbatches">
        强制删除
      </a-button>
      <a-button @click="showModal">
        <span class="sort-icon">
          <a-icon type="swap" />
        </span>
        排序
      </a-button>
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
      <!-- </div> -->
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
        <span slot="action" slot-scope="text">
          <a-button type="link" @click="addaFence(text)">
            添加子栏
          </a-button>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">修改</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">删除</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">强制删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <div slot="typeSort" slot-scope="text">
          <a-button type="link" @click="addaFence(text)">
            查看({{ text }})
          </a-button>
        </div>
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
          console.log(this.selectedRowKeys);
        },
      };
    },
  },
  data() {
    return {
      confirmLoading: false,
      visible: false,
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      columns: [
        {
          title: "编号",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "名称",
          dataIndex: "typeName",
          key: "typeName",
          scopedSlots: { customRender: "typeName" },
        },
        {
          title: "英文",
          dataIndex: "typeNameEn",
          key: "typeNameEn",
        },
        {
          title: "类型",
          dataIndex: "typeCode",
          key: "typeCode",
        },
        {
          title: "子类别",
          dataIndex: "typeSort",
          key: "typeSort",
          scopedSlots: { customRender: "typeSort" },
        },
        {
          title: "操作",
          key: "action",
          dataIndex: "id",
          // fixed: "right",
          scopedSlots: { customRender: "action" },
        },
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
        onShowSizeChange: this.onShowSizeChange,
      },
      selectedRowKeys: [],
    };
  },
  activated() {
    this.getList();
  },
  created() {
    this.getList();
  },
  methods: {
    showModal() {
      this.visible = true;
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
    //查询
    // search(){
    //   this.listQuery.currentPage = 1;
    //   this.getList();
    // },
    //查询数据表格
    getList() {
      this.$getList("helpCategory/getList",this.listQuery).then((res) => {
        console.log(res);
        // this.data = res.data.list;
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
      this.$router.push("/personal/helpword/add-category");
    },
    //修改
    updatePrice(text) {
      this.$router.push({
        path: "/personal/helpword/amend-category",
        query: {
          id: text,
        },
      });
    },
    //删除
    handleDel(id) {
      console.log(id);
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("category/delPrice", id).then((val) => {
            this.$message.success("操作成功");
            this.getList();
          });
        },
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
            .then((val) => {
              this.$message.success("操作成功");
              // this.$store.dispatch("操作成功").then(val => {
              //   this.reqAfter(val);
              // });
              this.getList();
            });
        },
      });
    },
    //显示
    show() {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("category/delPrice", this.selectedRowKeys.toString())
            .then((val) => {
              this.$message.success("操作成功");
              // this.$store.dispatch("操作成功").then(val => {
              //   this.reqAfter(val);
              // });
              this.getList();
            });
        },
      });
    },
    //隐藏
    conceal() {},
    //排序
    sort() {},
    //添加子栏
    addaFence() {},
  },
};
</script>

<style lang="less" scoped>
.sort-icon {
  transform: rotate(90deg);
  margin-right: 10px;
}
.category-container {
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
