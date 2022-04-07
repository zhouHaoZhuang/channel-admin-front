<template>
  <div class="bill-select">
    <div class="bill-info" v-if="data">
      <a-descriptions style="margin: 20px 0" title="申请信息">
        <a-descriptions-item label="发票ID">
          {{ data.invoiceNo }}
        </a-descriptions-item>
        <a-descriptions-item label="发票类型">
          {{ invoiceTypeMap[data.invoiceType] }}
        </a-descriptions-item>
        <a-descriptions-item label="发票抬头">
          {{ data.invoiceTitle }}
        </a-descriptions-item>
        <a-descriptions-item label="税务登记号">
          {{ data.invoiceInfo.registerNo }}
        </a-descriptions-item>
        <a-descriptions-item label="申请状态">
          {{ invoiceStatusEnum[data.status] }}
        </a-descriptions-item>
        <a-descriptions-item label="开票金额">
          <b style="color:#f59a23d8">￥{{ data.invoiceAmount }}</b>
        </a-descriptions-item>
        <a-descriptions-item label="申请时间">
          {{ data.createTimeShow }}
        </a-descriptions-item>
        <a-descriptions-item label="反馈时间">
          {{ data.feedbackTimeShow }}
        </a-descriptions-item>
        <a-descriptions-item label="反馈说明">
          {{ data.feedbackRemark }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions style="margin: 20px 0" title="收件人信息">
        <a-descriptions-item label="收件人">
          {{ data.addressInfo.addressInfo }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ data.addressInfo.addressInfo }}
        </a-descriptions-item>
        <a-descriptions-item label="地址">
          {{ data.addressInfo.province }}/ {{ data.addressInfo.city }}/
          {{ data.addressInfo.county }}
        </a-descriptions-item>
        <a-descriptions-item label="详细地址">
          {{ data.addressInfo.address }}
        </a-descriptions-item>
        <a-descriptions-item label="物流单号">
          {{ data.expressDelivery }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div>
      <h2 style="margin: 20px 0">开票明细</h2>
      <a-table
        :pagination="false"
        rowKey="id"
        :columns="columns"
        :data-source="dataList"
      >
        <div slot="action">
          <a-button type="link">
            详情
          </a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { invoiceStatusEnum } from "@/utils/enum";

export default {
  data() {
    return {
      invoiceStatusEnum,
      invoiceTypeMap: {
        1: "增值税普通发票",
        2: "增值税专用发票"
      },
      dataList: [],
      data: null,
      columns: [
        {
          title: "对账单号",
          dataIndex: "orderNo"
        },
        {
          title: "账期",
          dataIndex: "zyunorderId"
        },
        {
          title: "账单总金额（元）",
          dataIndex: "yunorderId"
        },
        {
          title: "可开票总金额（元）",
          dataIndex: "canInvoiceAmount"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action"
          }
        }
      ],
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: ""
      },
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
  activated() {
    this.getData();
  },
  methods: {
    //查询数据表格(页面所有数据)
    getData() {
      this.$store
        .dispatch("cbilllist/getDetail", { id: this.$route.query.id })
        .then(res => {
          console.log(res);
          // this.dataList = res.data.invoiceEvaluatePage.list;
          this.data = res.data;
          this.paginationProps.total = res.data.totalCount * 1;
        });
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      // this.getList();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      // this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.bill-select {
  width: 100%;
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
.bill-info {
  margin: 30px 0;
}
</style>
