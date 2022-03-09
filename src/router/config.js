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
    path: "/resetpassword",
    name: "重置密码页",
    component: () => import("@/pages/passport/resetpassword")
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
    meta: {
      perm: "home"
    },
    component: TabsView,
    children: [
      // 总览 一级菜单
      {
        path: "/dashboard",
        name: "总览",
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
                name: "总览首页",
                meta: {
                  icon: "home",
                  perm: "home-index-index"
                },
                component: () => import("@/pages/home/index/index")
              }
            ]
          }
        ]
      },
      // 销售
      {
        path: "/sale",
        name: "销售",
        meta: {
          perm: "member"
        },
        component: PageView,
        children: [
          {
            path: "customer",
            name: "客户管理",
            meta: {
              icon: "home",
              perm: "member-admin"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "客户列表",
                meta: {
                  icon: "home",
                  perm: "member-admin-user"
                },
                component: () => import("@/pages/sale/customer/list/index.vue")
              },
              {
                path: "detail",
                name: "客户详情",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "member-admin-user"
                },
                component: () => import("@/pages/sale/customer/info/index.vue")
              },
              {
                path: "add",
                name: "添加客户",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "member-admin-user"
                },
                component: () =>
                  import("@/pages/sale/customer/addManage/index.vue")
              },
              {
                path: "discount",
                name: "客户折扣",
                meta: {
                  icon: "home",
                  perm: "member-admin-discount"
                },
                component: () =>
                  import("@/pages/sale/customer/discount/index.vue")
              },
              {
                path: "update",
                name: "新增客户折扣",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "member-admin-discount"
                },
                component: () =>
                  import("@/pages/sale/customer/discount/update.vue")
              },
              {
                path: "productDiscount",
                name: "产品折扣",
                meta: {
                  icon: "home",
                  perm: "production-admin-discount"
                },
                component: () =>
                  import("@/pages/sale/customer/productDiscount/index.vue")
              },
              {
                path: "updateDiscount",
                name: "产品折扣更新",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "production-admin-discount"
                },
                component: () =>
                  import("@/pages/sale/customer/productDiscount/update.vue")
              }
            ]
          },
          {
            path: "order",
            name: "订单管理",
            meta: {
              icon: "home",
              perm: "finance-book"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "订单列表",
                meta: {
                  icon: "home",
                  perm: "finance-book-order"
                },
                component: () => import("@/pages/sale/order/index")
              },
              {
                path: "detail",
                name: "订单详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-book-order"
                },
                component: () => import("@/pages/sale/order/detail")
              }
            ]
          },
          { 
            path: "finance",
            name: "财务管理",
            meta: {
              icon: "home",
              perm: "finance-book"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "收支明细",
                meta: {
                  icon: "home",
                  perm: "finance-book-detail"
                },
                component: () => import("@/pages/sale/finance/list.vue")
              },
              {
                path: "detail",
                name: "收支明细详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-book-detail"
                },
                component: () => import("@/pages/sale/finance/detail.vue")
              },
              {
                path: "recharge",
                name: "充值记录",
                meta: {
                  icon: "home",
                  perm: "finance-book-recharge"
                },
                component: () =>
                  import("@/pages/sale/finance/recharge/index.vue")
              },
              {
                path: "rechargeDetail",
                name: "充值记录详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-book-recharge"
                },
                component: () =>
                  import("@/pages/sale/finance/recharge/detail.vue")
              },
              {
                path: "payment",
                name: "线下充值管理",
                meta: {
                  icon: "home",
                  perm: "finance-examine-offline"
                },
                component: () => import("@/pages/sale/finance/payment/list")
              },
              {
                path: "paymentDetail",
                name: "线下充值详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-examine-offline"
                },
                component: () => import("@/pages/sale/finance/payment/detail")
              },
              {
                path: "addPayment",
                name: "增减会员余额",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "finance-examine-offline"
                },
                component: () =>
                  import("@/pages/sale/finance/payment/addbalance")
              },
              {
                path: "refund",
                name: "退款列表",
                meta: {
                  icon: "home",
                  perm: "finance-book-order"
                },
                component: () => import("@/pages/sale/finance/refund/index.vue")
              },
              // {
              //   path: "withdraw",
              //   name: "提现管理",
              //   meta: {
              //     icon: "home",
              //     perm: "finance-book-order"
              //   },
              //   component: () => import("@/pages/sale/finance/withdraw/index.vue")
              // }
            ]
          }
        ]
      },
      //采购
      // {
      //   path: "/purchase",
      //   name: "采购",
      //   meta: {
      //     perm: "member"
      //   },
      //   component: PageView,
      //   children: [
      //     {
      //       path: "manage",
      //       name: "财务管理",
      //       meta: {
      //         icon: "home",
      //         perm: "member-admin"
      //       },
      //       component: BlankView,
      //       children: [
      //         {
      //           path: "withdraw",
      //           name: "提现管理",
      //           meta: {
      //             icon: "home",
      //             perm: "member-admin-user"
      //           },
      //           component: () => import("@/pages/purchase/manage/withdraw/index.vue")
      //         },
      //       ]
      //     },
      //   ]

      // },
      // 产品
      {
        path: "/product",
        name: "产品",
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
                path: "businessList",
                name: "业务列表",
                meta: {
                  icon: "home",
                  perm: "business-cloud-biz"
                },
                component: () =>
                  import("@/pages/product/businesslist/list/index.vue")
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
                    "@/pages/product/businesslist/businessOpening/index.vue"
                  )
              },
              {
                path: "unsubscribe",
                name: "业务退订",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "business-cloud-biz"
                },
                component: () =>
                  import("@/pages/product/businesslist/unsubscribe/index.vue")
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
                  import("@/pages/product/businesslist/info/index.vue")
              },
              {
                path: "feeReduction",
                name: "续费列表",
                meta: {
                  icon: "home",
                  perm: "business-cloud-renew"
                },
                component: () =>
                  import("@/pages/product/feeReduction/list/index.vue")
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
                  import("@/pages/product/feeReduction/list/examine.vue")
              }
              // {
              //   path: "snapshot",
              //   name: "快照列表",
              //   meta: {
              //     icon: "home",
              //     perm: "business-cloud-snapshot"
              //   },
              //   component: () =>
              //     import("@/pages/product/snapshot/list/index.vue")
              // },
              // {
              //   path: "automation",
              //   name: "自动化列表",
              //   meta: {
              //     icon: "home",
              //     perm: "business-cloud-auto"
              //   },
              //   component: () =>
              //     import("@/pages/product/automation/list/index.vue")
              // },
              // {
              //   path: "hostRecord",
              //   name: "宿主机异常记录",
              //   meta: {
              //     icon: "home",
              //     perm: "business-cloud-logs"
              //   },
              //   component: () =>
              //     import("@/pages/product/hostRecord/list/index.vue")
              // }
            ]
          }
        ]
      },
      // 生产
      // {
      //   path: "/production",
      //   name: "生产",
      //   meta: {
      //     perm: "production"
      //   },
      //   component: PageView,
      //   children: [
      //     // {
      //     //   path: "supplier",
      //     //   name: "供应商管理",
      //     //   meta: {
      //     //     icon: "home"
      //     //   },
      //     //   component: BlankView,
      //     //   children: [
      //     //     {
      //     //       path: "supplierList",
      //     //       name: "供应商列表",
      //     //       meta: {
      //     //         icon: "home"
      //     //       },
      //     //       component: () =>
      //     //         import("@/pages/production/supplier/list/list.vue")
      //     //     },
      //     //     {
      //     //       path: "add",
      //     //       name: "新建供应商",
      //     //       meta: {
      //     //         invisible: true,
      //     //         back: true
      //     //       },
      //     //       component: () =>
      //     //         import("@/pages/production/supplier/list/price.vue")
      //     //     },
      //     //     {
      //     //       path: "amend",
      //     //       name: "编辑供应商",
      //     //       meta: {
      //     //         invisible: true,
      //     //         back: true
      //     //       },
      //     //       component: () =>
      //     //         import("@/pages/production/supplier/list/amend.vue")
      //     //     },
      //     //     {
      //     //       path: "purchase",
      //     //       name: "采购账号列表",
      //     //       meta: {
      //     //         icon: "home"
      //     //       },
      //     //       component: () =>
      //     //         import("@/pages/production/supplier/purchase/list.vue")
      //     //     },
      //     //     {
      //     //       path: "adda",
      //     //       name: "新建采购账号",
      //     //       meta: {
      //     //         invisible: true,
      //     //         back: true
      //     //       },
      //     //       component: () =>
      //     //         import("@/pages/production/supplier/purchase/price.vue")
      //     //     },
      //     //     {
      //     //       path: "amends",
      //     //       name: "编辑采购账号",
      //     //       meta: {
      //     //         invisible: true,
      //     //         back: true
      //     //       },
      //     //       component: () =>
      //     //         import("@/pages/production/supplier/purchase/amend.vue")
      //     //     }
      //     //   ]
      //     // },
      //     {
      //       path: "product",
      //       name: "产品管理",
      //       meta: {
      //         icon: "home",
      //         perm: "production-admin"
      //       },
      //       component: BlankView,
      //       children: [
      //         // {
      //         //   path: "information",
      //         //   name: "产品信息管理",
      //         //   meta: {
      //         //     icon: "home"
      //         //   },
      //         //   component: () =>
      //         //     import("@/pages/production/product/information/list.vue")
      //         // },
      //         // {
      //         //   path: "addproduct",
      //         //   name: "新建产品线",
      //         //   meta: {
      //         //     invisible: true,
      //         //     back: true
      //         //   },
      //         //   component: () =>
      //         //     import(
      //         //       "@/pages/production/product/information/addproduct.vue"
      //         //     )
      //         // },
      //         // {
      //         //   path: "editproduct",
      //         //   name: "编辑产品线",
      //         //   meta: {
      //         //     invisible: true,
      //         //     back: true
      //         //   },
      //         //   component: () =>
      //         //     import(
      //         //       "@/pages/production/product/information/editproduct.vue"
      //         //     )
      //         // },
      //       ]
      //     }
      //     // {
      //     //   path: "cloudServer",
      //     //   name: "云服务器",
      //     //   meta: {
      //     //     icon: "home"
      //     //   },
      //     //   component: BlankView,
      //     //   children: [
      //     //     {
      //     //       path: "orderRouting",
      //     //       name: "订单路由配置",
      //     //       meta: {
      //     //         icon: "home"
      //     //       },
      //     //       component: () =>
      //     //         import("@/pages/production/cloudServer/orderRouting/list.vue")
      //     //     },
      //     //     {
      //     //       path: "newOrder",
      //     //       name: "新建订单路由规则",
      //     //       meta: {
      //     //         invisible: true,
      //     //         back: true
      //     //       },
      //     //       component: () =>
      //     //         import(
      //     //           "@/pages/production/cloudServer/orderRouting/newOrder.vue"
      //     //         )
      //     //     },
      //     //     {
      //     //       path: "changeOrder",
      //     //       name: "编辑订单路由规则",
      //     //       meta: {
      //     //         invisible: true,
      //     //         back: true
      //     //       },
      //     //       component: () =>
      //     //         import(
      //     //           "@/pages/production/cloudServer/orderRouting/changeOrder.vue"
      //     //         )
      //     //     }
      //     //   ]
      //     // }
      //   ]
      // },
      // 工单
      {
        path: "/workOrder",
        name: "工单",
        component: PageView,
        meta: {
          perm: "userinfo"
        },
        children: [
          {
            path: "workorderManage",
            name: "工单管理",
            meta: {
              icon: "home",
              perm: "userinfo"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "工单列表",
                meta: {
                  icon: "home",
                  perm: "userinfo"
                },
                component: () =>
                  import("@/pages/workOrder/workorderManage/list")
              },
              {
                path: "myWorkor",
                name: "我的工单",
                meta: {
                  icon: "home",
                  perm: "userinfo"
                },
                component: () => import("@/pages/workOrder/workorderManage/my")
              },
              {
                path: "detail",
                name: "工单详情",
                meta: {
                  perm: "userinfo",
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/workOrder/workorderManage/detail")
              }
              // {
              //   path: "appraise",
              //   name: "工单评价",
              //   meta: {
              //     icon: "home",
              //     perm: "userinfo"
              //   },
              //   component: () =>
              //     import("@/pages/workOrder/workorderManage/appraise")
              // }
            ]
          },
          {
            path: "setting",
            name: "工单设置",
            meta: {
              icon: "home",
              perm: "userinfo"
            },
            component: BlankView,
            children: [
              {
                path: "classify",
                name: "工单分类",
                meta: {
                  icon: "home",
                  perm: "userinfo"
                },
                component: () => import("@/pages/workOrder/setting/classify")
              },
              // {
              //   path: "permission",
              //   name: "工单权限设置",
              //   meta: {
              //     icon: "home",
              //     perm: "userinfo"
              //   },
              //   component: () => import("@/pages/workOrder/setting/permission")
              // },
              {
                path: "reply",
                name: "快捷回复模板",
                meta: {
                  icon: "home",
                  perm: "userinfo"
                },
                component: () => import("@/pages/workOrder/setting/reply")
              }
            ]
          }
          // {
          //   path: "increment",
          //   name: "增值服务",
          //   meta: {
          //     icon: "home",
          //     perm: "userinfo"
          //   },
          //   component: BlankView,
          //   children: [
          //     {
          //       path: "list",
          //       name: "业务列表",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/workOrder/increment/list")
          //     },
          //     {
          //       path: "item",
          //       name: "服务项目",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/workOrder/increment/item")
          //     },
          //     {
          //       path: "grade",
          //       name: "服务等级",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/workOrder/increment/grade")
          //     }
          //   ]
          // },
          // {
          //   path: "serviceManage",
          //   name: "服务管理",
          //   meta: {
          //     icon: "home",
          //     perm: "userinfo"
          //   },
          //   component: BlankView,
          //   children: [
          //     {
          //       path: "push",
          //       name: "PUSH过户",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/workOrder/serviceManage/push")
          //     }
          //   ]
          // }
        ]
      },
      // 站务
      {
        path: "/depot",
        name: "站务",
        component: PageView,
        meta: {
          perm: "personal"
        },
        children: [
          {
            path: "web",
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
                component: () => import("@/pages/depot/web/banner/index.vue")
              },
              {
                path: "update",
                name: "Banner",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-banner"
                },
                component: () => import("@/pages/depot/web/banner/update.vue")
              },
              {
                path: "links",
                name: "友情链接",
                meta: {
                  icon: "home",
                  perm: "personal-web-link"
                },
                component: () => import("@/pages/depot/web/links/links.vue")
              },
              {
                path: "updateLink",
                name: "更新友情链接",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-link"
                },
                component: () =>
                  import("@/pages/depot/web/links/updateLink.vue")
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
                  import("@/pages/depot/web/links/updateCategory.vue")
              },
              {
                path: "single",
                name: "单页管理",
                meta: {
                  icon: "home",
                  perm: "personal-web-page"
                },
                component: () => import("@/pages/depot/web/single/single.vue")
              },
              {
                path: "add-single",
                name: "单页添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-page"
                },
                component: () =>
                  import("@/pages/depot/web/single/addsingle.vue")
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
                  import("@/pages/depot/web/single/amendsingle.vue")
              },
              {
                path: "seo",
                name: "SEO优化",
                meta: {
                  icon: "home",
                  perm: "personal-web-seo",
                  invisible: true
                },
                component: () => import("@/pages/depot/web/seo/seo.vue")
              },
              {
                path: "amend-seo",
                name: "seo修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-web-seo"
                },
                component: () => import("@/pages/depot/web/seo/amendseo")
              }
            ]
          },
          {
            path: "help",
            name: "帮助文档",
            meta: {
              icon: "home",
              perm: "personal-help"
            },
            component: BlankView,
            children: [
              {
                path: "typemanage",
                name: "文档类别管理",
                meta: {
                  icon: "home",
                  perm: "personal-help-type"
                },
                component: () => import("@/pages/depot/help/category/index.vue")
              },
              {
                path: "add-category",
                name: "帮助中心类别添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-type"
                },
                component: () =>
                  import("@/pages/depot/help/category/addcategory")
              },
              {
                path: "edithelp",
                name: "帮助类别修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-type"
                },
                component: () => import("@/pages/depot/help/category/edithelp")
              },
              {
                path: "wordmanage",
                name: "文档列表",
                meta: {
                  icon: "home",
                  perm: "personal-help-doc"
                },
                component: () => import("@/pages/depot/help/word/index.vue")
              },
              {
                path: "add-word",
                name: "帮助文档添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-doc"
                },
                component: () => import("@/pages/depot/help/word/addword")
              },
              {
                path: "amend-word",
                name: "帮助文档修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-doc"
                },
                component: () => import("@/pages/depot/help/word/amendword")
              },
              {
                path: "hotproblem",
                name: "常见热点问题",
                meta: {
                  icon: "home",
                  perm: "personal-help-hot",
                  invisible: true
                },
                component: () => import("@/pages/depot/help/common/index.vue")
              },
              {
                path: "amend-common",
                name: "常见热点问题修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-help-hot"
                },
                component: () => import("@/pages/depot/help/common/amendcommon")
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
                component: () => import("@/pages/depot/news/category/index.vue")
              },
              {
                path: "addcategory",
                name: "新闻类型添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-type"
                },
                component: () =>
                  import("@/pages/depot/news/category/addNewsType.vue")
              },
              {
                path: "upcategory",
                name: "修改新闻类型",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-type"
                },
                component: () =>
                  import("@/pages/depot/news/category/upNewsType")
              },
              {
                path: "newslist",
                name: "新闻列表",
                meta: {
                  icon: "home",
                  perm: "personal-news-news"
                },
                component: () => import("@/pages/depot/news/list/index.vue")
              },
              {
                path: "addnewslist",
                name: "添加新闻列表",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-news"
                },
                component: () =>
                  import("@/pages/depot/news/list/addNewsList.vue")
              },
              {
                path: "upnewslist",
                name: "修改新闻列表",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "personal-news-news"
                },
                component: () =>
                  import("@/pages/depot/news/list/upNewsList.vue")
              }
            ]
          }
        ]
      },
      // 组织
      {
        path: "/organization",
        name: "组织",
        component: PageView,
        meta: {
          perm: "system"
        },
        children: [
          {
            path: "admin",
            name: "组织管理",
            meta: {
              icon: "home",
              perm: "system-admin"
            },
            component: BlankView,
            children: [
              {
                path: "account",
                name: "子账号管理",
                meta: {
                  icon: "home",
                  perm: "system-admin-user"
                },
                component: () => import("@/pages/organization/admin/account")
              },
              {
                path: "role",
                name: "角色管理",
                meta: {
                  icon: "home",
                  perm: "system-admin-role"
                },
                component: () => import("@/pages/organization/admin/role")
              },
              {
                path: "detail",
                name: "角色详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "system-admin-role"
                },
                component: () => import("@/pages/organization/admin/detail")
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
            name: "系统设置",
            meta: {
              icon: "home",
              perm: "system-admin"
            },
            component: BlankView,
            children: [
              {
                path: "whole",
                name: "基础设置",
                meta: {
                  icon: "home",
                  perm: "system-setting-global"
                },
                component: () => import("@/pages/system/basics/whole")
              },
              {
                path: "notice",
                name: "通知模板",
                meta: {
                  icon: "home",
                  perm: "system-setting-global"
                },
                component: () => import("@/pages/system/notice/notice")
              },
              {
                path: "mouldboard",
                name: "通知模板详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "system-admin-role"
                },
                component: () => import("@/pages/system/notice/mouldboard")
              },
              {
                path: "list",
                name: "域名管理",
                meta: {
                  icon: "home",
                  perm: "system-setting-global"
                },
                component: () => import("@/pages/system/domain/list")
              }
            ]
          }
        ]
      },
      // 个人信息
      {
        path: "/user",
        name: "个人",
        component: PageView,
        meta: {
          perm: "userinfo"
        },
        children: [
          {
            path: "center",
            name: "个人中心",
            meta: {
              icon: "home",
              perm: "userinfo-admin"
            },
            component: BlankView,
            children: [
              // {
              //   path: "enterprise",
              //   name: "企业认证",
              //   meta: {
              //     icon: "home",
              //     perm: "home-index-message"
              //   },
              //   component: () => import("@/pages/user/enterprise/index.vue")
              // },
              {
                path: "message",
                name: "我的消息",
                meta: {
                  icon: "home",
                  perm: "home-index-message"
                },
                component: () => import("@/pages/user/center/message/message")
              },
              {
                path: "detail",
                name: "查看消息详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "home-index-message"
                },
                component: () => import("@/pages/user/center/message/detail")
              },
              {
                path: "addMessage",
                name: "添加消息",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "home-index-message"
                },
                component: () =>
                  import("@/pages/user/center/message/addMessage")
              },
              // {
              //   path: "userInfo",
              //   name: "个人信息",
              //   meta: {
              //     perm: "userinfo-admin-info"
              //   },
              //   component: () => import("@/pages/user/center/userInfo")
              // },
              {
                path: "changePassword",
                name: "修改密码",
                meta: {
                  icon: "home",
                  perm: "userinfo-admin-password"
                },
                component: () => import("@/pages/user/center/changePassword")
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
    mode: "history",
    base: "shop",
    routes: basicRoute
  });
  router.matcher = newRouter.matcher;
}

export default options;
