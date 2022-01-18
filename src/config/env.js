let appId = "619c93dc69a93fbb8a1faf8c";
let appHost = "https://resource-poor.authing.cn";

// 默认请求地址
const baseUrl = {
  // dev: "http://216d7872i4.qicp.vip",
  // dev: "http://192.168.0.10:8082",
  dev: "http://ims.dev.ydidc.com",
  test: "http://ims.test.ydidc.com",
  prod: "http://ims.prod.ydidc.com"
};
// 支付相关请求地址
const payBaseUrl = {
  dev: "http://pay.dev.ydidc.com",
  test: "http://pay.test.ydidc.com",
  prod: "http://pay.prod.ydidc.com"
};
// 资源池请求地址
const jadepoolUrl = {
  dev: "http://rps.dev.ydidc.com",
  test: "http://rps.test.ydidc.com",
  prod: "http://rps.prod.ydidc.com"
};

const domains = {
  dev: "localhost"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  PAY_BASE_URL: payBaseUrl[process.env.VUE_APP_ENV],
  JADE_POOL_URL: jadepoolUrl[process.env.VUE_APP_ENV],
  appId,
  appHost,
  DOMAIN_URL: domains[process.env.VUE_APP_ENV]
};
