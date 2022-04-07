<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input
            v-model="listQuery.invoiceNo"
            style="width:220px"
            placeholder="请输入发票订单ID进行搜索"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="getList">查询</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="paginationProps"
        rowKey="id"
        :loading="loading"
      >
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="status" slot-scope="text">
          {{ invoiceStatusEnum[text] }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              $router.push('/purchase/billmanage/bounceInfo?id=' + record.id)
            "
          >
            详情
          </a-button>
          <a-button
            style="margin-left:10px"
            type="link"
            @click="cancel(record.id)"
            v-show="record.status === 3"
          >
            取消
          </a-button>
          <a-button
            type="link"
            style="margin-left:10px"
            v-show="record.status === 2 || record.status === 8"
            @click="
              $router.push('/purchase/billmanage/bounceapply?id=' + record.id)
            "
          >
            重新提交
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
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: "",
        invoiceNo: ""
      },
      columns: [
        {
          title: "发票申请号",
          dataIndex: "invoiceNo"
        },
        {
          title: "发票抬头",
          dataIndex: "invoiceTitle"
        },
        {
          title: "开票金额",
          dataIndex: "invoiceAmount"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: {
            customRender: "status"
          }
        },
        {
          title: "退票申请时间",
          dataIndex: "refundCreateTimeShow"
        },
        {
          title: "备注",
          dataIndex: "refundRemark"
        },
        {
          title: "退票申请反馈时间",
          dataIndex: "refundFeedbackTimeShow"
        },
        {
          title: "退票申请反馈说明",
          dataIndex: "refundFeedbackRemark"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action"
          }
        }
      ],
      data: [],
      loading: false,
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
    this.getList();
  },
  methods: {
    //查询数据表格
    getList() {
      this.loading = true;
      this.$getList("cbouncelist/getList", this.listQuery)
        .then(res => {
          console.log(res);
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 取消
    cancel(id) {
      this.$confirm({
        title: "确定要取消吗?",
        onOk: () => {
          this.$store.dispatch("cbilllist/cancel", { id }).then(res => {
            this.$message.success("取消成功");
            this.getList();
          });
        }
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
