<template>
  <div class="details-container" v-if="data">
    <h1 class="details-title">财务信息</h1>
    <div class="details-info">
      <div>
        <span class="details-type">入款会员:</span>
        <span class="details-value">{{ data.accountName }}</span>
      </div>
      <div>
        <span class="details-type">管理员:</span>
        <span class="details-value">{{ data.modifyUserName }}</span>
      </div>
      <div>
        <span class="details-type">申请时间:</span>
        <span class="details-value">{{ data.createTime | formatDate }}</span>
      </div>
      <div>
        <span class="details-type">处理状态:</span>
        <span class="details-value">{{ detailTypeMapData[data.status] }}</span>
      </div>
      <div>
        <span class="details-type">操作金额:</span>
        <span class="details-value" v-if="data.amount">
          {{ data.amount.toFixed(2) }}
        </span>
      </div>
      <div>
        <span class="details-type">款项类型:</span>
        <span class="details-value">
          {{ paymentTypeMapData[data.accountType] }}
        </span>
      </div>
      <div>
        <span class="details-type">备注信息:</span>
        <span class="details-value">{{ data.memo }}</span>
      </div>
      <div>
        <span class="details-type">入款凭证:</span>
        <img
          height="90px"
          :src="url"
          alt=""
          v-for="(url, index) in imgList"
          :key="index"
        />
      </div>
    </div>
    <div class="placeholder"></div>
    <!-- <h1 class="details-title">审核过程</h1>
    <a-table :columns="columns" rowKey="ID" :scroll="{ x: 1000 }">
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table> -->
    <div v-show="data.status == 0">
      <h1 class="details-title">审核</h1>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          label="审核结果"
          :wrapper-col="{ span: 3 }"
          prop="status"
        >
          <a-select v-model="form.status">
            <a-select-option value="">
              请选择
            </a-select-option>
            <a-select-option value="9">
              通过
            </a-select-option>
            <a-select-option value="2">
              拒绝
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          label="审核意见"
          :wrapper-col="{ span: 5 }"
          prop="checkMemo"
        >
          <a-textarea
            v-model="form.checkMemo"
            :auto-size="{ minRows: 2, maxRows: 4 }"
          />
          <div class="annotation">
            注：仅供内部查看，不面向用户
          </div>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button
            v-permission="'view'"
            type="primary"
            class="btn1"
            @click="confirmReview"
          >
            确认审核
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div class="btn"></div>
    </div>
  </div>
</template>

<script>
import { paymentTypeMapData, detailTypeMapData } from "@/utils/enum";
export default {
  data() {
    return {
      data: null,
      paymentTypeMapData,
      detailTypeMapData,
      columns: [
        {
          title: "步骤",
          dataIndex: "productName",
          key: "productName"
        },
        {
          title: "审核节点",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" }
        },
        {
          title: "审核状态",
          key: "productConfig",
          scopedSlots: { customRender: "productConfig" }
        },
        {
          title: "审核人",
          dataIndex: "quantity",
          key: "quantity"
        },
        {
          title: "审核意见",
          dataIndex: "chargeModel",
          key: "chargeModel"
        }
      ],
      form: {
        applyUserCode: "",
        checkMemo: "",
        status: "",
        id: ""
      },
      rules: {
        status: [
          {
            required: true,
            message: "请选择审核结果",
            trigger: "change"
          }
        ],
        checkMemo: [
          {
            required: true,
            message: "请填写审核意见",
            trigger: "blur"
          }
        ]
      },
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 10
      }
    };
  },
  activated() {
    if (this.data && this.data.status == 0) {
      this.resetForm();
    }
    this.getList();
  },
  computed: {
    imgList() {
      if (this.data.voucher) {
        return this.data.voucher.split(",");
      } else {
        return [];
      }
    }
  },
  methods: {
    getList() {
      this.$store
        .dispatch("manualDeposit/getOne", this.$route.query.id)
        .then(res => {
          console.log(res);
          this.data = res.data;
        });
    },
    confirmReview() {
      this.form.applyUserCode = this.$route.query.applyUserCode;
      this.form.id = this.$route.query.id;
      this.$confirm({
        title: "确定要提交吗?",
        onOk: () => {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              this.$store
                .dispatch("manualDeposit/changeReview", this.form)
                .then(res => {
                  console.log(res);
                  this.$message.success("审核成功");
                  this.$router.back();
                });
            }
          });
        }
      });
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
      this.form = {
        applyUserCode: "",
        checkMemo: "",
        status: "",
        id: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.details-container {
  margin: 10px 20px;
  background-color: #fff;
  padding-bottom: 20px;
  .details-title {
    margin-top: 20px;
    border-bottom: 1px solid #ebebeb;
    padding-left: 32px;
    height: 48px;
    line-height: 48px;
    margin-bottom: 10px;
    text-indent: 0;
    // font-size: 14px;
    background-color: #fff;
    color: #292929;
  }
  .placeholder {
    height: 20px;
    background-color: #edeff2;
  }
  .details-info {
    display: flex;
    margin-left: 32px;
    width: 100%;
    flex-wrap: wrap;
    padding-bottom: 90px;
    div {
      width: 32%;
      height: 32px;
      display: flex;
      align-items: flex-start;
    }
    .details-type {
      display: block;
      line-height: 24px;
      width: 100px;
      text-align: left;
      color: #a3a3a3;
      font-weight: normal;
      font-size: 12px;
      padding: 4px 0;
    }
    .details-value {
      display: block;
      line-height: 24px;
      width: 180px;
      text-align: left;
      color: #292929;
      font-weight: normal;
      font-size: 12px;
      padding: 4px 0;
    }
  }
  .btn {
    margin-top: 20px;
    margin-left: 510px;
    .btn1 {
      margin-left: 30px;
    }
  }
}
</style>
