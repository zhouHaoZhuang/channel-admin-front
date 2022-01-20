<template>
  <div class="Content">
    <div class="orderTop">
      <a-space>
        <!-- <a-button icon="stop">
          批量关闭
        </a-button> -->
        <a-select
          style="width:150px"
          v-model="listQuery.key"
          @change="changeKey"
        >
          <a-select-option
            :value="v.dataIndex"
            v-for="v in useColumns"
            :key="v.title"
          >
            {{ v.title }}
          </a-select-option>
        </a-select>
        <div class="sechkey">
          <a-input
            allow-clear
            :disabled="!isTime"
            placeholder="搜索关键词"
            v-model="listQuery.search"
          />
        </div>
        <div>
          <a-date-picker
            @change="handleStartChange"
            :disabled-date="disabledStartDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="开始时间"
            :disabled="isTime"
            @openChange="handleStartOpenChange"
          />
          <span class="zhi">至</span>
          <a-date-picker
            :disabled="isTime"
            @change="handleEndChange"
            :disabled-date="disabledEndDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结束时间"
            @openChange="handleEndOpenChange"
          />
        </div>
        <a-button type="primary" @click="secectClick">
          查询
        </a-button>
        <a-button @click="isfilter = !isfilter">
          <a-icon :type="isfilter ? 'up' : 'down'" />
          高级筛选
        </a-button>
        <a-button>
          <a-icon type="export" />
          导出
        </a-button>
      </a-space>
    </div>
    <div v-show="isfilter" class="member-filterall">
      <div class="member-filter">
        <div>
          <div>
            <span class="filter-type">来源</span>
            <a-select
              style="width: 120px"
              @change="handleChange"
              placeholder="全部来源"
            >
              <a-select-option value="jack">
                PC端
              </a-select-option>
              <a-select-option value="lucy">
                手机端
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div>
          <div>
            <span class="filter-type">充值状态</span>
            <a-select
              style="width: 120px"
              @change="handleChange"
              placeholder="请选择"
            >
              <a-select-option value="jack">
                充值状态
              </a-select-option>
              <a-select-option value="lucy">
                未完成
              </a-select-option>
              <a-select-option value="jack">
                已完成
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div>
          <div>
            <span class="filter-type">支付通道</span>
            <a-select
              placeholder="请选择"
              style="width: 120px"
              @change="handleChange"
            >
              <a-select-option value="jack">
                线下汇款
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="enter">
        <a-button @click="isfilter = false">清除 </a-button>
        <a-button type="primary" @click="isfilter = false"> 确定 </a-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="orderTable">
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="paginationProps"
          :scroll="{ x: 1400 }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="originAmount" slot-scope="text">
            {{ text.toFixed(2) }}
          </div>
          <div slot="action" slot-scope="text">
            <a-button type="link" @click="selectPool(text)">
              查看
            </a-button>
          </div>
          <div slot="createTime" slot-scope="text" v-if="text">
            {{ text | formatDate }}
          </div>
          <div
            slot="modifyTime"
            slot-scope="text, record"
            v-if="text && record.status == 9"
          >
            {{ text | formatDate }}
          </div>
          <div
            :class="{ green: text === 1, blue: text !== 1 }"
            slot="status"
            slot-scope="text"
          >
            <span>{{ detailTypeMapData[text] }}</span>
          </div>
          <div slot="channelCode" slot-scope="text">
            {{ rechargeTypeMap[text] }}
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { detailTypeMapData, rechargeTypeMap } from '@/utils/enum.js';
export default {
  data() {
    return {
      isfilter: false,
      detailTypeMapData,
      rechargeTypeMap,
      // search: "",
      listQuery: {
        key: 'customerCode',
        search: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: '',
        endTime: '',
      },
      columns: [
        {
          title: '充值ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '支付ID',
          dataIndex: 'payNo',
          width: 220,
        },
        {
          title: '方式',
          dataIndex: 'channelCode',
          scopedSlots: {
            customRender: 'channelCode',
          },
        },
        {
          title: '会员ID',
          dataIndex: 'customerCode',
          key: 'customerCode',
          scopedSlots: { customRender: 'customerCode' },
        },
        {
          title: '充值金额',
          dataIndex: 'amount',
          key: 'amount',
          scopedSlots: { customRender: 'amount' },
        },
        // {
        //   title: "交易号",
        //   dataIndex: "actualAmount",
        //   key: "actualAmount",
        //   scopedSlots: { customRender: "actualAmount" }
        // },
        {
          title: '充值时间',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' },
        },
        {
          title: '到账时间',
          dataIndex: 'payTime',
          key: 'modifyTime',
          scopedSlots: { customRender: 'modifyTime' },
        },
        {
          title: '充值状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
        },
        // {
        //   title: '操作人',
        //   dataIndex: 'createUserName',
        //   key: 'createUserName',
        //   scopedSlots: { customRender: 'createUserName' },
        // },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'action',
          // fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
      // selectedRowKeys: [],// 已选中的行
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )}  页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange,
      },
      num: '',
      startValue: null,
      endValue: null,
      endOpen: false,
      isTime: true,
    };
  },
  computed: {
    useColumns() {
      return [
        {
          title: '会员ID',
          dataIndex: 'customerCode',
        },
        // {
        //   title: "充值订单号",
        //   dataIndex: "",
        // },
        // {
        //   title: "交易号",
        //   dataIndex: "tradeType",
        // },
        {
          title: '支付ID',
          dataIndex: 'payNo',
        },
        {
          title: '起始时间',
          dataIndex: 'createTime',
        },
      ];
    },
  },
  created() {
    this.getList();
  },
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    secectClick() {
      this.getList();
    },
    changeKey(val) {
      // console.log(val);
      this.listQuery.key = val;
      if (this.listQuery.key !== 'createTime') {
        this.isTime = true;
      } else {
        this.isTime = false;
      }
    },
    handleChange(val) {
      console.log(val);
    },
    handleStartChange(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    handleEndChange(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    // 多选框改变之后的回调
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 通用写法
    // 切换页码回调
    quickJump(current) {
      this.listQuery.currentPage = current;
      this.getList();
    },
    // 切换每页条数回调
    onShowSizeChange(current, pageSize) {
      this.listQuery.pageSize = pageSize;
      this.listQuery.currentPage = current;
      this.getList();
    },
    // 发送请求回调
    getList() {
      this.$getList('rechargeRecord/getList', this.listQuery).then((res) => {
        // console.log(res, "请求结果");
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
    // 跳转详情的回调
    selectPool(id) {
      this.$router.push({
        path: '/finance/index/rechargeinfo',
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Content {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .orderTop {
    display: flex;
    margin-bottom: 25px;
    .sechkey {
      width: 200px;
      margin-right: 20px;
    }
    [type='button'] {
      margin-left: 20px;
    }
    .zhi {
      margin: 10px;
    }
  }
  .member-filterall {
    border: 1px solid #e0e0e0;
    width: 100%;
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
}
</style>
