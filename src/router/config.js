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
          perm: "dashboard"
        },
        component: PageView,
        children: [
          // 二级菜单
          {
            path: "index",
            name: "总览管理",
            meta: {
              icon: "home",
              perm: "dashboard-index"
            },
            component: BlankView,
            children: [
              // 三级菜单
              {
                path: "home",
                name: "总览首页",
                meta: {
                  icon: "home",
                  perm: "dashboard-index-home"
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
          perm: "sale"
        },
        component: PageView,
        children: [
          {
            path: "customer",
            name: "客户管理",
            meta: {
              icon: "home",
              perm: "sale-customer"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "客户列表",
                meta: {
                  icon: "home",
                  perm: "sale-customer-list"
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
                  perm: "sale-customer-list"
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
                  perm: "sale-customer-list"
                },
                component: () =>
                  import("@/pages/sale/customer/addManage/index.vue")
              },
              {
                path: "discount",
                name: "客户折扣",
                meta: {
                  icon: "home",
                  perm: "sale-customer-discount"
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
                  perm: "sale-customer-discount"
                },
                component: () =>
                  import("@/pages/sale/customer/discount/update.vue")
              },
              {
                path: "productDiscount",
                name: "产品折扣",
                meta: {
                  icon: "home",
                  perm: "sale-customer-productionDiscount"
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
                  perm: "sale-customer-productionDiscount"
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
              perm: "sale-order"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "订单列表",
                meta: {
                  icon: "home",
                  perm: "sale-order-list"
                },
                component: () => import("@/pages/sale/order/index")
              },
              {
                path: "detail",
                name: "订单详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "sale-order-list"
                },
                component: () => import("@/pages/sale/order/detail")
              }
            ]
          },
          {
            path: "unsubscribe",
            name: "订单退订管理",
            meta: {
              icon: "home",
              perm: "sale-order"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "订单退订列表",
                meta: {
                  icon: "home",
                  perm: "sale-order-list"
                },
                component: () => import("@/pages/sale/unsubscribe/index")
              },
              {
                path: "detail",
                name: "退订详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "sale-order-list"
                },
                component: () => import("@/pages/sale/unsubscribe/detail")
              }
            ]
          },
          {
            path: "finance",
            name: "财务管理",
            meta: {
              icon: "home",
              perm: "sale-finance"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "收支明细",
                meta: {
                  icon: "home",
                  perm: "sale-finance-list"
                },
                component: () => import("@/pages/sale/finance/list.vue")
              },
              {
                path: "detail",
                name: "收支明细详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "sale-finance-list"
                },
                component: () => import("@/pages/sale/finance/detail.vue")
              },
              {
                path: "recharge",
                name: "充值记录",
                meta: {
                  icon: "home",
                  perm: "sale-finance-recharge"
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
                  perm: "sale-finance-recharge"
                },
                component: () =>
                  import("@/pages/sale/finance/recharge/detail.vue")
              },
              {
                path: "payment",
                name: "线下充值管理",
                meta: {
                  icon: "home",
                  perm: "sale-finance-payment"
                },
                component: () => import("@/pages/sale/finance/payment/list")
              },
              {
                path: "paymentDetail",
                name: "线下充值详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "sale-finance-payment"
                },
                component: () => import("@/pages/sale/finance/payment/detail")
              },
              {
                path: "addPayment",
                name: "增减会员余额",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "sale-finance-payment"
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
              {
                path: "billmanage",
                name: "发票管理",
                meta: {
                  icon: "home",
                  perm: "sale-finance-payment"
                },
                component: () =>
                  import("@/pages/sale/finance/billmanage/index.vue")
              },
              {
                path: "billInfo",
                name: "发票申请详情",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "sale-finance-payment"
                },
                component: () =>
                  import("@/pages/sale/finance/billmanage/billInfo.vue")
              },
              {
                path: "auditbill",
                name: "审核发票申请",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "sale-finance-payment"
                },
                component: () =>
                  import("@/pages/sale/finance/billmanage/auditbill.vue")
              },
              {
                path: "editbill",
                name: "编辑发票申请",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "sale-finance-payment"
                },
                component: () =>
                  import("@/pages/sale/finance/billmanage/editbill.vue")
              },
              {
                path: "refundmanage",
                name: "退票管理",
                meta: {
                  icon: "home",
                  perm: "sale-finance-payment"
                },
                component: () =>
                  import("@/pages/sale/finance/refundmanage/list.vue")
              },
              {
                path: "refundApply",
                name: "退票申请详情",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true,
                  perm: "sale-finance-payment"
                },
                component: () =>
                  import("@/pages/sale/finance/refundmanage/refundApply.vue")
              },
              {
                path: "reviewRefund",
                name: "审核退票申请",
                meta: {
                  icon: "home",
                  back: true,
                  invisible: true,
                  perm: "sale-finance-payment"
                },
                component: () =>
                  import("@/pages/sale/finance/refundmanage/reviewRefund.vue")
              },
              // {
              //   path: "rechargeCentre",
              //   name: "充值中心",
              //   meta: {
              //     icon: "home",
              //     perm: "sale-finance-refund"
              //   },
              //   component: () => import("@/pages/sale/finance/rechargeCentre/index.vue")
              // },
              {
                path: "withdraw",
                name: "提现管理",
                meta: {
                  icon: "home",
                  perm: "sale-finance-refund"
                },
                component: () =>
                  import("@/pages/sale/finance/withdraw/index.vue")
              }
            ]
          }
        ]
      },
      //采购
      {
        path: "/purchase",
        name: "采购",
        meta: {
          perm: "purchase"
        },
        component: PageView,
        children: [
          {
            path: "manage",
            name: "财务管理",
            meta: {
              icon: "home",
              perm: "purchase-manage"
            },
            component: BlankView,
            children: [
              {
                path: "rechargeCentre",
                name: "充值中心",
                meta: {
                  icon: "home",
                  perm: "purchase-manage-withdraw"
                },
                component: () =>
                  import("@/pages/purchase/manage/rechargeCentre/index.vue")
              },
              {
                path: "withdraw",
                name: "提现管理",
                meta: {
                  icon: "home",
                  perm: "purchase-manage-withdraw"
                },
                component: () =>
                  import("@/pages/purchase/manage/withdraw/index.vue")
              }
            ]
          },
          {
            path: "order",
            name: "订单管理",
            meta: {
              icon: "home",
              perm: "purchase-manage"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "订单列表",
                meta: {
                  icon: "home",
                  perm: "purchase-manage-withdraw"
                },
                component: () => import("@/pages/purchase/order/index.vue")
              },
              {
                path: "detail",
                name: "订单详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "purchase-manage-withdraw"
                },
                component: () => import("@/pages/purchase/order/detail.vue")
              },
              {
                path: "unsubscribe/list",
                name: "订单退单管理",
                meta: {
                  icon: "home",
                  perm: "purchase-manage-withdraw"
                },
                component: () =>
                  import("@/pages/purchase/order/unsubscribe/index")
              },
              {
                path: "unsubscribe/detail",
                name: "退订详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "purchase-manage-withdraw"
                },
                component: () =>
                  import("@/pages/purchase/order/unsubscribe/detail")
              },
              {
                path: "bill",
                name: "采购账单",
                meta: {
                  // invisible: true,
                  icon: "home",
                  perm: "purchase-manage-withdraw"
                },
                component: () => import("@/pages/purchase/order/bill/index.vue")
              }
            ]
          },
          {
            path: "billmanage",
            name: "发票管理 ",
            meta: {
              icon: "home",
              perm: "purchase-manage"
            },
            component: BlankView,
            children: [
              {
                path: "applybill",
                name: "发票申请",
                meta: {
                  icon: "home",
                  perm: "purchase-manage"
                },
                component: () =>
                  import("@/pages/purchase/billmanage/billapply/list.vue")
              },
              {
                path: "listApply",
                name: "申请发票",
                meta: {
                  icon: "home",
                  back: true,
                  invisible: true,
                  perm: "purchase-manage"
                },
                component: () =>
                  import("@/pages/purchase/billmanage/billapply/listApply.vue")
              },
              {
                path: "billlist",
                name: "发票列表",
                meta: {
                  icon: "home",
                  perm: "purchase-manage"
                },
                component: () =>
                  import("@/pages/purchase/billmanage/billlist/list.vue")
              },
              {
                path: "billinfo",
                name: "发票申请详情",
                meta: {
                  icon: "home",
                  back: true,
                  perm: "purchase-manage"
                },
                component: () =>
                  import("@/pages/purchase/billmanage/billlist/info.vue")
              },
              {
                path: "bouncelist",
                name: "退票列表",
                meta: {
                  icon: "home",
                  perm: "purchase-manage"
                },
                component: () =>
                  import("@/pages/purchase/billmanage/bouncelist/list.vue")
              },
              {
                path: "billInform",
                name: "发票信息管理",
                meta: {
                  icon: "home",
                  back: true,
                  perm: "purchase-manage"
                },
                component: () =>
                  import("@/pages/purchase/billmanage/billInform/list.vue")
              },
              {
                path: "addbillInform",
                name: "新增发票信息",
                meta: {
                  icon: "home",
                  back: true,
                  perm: "purchase-manage"
                },
                component: () =>
                  import(
                    "@/pages/purchase/billmanage/billInform/addinfobill.vue"
                  )
              }
            ]
          }
        ]
      },
      // 产品
      {
        path: "/product",
        name: "产品",
        meta: {
          perm: "product"
        },
        component: PageView,
        children: [
          {
            path: "cloudservers",
            name: "云服务器",
            meta: {
              icon: "home",
              perm: "product-cloud"
            },
            component: BlankView,
            children: [
              {
                path: "businessList",
                name: "业务列表",
                meta: {
                  icon: "home",
                  perm: "product-cloud-businessList"
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
                  perm: "product-cloud-businessList"
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
                  perm: "product-cloud-businessList"
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
                  perm: "product-cloud-businessList"
                },
                component: () =>
                  import("@/pages/product/businesslist/info/index.vue")
              },
              {
                path: "feeReduction",
                name: "续费列表",
                meta: {
                  icon: "home",
                  perm: "product-cloud-feeReduction"
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
                  perm: "product-cloud-feeReduction"
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
          },
          {
            path: "cdn",
            name: "CDN云加速",
            meta: {
              icon: "home",
              perm: "product-cloud"
            },
            component: BlankView,
            children: [
              {
                path: "domain",
                name: "域名管理",
                meta: {
                  icon: "home",
                  perm: "product-cloud-businessList"
                },
                component: () => import("@/pages/product/domain/index.vue")
              },
              {
                path: "bill",
                name: "账单管理",
                meta: {
                  icon: "home",
                  perm: "product-cloud-businessList"
                },
                component: () => import("@/pages/product/bill/index.vue")
              }
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
          perm: "workOrder"
        },
        children: [
          {
            path: "workorderManage",
            name: "工单管理",
            meta: {
              icon: "home",
              perm: "workOrder-workorderManage"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "工单列表",
                meta: {
                  icon: "home",
                  perm: "workOrder-workorderManage-list"
                },
                component: () =>
                  import("@/pages/workOrder/workorderManage/list")
              },
              {
                path: "myWorkor",
                name: "我的工单",
                meta: {
                  icon: "home",
                  perm: "workOrder-workorderManage-my"
                },
                component: () => import("@/pages/workOrder/workorderManage/my")
              },
              {
                path: "detail",
                name: "工单详情",
                meta: {
                  perm: "workOrder-workorderManage-my",
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
              perm: "workOrder-setting"
            },
            component: BlankView,
            children: [
              {
                path: "classify",
                name: "工单分类",
                meta: {
                  icon: "home",
                  perm: "workOrder-setting-classify"
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
                  perm: "workOrder-setting-reply"
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
          perm: "depot"
        },
        children: [
          {
            path: "web",
            name: "网站管理",
            meta: {
              icon: "home",
              perm: "depot-web"
            },
            component: BlankView,
            children: [
              {
                path: "banner",
                name: "banner管理",
                meta: {
                  icon: "home",
                  perm: "depot-web-banner"
                },
                component: () => import("@/pages/depot/web/banner/index.vue")
              },
              {
                path: "update",
                name: "Banner",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-web-banner"
                },
                component: () => import("@/pages/depot/web/banner/update.vue")
              },
              {
                path: "links",
                name: "友情链接",
                meta: {
                  icon: "home",
                  perm: "depot-web-links"
                },
                component: () => import("@/pages/depot/web/links/links.vue")
              },
              {
                path: "updateLink",
                name: "更新友情链接",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-web-links"
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
                  perm: "depot-web-links"
                },
                component: () =>
                  import("@/pages/depot/web/links/updateCategory.vue")
              },
              {
                path: "single",
                name: "单页管理",
                meta: {
                  icon: "home",
                  perm: "depot-web-single"
                },
                component: () => import("@/pages/depot/web/single/single.vue")
              },
              {
                path: "add-single",
                name: "单页添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-web-single"
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
                  perm: "depot-web-single"
                },
                component: () =>
                  import("@/pages/depot/web/single/amendsingle.vue")
              },
              {
                path: "seo",
                name: "SEO优化",
                meta: {
                  icon: "home",
                  perm: "depot-web-seo",
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
                  perm: "depot-web-seo"
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
              perm: "depot-help"
            },
            component: BlankView,
            children: [
              {
                path: "typemanage",
                name: "文档类别管理",
                meta: {
                  icon: "home",
                  perm: "depot-help-type"
                },
                component: () => import("@/pages/depot/help/category/index.vue")
              },
              {
                path: "add-category",
                name: "帮助中心类别添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-help-type"
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
                  perm: "depot-help-type"
                },
                component: () => import("@/pages/depot/help/category/edithelp")
              },
              {
                path: "wordmanage",
                name: "文档列表",
                meta: {
                  icon: "home",
                  perm: "depot-help-doc"
                },
                component: () => import("@/pages/depot/help/word/index.vue")
              },
              {
                path: "add-word",
                name: "帮助文档添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-help-doc"
                },
                component: () => import("@/pages/depot/help/word/addword")
              },
              {
                path: "amend-word",
                name: "帮助文档修改",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-help-doc"
                },
                component: () => import("@/pages/depot/help/word/amendword")
              },
              {
                path: "hotproblem",
                name: "常见热点问题",
                meta: {
                  icon: "home",
                  perm: "depot-help-hot",
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
                  perm: "depot-help-hot"
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
              perm: "depot-news"
            },
            component: BlankView,
            children: [
              {
                path: "category",
                name: "新闻类别管理",
                meta: {
                  icon: "home",
                  perm: "depot-news-type"
                },
                component: () => import("@/pages/depot/news/category/index.vue")
              },
              {
                path: "addcategory",
                name: "新闻类型添加",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-news-type"
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
                  perm: "depot-news-type"
                },
                component: () =>
                  import("@/pages/depot/news/category/upNewsType")
              },
              {
                path: "newslist",
                name: "新闻列表",
                meta: {
                  icon: "home",
                  perm: "depot-news-newList"
                },
                component: () => import("@/pages/depot/news/list/index.vue")
              },
              {
                path: "addnewslist",
                name: "添加新闻列表",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "depot-news-newList"
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
                  perm: "depot-news-newList"
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
          perm: "organization"
        },
        children: [
          {
            path: "admin",
            name: "组织管理",
            meta: {
              icon: "home",
              perm: "organization-admin"
            },
            component: BlankView,
            children: [
              {
                path: "account",
                name: "子账号管理",
                meta: {
                  icon: "home",
                  perm: "organization-admin-account"
                },
                component: () => import("@/pages/organization/admin/account")
              },
              {
                path: "role",
                name: "角色管理",
                meta: {
                  icon: "home",
                  perm: "organization-admin-role"
                },
                component: () => import("@/pages/organization/admin/role")
              },
              {
                path: "relation",
                name: "角色关联资源",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "organization-admin-role"
                },
                component: () => import("@/pages/organization/admin/relation")
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
                  perm: "system-admin-whole"
                },
                component: () => import("@/pages/system/basics/whole")
              },
              {
                path: "notice",
                name: "通知模板",
                meta: {
                  icon: "home",
                  perm: "system-admin-notice"
                },
                component: () => import("@/pages/system/notice/notice")
              },
              {
                path: "mouldboard",
                name: "通知模板详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "system-admin-notice"
                },
                component: () => import("@/pages/system/notice/mouldboard")
              },
              {
                path: "list",
                name: "域名管理",
                meta: {
                  icon: "home",
                  perm: "system-admin-domain"
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
          invisible: true,
          perm: "user"
        },
        children: [
          {
            path: "center",
            name: "个人中心",
            meta: {
              icon: "home",
              perm: "user-center"
            },
            component: BlankView,
            children: [
              {
                path: "enterprise",
                name: "企业认证",
                meta: {
                  icon: "home",
                  perm: "user-center-message"
                },
                component: () => import("@/pages/user/enterprise/index.vue")
              },
              {
                path: "message",
                name: "我的消息",
                meta: {
                  icon: "home",
                  perm: "user-center-message"
                },
                component: () => import("@/pages/user/center/message/message")
              },
              {
                path: "detail",
                name: "查看消息详情",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "user-center-message"
                },
                component: () => import("@/pages/user/center/message/detail")
              },
              {
                path: "addMessage",
                name: "添加消息",
                meta: {
                  invisible: true,
                  back: true,
                  perm: "user-center-message"
                },
                component: () =>
                  import("@/pages/user/center/message/addMessage")
              },
              // {
              //   path: "userInfo",
              //   name: "个人信息",
              //   meta: {
              //     perm: "user-center-userInfo"
              //   },
              //   component: () => import("@/pages/user/center/userInfo")
              // },
              {
                path: "changePassword",
                name: "修改密码",
                meta: {
                  icon: "home",
                  perm: "user-center-changePassword"
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
