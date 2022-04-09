<template>
  <div class="bill-info">
    <div v-if="data">
      <a-descriptions style="margin: 20px 0" title="申请信息">
        <a-descriptions-item label="发票申请号">
          {{ data.invoiceNo }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="开具类型">
          {{ issueTypeMap[data.invoiceInfo.issueType] }}
        </a-descriptions-item> -->
        <a-descriptions-item label="发票类型">
          {{ invoiceTypeMap[data.invoiceType] }}
        </a-descriptions-item>
        <a-descriptions-item label="发票抬头">
          {{ data.invoiceTitle }}
        </a-descriptions-item>
        <a-descriptions-item label="税务登记号">
          <span v-if="data.invoiceInfo">{{ data.invoiceInfo.registerNo }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="开票主体">
          {{ data.companyName }}
        </a-descriptions-item>
        <a-descriptions-item label="状态">
          {{ invoiceStatusEnum[data.status] }}
        </a-descriptions-item>
        <a-descriptions-item label="开票金额">
          ￥{{ data.invoiceAmount }}
        </a-descriptions-item>
        <a-descriptions-item label="退票申请创建时间">
          {{ data.refundCreateTimeShow }}
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          {{ data.refundRemark }}
        </a-descriptions-item>
        <a-descriptions-item label="退票申请反馈时间">
          {{ data.refundFeedbackTimeShow }}
        </a-descriptions-item>
        <a-descriptions-item label="退票申请反馈说明">
          {{ data.refundFeedbackRemark }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions style="margin: 20px 0" title="物流信息">
        <a-descriptions-item label="物流单号">
          {{ data.expressDelivery }}
        </a-descriptions-item>
        <a-descriptions-item label="寄件联系人">
          {{ data.sender }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ data.senderPhone }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div>
      <h2 style="margin: 20px 0">开票明细</h2>
      <a-table
        :columns="columns"
        :data-source="dataDetails"
        :pagination="false"
        rowKey="id"
      >
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              $router.push(
                '/purchase/manage/reconinfo?data=' + JSON.stringify(record)
              )
            "
          >
            详情
          </a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { invoiceStatusEnum } from "@/utils/enum.js";
export default {
  data() {
    return {
      data: null,
      invoiceStatusEnum,
      columns: [
        {
          title: "对账单号",
          dataIndex: "billNo"
        },
        {
          title: "账期",
          dataIndex: "billDate"
        },
        {
          title: "账单总金额（元）",
          dataIndex: "initTotalAmount"
        },
        {
          title: "可开票总金额（元）",
          dataIndex: "initInvoiceAmount"
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
        status: "",
        startTime: "",
        endTime: "",
        accountType: ""
      },
      issueTypeMap: {
        1: "个人",
        2: "企业"
      },
      invoiceTypeMap: {
        1: "增值税普通发票",
        2: "增值税专用发票"
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
      },
      dataDetails: []
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch("cbilllist/getDetail", { id: this.$route.query.id })
        .then(res => {
          console.log(res, "---------");
          this.data = res.data;
          // this.dataDetails = res.data.invoiceEvaluatePage.list;
          // this.paginationProps.total =
          //   res.data.invoiceEvaluatePage.totalCount * 1;
        });
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      // this.getData();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      // this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.bill-info {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
