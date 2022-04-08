import Vue from "vue";
import Router from "vue-router";
import { formatRoutes } from "@/utils/routerUtil";

Vue.use(Router);

// 不需要登录拦截的路由配置
const loginIgnore = {
  names: [], //根据路由名称匹配
  paths: ["/login", "/resetpassword", "/register","/bypassAccount", "/403", "/404", "/500",], //根据路由fullPath匹配
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path);
  }
};

/**
 * 初始化路由实例
 * @param isAsync 是否异步路由模式
 * @returns {VueRouter}
 */
function initRouter(isAsync) {
  const options = isAsync
    ? require("./async/config.async").default
    : require("./config").default;
  formatRoutes(options.routes);
  return new Router({
    mode: "history",
    base: "shop",
    ...options
  });
}
export { loginIgnore, initRouter };

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
