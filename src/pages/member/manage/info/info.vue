<template>
  <div class="member-content">
    <div class="member-base">
      <p>基础资料</p>
      <div class="base-info">
        <div>
          <span class="menber-title">ID：</span
          ><span class="menber-info">1100022</span>
        </div>
        <div>
          <span class="menber-title">姓名：</span
          ><span class="menber-info">用户1100022</span>
        </div>
        <div>
          <span class="menber-title">注册时间：</span
          ><span class="menber-info">2021-12-07 15：57：41</span>
        </div>
        <div>
          <span class="menber-title">手机号码：</span
          ><span class="menber-info">18712610494</span><span>【已认证】</span>
        </div>
        <div>
          <span class="menber-title">邮箱：</span
          ><span class="menber-info">18712610494@qq.com</span>
        </div>
        <div>
          <span class="menber-title">QQ：</span
          ><span class="menber-info">18712610494</span>
        </div>
        <div>
          <span class="menber-title">密码保护：</span
          ><span class="menber-info">未设置</span>
        </div>
        <div>
          <span class="menber-title">密码找回锁定：</span
          ><span class="menber-info">未锁定</span>
        </div>
        <div>
          <span class="menber-title">管理员锁定：</span
          ><span class="menber-info">未锁定</span>
        </div>
        <div>
          <span class="menber-title">登录锁定：</span
          ><span class="menber-info">未锁定</span>
        </div>
        <div><span class="menber-title">状态：</span><span>正常</span></div>
        <div>
          <span class="menber-title">密保锁定：</span
          ><span class="menber-info">未锁定</span>
        </div>
        <div>
          <span class="menber-title">账户余额：</span
          ><span class="menber-info">10.00元</span><a>[增减余额]</a>
        </div>
        <div>
          <span class="menber-title">现金券：</span
          ><span class="menber-info">0元</span><a>(共0张)</a
          ><a>(0条使用记录)</a>
        </div>
        <div>
          <span class="menber-title">积分：</span
          ><span class="menber-info">0分</span>
        </div>
        <div>
          <span class="menber-title">授信额度：</span
          ><span class="menber-info">0.00元</span><a>[修改授信额度]</a>
        </div>
        <div>
          <span class="menber-title">专席销售：</span
          ><span class="menber-info">未分配</span>
        </div>
        <div>
          <span class="menber-title">登录次数：</span
          ><span class="menber-info">0次</span>
        </div>
        <div>
          <span class="menber-title">所属会员组：</span
          ><span class="menber-info">普通会员</span><a>[修改会员组]</a>
        </div>
        <div>
          <span class="menber-title">API状态：</span
          ><span class="menber-info">未开通</span>
        </div>
        <div>
          <span class="menber-title">认证状态：</span
          ><span class="menber-info">未认证</span>
        </div>
        <div>
          <span class="menber-title">备注：</span
          ><span class="menber-info">xxxxx</span><a>[修改备注]</a>
        </div>
      </div>
    </div>
    <div class="greyblock"></div>
    <div class="menber-statistics">
      <p>会员各项统计</p>
      <div>
        <div>
          <span class="menber-title">充值金额：</span
          ><span class="menber-info">0元</span><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">消费：</span
          ><span class="menber-info">0元</span><span>0条记录</span
          ><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">提现：</span
          ><span class="menber-info">0元</span><span>0条记录</span
          ><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">已支付订单：</span
          ><span class="menber-info">0单</span><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">退款记录：</span
          ><span class="menber-info">0元</span><span>(0条记录)</span
          ><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">申请发票：</span
          ><span class="menber-info">0元</span><span>(0条记录)</span
          ><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">工单：</span
          ><span class="menber-info">0条</span><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">投诉：</span
          ><span class="menber-info">0条</span><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">站内消息：</span
          ><span class="menber-info">1条</span><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">官方留言：</span
          ><span class="menber-info">0条</span><a href="">[查看详情]</a>
        </div>
        <div>
          <span class="menber-title">帮助中心留言：</span
          ><span class="menber-info">0条</span><a href="">[查看详情]</a>
        </div>
      </div>
    </div>
    <div class="greyblock"></div>
    <div class="card-container">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="云服务器(0台)">
          <div>云服务器</div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="托管(0台)">
          <p>托管</p>
        </a-tab-pane>
        <a-tab-pane key="3" tab="虚拟主机(0台)">
          <p>虚拟主机</p>
        </a-tab-pane>
        <a-tab-pane key="4" tab="SSL证书(0台)">
          <p>SSL证书</p>
        </a-tab-pane>
        <a-tab-pane key="5" tab="域名(0台)">
          <p>域名</p>
        </a-tab-pane>
        <a-tab-pane key="6" tab="裸金属(0台)">
          <p>裸金属</p>
        </a-tab-pane>
        <a-tab-pane key="7" tab="CDN(0台)">
          <p>CDN</p>
        </a-tab-pane>
        <a-tab-pane key="8" tab="云数据库(0台)">
          <p>云数据库</p>
        </a-tab-pane>
        <a-tab-pane key="9" tab="对象存储(0台)">
          <p>对象存储</p>
        </a-tab-pane>
      </a-tabs>
      <a href="">查看更多>></a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.member-content {
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
      > div {
        width: 32%;
        > a {
          font-size: 12px;
          color: #0066ff;
        }
      }
    }
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
  .menber-info {
    font-size: 12px;
    color: #292929;
  }
  .menber-statistics {
    p {
      font-size: 14px;
      line-height: 48px;
      height: 48px;
      padding-left: 20px;
      color: #292929;
      border-bottom: 1px solid #ebebeb;
    }
  }
  .greyblock {
    height: 20px;
    background-color: #f0f2f5;
    // 240,242,245
  }
}
</style>
