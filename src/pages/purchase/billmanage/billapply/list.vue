<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-button type="primary" icon="plus" @click="$router.push('/purchase/billmanage/listApply')">合并开票</a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="请输入资源池订单ID" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="请输入云商城订单ID" />
        </a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="创建开始日期"
            format="YYYY-MM-DD HH:mm:ss"
            @change="startValue"
          >
          </a-date-picker>
        </a-form-model-item>
        <a-form-model-item> --</a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="创建结束日期"
            format="YYYY-MM-DD HH:mm:ss"
            @change="endValue"
          >
          </a-date-picker>
        </a-form-model-item>

        <a-form-model-item>
          <a-select
            placeholder="请选择状态"
            allowClear
            style="width:120px"
            v-model="listQuery.key"
          >
            <a-select-option value="id">
              审核中
            </a-select-option>
            <a-select-option value="applyUserCode">
              已驳回
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">查询</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table :columns="columns" :data-source="data" :pagination="paginationProps"
        rowKey="id">
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action">
          <a-button type="link">申请开票</a-button>
          <a-button type="link">查看详情</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: "",
        startTime: "",
        endTime: "",
        accountType: ""
      },
      columns: [
        {
          title: "资源池订单ID",
          dataIndex: "orderId"
        },
        {
          title: "云商城订单ID",
          dataIndex: "yunOrderId"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "客户名称",
          dataIndex: "companyName"
        },
        {
          title: "可开票金额",
          dataIndex: "amount"
        },
        {
          title: "创建时间",
          dataIndex: "createTime"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            default: "action"
          }
        }
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },
  methods: {
    startValue(date, dateString) {
      // this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      // this.listQuery.endTime = dateString;
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
    }
  }
};
</script>

<style lang="less" scoped>
.bill-manage {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
