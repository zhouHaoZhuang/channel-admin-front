import { basicRoute, asyncRoute, resetRouter } from "@/router/config";
// 递归处理路由菜单
function getNewRoute(route, perms) {
  console.log("动态路由基础数据", asyncRoute);
  const newData = [];
  route.children.forEach(item => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      const childrenRoutes = getNewRoute(item, perms);
      newData.push(childrenRoutes);
      //   let flag = hasPermissionMenu(item, perms);
      //   if (flag) {
      //     newData.push({
      //         ...item,

      //     });
      //   }
    } else {
      let flag = hasPermissionMenu(item, perms);
      if (flag) {
        newData.push(item);
      }
    }
  });
}
// 处理动态路由菜单
export const setAsyncRouteMenu = (perms, router) => {
  // 根据权限生成新的菜单
  const newRoute = getNewRoute(asyncRoute[0], perms);
  console.log("sasasaa", newRoute);
  // 重置之前的路由
  // resetRouter(router);
  // router.addRoutes();
};
// 判断处理路由是否可以成功跳转--也可得出是否有这个路由菜单
export const hasPermissionMenu = (to, perms, router) => {
  if (!to.meta.perm) {
    return false;
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
