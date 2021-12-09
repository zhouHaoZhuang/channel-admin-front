<template>
  <div class="friendship-content">
    <div class="head">
      <a-tabs type="card" @change="callback" style="width:100%">
        <a-tab-pane key="1" tab="友情链接管理">
          <div class="btn-head">
            <a-button type="primary" icon="plus" class="btn" @click="addfriend">
              添加友情链接
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
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="action" slot-scope="">
                <a-button type="link" @click="updatePrice()">
                  修改
                </a-button>
                <a-divider type="vertical" />
                <a-button type="link" @click="handleDel()">
                  删除
                </a-button>
              </span>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="友情链接分类管理">
          <div class="btn-head">
            <a-button type="primary" icon="plus" class="btn" @click="addclassify">
              添加分类
            </a-button>
            <a-button icon="column-height" class="btn">
              排序
            </a-button>
          </div>
          <div class="table-content">
            <a-table :columns="columnss" :data-source="data">
              <a slot="name" slot-scope="text">{{ text }}</a>
              <span slot="action" slot-scope="">
                <a-button type="link" @click="amendclassify()">
                  修改
                </a-button>
                <a-divider type="vertical" />
                <a-button type="link" @click="handleDel()">
                  删除
                </a-button>
              </span>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
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
  data() {
    return {
      columns: [
        {
          title: "编号",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "所属分类",
          dataIndex: "age"
        },
        {
          title: "名称",
          dataIndex: ""
        },
        {
          title: "链接URL",
          dataIndex: ""
        },
        {
          title: "展示位置",
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
      columnss: [
        {
          title: "ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "名称",
          dataIndex: ""
        },
        {
          title: "友情链接数量",
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
    callback(key) {
      console.log(key);
    },
    //修改
    updatePrice() {
      this.$router.push("/personal/account/amend-blogroll");
    },
    //添加
    addfriend() {
      this.$router.push("/personal/account/add-blogroll");
    },
    //添加
    addclassify(){
      this.$router.push("/personal/account/add-classify");
    },
    //修改
    amendclassify(){
      this.$router.push("/personal/account/amend-classify");
    }
  }
};
</script>

<style lang="less" scoped>
.friendship-content {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .head {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    .btn {
      margin-right: 5px;
    }
    .table-content {
      margin-top: 10px;
    }
  }
}
</style>
