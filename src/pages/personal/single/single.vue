<template>
  <div class="single-container">
    <div class="btn-head">
      <a-button type="primary" icon="plus" class="btn" @click="addsingle">
        添加单页
      </a-button>
      <a-button icon="delete" class="btn">
        批量删除
      </a-button>
      <a-button icon="check" class="btn">
        显示
      </a-button>
      <a-button icon="stop" class="btn">
        隐藏
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
        <span slot="action" slot-scope="text">
          <a-button type="link" @click="updatePrice(text)">
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="handleDel(text)">
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
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        }
      };
    }
  },
  created() {},
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
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "页面名称",
          dataIndex: "age"
        },
        {
          title: "访问路径",
          dataIndex: ""
        },
        {
          title: "模板",
          dataIndex: ""
        },
        {
          title: "创建时间",
          dataIndex: ""
        },
        {
          title: "修改时间",
          dataIndex: ""
        },
        {
          title: "开启状态",
          dataIndex: ""
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
      friendshipdata: [],
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
  activated() {},
  methods: {
    //添加单页
    addsingle() {
      this.$router.push("/personal/account/add-single");
    }
  }
};
</script>

<style lang="less" scoped>
.single-container {
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
}
</style>
