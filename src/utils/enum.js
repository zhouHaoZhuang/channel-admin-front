// 渠道价格折扣方式
export const channelPriceType = {
  '0': '固定价格',
  '1': '比例折扣',
};
// 企业列表企业认证状态
export const certificationStatusEnum = {
  0: '已认证',
  1: '未认证',
};
// 企业列表企业状态
export const corporationStatusEnum = {
  0: '正常',
  1: '冻结',
};

//续费降配列表状态
export const renewalStatusEnum = {
  1: '待降配',
  2: '已完成',
};
// 状态map数据
export const detailsMapData = {
  '0': '待支付',
  '1': '已取消',
  '2': '支付失败',
  '3': '支付完成',
};
// 充值状态map数据
export const detailTypeMapData = {
  '0': '待审核',
  '1': '待充值',
  '2': '支付失败',
  '9': '支付完成',
},

// 地域map数据
export const regionMapData = {
  "cn-hangzhou": "杭州",
  "cn-dalian": "大连",
  "cn-beijing": "北京",
  "cn-shanghai": "上海"
};

// 款项类型map数据
export const paymentTypeMapData = {
  '1': '在线充值',
  '2': '线下充值',
  '3': '下单',
  '4': '退款',
};
// 会员折扣方式
export const memberDiscountType = {
  '0': '固定价格',
  '1': '比例折扣',
};
export const OrderTypeMap = {
  '1': '资源池新购',
  '5': '阿里云采购',
  '15': '资源池续费',
  '16': '阿里云续费',
  '25': '资源池升配',
  '26': '阿里云升配',
};
// 权限管理-权限单选map
export const systemAdminMapEnum = {
  DATA: '数据',
  // API: "API",
  MENU: '菜单',
  BUTTON: '按钮',
};
// 充值方式map
export const rechargeTypeMap = {
  '1': '余额支付',
  ali: '支付宝',
};
// 订单状态
export const orderStatusEnum = {
  "-3": "服务器创建异常",
  "-1": "交易关闭",
  1: "待支付",
  3: "支付中",
  5: "交易完成",
  9: "支付完成"
};

// 权限管理-权限单选map
export const systemAdminMapEnum = {
  // DATA: "数据",
  // API: "API",
  MENU: "菜单"
  // BUTTON: "按钮"
};
// 轮播图类型map
export const bannerTypeEnum = {
  "0": "首页banner",
  "1": "云服务器banner",
  "2": "帮助中心banner",
  "3": "新闻公告banner",
  "4": "关于我们banner",
  "5": "登录banner"
};
