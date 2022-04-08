<template>
  <div class="recon-info">
    <a-descriptions title="基本信息" v-if="data">
      <a-descriptions-item label="对账单号">
        {{ data.billNo }}
      </a-descriptions-item>
      <a-descriptions-item label="供应商">
        {{ data.supplierName }}
      </a-descriptions-item>
      <a-descriptions-item label="账期">
        {{ data.billDate }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ statementStatusEnum[data.currentStatus] }}
      </a-descriptions-item>
      <a-descriptions-item label="开票状态">
        {{ invoiceStatusEnum[data.invoiceStatus] }}
      </a-descriptions-item>
      <a-descriptions-item label="最后更新人">
        {{ data.modifyUserName }}
      </a-descriptions-item>
      <a-descriptions-item label="最后更新时间">
        {{ data.modifyTime }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ data.supplierName }}----
      </a-descriptions-item>
    </a-descriptions>
    <div>
      <div class="table-title">
        对账单明细
      </div>
      <div>
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input v-model="form.name" placeholder="请输入账单编号" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="getData">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div>
        <a-table
          :columns="columnsDetails"
          :data-source="dataDetails"
          :pagination="paginationProps"
        >
        </a-table>
        <p>
          账单拉取总金额：
          <span>¥ 2233</span>
          可开票拉取总金额：
          <span>¥ 2233</span>
        </p>
      </div>
      <div class="table-title">
        调整单明细
      </div>
      <b style="display:inline-block">建议调整项</b>
      <!-- <a-button style="margin-left: 20px;" type="primary" @click="showModal">
        新增建议调整项
      </a-button> -->
      <!-- 新增建议调整项 窗口 -->
      <a-modal
        title="添加建议调整项"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        width="50%"
      >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="订单号" prop="name">
            <a-input placeholder="请输入订单号" v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="产品">
            <span>根据订单号带出</span>
          </a-form-model-item>
          <a-form-model-item label="订单金额（元）">
            <span>根据订单号带出</span>
          </a-form-model-item>
          <a-form-model-item label="可开票金额（元）">
            <span>根据订单号带出</span>
          </a-form-model-item>
          <a-form-model-item label="订单调整金额（元）" prop="name">
            <a-input placeholder="请输入金额（正或负数）" v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="可开票调整金额（元）" prop="name">
            <a-input placeholder="请输入金额（正或负数）" v-model="form.name" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <div>
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input v-model="form.name" placeholder="请输入账单编号" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="getData">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="steerPaginationProps"
        >
          <div slot="action" slot-scope="text, record">
            <a-button @click="del(record.id)" type="link">
              调整
            </a-button>
          </div>
        </a-table>
        <p>
          建议账单调整总金额：
          <span>¥ -20.00</span>
          建议可开票调整总金额：
          <span>¥ -20.00</span>
        </p>
      </div>
      <b>实际调整项</b>
      <div>
        <a-table
          :columns="actualColumns"
          :data-source="actualData"
          :pagination="actualPaginationProps"
        >
        </a-table>
        <p>
          实际账单调整总金额：
          <span>¥ -20.00</span>
          实际可开票调整总金额：
          <span>¥ -20.00</span>
        </p>
      </div>
      <p>
        对账单总金额:
        <span>¥ 2213.00</span>
        可开票总金额：
        <span>¥ 2213.00</span>
      </p>
      <div class="bottom-button">
        <a-button type="primary" @click="confirm">
          确认
        </a-button>
        <a-button type="danger" style="margin-left: 10px;" @click="goBack">
          退回
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { invoiceStatusEnum, statementStatusEnum } from "@/utils/enum";

export default {
  data() {
    return {
      data: null,
      invoiceStatusEnum,
      statementStatusEnum,
      actualData: null,
      listQuery: {
        //(对账单明细)
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "账单编号",
          dataIndex: "orderNo"
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "产品",
          dataIndex: "productName"
        },
        {
          title: "消费时间",
          dataIndex: "createTime"
        },
        {
          title: "账单金额（元）",
          dataIndex: "producta"
        },
        {
          title: "已支付金额（元）",
          dataIndex: "kproductName"
        },
        {
          title: "欠费金额（元）",
          dataIndex: "tza"
        },
        {
          title: "可开票金额（元）",
          dataIndex: "kza"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      columnsDetails: [
        {
          title: "账单编号",
          dataIndex: "orderNo"
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "产品",
          dataIndex: "productName"
        },
        {
          title: "消费时间",
          dataIndex: "createTime"
        },
        {
          title: "账单金额",
          dataIndex: "producta"
        },
        {
          title: "已支付金额",
          dataIndex: "yproductName"
        },
        {
          title: "欠费金额",
          dataIndex: "tza"
        },
        {
          title: "可开票金额",
          dataIndex: "kproductName"
        }
      ],
      actualColumns: [
        {
          title: "账单编号",
          dataIndex: "orderNo"
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "产品",
          dataIndex: "productName"
        },
        {
          title: "消费时间",
          dataIndex: "createTime"
        },
        {
          title: "原账单金额（元）",
          dataIndex: "yproducta"
        },
        {
          title: "原可开票金额（元）",
          dataIndex: "kproductName"
        },
        {
          title: "账单调整金额（元）",
          dataIndex: "tza"
        },
        {
          title: "可开票调整金额（元）",
          dataIndex: "kza"
        },
        {
          title: "调整后账单金额（元）",
          dataIndex: "producta"
        },
        {
          title: "调整后可开票金额（元）",
          dataIndex: "tzkproductName"
        }
      ],
      dataDetails: null,
      paginationProps: {
        //(对账单明细)
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
      steerListQuery: {
        //(对账单明细)
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      steerPaginationProps: {
        //(建议调整项)
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${
            this.steerListQuery.currentPage
          } / ${Math.ceil(total / this.steerListQuery.pageSize)} 页`,
        onChange: this.quickJumpSteer,
        onShowSizeChange: this.onShowSizeChangeSteer
      },
      actualListQuery: {
        //(对账单明细)
        key: "",
        search: "",
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      actualPaginationProps: {
        //(实际调整项)
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${
            this.actualListQuery.currentPage
          } / ${Math.ceil(total / this.actualListQuery.pageSize)} 页`,
        onChange: this.quickJumpActual,
        onShowSizeChange: this.onShowSizeChangeActual
      },
      visible: false,
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "当前选项不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  activated() {
    this.data = JSON.parse(this.$route.query.data);
    this.getsteerList();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    // 确认添加
    handleOk(e) {
      this.confirmLoading = true;
      this.onSubmit();
    },
    // 取消（关闭弹窗）
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    // 添加建议调整项
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("reconciliation/addSteerItem", this.form)
            .then(() => {
              this.confirmLoading = false;
              this.visible = false;
              this.$message.success("添加成功");
            });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    del(id) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store.dispatch("reconciliation/del", { id }).then(() => {
            this.$message.success("删除成功");
            // this.getData();
          });
        }
      });
    },
    // 确认
    confirm(id) {
      this.$store.dispatch("reconciliation/confirm", { id }).then(() => {
        this.$message.success("操作成功");
        // this.getData();
      });
    },
    // 退回
    goBack(id) {
      this.$store.dispatch("reconciliation/goBack", { id }).then(() => {
        this.$message.success("操作成功");
        // this.getData();
      });
    },
    // 开票明细
    getsteerList() {
      let data = JSON.parse(this.$route.query.data);
      this.$store
        .dispatch("reconciliation/getsteerList", {
          ...this.steerListQuery,
          billNo: data.billNo
        })
        .then(res => {
          this.dataDetails = res.data.list;
          this.paginationProps.total = res.data.total * 1;
        });
    },
    // 获取页面数据
    getData() {
      this.$store.dispatch("reconciliation/getData").then(res => {
        this.data = res.data;
        this.actualData = res.actualData;
        this.dataDetails = res.dataDetails;
      });
    },
    //表格分页跳转(对账单明细)
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      // this.getList();
    },
    //表格分页切换每页条数(对账单明细)
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      // this.getList();
    },

    //表格分页跳转(建议调整项)
    quickJumpSteer(currentPage) {
      this.steerListQuery.currentPage = currentPage;
      // this.getSteerList();
    },
    //表格分页切换每页条数(建议调整项)
    onShowSizeChangeSteer(current, pageSize) {
      this.steerListQuery.currentPage = current;
      this.steerListQuery.pageSize = pageSize;
      // this.getSteerList();
    },

    //表格分页跳转(实际调整项)
    quickJumpActual(currentPage) {
      this.actualListQuery.currentPage = currentPage;
      // this.getActualList();
    },
    //表格分页切换每页条数(实际调整项)
    onShowSizeChangeActual(current, pageSize) {
      this.actualListQuery.currentPage = current;
      this.actualListQuery.pageSize = pageSize;
      // this.getActualList();
    }
  }
};
</script>

<style lang="less" scoped>
.recon-info {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
.table-title {
  margin-bottom: 20px;
  color: #000000d9;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
}
b {
  display: block;
  margin-bottom: 10px;
  color: #000;
}
.bottom-button {
  text-align: center;
}
</style>
