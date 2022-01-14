<template>
  <div>
    <div class="purchase-list-container">
      <div>
        <p class="purchase-list-title">
          <span
            :class="{
              'purchase-title-active': selectkey.runningStatus === text.key,
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
            <a-form-model layout="inline" :model="listQuery">
              <a-form-model-item>
                <a-button type="primary" @click="businessOpening">
                  +业务开通
                </a-button>
              </a-form-model-item>
              <!-- 下拉框 -->
              <a-form-model-item>
                <a-select
                  style="width:120px"
                  v-model="listQuery.key"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in searchColumns"
                    :key="item.dataIndex"
                    :value="item.dataIndex"
                  >
                    {{ item.title }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <!-- 搜索 -->
              <a-form-model-item>
                <a-input
                  v-model="listQuery.search"
                  allowClear
                  placeholder="搜索关键词"
                />
              </a-form-model-item>
              <!-- 按钮 -->
              <a-form-model-item>
                <a-button type="primary" @click="search">
                  查询
                </a-button>
              </a-form-model-item>
              <div class="public-header-filter">
                <a-form-model-item>
                  <a-button> <a-icon type="setting" />自定义列表 </a-button>
                  <a-button @click="isfilter = !isfilter">
                    <a-icon :type="isfilter ? 'up' : 'down'" />
                    <!-- <a-icon type="up" /> -->
                    高级筛选
                  </a-button>
                  <a-button>
                    <a-icon type="export" />
                    导出
                  </a-button>
                </a-form-model-item>
              </div>
            </a-form-model>
            <div v-show="isfilter" class="member-filterall">
              <div class="member-filter">
                <div>
                  <div>
                    <span class="filter-type">线路</span>
                    <a-select
                      style="width: 120px"
                      @change="handleChange"
                      placeholder="请选择"
                    >
                      <a-select-option value="jack">
                        不限线路
                      </a-select-option>
                      <a-select-option value="lucy">
                        自生产
                      </a-select-option>
                      <a-select-option value="disabled">
                        小鸟云资源池
                      </a-select-option>
                      <a-select-option value="Yiminghe">
                        云引擎大陆版资源池
                      </a-select-option>
                      <a-select-option value="delete">
                        云引擎国际版资源池
                      </a-select-option>
                    </a-select>
                  </div>
                  <div>
                    <span class="filter-type">业务状态</span>
                    <a-select
                      placeholder="请选择"
                      style="width: 120px"
                      @change="handleChange"
                    >
                      <a-select-option value="jack">
                        不限
                      </a-select-option>
                      <a-select-option value="lucy">
                        已回收
                      </a-select-option>
                      <a-select-option value="disabled">
                        开通中
                      </a-select-option>
                      <a-select-option value="Yiminghe">
                        正常
                      </a-select-option>
                      <a-select-option value="delete">
                        过户中
                      </a-select-option>
                      <a-select-option value="delete">
                        已过期
                      </a-select-option>
                      <a-select-option value="delete">
                        已退款
                      </a-select-option>
                    </a-select>
                  </div>
                  <div>
                    <span class="filter-type">配置</span>
                    <a-select
                      placeholder="请选择"
                      style="width: 120px"
                      @change="handleChange"
                    >
                      <a-select-option value="jack">
                        CPU不限
                      </a-select-option>
                      <a-select-option value="lucy">
                        1核
                      </a-select-option>
                      <a-select-option value="disabled">
                        2核
                      </a-select-option>
                      <a-select-option value="Yiminghe">
                        4核
                      </a-select-option>
                      <a-select-option value="delete">
                        8核
                      </a-select-option>
                      <a-select-option value="delete">
                        16核
                      </a-select-option>
                    </a-select>
                    <a-select
                      placeholder="请选择"
                      style="width: 120px"
                      @change="handleChange"
                    >
                      <a-select-option value="jack">
                        内存不限
                      </a-select-option>
                      <a-select-option value="lucy">
                        1G
                      </a-select-option>
                      <a-select-option value="disabled">
                        2G
                      </a-select-option>
                      <a-select-option value="Yiminghe">
                        4G
                      </a-select-option>
                      <a-select-option value="delete">
                        8G
                      </a-select-option>
                      <a-select-option value="delete">
                        16G
                      </a-select-option>
                      <a-select-option value="delete">
                        32G
                      </a-select-option>
                      <a-select-option value="delete">
                        64G
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
                <div>
                  <div class="registerDate">
                    <span class="filter-type">购买时间段 </span
                    ><span class="date-picker">
                      <a-date-picker placeholder="起始日期"></a-date-picker>
                    </span>
                    <span class="left5"> 至 </span>
                    <span class="date-picker left5">
                      <a-date-picker placeholder="结束日期"></a-date-picker>
                    </span>
                  </div>
                  <div>
                    <span class="filter-type">运行状态</span>
                    <a-select
                      placeholder="请选择"
                      style="width: 120px"
                      @change="handleChange"
                    >
                      <a-select-option value="jack">
                        不限
                      </a-select-option>
                      <a-select-option value="lucy">
                        已锁定
                      </a-select-option>
                      <a-select-option value="lucy">
                        已关机
                      </a-select-option>
                      <a-select-option value="lucy">
                        已挂起
                      </a-select-option>
                      <a-select-option value="lucy">
                        运行中
                      </a-select-option>
                    </a-select>
                  </div>
                  <div>
                    <span class="filter-type">带宽</span>
                    <span class="div-input100">
                      <a-input />
                    </span>
                    <span>M</span>
                  </div>
                </div>
                <div>
                  <div>
                    <div class="registerDate">
                      <span class="filter-type">到期时间段 </span
                      ><span class="date-picker">
                        <a-date-picker placeholder="起始日期"></a-date-picker>
                      </span>
                      <span class="left5"> 至 </span>
                      <span class="date-picker left5">
                        <a-date-picker placeholder="结束日期"></a-date-picker>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="enter">
                <a-button @click="isfilter = false">清除 </a-button>
                <a-button type="primary" @click="isfilter = false">
                  确定
                </a-button>
              </div>
            </div>
          </div>
          <!-- 表格 -->
          <a-table
            :loading="tableLoading"
            :columns="columns"
            :data-source="data"
            rowKey="id"
            :pagination="paginationProps"
            @change="handleChangeSort"
            :scroll="{ x: 2200 }"
          >
            <div slot="runningStatus" slot-scope="text">
              {{ runningStatusEnum[text] }}
              <!-- <span v-if="text == 0" class="runningStatus blackhole"
                >黑洞中</span
              >
              <span v-if="text == 1" class="runningStatus running">运行中</span>
              <span v-if="text == 2" class="runningStatus shutdown"
                >已关机</span
              >
              <span v-if="text == 3" class="runningStatus expired">已过期</span> -->
            </div>
            <a slot="action" slot-scope="text" @click="infoChannel(text)"
              >管理</a
            >
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { regionDataEnum, runningStatusEnum } from '@/utils/enum';
export default {
  data() {
    return {
      regionDataEnum,
      runningStatusEnum,
      isfilter: false,
      listQuery: {
        key: 'ip',
        search: '',
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      titleList: [
        {
          key: 1,
          title: '正常',
        },
        {
          key: 6,
          title: '即将到期',
        },
        {
          key: 3,
          title: '已到期',
        },
        {
          key: -1,
          title: '已删除',
        },
      ],
      selectkey: {
        corporationName: '',
        corporationPhone: '',
        currentPage: '1',
        endTimeSort: '',
        orderNo: '',
        outIp: '',
        pageSize: '10',
        saleTimeSort: '',
        sort: '',
        runningStatus: 1,
      },
      searchColumns: [
        {
          title: '服务器IP',
          dataIndex: 'ip',
        },
        {
          title: '会员ID',
          dataIndex: 'corporationCode',
        },
        {
          title: '会员手机号',
          dataIndex: 'phoneNumber',
        },
        {
          title: '订单ID',
          dataIndex: 'orderNo',
        },
      ],
      columns: [
        {
          title: '业务ID',
          width: 180,
          dataIndex: 'id',
        },
        {
          title: 'IP',
          width: 130,
          dataIndex: 'outIp',
        },
        {
          title: '会员手机号',
          width: 130,
          dataIndex: 'phoneNumber',
        },
        {
          title: '订单ID',
          width: 130,
          dataIndex: 'orderNo',
        },
        { title: '弹性IP', dataIndex: 'intranetIp', key: 'intranetIp' },
        {
          title: '共享类型',
          dataIndex: 'shareType',
          key: 'shareType',
          customRender: (text, record, index) => {
            return '通用';
          },
        },
        {
          title: '机房',
          dataIndex: 'regionId',
          customRender: (text, record, index) => {
            return this.regionDataEnum[text] || text;
          },
          width: 150,
        },
        { title: 'CPU(核)', dataIndex: 'cpu', key: 'cpu' },
        { title: '内存(G)', dataIndex: 'memory', key: 'memory' },
        {
          title: '磁盘(G)',
          dataIndex: 'systemSize',
        },
        {
          title: '带宽(Mbps)',
          dataIndex: 'internetMaxBandwidthOut',
          width: 150,
        },
        {
          title: '会员ID',
          dataIndex: 'corporationCode',
          key: 'corporationCode',
          width: 190,
        },
        {
          title: '购买时间',
          dataIndex: 'createTimeStr',
          sorter: true,
          width: 190,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: '到期时间',
          dataIndex: 'endTimeStr',
          key: 'endTimeStr',
          width: 180,
          sorter: true,
          sortDirections: ['ascend', 'descend'],
        },
        { title: '业务状态', dataIndex: '1', key: '' },
        {
          title: '运行状态',
          dataIndex: 'runningStatus',
          scopedSlots: { customRender: 'runningStatus' },
        },
        { title: '操作状态', dataIndex: '3', key: '' },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'action',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' },
        },
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        pageSize: 5,
        current: 1, //当前页
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.paginationProps.current} / ${Math.ceil(
            total / this.paginationProps.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange,
      },
      tableLoading: false,
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    handleChangeSort(pagination, filters, sorter) {
      console.log(sorter);
      if (sorter && sorter.order) {
        if (sorter.columnKey === 'purchaseTimeStr') {
          this.selectkey.saleTimeSort = sorter.order.replace('end', '');
          this.getList(() => {
            this.selectkey.saleTimeSort = '';
          });
        } else if (sorter.columnKey === 'endTimeStr') {
          this.selectkey.endTimeSort = sorter.order.replace('end', '');
          this.getList(() => {
            this.selectkey.endTimeSort = '';
          });
        }
      }
    },
    businessOpening() {
      this.$router.push({
        path: '/business/cloudservers/businessOpening',
      });
    },
    changeRunningstatus(text) {
      this.selectkey.runningStatus = text.key;
      this.getList();
    },
    // 查询
    search() {
      this.listQuery.search = this.listQuery.search.trim();
      this.selectkey[this.listQuery.key] = this.listQuery.search;
      this.getList();
    },
    // 查询表格数据
    getList(callBack) {
      this.tableLoading = true;
      this.selectkey.currentPage = this.paginationProps.current;
      this.selectkey.pageSize = this.paginationProps.pageSize;
      this.$store
        .dispatch('business/getList', this.selectkey)
        .then((res) => {
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
          if (callBack) {
            callBack();
          }
        });
    },
    // 表格分页快速跳转n页
    quickJump(current) {
      this.paginationProps.current = current;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      this.getList();
    },
    //
    infoChannel(id) {
      this.$router.push({
        path: '/business/cloudservers/info',
        query: { id },
      });
    },
    handleChange(value) {
      console.log(value);
    },
  },
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
  background: #a5a5a5;
}
.running {
  background: #16b841;
}
</style>
