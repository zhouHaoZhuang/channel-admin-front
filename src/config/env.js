// 默认请求地址--应为i.sailayun
const baseUrl = {
  // local: "http://site.sailayun.com/ims",
  local:'/ims',
  dev: "/ims",
  test: "/ims",
  prod: "/ims"
};
// form服务接口请求地址
const formBaseUrl = {
  local: "http://site.sailayun.com/fs",
  dev: "/fs",
  test: "/fs",
  prod: "/fs"
};
const domains = {
  local: "t410796.site.sailayun.com"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  FORM_BASE_URL: formBaseUrl[process.env.VUE_APP_ENV],
  DOMAIN_URL: domains[process.env.VUE_APP_ENV]
};
