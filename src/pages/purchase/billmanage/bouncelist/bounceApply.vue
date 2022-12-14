<template>
  <div class="bounce-apply">
    <div class="title-hint">
      <a-steps :current="current">
        <a-step title="确认退票信息" />
        <a-step title="填写物流信息" />
      </a-steps>
    </div>
    <div v-show="current === 0">
      <a-descriptions title="申请信息" v-if="data">
        <a-descriptions-item label="发票申请号">
          {{ data.invoiceNo }}
        </a-descriptions-item>
        <a-descriptions-item label="发票类型">
          {{ invoiceTypeMap[data.invoiceType] }}
        </a-descriptions-item>
        <a-descriptions-item label="发票抬头">
          {{ data.invoiceTitle }}
        </a-descriptions-item>
        <a-descriptions-item label="税务登记号">
          <span v-if="data.invoiceInfo">
            {{ data.invoiceInfo.registerNo }}
          </span>
        </a-descriptions-item>
        <a-descriptions-item label="开票主体">
          {{ data.companyName }}
        </a-descriptions-item>
        <a-descriptions-item label="开票金额">
          <b style="color: #02a7f0"> ￥{{ data.invoiceAmount }} </b>
        </a-descriptions-item>
      </a-descriptions>
      <h3>开票明细</h3>
      <div>
        <a-table
          :columns="columns"
          :data-source="dataDetails"
          :pagination="false"
          rowKey="id"
        >
          <div slot="type" slot-scope="text">
            {{ typeMap[text] }}
          </div>
          <div v-if="text" slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
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
        </a-table>
        <div>
          <a-button class="next" type="primary" @click="current = 1">
            下一步
          </a-button>
        </div>
      </div>
    </div>
    <div v-show="current === 1">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="物流单号" prop="expressDelivery">
          <a-input v-model="form.expressDelivery" />
        </a-form-model-item>
        <a-form-model-item label="寄件联系人" prop="sender">
          <a-input v-model="form.sender" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="senderPhone">
          <a-input v-model="form.senderPhone" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="feedbackRemark">
          <a-input v-model="form.feedbackRemark" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 9, offset: 8 }">
          <a-button type="primary" @click="onSubmit"> 提交申请 </a-button>
          <a-button style="margin-left: 10px" @click="current = 0">
            返回上一步
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      typeMap: {
        1: "订单",
        2: "账单"
      },
      issueTypeMap: {
        1: "个人",
        2: "企业"
      },
      invoiceTypeMap: {
        1: "增值税普通发票",
        2: "增值税专用发票"
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 9 },
      form: {
        expressDelivery: "",
        sender: "",
        senderPhone: "",
        feedbackRemark: ""
      },
      rules: {
        expressDelivery: [
          {
            required: true,
            message: "请填写物流单号",
            trigger: "blur"
          }
        ],
        sender: [
          {
            required: true,
            message: "请填写寄件联系人",
            trigger: "blur"
          }
        ],
        senderPhone: [
          {
            required: true,
            message: "请填写联系电话",
            trigger: "blur"
          },
          {
            pattern: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
            message: "请输入正确的联系电话",
            trigger: ["blur", "change"]
          }
        ],
        feedbackRemark: [
          {
            required: true,
            message: "请填写备注",
            trigger: "blur"
          }
        ]
      },
      current: 0,
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
      dataDetails: [],
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
    this.current = 0;
    this.resetForm();
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        this.form.id = this.$route.query.id;
        if (valid) {
          this.$store.dispatch("cbouncelist/audit", this.form).then(res => {
            this.$message.success("提交成功");
            this.$router.back();
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.form = {
        expressDelivery: "",
        sender: "",
        senderPhone: "",
        feedbackRemark: ""
      };
    },
    // 获取页面数据
    getData() {
      this.$store
        .dispatch("cbilllist/getDetail", { id: this.$route.query.id })
        .then(res => {
          console.log(res, "---------");
          this.data = res.data;
          this.dataDetails = res.data.billResPager?.list ?? [];
          this.paginationProps.total =
            res.data.billResPager?.totalCount * 1 ?? 0;
        });
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
.next {
  width: 120px;
  margin: 20px calc(50% - 60px);
}
.title-hint {
  width: 80%;
  margin: 30px auto;
}
.bounce-apply {
  width: 100%;
  background: #fff;
  padding: 20px;
  margin: 0 20px;
}
</style>
