<template>
  <div>
    <div class="purchase-list-container">
      <div>
        <p class="purchase-list-title">
          <span
            :class="{
              'purchase-title-active': listQuery.status === text.key
            }"
            v-for="(text, index) in titleList"
            :key="index"
            @click="changeRunningstatus(text)"
          >
            {{ text.title }}
          </span>
        </p>
        <div>
          <div class="public-header-wrap">
            <a-form-model layout="inline">
              <a-form-model-item>
                <a-button
                  type="primary"
                  v-permission="'modify-balance'"
                  @click="businessOpening"
                >
                  +增减会员余额
                </a-button>
              </a-form-model-item>
              <!-- 下拉框 -->
              <a-form-model-item>
                <a-select
                  allowClear
                  style="width:120px"
                  v-model="listQuery.key"
                >
                  <a-select-option value="id">
                    ID
                  </a-select-option>
                  <a-select-option value="applyUserCode">
                    会员ID
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <!-- 搜索 -->
              <a-form-model-item>
                <a-input
                  allowClear
                  v-model="listQuery.search"
                  placeholder="搜索关键词"
                />
              </a-form-model-item>
              <!-- 日期 -->
              <a-form-model-item>
                <div class="registerDate">
                  <span class="date-picker">
                    <a-date-picker
                      placeholder="起始日期"
                      format="YYYY-MM-DD HH:mm:ss"
                      @change="startValue"
                    ></a-date-picker>
                  </span>
                  <span class="left5"> 至 </span>
                  <span class="date-picker left5">
                    <a-date-picker
                      placeholder="结束日期"
                      format="YYYY-MM-DD HH:mm:ss"
                      @change="endValue"
                    ></a-date-picker>
                  </span>
                </div>
              </a-form-model-item>
              <!-- <a-form-model-item>
                <a-select
                  allowClear
                  style="width:120px"
                  v-model="listQuery.accountType"
                >
                  <a-select-option value="">
                    款项类型
                  </a-select-option>
                  <a-select-option
                    :value="val"
                    v-for="(item, val) in paymentTypeMapData"
                    :key="val"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-model-item> -->
              <!-- 按钮 -->
              <a-form-model-item>
                <a-button type="primary" @click="search">
                  查询
                </a-button>
              </a-form-model-item>
              <!-- <div class="public-header-filter">
                <a-form-model-item>
                  <a-button>
                    <a-icon type="export" />
                    导出
                  </a-button>
                </a-form-model-item>
              </div> -->
            </a-form-model>
          </div>
          <!-- 表格 -->
          <a-table
            :loading="tableLoading"
            :columns="columns"
            :data-source="data"
            rowKey="id"
            :pagination="paginationProps"
          >
            <div
              slot="status"
              slot-scope="text"
              :class="{
                runningStatus: true,
                blackhole: text == 9,
                gray: text == 2,
                lightGreen: text == 0,
                yellow: text == 1
              }"
            >
              {{ detailTypeMapData[text] }}
              <!-- runningStatus公共 -->
            </div>
            <div slot="createTime" slot-scope="text">
              {{ text | formatDate }}
            </div>
            <div slot="accountType" slot-scope="text">
              {{ paymentTypeMapData[text] }}
            </div>
            <a
              slot="action"
              slot-scope="text"
              v-permission="'view'"
              @click="infoChannel(text.id, text.applyUserCode)"
            >
              查看
            </a>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailTypeMapData, paymentTypeMapData } from "@/utils/enum";
export default {
  data() {
    return {
      detailTypeMapData,
      paymentTypeMapData,
      listQuery: {
        key: "id",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: "",
        startTime: "",
        endTime: "",
        accountType: ""
      },
      titleList: [
        {
          key: "",
          title: "全部"
        },
        {
          key: 0,
          title: "处理中"
        },
        {
          key: 9,
          title: "审核成功"
        },
        {
          key: 2,
          title: "审核失败"
        }
      ],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          width: 220
        },
        {
          title: "会员ID",
          dataIndex: "applyUserCode",
          width: 220
        },
        {
          title: "会员名称",
          dataIndex: "accountName",
          key: "accountName"
        },
        {
          title: "款项类型",
          dataIndex: "accountType",
          width: 100,
          scopedSlots: { customRender: "accountType" }
          // 2 线下充值 4 退款 1 在线充值 3 下单
        },
        {
          title: "申请金额",
          dataIndex: "amount",
          width: 100,
          key: "amount"
        },
        {
          title: "申请时间",
          dataIndex: "createTime",
          width: 190,
          scopedSlots: { customRender: "createTime" }
        },
        { title: "备注信息", dataIndex: "memo", key: "" },
        {
          title: "审核状态",
          dataIndex: "status",
          width: 100,
          key: "",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          // dataIndex: "id",
          key: "action",
          fixed: "right",
          width: 100,
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      tableLoading: false
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    startValue(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    callback(key) {
      console.log(key);
    },
    businessOpening() {
      this.$router.push({
        path: "/finance/examine/addpayment"
      });
    },
    changeRunningstatus(text) {
      this.listQuery.status = text.key;
      this.getList();
    },
    // 查询
    search() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    // 查询表格数据
    getList() {
      this.$getList("manualDeposit/getList", this.listQuery).then(res => {
        console.log(res, "获取列表");
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
    // 表格分页快速跳转n页
    quickJump(current) {
      this.listQuery.currentPage = current;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    //
    infoChannel(id, applyUserCode) {
      this.$router.push({
        path: "/finance/examine/details",
        query: {
          id,
          applyUserCode
        }
      });
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.purchase-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .public-header-wrap {
    padding-bottom: 10px;
    .public-header-filter {
      // text-align: right;
      display: inline-block;
      float: right;
      button {
        margin-left: 10px;
      }
    }
    .public-header-export {
      margin-left: 290px;
    }
  }
}
.purchase-list-title {
  height: 40px;
  // margin: 0;
  border-bottom: 1px solid #e8e8e8;
  span {
    display: inline-block;
    padding: 0 20px;
    line-height: 38px;
    text-align: center;
    border: 1px solid transparent;
  }
  .purchase-title-active {
    border-color: #1890ff;
    color: #1890ff;
    border-bottom: 1px solid #fff;
  }
}
.left5 {
  margin-left: 5px;
}
.member-filterall {
  border: 1px solid #e0e0e0;
  width: 100%;
  // margin-left: 25px;
  background-color: #fafafa;
  .member-filter {
    display: flex;
    width: 100%;
    border: 1px solid #e0e0e0;
    background-color: #fafafa;
    margin-top: -1px;
    margin-left: -1px;
    padding: 20px;
    .div-input100 {
      display: inline-block;
      width: 100px;
    }
    .left5 {
      margin-left: 5px;
    }
    > div {
      flex: 1;
      > div {
        margin-bottom: 20px;
      }
      > div:last-child {
        margin-bottom: 0;
      }
    }
    .filter-type {
      display: inline-block;
      width: 67px;
      height: 16px;
      color: #a3a3a3;
      font-size: 12px;
      text-align: left;
    }
    .registerDate {
      width: 320px;
      display: flex;
      align-items: center;
      .date-picker {
        width: 120px;
      }
    }
  }
  .enter {
    text-align: right;
    padding: 10px 0;
    padding-right: 30px;
    button {
      margin-right: 10px;
    }
  }
}
.runningStatus {
  display: inline-block;
  padding: 0 4px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.blackhole {
  background: #16b841;
}
.gray {
  background: #ccc;
}
.lightGreen {
  background: #14ac8b;
}
.yellow {
  background: #d3b109;
}
</style>
