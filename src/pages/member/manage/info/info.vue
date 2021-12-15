<template>
  <div class="member-container"
       v-if="dataBase">
    <div class="member-base">
      <p>基础资料</p>
      <div class="base-info">
        <div>
          <span class="menber-title">ID：</span><span class="menber-info">{{dataBase.id}}</span>
        </div>
        <div>
          <span class="menber-title">姓名：</span><span class="menber-info">{{dataBase.corporationName}}</span>
        </div>
        <div>
          <span class="menber-title">注册时间：</span><span class="menber-info">{{dataBase.createTime | formatDate}}</span>
        </div>
        <div>
          <span class="menber-title">手机号码：</span><span class="menber-info">{{dataBase.phoneNumber}}</span><span class="verified">【已认证】</span>
        </div>
        <div>
          <span class="menber-title">邮箱：</span><span class="menber-info">{{dataBase.email}}</span>
        </div>
        <div>
          <span class="menber-title">QQ：</span><span class="menber-info">{{dataBase.qq}}</span>
        </div>
        <div>
          <span class="menber-title">密码保护：</span><span class="menber-info">-----未设置</span>
        </div>
        <div>
          <span class="menber-title">密码找回锁定：</span><span class="menber-info">----未锁定</span>
        </div>
        <div>
          <span class="menber-title">管理员锁定：</span><span class="menber-info">{{dataBase.adminLock==0?'正常':'锁定'}}</span>
        </div>
        <div>
          <span class="menber-title">登录锁定：</span><span class="menber-info">{{dataBase.loginLock==0?'正常':'锁定'}}</span>
        </div>
        <div>
          <span class="menber-title">状态：</span><span :class="{'menber-state-normal':dataBase.status == 0,'menber-state-freeze':dataBase.status == 1}">{{dataBase.status == 0 ? "冻结" : "正常"}}</span>
        </div>
        <div>
          <span class="menber-title">密保锁定：</span><span class="menber-info">---未锁定</span>
        </div>
        <div>
          <span class="menber-title">账户余额：</span><span class="menber-info">{{dataBase.balance}}元</span><a class="mouse-enter"
             href="">[增减余额]</a>
        </div>
        <div>
          <span class="menber-title">现金券：</span><span class="menber-info">{{dataBase.cash}}元</span><a class="mouse-enter">(共0张)</a><a class="mouse-enter">(0条使用记录)</a>
        </div>
        <div>
          <span class="menber-title">积分：</span><span class="menber-info">{{dataBase.integral}}分</span>
        </div>
        <div>
          <span class="menber-title">授信额度：</span><span class="menber-info">{{dataBase.creditNumber}}</span><a class="mouse-enter">[修改授信额度]</a>
        </div>
        <div>
          <span class="menber-title">专席销售：</span><span class="menber-info">----未分配</span>
        </div>
        <div>
          <span class="menber-title">登录次数：</span><span class="menber-info">{{dataBase.loginFaileNumber}}次</span>
        </div>
        <div>
          <span class="menber-title">所属会员组：</span><span class="menber-info">---普通会员</span><a class="mouse-enter">[修改会员组]</a>
        </div>
        <div>
          <span class="menber-title">API状态：</span><span class="menber-info menber-apistate-nonactivated">{{dataBase.apiStatus==0?'未开通':'正常'}}</span>
        </div>
        <div>
          <span class="menber-title">认证状态：</span><span class="menber-info menber-certstate-uncert">{{dataBase.certificationStatus==0?'未认证':'已认证'}}</span>
        </div>
        <div>
          <span class="menber-title">备注：</span><span class="menber-info">{{dataBase.remark}}</span><a class="mouse-enter">[修改备注]</a>
        </div>
      </div>
    </div>
    <div class="greyblock"></div>
    <div class="menber-statistics">
      <p>会员各项统计</p>
      <div>
        <div>
          <span class="menber-title">充值金额：</span><span class="menber-info">0元</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">消费：</span><span class="menber-info">0元</span><span>0条记录</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">提现：</span><span class="menber-info">0元</span><span>0条记录</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">已支付订单：</span><span class="menber-info">0单</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">退款记录：</span><span class="menber-info">0元</span><span>(0条记录)</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">申请发票：</span><span class="menber-info">0元</span><span>(0条记录)</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">工单：</span><span class="menber-info">0条</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">投诉：</span><span class="menber-info">0条</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">站内消息：</span><span class="menber-info">1条</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">官方留言：</span><span class="menber-info">0条</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">帮助中心留言：</span><span class="menber-info">0条</span><a href=""
             class="mouse-enter">[查看详情]</a>
        </div>
      </div>
    </div>
    <div class="greyblock"></div>
    <div class="card-container">
      <a-tabs type="card">
        <a-tab-pane key="1"
                    tab="云服务器(0台)">
          <a-table :columns="columnsCloudService"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2"
                    tab="托管(0台)">
          <a-table :columns="columnsHosting"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="3"
                    tab="虚拟主机(0台)">
          <a-table :columns="columnsVirtual"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="4"
                    tab="SSL证书(0台)">
          <a-table :columns="columnsSSL"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="5"
                    tab="域名(0台)">
          <a-table :columns="columnsDomainName"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="6"
                    tab="裸金属(0台)">
          <a-table :columns="columnsBareMetal"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="7"
                    tab="CDN(0台)">
          <a-table :columns="columnsCDN"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="8"
                    tab="云数据库(0台)">
          <a-table :columns="columnsCloudDatabase"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="9"
                    tab="对象存储(0台)">
          <a-table :columns="columnsStorage"
                   :data-source="data">
            <a slot="name"
               slot-scope="text">{{ text }}</a>
          </a-table>
        </a-tab-pane>
      </a-tabs>
      <div class="Check">
        <a href=""
           class="mouse-enter">查看更多>></a>
      </div>
    </div>
    <div class="greyblock"></div>
    <div>
      <p class="menber-p">会员日志</p>
      <div>
        <a-table :columns="columnsMemberLog"
                 :data-source="data">
          <a slot="name"
             slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
      <div class="Check">
        <a href=""
           class="mouse-enter">查看更多>></a>
      </div>
    </div>
    <div class="greyblock"></div>
    <div>
      <p class="menber-p">登录日志</p>
      <div>
        <a-table :columns="columnsLoginLog"
                 :data-source="data">
          <a slot="name"
             slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
      <div class="Check">
        <a href=""
           class="mouse-enter">查看更多>></a>
      </div>
    </div>
    <div class="greyblock"></div>
    <div>
      <p class="menber-p">资料变更记录</p>
      <div>
        <a-table :columns="columnsChangeLog"
                 :data-source="data">
          <a slot="name"
             slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
      <div class="Check">
        <a href=""
           class="mouse-enter">查看更多>></a>
      </div>
    </div>
    <div class="greyblock40"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columnsCloudService: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "业务IP",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address",
          key: "address 1"
        }
      ],
      columnsHosting: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "业务IP",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address",
          key: "address 1"
        }
      ],
      columnsVirtual: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "业务IP",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address",
          key: "address 1"
        }
      ],
      columnsSSL: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "证书名称",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      columnsDomainName: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "域名",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      columnsBareMetal: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "机型",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      columnsCDN: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "域名",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      columnsCloudDatabase: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "实例名称",
          dataIndex: "age"
        },
        {
          title: "GUID",
          dataIndex: "GUID"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      columnsStorage: [
        {
          title: "业务ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "空间名称",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      columnsMemberLog: [
        {
          title: "时间",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "操作",
          dataIndex: "age"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      columnsLoginLog: [
        {
          title: "时间",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "登录ip",
          dataIndex: "ip"
        },
        {
          title: "登录地",
          dataIndex: "address"
        }
      ],
      columnsChangeLog: [
        {
          title: "操作人信息",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "对应的操作日志ID",
          dataIndex: "age"
        },
        {
          title: "简要描述",
          dataIndex: "info"
        },
        {
          title: "创建时间",
          dataIndex: "createTime"
        },
        {
          title: "创建IP",
          dataIndex: "ip"
        },
        {
          title: "详情",
          dataIndex: "address"
        }
      ],
      dataBase: null,
      data: []
    };
  },
  created () {
    let id = this.$route.query.id;
    // console.log(id,'子组件的id');
    this.getData(id);
  },
  methods: {
    getData (id) {
      this.$store.dispatch("member/getOne", id).then(res => {
        this.dataBase = res.data;
        console.log(res.data, '子组件的data');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.member-container {
  .member-base {
    padding-bottom: 10px;
    p {
      font-size: 14px;
      line-height: 48px;
      height: 48px;
      padding-left: 20px;
      color: #292929;
      border-bottom: 1px solid #ebebeb;
    }
    .base-info {
      display: flex;
      flex-wrap: wrap;
      margin-left: 20px;
      .verified {
        color: #008000;
        font-size: 12px;
      }

      > div {
        width: 32%;
        > a {
          font-size: 12px;
          color: #0066ff;
        }
        .mouse-enter:hover {
          color: #ff6464;
        }
      }
    }
  }
  .menber-info {
    font-size: 12px;
    color: #292929;
  }
  .menber-state-freeze {
    background-color: #16b841;
    color: #fff;
    padding: 0 4px;
    font-size: 12px;
    border-radius: 2px;
  }
  .menber-state-normal {
    background-color: #ccc;
    color: #fff;
    padding: 0 4px;
    font-size: 12px;
    border-radius: 2px;
  }
  .menber-apistate-nonactivated {
    background-color: #f20;
    color: #fff;
    padding: 0 4px;
    font-size: 12px;
    border-radius: 2px;
  }
  .menber-title {
    display: inline-block;
    width: 100px;
    font-size: 12px;
    line-height: 24px;
    text-align: left;
    color: #a3a3a3;
    font-weight: normal;
    padding: 4px 0;
  }
  .menber-certstate-uncert {
    background-color: #ccc;
    color: #fff;
    padding: 0 4px;
    font-size: 12px;
    border-radius: 2px;
  }
  .menber-statistics {
    padding-bottom: 10px;
    p {
      font-size: 14px;
      line-height: 48px;
      height: 48px;
      padding-left: 20px;
      color: #292929;
      border-bottom: 1px solid #ebebeb;
    }
    > div {
      display: flex;
      flex-wrap: wrap;
      margin-left: 20px;
      > div {
        width: 32%;
        > a {
          font-size: 12px;
          color: #0066ff;
        }
      }
    }
  }
  .greyblock {
    height: 20px;
    background-color: #f0f2f5;
  }
  .greyblock40 {
    height: 40px;
    background-color: #f0f2f5;
  }
  .menber-p {
    font-size: 14px;
    line-height: 48px;
    height: 48px;
    padding-left: 20px;
    color: #292929;
    border-bottom: 1px solid #ebebeb;
  }
  .Check {
    text-align: right;
    height: 50px;
    line-height: 50px;
    a {
      color: #0066ff;
      font-size: 12px;
    }
  }
  .mouse-enter:hover {
    color: #ff6464;
  }
}
</style>
