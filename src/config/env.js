let appId = "619c93dc69a93fbb8a1faf8c";
let appHost = "https://resource-poor.authing.cn";

// 默认请求地址
const baseUrl = {
  dev: "http://ims.dev.ydidc.com",
  test: "http://ims.dev.ydidc.com",
  preprod: "http://ims.dev.ydidc.com",
  prod: "http://ims.dev.ydidc.com"
};
// 支付相关请求地址
const payBaseUrl = {
  dev: "http://pay.dev.ydidc.com",
  test: "http://pay.dev.ydidc.com",
  preprod: "http://pay.dev.ydidc.com",
  prod: "http://pay.dev.ydidc.com"
};

const domains = {
  dev: "localhost"
  // test: 'http://test.com',
  // preprod: 'http://preprod.com',
  // prod: 'http://prod.com'
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  PAY_BASE_URL: payBaseUrl[process.env.VUE_APP_ENV],
  appId,
  appHost,
  DOMAIN_URL: domains[process.env.VUE_APP_ENV]
};
