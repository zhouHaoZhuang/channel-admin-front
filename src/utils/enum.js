// 渠道价格折扣方式
export const channelPriceType = {
  "0": "固定价格",
  "1": "比例折扣"
};
// 企业列表企业认证状态
export const certificationStatusEnum = {
  0: "已认证",
  1: "未认证"
};
// 企业列表企业状态
export const corporationStatusEnum = {
  0: "正常",
  1: "冻结"
};
// 发票开票记录状态
export const invoiceStatusEnum = {
  1: "开票中（已提交）",
  2: "已取消",
  3: "审核中",
  4: "已驳回",
  5: "已开票（已通过）",
  6: "退票中（退票申请中）",
  7: "退票申请取消",
  8: "退票申请已拒绝",
  9: "已退票（退票申请确认）"
};
//续费降配列表状态
export const renewalStatusEnum = {
  1: "待降配",
  2: "已完成"
};
// 状态map数据支付状态
export const detailsMapData = {
  "0": "待支付",
  "1": "已取消",
  "2": "支付失败",
  "9": "支付完成"
};
// 充值状态map数据
export const detailTypeMapData = {
  "0": "待审核",
  "1": "待充值",
  "2": "未通过审核",
  "9": "通过审核"
};
// 款项类型map数据
export const paymentTypeMap = {
  1: "在线充值",
  2: "线下充值",
  3: "下单",
  4: "退款",
  7: "用户提现扣除"
};
// 地域列表map
export const regionDataEnum = {
  "cn-qingdao": "华北1（青岛）",
  "cn-beijing": "华北2（北京）",
  "cn-zhangjiakou": "华北3（张家口）",
  "cn-huhehaote": "华北5（呼和浩特）",
  "cn-wulanchabu": "华北6（乌兰察布）",
  "cn-hangzhou": "华东1（杭州）",
  "cn-shanghai": "华东2（上海）",
  "cn-shenzhen": "华南1（深圳）",
  "cn-heyuan": "华南2（河源）",
  "cn-guangzhou": "华南3（广州）",
  "cn-chengdu": "西南1（成都）",
  "cn-hongkong": "中国（香港）",
  "ap-northeast-1": "日本（东京）",
  "ap-northeast-2": "韩国（首尔）",
  "ap-southeast-1": "新加坡",
  "ap-southeast-2": "澳大利亚（悉尼）",
  "ap-southeast-3": "马来西亚（吉隆坡）",
  "ap-southeast-6": "菲律宾（马尼拉）",
  "ap-southeast-5": "印度尼西亚（雅加达）",
  "ap-south-1": "印度（孟买）",
  "ap-southeast-7": "泰国（曼谷）",
  "us-east-1": "美国（弗吉尼亚）",
  "us-west-1": "美国（硅谷）",
  "eu-west-1": "英国（伦敦）",
  "me-east-1": "阿联酋（迪拜）",
  "eu-central-1": "德国（法兰克福）"
};
// 款项类型map数据
export const paymentTypeMapData = {
  "1": "在线充值",
  "2": "线下充值",
  "3": "下单",
  "4": "退款"
};
// 会员折扣方式
export const memberDiscountType = {
  "0": "固定价格",
  "1": "比例折扣"
};
export const orderTypeMap = {
  1: "云服务新购",
  15: "云服务续费",
  25: "云服务升配",
  35: "云服务降配",
  45: "交易关闭",
  55: "服务器退订",
  65: "cdn流量"
};

// 充值方式map
export const rechargeTypeMap = {
  1: "在线充值",
  2: "线下充值",
  3: "下单",
  4: "退款",
  5: "冻结",
  6: "资金解冻",
  7: "扣除冻结"
};
// 订单状态
export const orderStatusEnum = {
  "-3": "交易异常",
  "-1": "交易关闭",
  1: "待支付",
  3: "订单支付中",
  5: "交易完成",
  "-5": "退款失败",
  0: "支付失败"
};
// 轮播图类型map
export const bannerTypeEnum = {
  "0": "首页banner",
  // "1": "云服务器banner",
  // "2": "帮助中心banner",
  // "3": "新闻公告banner",
  "4": "关于我们banner"
  // "5": "登录banner"
};
// PC链接
export const bannerLinkEnum = {
  "/": "首页",
  "/cloud-choose": "产品",
  "/assurance": "服务保障",
  "/help/helpInfo": "帮助中心",
  "/programme/finance": "金融解决方案",
  "/programme/online": "电商解决方案",
  "/programme/move": "游戏解决方案",
  "/programme/game": "移动解决方案",
  "/programme/website": "网站解决方案",
  "/about/index?tab=0": "关于我们/公司简介",
  "/about/index?tab=1": "关于我们/新闻公告",
  "/about/index?tab=2": "关于我们/法律声明",
  "/about/index?tab=3": "关于我们/友情链接"
};
// 云服务器-状态
export const runningStatusEnum = {
  0: "创建中",
  1: "运行中",
  2: "已停止",
  3: "已过期",
  4: "停止中",
  5: "启动中"
};
// 订单来源/用途
export const tradeTypeEnum = {
  1: "云服务新购",
  15: "云服务续费",
  25: "云服务升配",
  35: "云服务降配",
  45: "交易关闭",
  55: "服务器退订"
};
// cdn状态
export const cdnStatusEnum = {
  0: "需要校验域名，",
  1: "启用",
  2: "停用",
  3: "配置中",
  4: "配置失败",
  5: "正在审核",
  6: "审核失败"
};
// https状态
export const cdnHttpsStatusEnum = {
  0: "未配置",
  1: "未启用",
  2: "已启用"
};
// 工单状态
export const workOrderStatusEnum = {
  1: "待接单",
  2: "接单处理中",
  3: "处理完成"
};
// 工单类别-所属分组map
export const workOrderGroupEnum = {
  1: "技术类问题",
  2: "账户和财务类",
  3: "其他咨询类"
};
// 工单类别-问题类型map
export const workOrderTypeEnum = {
  1: "普通类型工单",
  2: "可转接资源池类型工单"
};
// 角色类型map
export const roleTypeEnum = {
  0: "系统角色",
  1: "自建角色"
};
//提现申请状态
export const applyStatus = {
  0: "草稿",
  1: "已完成",
  2: "已提交",
  3: "已驳回",
  4: "已取消",
  5: "待处理"
};
export const applyManStatus = {
  1: "已完成",
  2: "已提交",
  3: "已驳回",
  4: "已取消",
  5: "待处理"
};
// 订单状态
export const orderStatus = {
  "-1": "交易关闭",
  "1": "订单待支付",
  "5": "交易完成",
  "-3": "服务器创建异常",
  0: "支付失败"
};
// 降费续配
export const feeReduction = {
  1: "ecs新购",
  15: "ecs实例续费",
  25: "升配",
  35: "esc实例降低配置",
  45: "交易关闭",
  55: "退订",
  65: "后付费订单"
};
//cdn状态
export const cdnStatus = {
  0: "校验域名",
  1: "正常运行",
  2: "停用",
  3: "配置中",
  4: "配置失败",
  5: "正在审核",
  6: "审核失败",
  "-1": "已下线",
  "-2": "已下线"
};
// 计费方式、
export const charingStatus = {
  AfterPay: "后付费",
  BeforePay: "预付费"
};
