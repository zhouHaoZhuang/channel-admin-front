<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-button
            :disabled="selectedRowKeys.length == 0"
            type="primary"
            icon="plus"
            @click="$router.push('/purchase/manage/applybill?data=' + JSON.stringify(selectedRowKeysList))"
          >
            合并开票
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.invoiceNo"
            placeholder="请输入对账单号"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.companyName"
            placeholder="请输入供应商名称"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="开始账期"
            format="YYYY-MM"
            @change="startValue"
          >
          </a-date-picker>
        </a-form-model-item>
        <a-form-model-item> --</a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="结束账期"
            format="YYYY-MM"
            @change="endValue"
          >
          </a-date-picker>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            allowClear
            style="width:200px"
            v-model="listQuery.status"
            placeholder="请选择状态"
          >
            <a-select-option
              :value="inx"
              v-for="(item, inx) in invoiceStatusEnum"
              :key="inx"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            allowClear
            style="width:200px"
            v-model="listQuery.status"
            placeholder="请选择开票状态"
          >
            <a-select-option
              :value="inx"
              v-for="(item, inx) in invoiceStatusEnum"
              :key="inx"
            >
              {{ item }}
            </a-select-option>
          </a-select>
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
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        rowKey="id"
      >
        <div slot="status" slot-scope="text">
          {{ invoiceStatusEnum[text] }}
        </div>
        <div v-if="text" slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div v-if="text" slot="feedbackTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="$router.push('/sale/finance/billInfo?id=' + record.id)"
          >
            详情
          </a-button>
          <a-button
            @click="$router.push('/sale/finance/billInfo?id=' + record.id)"
            type="link"
            style="margin-left:10px"
          >
            对账
          </a-button>
          <a-button type="link" style="margin-left:10px">
            开票
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
        startTime: "",
        endTime: "",
        companyName: "",
        invoiceNo: "",
        status: undefined
      },
      columns: [
        {
          title: "对账单号",
          dataIndex: "billNo"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        // {
        //   title: "客户名称",
        //   dataIndex: "companyName"
        // },
        {
          title: "开票状态",
          dataIndex: "invoiceStatus"
        },
        {
          title: "账期",
          dataIndex: "zcreateTime"
        },
        {
          title: "供应商编码",
          dataIndex: "companyCode"
        },
        {
          title: "供应商名称",
          dataIndex: "companyName"
        },
        {
          title: "账单总金额（元）",
          dataIndex: "finalTotalAomount"
        },
        {
          title: "可开票总金额（元）",
          dataIndex: "finalInvoiceAmount"
        },
        {
          title: "最后更新人",
          dataIndex: "updateUser"
        },
        {
          title: "最后更新时间",
          dataIndex: "updateTime"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action"
          }
        }
      ],
      data: [
        {
          id: 1,
          billNo: "123456789",
          status: 1,
          invoiceStatus: 1,
          zcreateTime: "2019-01-01",
          companyCode: "123456789",
          companyName: "测试供应商",
          finalTotalAomount: "123456789",
          finalInvoiceAmount: "123456789",
          updateUser: "张三",
          updateTime: "2019-01-01"
        }
      ],
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
      selectedRowKeys: [], // Check here to configure the default column
      selectedRowKeysList:[]
    };
  },
  activated() {
    // this.getList();
  },
  methods: {
    takeOver(id) {
      this.$confirm({
        title: "确定要接收吗?",
        onOk: () => {
          this.$store.dispatch("billmangage/takeOver", { id }).then(() => {
            this.$message.success("接收成功");
            this.getList();
          });
        }
      });
    },
    startValue(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    onSelectChange(selectedRowKeys,obj) {
      console.log("selectedRowKeys changed: ", selectedRowKeys,obj);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRowKeysList = obj;
    },
    //查询数据表格
    getList() {
      this.$getList("reconciliation/getList", this.listQuery).then(res => {
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
.public-header-wrap {
  margin-bottom: 10px;
}
</style>
