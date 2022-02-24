// 默认请求地址
const baseUrl = {
  // dev: "http://192.168.12.56:8082",
  dev: "http://i.ydidc.com/server",
  test: "http://i.zjyundun.com/server",
  prod: "http://i.zjyundun.com/server"
};
// 资源池请求地址
const jadepoolUrl = {
  dev: "http://ntm.ydidc.com/server",
  test: "http://ntm.zjyundun.com/server",
  prod: "http://ntm.zjyundun.com/server"
};
// form服务接口请求地址
const formBaseUrl = {
  dev: "http://site.ydidc.com/server/form",
  test: "http://www.zjyundun.com/server/form",
  prod: "http://www.zjyundun.com/server/form"
};
const domains = {
  dev: "localhost"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  JADE_POOL_URL: jadepoolUrl[process.env.VUE_APP_ENV],
  FORM_BASE_URL: formBaseUrl[process.env.VUE_APP_ENV],
  DOMAIN_URL: domains[process.env.VUE_APP_ENV]
};
