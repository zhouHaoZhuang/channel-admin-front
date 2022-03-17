<template>
  <div class="bill-inform">
    <div style="margin-bottom: 20px;">
      <a-button type="primary" icon="plus">
        新增发票信息
      </a-button>
    </div>
    <div>
      <a-table :columns="columns" :data-source="data">
        <div slot="action">
          <a-button type="link">编辑</a-button>
          <a-button type="link">删除</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          title: "发票抬头",
          dataIndex: "title"
        },
        {
          title: "发票类型",
          dataIndex: "invoiceType"
        },
        {
          title: "税务登记号",
          dataIndex: "taxNumber"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.bill-inform {
  margin-top: 20px;
  background-color: #fff;
  width: 100%;
  margin: 0 20px;
  padding: 20px;
}
</style>
