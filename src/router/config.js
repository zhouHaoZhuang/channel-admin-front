import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";

// 路由配置
const options = {
  routes: [
    {
      path: "/login",
      name: "登录页",
      component: () => import("@/pages/passport/login")
    },
    {
      path: "*",
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
    },
    {
      path: "/",
      name: "默认",
      component: TabsView,
      redirect: "/dashboard",
      children: [
        // 首页 一级菜单
        {
          path: "/dashboard",
          name: "首页",
          component: PageView,
          children: [
            // 二级菜单
            {
              path: "index",
              name: "后台首页",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                // 三级菜单
                {
                  path: "home",
                  name: "后台首页",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/home/index/index")
                },
                {
                  path: "message",
                  name: "消息提醒",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/home/index/message")
                },
                {
                  path: "detail",
                  name: "查看消息详情",
                  meta: {
                    invisible: true, // 不显示在左侧菜单
                    back: true
                  },
                  component: () => import("@/pages/home/index/detail")
                }
              ]
            }
          ]
        },
        // 服务
        {
          path: "/service",
          name: "服务",
          component: PageView,
          children: [
            {
              path: "index",
              name: "渠道管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "list",
                  name: "渠道列表",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/service/channelAdmin/list")
                },
                {
                  path: "add",
                  name: "新增渠道",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/service/channelAdmin/addChannel")
                },
                {
                  path: "detail",
                  name: "渠道详情",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () => import("@/pages/service/channelAdmin/detail")
                },
                {
                  path: "price",
                  name: "渠道价格",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/service/channelAdmin/price")
                },
                {
                  path: "update",
                  name: "新增产品采购价格",
                  meta: {
                    icon: "home",
                    invisible: true,
                    back: true
                  },
                  component: () => import("@/pages/service/channelAdmin/update")
                }
              ]
            },
            {
              path: "enterprise",
              name: "企业管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "list",
                  name: "企业列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/service/enterpriseAdmin/list")
                },
                {
                  path: "detail",
                  name: "企业详情",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/service/enterpriseAdmin/detail")
                }
              ]
            }
          ]
        },
        // 会员
        {
          path: "/member",
          name: "会员",
          component: PageView,
          children: [
            {
              path: "manage",
              name: "会员管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "list",
                  name: "会员列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/member/manage/list/index.vue")
                },
                {
                  path: "Info",
                  name: "会员详情",
                  meta: {
                    icon: "home",
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/member/manage/info/index.vue"),
                },
                {
                  path: "add",
                  name: "添加会员",
                  meta: {
                    icon: "home",
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/member/manage/addManage/index.vue"),
                }
              ]
            }
          ]
        },
        // 财务
        {
          path: "/finance",
          name: "财务",
          component: PageView,
          children: [
            {
              path: "index",
              name: "收支账簿",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "order",
                  name: "订单管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/finance/income/order/index")
                },
                {
                  path: "orderInfo",
                  name: "订单详情",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/finance/income/order/orderInfo")
                },
                {
                  path: "detailed",
                  name: "财务明细",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/finance/details/index.vue")
                },
                {
                  path: "recharge",
                  name: "充值记录",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/finance/recharge/index.vue")
                }
              ]
            },
            {
              path: "examine",
              name: "财务审核",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "payment",
                  name: "人工入款",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/payment/list")
                },
                {
                  path: "remittance",
                  name: "线下汇款",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                },
                {
                  path: "invoice",
                  name: "发票管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                },
                {
                  path: "contract",
                  name: "合同管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/list")
                },
                {
                  path: "withdrawal",
                  name: "提现管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                },
                {
                  path: "refund",
                  name: "退款管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                }
              ]
            },
            {
              path: "report",
              name: "财务报表",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "reconciliation",
                  name: "渠道对账表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/channel/enterpriseAdmin/list")
                },
                {
                  path: "income",
                  name: "收入分摊表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/channel/enterpriseAdmin/list")
                }
              ]
            }
          ]
        },
        //业务
        {
          path: "/business",
          name: "业务",
          component: PageView,
          children: [
            {
              path: "cloudservers",
              name: "云服务器",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "businesslist",
                  name: "业务列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/business/businesslist/list/index.vue")
                },
                {
                  path: "businessOpening",
                  name: "业务开通",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/business/businesslist/businessOpening/index.vue")
                },
                {
                  path: "info",
                  name: "业务详情",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/business/businesslist/info/index.vue")
                },
                {
                  path: "feeReduction",
                  name: "续费降配列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/business/feeReduction/list/index.vue")
                },
                {
                  path: "snapshot",
                  name: "快照列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/business/snapshot/list/index.vue")
                },
                {
                  path: "automation",
                  name: "自动化列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/business/automation/list/index.vue")
                },
                {
                  path: "hostRecord",
                  name: "宿主机异常记录",
                  meta: {
                    icon: "home"
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
          component: PageView,
          children: [
            {
              path: "supplier",
              name: "供应商管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "supplierList",
                  name: "供应商列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/production/supplier/list/list.vue")
                },
                {
                  path: "add",
                  name: "新建供应商",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/production/supplier/list/price.vue")
                },
                {
                  path: "amend",
                  name: "编辑供应商",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/production/supplier/list/amend.vue")
                },
                {
                  path: "purchase",
                  name: "采购账号列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/production/supplier/purchase/list.vue")
                },
                {
                  path: "adda",
                  name: "新建采购账号",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/production/supplier/purchase/price.vue")
                },
                {
                  path: "amends",
                  name: "编辑采购账号",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/production/supplier/purchase/amend.vue")
                }
              ]
            },
            {
              path: "product",
              name: "产品管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "information",
                  name: "产品信息管理",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/production/product/information/list.vue")
                },
                {
                  path: "addproduct",
                  name: "新建产品线",
                  meta: {
                    invisible: true, // 不显示在左侧菜单
                    back: true // 后退
                  },
                  component: () =>
                    import(
                      "@/pages/production/product/information/addproduct.vue"
                    )
                },
                {
                  path: "editproduct",
                  name: "编辑产品线",
                  meta: {
                    invisible: true, // 不显示在左侧菜单
                    back: true // 后退
                  },
                  component: () =>
                    import(
                      "@/pages/production/product/information/editproduct.vue"
                    )
                }
              ]
            },
            {
              path: "cloudServer",
              name: "云服务器",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "orderRouting",
                  name: "订单路由配置",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import(
                      "@/pages/production/cloudServer/orderRouting/list.vue"
                    )
                },
                {
                  path: "newOrder",
                  name: "新建订单路由规则",
                  meta: {
                    invisible: true, // 不显示在左侧菜单
                    back: true // 后退
                  },
                  component: () =>
                    import(
                      "@/pages/production/cloudServer/orderRouting/newOrder.vue"
                    )
                },
                {
                  path: "changeOrder",
                  name: "编辑订单路由规则",
                  meta: {
                    invisible: true, // 不显示在左侧菜单
                    back: true // 后退
                  },
                  component: () =>
                    import(
                      "@/pages/production/cloudServer/orderRouting/changeOrder.vue"
                    )
                }
              ]
            }
          ]
        },
        // 站务
        {
          path: "/personal",
          name: "站务",
          component: PageView,
          children: [
            {
              path: "account",
              name: "网站管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "banner",
                  name: "banner管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/personal/banner/banner.vue")
                },
                {
                  path: "add-banner",
                  name: "Banner添加",
                  meta: {
                    invisible: true, // 不显示在左侧菜单
                    back: true // 后退
                  },
                  component: () =>
                    import("@/pages/personal/banner/addbanner.vue")
                },
                {
                  path: "amend-banner",
                  name: "Banner修改",
                  meta: {
                    invisible: true, // 不显示在左侧菜单
                    back: true // 后退
                  },
                  component: () =>
                    import("@/pages/personal/banner/amendbanner.vue")
                },
                {
                  path: "blogroll",
                  name: "友情链接",
                  meta: {
                    // invisible: true,
                    // back: true
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/personal/blogroll/blogroll.vue")
                },
                {
                  path:"add-blogroll",
                  name:"添加友情链接",
                  meta:{
                    invisible: true,
                    back: true
                  },
                  component:() =>import("@/pages/personal/blogroll/addblogroll.vue")
                },
                {
                  path:"amend-blogroll",
                  name:"修改友情链接",
                  meta:{
                    invisible: true,
                    back: true
                  },
                  component:() =>import("@/pages/personal/blogroll/amendblogroll.vue")
                },
                {
                  path:"add-classify",
                  name:"友情链接分类添加",
                  meta:{
                    invisible: true,
                    back: true
                  },
                  component:() =>import("@/pages/personal/blogroll/addclassify.vue")
                },
                {
                  path:"amend-classify",
                  name:"友情链接分类修改",
                  meta:{
                    invisible: true,
                    back: true
                  },
                  component:() =>import("@/pages/personal/blogroll/amendclassify.vue")
                },
                {
                  path: "single",
                  name: "单页管理",
                  meta: {
                    // invisible: true,
                    // back: true
                    icon: "home"
                  },
                  component: () => import("@/pages/personal/single/single.vue")
                },
                {
                  path: "seo",
                  name: "SEO优化",
                  meta: {
                    // invisible: true,
                    // back: true
                    icon: "home"
                  },
                  component: () => import("@/pages/personal/seo/seo.vue")
                },
                {
                  path:"amend-seo",
                  name:"seo修改",
                  meta:{
                    invisible:true,
                    back:true
                  },
                  component:()=>import("@/pages/personal/seo/amendseo")
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
          children: [
            {
              path: "admin",
              name: "管理员",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "index",
                  name: "管理员管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/system/admin/index")
                },
                {
                  path: "addManage",
                  name: "管理员添加",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () => import("@/pages/system/admin/addmanage")
                },
                {
                  path: "add",
                  name: "权限组管理",
                  meta: {
                    invisible: true,
                    back: true
                  },
                  component: () =>
                    import("@/pages/system/admin/addChannel")
                },
                // {
                //   path: "detail",
                //   name: "渠道详情",
                //   meta: {
                //     invisible: true,
                //     back: true
                //   },
                //   component: () => import("@/pages/channel/channelAdmin/detail")
                // },
                {
                  path: "role",
                  name: "权限管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/system/admin/role")
                }
                // {
                //   path: "update",
                //   name: "新增产品采购价格",
                //   meta: {
                //     icon: "home",
                //     invisible: true,
                //     back: true
                //   },
                //   component: () => import("@/pages/channel/channelAdmin/update")
                // }
              ]
            },
            {
              path: "basics",
              name: "基础设置",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children:[
                {
                  path: "whole",
                  name: "全局设置",
                  meta: {
                    icon: "home"
                  },
                  component:()=>import("@/pages/system/basics/whole")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default options;
