<template>
  <div>
    <div class="member-container">
      <div class="public-header-wrap">
        <!-- <a-button v-permission="'add'" type="primary" @click="addMember">
          +添加会员
        </a-button> -->
        <!-- <a-button v-permission="'send-message'">
          <a-icon type="mobile" />发送短信
        </a-button> -->
        <!-- <a-dropdown>

          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1" v-permission="'send-email'">
              <a-icon type="mail" />发送邮件
            </a-menu-item>
            <a-menu-item key="2" v-permission="'send-inner-message'">
              <a-icon type="sound" />发送站内消息
            </a-menu-item>
            <a-menu-item key="3" v-permission="'batch-modify'">
              <a-icon type="form" />批量修改会员组
            </a-menu-item>
          </a-menu>
          <a-button>
            <a-icon type="appstore" /> 更多操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown> -->
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-select style="width: 120px" v-model="title">
              <a-select-option value="realName"> 姓名 </a-select-option>
              <a-select-option value="phoneNumber"> 手机号码 </a-select-option>
              <a-select-option value="qq"> QQ </a-select-option>
              <a-select-option value="email"> 邮箱 </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="listQuery.search" placeholder="搜索关键字" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="searchClick"> 查询 </a-button>
          </a-form-model-item>
        </a-form-model>
        <!-- <a-button @click="isfilter = !isfilter">
          <a-icon :type="isfilter ? 'up' : 'down'" /> -->
        <!-- <a-icon type="up" /> -->
        <!-- 高级筛选
        </a-button>
        <a-button> <a-icon type="setting" /> 自定义列表 </a-button>
        <a-button v-permission="'import'">
          <a-icon type="import" />
          导入
        </a-button>
        <a-button v-permission="'export'">
          <a-icon type="export" />
          导出
        </a-button> -->
      </div>
      <div v-show="isfilter" class="member-filterall">
        <div class="member-filter">
          <div>
            <div>
              <span class="filter-type">状态</span>
              <a-select
                style="width: 120px"
                @change="handleChange"
                placeholder="请选择"
              >
                <a-select-option value="jack"> 不限 </a-select-option>
                <a-select-option value="lucy"> 正常 </a-select-option>
                <a-select-option value="disabled"> 未激活 </a-select-option>
                <a-select-option value="Yiminghe"> 已锁定 </a-select-option>
                <a-select-option value="delete"> 已删除 </a-select-option>
              </a-select>
            </div>
            <div>
              <span class="filter-type">登陆次数</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 大于 </a-select-option>
                <a-select-option value="lucy"> 小于 </a-select-option>
                <a-select-option value="disabled"> 大于等于 </a-select-option>
                <a-select-option value="Yiminghe"> 小于等于 </a-select-option>
                <a-select-option value="delete"> 等于 </a-select-option>
                <a-select-option value="delete"> 不等于 </a-select-option>
              </a-select>
              <div class="div-input100 left5">
                <a-input />
              </div>
              <span class="left5">次</span>
            </div>
            <div>
              <span class="filter-type">账户余额</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 大于 </a-select-option>
                <a-select-option value="lucy"> 小于 </a-select-option>
                <a-select-option value="disabled"> 大于等于 </a-select-option>
                <a-select-option value="Yiminghe"> 小于等于 </a-select-option>
                <a-select-option value="delete"> 等于 </a-select-option>
                <a-select-option value="delete"> 不等于 </a-select-option>
              </a-select>
              <div class="div-input100 left5">
                <a-input />
              </div>
              <span class="left5">元</span>
            </div>
            <div>
              <span class="filter-type">会员组等级</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 普通会员 </a-select-option>
                <a-select-option value="lucy"> 原CPS分销组 </a-select-option>
              </a-select>
            </div>
          </div>
          <div>
            <div class="registerDate">
              <span class="filter-type">注册日期 </span
              ><span class="date-picker">
                <a-date-picker placeholder="起始日期"></a-date-picker>
              </span>
              <span class="left5"> 至 </span>
              <span class="date-picker left5">
                <a-date-picker placeholder="结束日期"></a-date-picker>
              </span>
            </div>
            <div>
              <span class="filter-type">有无产品</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 不限 </a-select-option>
                <a-select-option value="lucy"> 有产品 </a-select-option>
                <a-select-option value="lucy"> 无产品 </a-select-option>
              </a-select>
            </div>
            <div>
              <span class="filter-type">实名认证</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 不限 </a-select-option>
                <a-select-option value="lucy"> 未认证 </a-select-option>
                <a-select-option value="lucy"> 已认证 </a-select-option>
              </a-select>
            </div>
          </div>
          <div>
            <div>
              <span class="filter-type">活跃度</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 不限登陆时间 </a-select-option>
                <a-select-option value="lucy"> 1个月内登录 </a-select-option>
                <a-select-option value="lucy"> 1-3个月登录 </a-select-option>
                <a-select-option value="lucy"> 3-6个月登录 </a-select-option>
                <a-select-option value="lucy"> 6-12个月登录 </a-select-option>
                <a-select-option value="lucy">
                  12个月以上未登录
                </a-select-option>
              </a-select>
            </div>
            <div>
              <span class="filter-type">业务</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 不限 </a-select-option>
                <a-select-option value="lucy"> 服务器 </a-select-option>
                <a-select-option value="lucy"> 托管 </a-select-option>
                <a-select-option value="lucy"> 虚拟主机 </a-select-option>
                <a-select-option value="lucy"> SLL证书 </a-select-option>
                <a-select-option value="lucy"> 域名 </a-select-option>
              </a-select>
            </div>
            <div>
              <span class="filter-type">API状态</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack"> 请选择 </a-select-option>
                <a-select-option value="lucy"> 已开通 </a-select-option>
                <a-select-option value="lucy"> 未开通 </a-select-option>
                <a-select-option value="lucy"> 已禁用 </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
        <div class="enter">
          <a-button @click="isfilter = false">清除 </a-button>
          <a-button type="primary" @click="isfilter = false"> 确定 </a-button>
        </div>
      </div>
      <div class="member-contenttable">
        <!-- :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }" -->
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300 }"
          rowKey="id"
          :pagination="paginationProps"
          @change="handleTableChange"
        >
          <span slot="name" slot-scope="text">{{ text }}</span>
          <span
            :class="{ status0: text == 0, status1: text == 1, status: true }"
            slot="status"
            slot-scope="text"
            v-if="text"
          >
            {{ text == 0 ? "冻结" : "正常" }}
          </span>
          <span
            :class="{ status0: text == 1, status1: text == 0, status: true }"
            slot="loginLock"
            slot-scope="text"
            v-if="text"
          >
            {{ text == 0 ? "正常" : "锁定" }}
          </span>
          <!-- 认证状态 -->
          <span
            :class="{ status0: text == 0, status1: text != 0, status: true }"
            slot="certificationStatus"
            slot-scope="text"
          >
            {{ certificationStatusMap[text] }}
          </span>
          <span slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </span>
          <span slot="modifyTime" slot-scope="text">
            {{ text | formatDate }}
          </span>
          <div slot-scope="text" slot="ecsCount">{{ text }}个</div>
          <div v-if="text != undefined" slot="balance" slot-scope="text">
            {{ text.toFixed(2) }}
          </div>
          <span slot="action" slot-scope="text" class="action">
            <a-button
              v-permission="'view'"
              type="link"
              class=""
              @click="selectInfo(text.id)"
            >
              查看
            </a-button>
            <!-- <a-divider type="vertical" /> -->
            <!-- <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                更多
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item v-permission="'into-info'">
                  <a href="javascript:;">进入会员中心</a>
                </a-menu-item>
                <a-menu-item v-permission="'web-log-export'">
                  <a href="javascript:;">网监查案导出</a>
                </a-menu-item>
                <a-menu-item v-permission="'modify-balance'">
                  <a href="javascript:;">增减余额</a>
                </a-menu-item>
                <a-menu-item v-permission="'api-setting'">
                  <a href="javascript:;">API设置</a>
                </a-menu-item>
                <a-menu-item v-permission="'modify'">
                  <a href="javascript:;">修改</a>
                </a-menu-item>
                <a-menu-item v-permission="'del'">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown> -->
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lucy: "lucy",
      isfilter: false,
      title: "realName",
      data: [],
      selectedRowKeys: [],
      columns: [
        {
          title: "会员ID",
          dataIndex: "corporationCode",
          scopedSlots: { customRender: "corporationCode" },
          width: 190
        },
        {
          title: "姓名",
          dataIndex: "realName",
          width: 120
        },
        {
          title: "手机",
          dataIndex: "phoneNumber",
          width: 120
        },
        {
          title: "QQ",
          dataIndex: "qq",
          width: 120
        },
        {
          title: "邮箱",
          dataIndex: "email",
          width: 180
        },
        {
          title: "服务器",
          dataIndex: "ecsCount",
          width: 100,
          scopedSlots: { customRender: "ecsCount" }
        },
        // {
        //   title: "托管",
        //   dataIndex: "hosting",
        //   sorter: true,
        //   sortDirections: ["ascend", "descend"],
        //   width: 80
        // },
        // {
        //   title: "主机",
        //   dataIndex: "host",
        //   sorter: true,
        //   sortDirections: ["ascend", "descend"],
        //   width: 80
        // },
        // {
        //   title: "SSL证书",
        //   dataIndex: "sslccit",
        //   sorter: true,
        //   sortDirections: ["ascend", "descend"],
        //   width: 110
        // },
        // {
        //   title: "域名",
        //   dataIndex: "domain",
        //   sorter: true,
        //   sortDirections: ["ascend", "descend"],
        //   width: 80
        // },
        // {
        //   title: "裸金属",
        //   dataIndex: "bareMetal",
        //   sorter: true,
        //   sortDirections: ["ascend", "descend"],
        //   width: 100
        // },
        {
          title: "帐号状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: 110
        },
        // {
        //   title: "锁定状态",
        //   dataIndex: "loginLock",
        //   scopedSlots: { customRender: "loginLock" },
        //   width: 100
        // },
        {
          title: "余额",
          dataIndex: "balance",
          width: 100,
          scopedSlots: { customRender: "balance" }
        },
        // {
        //   title: "授信额度",
        //   dataIndex: "creditNumber",
        //   sorter: (a, b) => {
        //     return a.creditNumber - b.creditNumber;
        //   },
        //   sortDirections: ["ascend", "descend"],
        //   width: 110
        // },
        {
          title: "实名认证",
          dataIndex: "certificationStatus",
          key: "certificationStatus",
          scopedSlots: { customRender: "certificationStatus" },
          width: 100
        },
        {
          title: "注册时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" },
          // sorter: true,
          width: 200
        },
        {
          title: "最后登录时间",
          dataIndex: "modifyTime",
          scopedSlots: { customRender: "modifyTime" },
          // sorter: true,
          width: 200
        },
        // {
        //   title: "备注",
        //   dataIndex: "remark",
        //   width: 140
        // },
        {
          title: "操作",
          Index: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" },
          width: 200
        }
      ],
      certificationStatusMap: {
        0: "未认证",
        1: "个人已认证",
        2: "企业已认证",
        3: "个人与企业已认证"
      },
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        sorter: "",
        id: ""
      },
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1, //当前页
        pageSize: 5, //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.paginationProps.current} /  ${Math.ceil(
            total / this.paginationProps.pageSize
          )} 页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },
  created() {},
  watch: {
    $route: {
      handler(newVal) {
        console.log(newVal.path, "newVal");
        if (newVal.path === "/sale/customer/detail") {
          if (newVal.query.id) {
            this.listQuery.id = newVal.query.id;
            // this.getDetailList();
          } else {
            this.getList();
          }
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    // 点击排序之后的回调
    handleTableChange(pagination, filters, sorter) {
      if (sorter && sorter.order) {
        this.listQuery.key = sorter.columnKey;
        this.listQuery.sorter =
          sorter.order.replace("end", "") + `-${sorter.columnKey}`;
        this.getList();
        // console.log("排序被点击了", sorter.columnKey);
      }
    },
    changepage(current) {
      this.paginationProps.current = current;
      if (this.$route.query.id) {
        this.listQuery.id = this.$route.query.id;
        this.getDetailList();
      } else {
        this.getList();
      }
    },
    onShowSizeChange(current, pageSize) {
      this.paginationProps.pageSize = pageSize;
      this.paginationProps.current = current;
      console.log(this.$route.query.id);
      if (this.$route.query.id) {
        this.listQuery.id = this.$route.query.id;
        this.getDetailList();
      } else {
        this.getList();
      }
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleMenuClick(e) {
      console.log(e);
    },
    addMember() {
      this.$router.push({ path: "/sale/customer/add" });
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    getList() {
      this.listQuery.currentPage = this.paginationProps.current;
      this.listQuery.pageSize = this.paginationProps.pageSize;
      this.$store
        .dispatch("member/getList", this.listQuery)
        .then(res => {
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {});
    },
    getDetailList() {
      this.listQuery.currentPage = this.paginationProps.current;
      this.listQuery.pageSize = this.paginationProps.pageSize;
      this.$store
        .dispatch("customer/getCustomerClient", this.listQuery)
        .then(res => {
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
          this.listQuery.id = "";
        })
        .finally(() => {});
    },
    selectInfo(key) {
      // console.log(key);
      this.$router.push({
        path: "/sale/customer/detail",
        query: {
          id: key
        }
      });
    },
    clickMore(key) {
      // console.log(key);
      this.isMoreId = key;
    },
    searchClick() {
      this.listQuery.currentPage = 1;
      this.listQuery.key = this.title;
      this.$getListQp("member/getList", this.listQuery).then(res => {
        // console.log(res);
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.member-container {
  background-color: #fff;
  margin-left: 20px;
  padding: 20px;
  .member-top {
    // display: flex;
    width: 100%;
    padding-bottom: 20px;
    justify-content: space-between;
    .search {
      display: inline-block;
      width: 250px;
      margin: 0 10px;
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
        > span {
          // min-width: 100px!important;
        }
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
  .member-contenttable {
    .status {
      font-size: 12px;
      color: #ffffff;
      border-radius: 2px;
      padding: 0 4px;
      line-height: 18px;
    }
    .status0 {
      background-color: #ccc;
    }
    .status1 {
      background-color: #16b841;
    }
  }
}
</style>
