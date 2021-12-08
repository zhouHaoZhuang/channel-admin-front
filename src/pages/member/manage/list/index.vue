<template>
  <div>
    <div class="member-content">
      <div class="member-top">
        <a-button type="primary">
          +添加会员
        </a-button>
        <a-button> <a-icon type="mobile" />发送短信 </a-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1"> <a-icon type="mail" />发送邮件 </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="sound" />发送站内消息
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="form" />批量修改会员组
            </a-menu-item>
          </a-menu>
          <a-button
            ><a-icon type="appstore" /> 更多操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-select
          default-value="jack"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="jack">
            会员ID
          </a-select-option>
          <a-select-option value="lucy">
            姓名
          </a-select-option>
          <a-select-option value="disabled">
            手机号码
          </a-select-option>
          <a-select-option value="Yiminghe">
            邮箱
          </a-select-option>
        </a-select>
        <div class="search">
          <a-input placeholder="搜索关键字" />
        </div>
        <a-button type="primary">
          查询
        </a-button>
        <a-button @click="isfilter = !isfilter">
          <a-icon :type="isfilter ? 'up' : 'down'" />
          <!-- <a-icon type="up" /> -->
          高级筛选
        </a-button>
        <a-button> <a-icon type="setting" /> 自定义列表 </a-button>
        <a-button>
          <a-icon type="import" />
          导入
        </a-button>
        <a-button>
          <a-icon type="export" />
          导出
        </a-button>
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
                <a-select-option value="jack">
                  不限
                </a-select-option>
                <a-select-option value="lucy">
                  正常
                </a-select-option>
                <a-select-option value="disabled">
                  未激活
                </a-select-option>
                <a-select-option value="Yiminghe">
                  已锁定
                </a-select-option>
                <a-select-option value="delete">
                  已删除
                </a-select-option>
              </a-select>
            </div>
            <div>
              <span class="filter-type">登陆次数</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack">
                  大于
                </a-select-option>
                <a-select-option value="lucy">
                  小于
                </a-select-option>
                <a-select-option value="disabled">
                  大于等于
                </a-select-option>
                <a-select-option value="Yiminghe">
                  小于等于
                </a-select-option>
                <a-select-option value="delete">
                  等于
                </a-select-option>
                <a-select-option value="delete">
                  不等于
                </a-select-option>
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
                <a-select-option value="jack">
                  大于
                </a-select-option>
                <a-select-option value="lucy">
                  小于
                </a-select-option>
                <a-select-option value="disabled">
                  大于等于
                </a-select-option>
                <a-select-option value="Yiminghe">
                  小于等于
                </a-select-option>
                <a-select-option value="delete">
                  等于
                </a-select-option>
                <a-select-option value="delete">
                  不等于
                </a-select-option>
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
                <a-select-option value="jack">
                  普通会员
                </a-select-option>
                <a-select-option value="lucy">
                  原CPS分销组
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div>
            <div class="registerDate">
              <span class="filter-type">注册日期 </span
              ><span class="date-picker"
                ><a-date-picker placeholder="起始日期"></a-date-picker
              ></span>
              <span class="left5"> 至 </span>
              <span class="date-picker left5"
                ><a-date-picker placeholder="结束日期"></a-date-picker
              ></span>
            </div>
            <div>
              <span class="filter-type">有无产品</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack">
                  不限
                </a-select-option>
                <a-select-option value="lucy">
                  有产品
                </a-select-option>
                <a-select-option value="lucy">
                  无产品
                </a-select-option>
              </a-select>
            </div>
            <div>
              <span class="filter-type">实名认证</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack">
                  不限
                </a-select-option>
                <a-select-option value="lucy">
                  未认证
                </a-select-option>
                <a-select-option value="lucy">
                  已认证
                </a-select-option>
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
                <a-select-option value="jack">
                  不限登陆时间
                </a-select-option>
                <a-select-option value="lucy">
                  1个月内登录
                </a-select-option>
                <a-select-option value="lucy">
                  1-3个月登录
                </a-select-option>
                <a-select-option value="lucy">
                  3-6个月登录
                </a-select-option>
                <a-select-option value="lucy">
                  6-12个月登录
                </a-select-option>
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
                <a-select-option value="jack">
                  不限
                </a-select-option>
                <a-select-option value="lucy">
                  服务器
                </a-select-option>
                <a-select-option value="lucy">
                  托管
                </a-select-option>
                <a-select-option value="lucy">
                  虚拟主机
                </a-select-option>
                <a-select-option value="lucy">
                  SLL证书
                </a-select-option>
                <a-select-option value="lucy">
                  域名
                </a-select-option>
              </a-select>
            </div>
            <div>
              <span class="filter-type">API状态</span>
              <a-select
                placeholder="请选择"
                style="width: 120px"
                @change="handleChange"
              >
                <a-select-option value="jack">
                  请选择
                </a-select-option>
                <a-select-option value="lucy">
                  已开通
                </a-select-option>
                <a-select-option value="lucy">
                  未开通
                </a-select-option>
                <a-select-option value="lucy">
                  已禁用
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
      <div class="member-contenttable">
        <a-table
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300, y: 300 }"
          tableLayout="auto"
        >
          <span slot="name" slot-scope="text">{{ text }}</span>
          <span slot="action" slot-scope="v" class="action">
            <a-button type="link" class="" @click="selectInfo(v.key)">
              查看
            </a-button>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">进入会员中心</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">网监查案导出</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">增减余额</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">API设置</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">修改</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
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
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        },
        {
          key: "4",
          name: "Disabled    User",
          age: 32,
          address: "Sidney No. 1 Lakezxz Park"
        }
      ],
      columns: [
        {
          title: "会员ID",
          dataIndex: "id",
          scopedSlots: { customRender: "id" },
          width: 80
        },
        {
          title: "姓名",
          dataIndex: "name",
          width: 80
        },
        {
          title: "手机",
          dataIndex: "phone",
          width: 80
        },
        {
          title: "服务器",
          dataIndex: "server",
          sorter: true,
          sortOrder: true,
          width: 100
        },
        {
          title: "托管",
          dataIndex: "hosting",
          sorter: true,
          sortOrder: true,
          width: 80
        },
        {
          title: "主机",
          dataIndex: "host",
          sorter: true,
          sortOrder: true,
          width: 80
        },
        {
          title: "SSL证书",
          dataIndex: "sslccit",
          sorter: true,
          sortOrder: true,
          width: 110
        },
        {
          title: "域名",
          dataIndex: "domain",
          sorter: true,
          sortOrder: true,
          width: 80
        },
        {
          title: "裸金属",
          dataIndex: "bareMetal",
          sorter: true,
          sortOrder: true,
          width: 100
        },
        {
          title: "帐号状态",
          dataIndex: "accStatus",
          sorter: true,
          sortOrder: true,
          width: 110
        },
        {
          title: "锁定状态",
          dataIndex: "lockStatus",
          width: 100
        },
        {
          title: "余额",
          dataIndex: "balance",
          sorter: true,
          sortOrder: true,
          width: 80
        },
        {
          title: "授信额度",
          dataIndex: "lineofcredit",
          sorter: true,
          sortOrder: true,
          width: 110
        },
        {
          title: "实名认证",
          dataIndex: "realName",
          width: 100
        },
        {
          title: "注册时间",
          dataIndex: "registrationDate",
          sorter: true,
          sortOrder: true,
          width: 110
        },
        {
          title: "最后登录事件",
          dataIndex: "login",
          sorter: true,
          sortOrder: true,
          width: 140
        },
        {
          title: "操作",
          Index: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" },
          width: 200
        }
      ]
    };
  },
  methods: {
    handleMenuClick(e) {
      console.log(e);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    selectInfo(key) {
      console.log(key);
      this.$router.push({
        path: "/member/manage/Info",
        query: {
          id: key
        }
      });
    },
    clickMore(key) {
      console.log(key);
      this.isMoreId = key;
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  }
};
</script>

<style lang="less" scoped>
.member-content {
  background-color: #fff;
  margin-left: 20px;
  .member-top {
    display: flex;
    width: 1230px;
    margin: 0 auto;
    padding: 24px 0;
    justify-content: space-between;
    .search {
      display: inline-block;
      width: 250px;
    }
  }
  .member-filterall {
    border: 1px solid #e0e0e0;
    width: 1220px;
    margin-left: 25px;
    background-color: #fafafa;

    .member-filter {
      display: flex;
      width: 1220px;
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
}
</style>
