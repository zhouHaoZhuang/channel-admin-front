import { asyncRoute, resetRouter } from "@/router/config";
import clonedeep from "lodash.clonedeep";
// 循环处理路由菜单
function getNewRoute(route, perms) {
  let newData = route.filter(ele => hasPermissionMenu(ele, perms));
  newData.forEach(
    item => item.children && (item.children = getNewRoute(item.children, perms))
  );
  return newData;
}
// 判断用户是否拥有所有菜单的权限
function getUserHaveAllPerm(perms) {
  const index = perms.findIndex(ele => ele.code.replace(":*", "") === "*");
  return index;
}
// 处理动态路由菜单
export const setAsyncRouteMenu = (perms, router, store) => {
  // 根据权限生成新的菜单
  const newData = clonedeep(asyncRoute);
  let newRoute = [];
  // 先判断用户的是否拥有所有权限
  if (getUserHaveAllPerm(perms) !== -1) {
    newRoute = [...newData[0].children];
  } else {
    newRoute = getNewRoute(newData[0].children, perms);
  }
  // 保存默认跳转地址，path是 / 的话，需要重定向到第一个路由
  const firstPath = newRoute && newRoute.length > 0 ? newRoute[0].path : "/404";
  store.commit("setting/setFirstPath", firstPath);
  // console.log("生成的新的权限动态菜单", newRoute, firstPath, perms, newData);
  // 重置本地存储中菜单数据
  store.commit("setting/setMenuData", newRoute);
  const result = [{ ...newData[0], children: [...newRoute] }];
  // 重置之前的路由
  resetRouter(router);
  router.addRoutes(result);
};
// 判断处理路由是否可以成功跳转--也可得出是否有这个路由菜单
export const hasPermissionMenu = (to, perms) => {
  // return true
  // 判断本地路由的文件是否没有添加权限信息
  if (!to.meta.perm) {
    return false;
  }
  // 判断是否是所有菜单权限
  if (getUserHaveAllPerm(perms) !== -1) {
    return true;
  }
  const index = perms.findIndex(
    ele => ele.code.replace(":*", "") === to.meta.perm
  );
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
};
