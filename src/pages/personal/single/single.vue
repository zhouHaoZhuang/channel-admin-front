<template>
  <div class="single-content">
    <div class="btn-head">
      <a-button type="primary" icon="plus" class="btn">
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
      >
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
          dataIndex: ""
        }
      ],
      data: [
        // {
        //   key: "1",
        //   name: "John Brown",
        //   age: 32,
        //   address: "New York No. 1 Lake Park"
        // },
        // {
        //   key: "2",
        //   name: "Jim Green",
        //   age: 42,
        //   address: "London No. 1 Lake Park"
        // },
        // {
        //   key: "3",
        //   name: "Joe Black",
        //   age: 32,
        //   address: "Sidney No. 1 Lake Park"
        // },
        // {
        //   key: "4",
        //   name: "Disabled User",
        //   age: 99,
        //   address: "Sidney No. 1 Lake Park"
        // }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.single-content {
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
