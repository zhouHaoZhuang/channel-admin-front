<template>
  <div class="recon-info">
    <a-descriptions title="基本信息">
      <a-descriptions-item label="对账单号">
        DZ210000000
      </a-descriptions-item>
      <a-descriptions-item label="供应商">
        有限公司
      </a-descriptions-item>
      <a-descriptions-item label="账期">
        2022-02
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        确认
      </a-descriptions-item>
      <a-descriptions-item label="最后更新人">
        浙江云盾科技有限公司
      </a-descriptions-item>
      <a-descriptions-item label="最后更新时间">
        2022-03-01 00:00:00
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        测试
      </a-descriptions-item>
    </a-descriptions>
    <div>
      <div class="table-title">
        对账单明细
      </div>
      <div>
        <a-table :columns="columnsDetails" :data-source="dataDetails">
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
      <b>建议调整项</b>
      <div>
        <a-table :columns="columns" :data-source="data">
          <div slot="action">
            <a-button type="link">
              删除
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
        <a-table :columns="columns.slice(0, 9)" :data-source="actualData">
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
        <a-button type="primary">
          确认
        </a-button>
        <a-button type="danger" style="margin-left: 10px;">
          退回
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      actualData: null,
      columns: [
        {
          title: "订单号",
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
          title: "订单创建时间",
          dataIndex: "createTime"
        },
        {
          title: "原订单金额（元）",
          dataIndex: "producta"
        },
        {
          title: "原可开票金额（元）",
          dataIndex: "kproductName"
        },
        {
          title: "订单调整金额（元）",
          dataIndex: "tza"
        },
        {
          title: "可开票调整金额（元）",
          dataIndex: "kza"
        },
        {
          title: "调整后订单金额（元）",
          dataIndex: "productb"
        },
        {
          title: "调整后可开票金额（元）",
          dataIndex: "kproductb"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      columnsDetails: [
        {
          title: "订单号",
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
          title: "订单创建时间",
          dataIndex: "createTime"
        },
        {
          title: "订单金额",
          dataIndex: "producta"
        },
        {
          title: "可开票金额",
          dataIndex: "kproductName"
        }
      ],
      dataDetails: null
    };
  },
  activated() {
    this.getData()
  },
  methods: {
    // 获取页面数据
    getData() {
      this.$store.dispatch("reconciliation/getData").then((res)=>{
        this.data = res.data;
        this.actualData = res.actualData;
        this.dataDetails = res.dataDetails;
      });
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
