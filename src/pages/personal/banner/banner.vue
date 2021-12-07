<template>
  <div class="banner-content">
    <div class="btn-head">
      <a-button type="primary" icon="plus" class="btn" @click="addbanner">
        添加Banner
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
      <a-button icon="column-height" class="btn">
        排序
      </a-button>
    </div>
    <div class="table-content">
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
      >
        <span slot="action" slot-scope="">
          <a-button type="link" @click="updatePrice()">
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="handleDel()">
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
      columns: [
        {
          title: "编号",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "类型",
          dataIndex: "age"
        },
        {
          title: "标题",
          dataIndex: ""
        },
        {
          title: "描述",
          dataIndex: ""
        },
        {
          title: "状态",
          dataIndex: ""
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        },
        {
          key: "4",
          name: "Disabled User",
          age: 99,
          address: "Sidney No. 1 Lake Park"
        }
      ]
    };
  },
  methods: {
    //添加banner
    addbanner() {
      this.$router.push("/personal/account/add-banner");
    },
    //修改
    updatePrice() {
      this.$router.push("/personal/account/amend-banner");
    }
  }
};
</script>

<style lang="less" scoped>
.banner-content {
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
