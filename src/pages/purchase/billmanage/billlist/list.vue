<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input
            style="width:230px"
            placeholder="请输入发票订单ID进行搜索"
            v-model="listQuery.invoiceNo"
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
              $router.push('/purchase/billmanage/billinfo?id=' + record.id)
            "
          >
            详情
          </a-button>
          <a-button
            v-show="record.status === 1"
            style="margin-left:10px"
            type="link"
            @click="
              $router.push('/purchase/billmanage/changeadress?id=' + record.id)"
          >
            修改地址
          </a-button>
          <a-button
            v-show="record.status === 5"
            type="link"
            style="margin-left:10px"
            class="btn-red"
            @click="
              $router.push('/purchase/billmanage/bounceapply?id=' + record.id)
            "
          >
            申请退票
          </a-button>
          <a-button
            v-show="record.status === 1"
            style="margin-left:10px"
            type="link"
            class="btn-red"
            @click="cancel(record.id)"
          >
            取消
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
        invoiceNo: ""
      },
      columns: [
        {
          title: "发票ID",
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
          title: "申请状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "申请时间",
          dataIndex: "createTimeShow"
        },
        {
          title: "反馈时间",
          dataIndex: "feedbackTimeShow"
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
      this.$getList("cbilllist/getList", this.listQuery)
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
.btn-red {
  color: #d9001b;
}
</style>
