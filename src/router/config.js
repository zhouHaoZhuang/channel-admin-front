import Router from "vue-router";
import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";
/**
 * meta属性说明
 * icon:图标
 * invisible:是否需要隐藏不显示在三级菜单，不显示在左侧菜单
 * back:三级菜单头部是否需要返回按钮
 * perm:权限字段
 */
// 基础路由
export const basicRoute = [
  {
    path: "/login",
    name: "登录页",
    component: () => import("@/pages/passport/login")
  },
  {
    path: "/register",
    name: "注册页",
    component: () => import("@/pages/passport/register")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/exception/404")
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/pages/exception/403")
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/pages/exception/500")
  }
];
// 路由配置
export const asyncRoute = [
  {
    path: "/",
    name: "默认",
    component: TabsView,
    children: [
      // 首页 一级菜单
      {
        path: "/dashboard",
        name: "首页",
        meta: {
          perm: "home"
        },
        component: PageView,
        children: [
          // 二级菜单
          {
            path: "index",
            name: "总览管理",
            meta: {
              icon: "home",
              perm: "home-index"
            },
            component: BlankView,
            children: [
              // 三级菜单
              {
                path: "home",
                name: "后台首页",
                meta: {
                  icon: "home",
                  perm: "home-index-index"
                },
                component: () => import("@/pages/home/index/index")
              },
              {
                path: "message",
                name: "消息提醒",
                meta: {
                  icon: "home",
                  perm: "home-index-message"
                },
                component: () => import("@/pages/home/index/message")
              },
              {
                path: "detail",
                name: "查看消息详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "home-index-message"
                },
                component: () => import("@/pages/home/index/detail")
              },
              {
                path: "addMessage",
                name: "添加消息",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "home-index-message"
                },
                component: () => import("@/pages/home/index/addMessage")
              }
            ]
          }
        ]
      },
      // 会员
      {
        path: "/member",
        name: "会员",
        meta: {
          perm: "member"
        },
        component: PageView,
        children: [
          {
            path: "manage",
            name: "会员管理",
            meta: {
              icon: "home",
              perm: "member-admin"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "会员列表",
                meta: {
                  icon: "home",
                  perm: "member-admin-user"
                },
                component: () => import("@/pages/member/manage/list/index.vue")
              },
              {
                path: "Info",
                name: "会员详情",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "member-admin-user"
                },
                component: () => import("@/pages/member/manage/info/index.vue")
              },
              {
                path: "add",
                name: "添加会员",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "member-admin-user"
                },
                component: () =>
                  import("@/pages/member/manage/addManage/index.vue")
              },
              {
                path: "discount",
                name: "会员折扣",
                meta: {
                  icon: "home",
                  perm: "member-admin-discount"
                },
                component: () =>
                  import("@/pages/member/manage/discount/index.vue")
              },
              {
                path: "update",
                name: "新增会员折扣",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "member-admin-discount"
                },
                component: () =>
                  import("@/pages/member/manage/discount/update.vue")
              }
            ]
          }
        ]
      },
      // 财务
      {
        path: "/finance",
        name: "财务",
        meta: {
          perm: "finance"
        },
        component: PageView,
        children: [
          {
            path: "index",
            name: "收支账簿",
            meta: {
              icon: "home",
              perm: "finance-book"
            },
            component: BlankView,
            children: [
              {
                path: "order",
                name: "订单管理",
                meta: {
                  icon: "home",
                  perm: "finance-book-order"
                },
                component: () => import("@/pages/finance/income/order/index")
              },
              {
                path: "orderInfo",
                name: "订单详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-book-order"
                },
                component: () =>
                  import("@/pages/finance/income/order/orderInfo")
              },
              {
                path: "detailed",
                name: "财务明细",
                meta: {
                  icon: "home",
                  perm: "finance-book-detail"
                },
                component: () => import("@/pages/finance/details/index.vue")
              },
              {
                path: "detailedinfo",
                name: "财务明细详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-book-detail"
                },
                component: () => import("@/pages/finance/details/info.vue")
              },
              {
                path: "recharge",
                name: "充值记录",
                meta: {
                  icon: "home",
                  perm: "finance-book-recharge"
                },
                component: () => import("@/pages/finance/recharge/index.vue")
              },
              {
                path: "rechargeinfo",
                name: "充值记录详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-book-recharge"
                },
                component: () => import("@/pages/finance/recharge/info.vue")
              }
            ]
          },
          {
            path: "examine",
            name: "财务审核",
            meta: {
              icon: "home",
              perm: "finance-examine"
            },
            component: BlankView,
            children: [
              {
                path: "payment",
                name: "人工入款",
                meta: {
                  icon: "home",
                  perm: "finance-examine-offline"
                },
                component: () => import("@/pages/finance/payment/list")
              },
              {
                path: "details",
                name: "入款管理详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-examine-offline"
                },
                component: () => import("@/pages/finance/payment/details")
              },
              {
                path: "addpayment",
                name: "增减会员余额",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-examine-offline"
                },
                component: () => import("@/pages/finance/payment/addbalance")
              }
            ]
          }
        ]
      },
      //业务
      {
        path: "/business",
        name: "业务",
        meta: {
          perm: "business"
        },
        component: PageView,
        children: [
          {
            path: "cloudservers",
            name: "云服务器",
            meta: {
              icon: "home",
              perm: "business-cloud"
            },
            component: BlankView,
            children: [
              {
                path: "businesslist",
                name: "业务列表",
                meta: {
                  icon: "home",
                  perm: "business-cloud-biz"
                },
                component: () =>
                  import("@/pages/business/businesslist/list/index.vue")
              },
              {
                path: "businessOpening",
                name: "业务开通",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "business-cloud-biz"
                },
                component: () =>
                  import(
                    "@/pages/business/businesslist/businessOpening/index.vue"
                  )
              },
              {
                path: "info",
                name: "业务详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "business-cloud-biz"
                },
                component: () =>
                  import("@/pages/business/businesslist/info/index.vue")
              },
              {
                path: "feeReduction",
                name: "续费列表",
                meta: {
                  icon: "home",
                  perm: "business-cloud-renew"
                },
                component: () =>
                  import("@/pages/business/feeReduction/list/index.vue")
              },
              {
                path: "feeReduction-examine",
                name: "续费列表详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "business-cloud-renew"
                },
                component: () =>
                  import("@/pages/business/feeReduction/list/examine.vue")
              },
              {
                path: "snapshot",
                name: "快照列表",
                meta: {
                  icon: "home",
                  perm: "business-cloud-snapshot"
                },
                component: () =>
                  import("@/pages/business/snapshot/list/index.vue")
              },
              {
                path: "automation",
                name: "自动化列表",
                meta: {
                  icon: "home",
                  perm: "business-cloud-auto"
                },
                component: () =>
                  import("@/pages/business/automation/list/index.vue")
              },
              {
                path: "hostRecord",
                name: "宿主机异常记录",
                meta: {
                  icon: "home",
                  perm: "business-cloud-logs"
                },
                component: () =>
                  import("@/pages/business/hostRecord/list/index.vue")
              }
            ]
          }
        ]
      },
      // 生产
      {
        path: "/production",
        name: "生产",
        meta: {
          perm: "production"
        },
        component: PageView,
        children: [
          // {
          //   path: "supplier",
          //   name: "供应商管理",
          //   meta: {
          //     icon: "home"
          //   },
          //   component: BlankView,
          //   children: [
          //     {
          //       path: "supplierList",
          //       name: "供应商列表",
          //       meta: {
          //         icon: "home"
          //       },
          //       component: () =>
          //         import("@/pages/production/supplier/list/list.vue")
          //     },
          //     {
          //       path: "add",
          //       name: "新建供应商",
          //       meta: {
          //         invisible: true,
          //         back: true
          //       },
          //       component: () =>
          //         import("@/pages/production/supplier/list/price.vue")
          //     },
          //     {
          //       path: "amend",
          //       name: "编辑供应商",
          //       meta: {
          //         invisible: true,
          //         back: true
          //       },
          //       component: () =>
          //         import("@/pages/production/supplier/list/amend.vue")
          //     },
          //     {
          //       path: "purchase",
          //       name: "采购账号列表",
          //       meta: {
          //         icon: "home"
          //       },
          //       component: () =>
          //         import("@/pages/production/supplier/purchase/list.vue")
          //     },
          //     {
          //       path: "adda",
          //       name: "新建采购账号",
          //       meta: {
          //         invisible: true,
          //         back: true
          //       },
          //       component: () =>
          //         import("@/pages/production/supplier/purchase/price.vue")
          //     },
          //     {
          //       path: "amends",
          //       name: "编辑采购账号",
          //       meta: {
          //         invisible: true,
          //         back: true
          //       },
          //       component: () =>
          //         import("@/pages/production/supplier/purchase/amend.vue")
          //     }
          //   ]
          // },
          {
            path: "product",
            name: "产品管理",
            meta: {
              icon: "home",
              perm: "production-admin"
            },
            component: BlankView,
            children: [
              // {
              //   path: "information",
              //   name: "产品信息管理",
              //   meta: {
              //     icon: "home"
              //   },
              //   component: () =>
              //     import("@/pages/production/product/information/list.vue")
              // },
              // {
              //   path: "addproduct",
              //   name: "新建产品线",
              //   meta: {
              //     invisible: true,
              //     back: true
              //   },
              //   component: () =>
              //     import(
              //       "@/pages/production/product/information/addproduct.vue"
              //     )
              // },
              // {
              //   path: "editproduct",
              //   name: "编辑产品线",
              //   meta: {
              //     invisible: true,
              //     back: true
              //   },
              //   component: () =>
              //     import(
              //       "@/pages/production/product/information/editproduct.vue"
              //     )
              // },
              {
                path: "discount",
                name: "产品折扣管理",
                meta: {
                  icon: "home",
                  perm: "production-admin-discount"
                },
                component: () =>
                  import("@/pages/production/product/discount/index.vue")
              },
              {
                path: "updateDiscount",
                name: "产品折扣管理更新",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "production-admin-discount"
                },
                component: () =>
                  import("@/pages/production/product/discount/update.vue")
              }
            ]
          }
          // {
          //   path: "cloudServer",
          //   name: "云服务器",
          //   meta: {
          //     icon: "home"
          //   },
          //   component: BlankView,
          //   children: [
          //     {
          //       path: "orderRouting",
          //       name: "订单路由配置",
          //       meta: {
          //         icon: "home"
          //       },
          //       component: () =>
          //         import("@/pages/production/cloudServer/orderRouting/list.vue")
          //     },
          //     {
          //       path: "newOrder",
          //       name: "新建订单路由规则",
          //       meta: {
          //         invisible: true,
          //         back: true
          //       },
          //       component: () =>
          //         import(
          //           "@/pages/production/cloudServer/orderRouting/newOrder.vue"
          //         )
          //     },
          //     {
          //       path: "changeOrder",
          //       name: "编辑订单路由规则",
          //       meta: {
          //         invisible: true,
          //         back: true
          //       },
          //       component: () =>
          //         import(
          //           "@/pages/production/cloudServer/orderRouting/changeOrder.vue"
          //         )
          //     }
          //   ]
          // }
        ]
      },
      // 站务
      {
        path: "/personal",
        name: "站务",
        component: PageView,
        meta: {
          perm: "personal"
        },
        children: [
          {
            path: "account",
            name: "网站管理",
            meta: {
              icon: "home",
              perm: "personal-web"
            },
            component: BlankView,
            children: [
              {
                path: "banner",
                name: "banner管理",
                meta: {
                  icon: "home",
                  perm: "personal-web-banner"
                },
                component: () => import("@/pages/personal/banner/index.vue")
              },
              {
                path: "update",
                name: "Banner",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-banner"
                },
                component: () => import("@/pages/personal/banner/update.vue")
              },
              {
                path: "links",
                name: "友情链接",
                meta: {
                  icon: "home",
                  perm: "personal-web-link"
                },
                component: () => import("@/pages/personal/links/links.vue")
              },
              {
                path: "updateLink",
                name: "更新友情链接",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-link"
                },
                component: () => import("@/pages/personal/links/updateLink.vue")
              },
              {
                path: "updateCategory",
                name: "友情链接分类更新",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-link"
                },
                component: () =>
                  import("@/pages/personal/links/updateCategory.vue")
              },
              {
                path: "single",
                name: "单页管理",
                meta: {
                  icon: "home",
                  perm: "personal-web-page"
                },
                component: () => import("@/pages/personal/single/single.vue")
              },
              {
                path: "add-single",
                name: "单页添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-page"
                },
                component: () => import("@/pages/personal/single/addsingle.vue")
              },
              {
                path: "amend-single",
                name: "单页修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-page"
                },
                component: () =>
                  import("@/pages/personal/single/amendsingle.vue")
              },
              {
                path: "seo",
                name: "SEO优化",
                meta: {
                  icon: "home",
                  perm: "personal-web-seo"
                },
                component: () => import("@/pages/personal/seo/seo.vue")
              },
              {
                path: "amend-seo",
                name: "seo修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-seo"
                },
                component: () => import("@/pages/personal/seo/amendseo")
              }
            ]
          },
          {
            path: "helpword",
            name: "帮助文档",
            meta: {
              icon: "home",
              perm: "personal-help"
            },
            component: BlankView,
            children: [
              {
                path: "typemanage",
                name: "类别管理",
                meta: {
                  icon: "home",
                  perm: "personal-help-type"
                },
                component: () => import("@/pages/helpword/category/index.vue")
              },
              {
                path: "add-category",
                name: "帮助中心类别添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-type"
                },
                component: () => import("@/pages/helpword/category/addcategory")
              },
              {
                path: "edithelp",
                name: "帮助类别修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-type"
                },
                component: () => import("@/pages/helpword/category/edithelp")
              },
              {
                path: "wordmanage",
                name: "文档管理",
                meta: {
                  icon: "home",
                  perm: "personal-help-doc"
                },
                component: () => import("@/pages/helpword/word/index.vue")
              },
              {
                path: "add-word",
                name: "帮助文档添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-doc"
                },
                component: () => import("@/pages/helpword/word/addword")
              },
              {
                path: "amend-word",
                name: "帮助文档修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-doc"
                },
                component: () => import("@/pages/helpword/word/amendword")
              },
              {
                path: "hotproblem",
                name: "常见热点问题",
                meta: {
                  icon: "home",
                  perm: "personal-help-hot"
                },
                component: () => import("@/pages/helpword/common/index.vue")
              },
              {
                path: "amend-common",
                name: "常见热点问题修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-hot"
                },
                component: () => import("@/pages/helpword/common/amendcommon")
              }
            ]
          },
          {
            path: "news",
            name: "新闻公告",
            meta: {
              icon: "home",
              perm: "personal-news"
            },
            component: BlankView,
            children: [
              {
                path: "category",
                name: "新闻类别管理",
                meta: {
                  icon: "home",
                  perm: "personal-news-type"
                },
                component: () => import("@/pages/news/category/index.vue")
              },
              {
                path: "addcategory",
                name: "新闻类型添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-type"
                },
                component: () => import("@/pages/news/category/addNewsType.vue")
              },
              {
                path: "upcategory",
                name: "修改新闻类型",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-type"
                },
                component: () => import("@/pages/news/category/upNewsType")
              },
              {
                path: "newslist",
                name: "新闻列表",
                meta: {
                  icon: "home",
                  perm: "personal-news-news"
                },
                component: () => import("@/pages/news/list/index.vue")
              },
              {
                path: "addnewslist",
                name: "添加新闻列表",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-news"
                },
                component: () => import("@/pages/news/list/addNewsList.vue")
              },
              {
                path: "upnewslist",
                name: "修改新闻列表",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-news"
                },
                component: () => import("@/pages/news/list/upNewsList.vue")
              }
            ]
          }
        ]
      },
      // 系统
      {
        path: "/system",
        name: "系统",
        component: PageView,
        meta: {
          perm: "system"
        },
        children: [
          {
            path: "admin",
            name: "管理员",
            meta: {
              icon: "home",
              perm: "system-admin"
            },
            component: BlankView,
            children: [
              {
                path: "index",
                name: "权限管理",
                meta: {
                  icon: "home",
                  perm: "system-admin-perm"
                },
                component: () => import("@/pages/system/admin/index")
              },
              {
                path: "role",
                name: "角色管理",
                meta: {
                  icon: "home",
                  perm: "system-admin-role"
                },
                component: () => import("@/pages/system/admin/role")
              },
              {
                path: "detail",
                name: "角色详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "system-admin-role"
                },
                component: () => import("@/pages/system/admin/detail")
              },
              {
                path: "account",
                name: "子账号管理",
                meta: {
                  icon: "home",
                  perm: "system-admin-user"
                },
                component: () => import("@/pages/system/admin/account")
              }
            ]
          },
          {
            path: "basics",
            name: "基础设置",
            meta: {
              icon: "home",
              perm: "system-setting"
            },
            component: BlankView,
            children: [
              {
                path: "whole",
                name: "全局设置",
                meta: {
                  icon: "home",
                  perm: "system-setting-global"
                },
                component: () => import("@/pages/system/basics/whole")
              }
            ]
          }
        ]
      },
      // 个人信息
      {
        path: "/userinformation",
        name: "个人",
        component: PageView,
        meta: {
          perm: "userinfo"
        },
        children: [
          {
            path: "account",
            name: "账号管理",
            meta: {
              icon: "home",
              perm: "userinfo-admin"
            },
            component: BlankView,
            children: [
              {
                path: "userInfo",
                name: "个人信息",
                meta: {
                  perm: "userinfo-admin-info"
                },
                component: () => import("@/pages/accountRoot/userInfo")
              },
              {
                path: "changePassword",
                name: "修改密码",
                meta: {
                  perm: "userinfo-admin-password"
                },
                component: () => import("@/pages/accountRoot/changePassword")
              }
            ]
          }
        ]
      }
    ]
  }
];
const options = {
  routes: [...basicRoute, ...asyncRoute]
};

// 重置之前的路由
export function resetRouter(router) {
  const newRouter = new Router({
    routes: basicRoute
  });
  router.matcher = newRouter.matcher;
}

export default options;
