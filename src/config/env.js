let VUE_APP_BASE_URL = "";
let appId = "619c93dc69a93fbb8a1faf8c";
let appHost = "https://resource-poor.authing.cn";

if (process.env.VUE_APP_ENV === "dev") {
  VUE_APP_BASE_URL = "http://ims.dev.ydidc.com";
  // VUE_APP_BASE_URL = "http://192.168.0.40:8083";
} else if (process.env.VUE_APP_ENV === "test") {
  VUE_APP_BASE_URL = "http://ims.dev.ydidc.com";
} else if (process.env.VUE_APP_ENV === "prod") {
  VUE_APP_BASE_URL = "http://ims.dev.ydidc.com";
}

const domains = {
  dev: "localhost"
  // test: 'http://test.com',
  // preprod: 'http://preprod.com',
  // prod: 'http://prod.com'
};

export default {
  VUE_APP_BASE_URL,
  appId,
  appHost,
  DOMAIN_URL: domains[process.env.VUE_APP_ENV]
};
