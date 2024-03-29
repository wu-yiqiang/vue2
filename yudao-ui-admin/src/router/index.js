import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
import Demo from '@/views/demo'
Vue.use(Router)

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 【重要】当设置 true 的时候该路由不会再侧边栏出现 如 401，login 等页面，或者如一些编辑页面 /edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * path: '/login',                // 【重要】访问的 URL 路径
 * component: Layout,             // 【重要】对应的组件；也可以是 (resolve) => require(['@/views/login'], resolve),
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 【重要】设定路由的名字，一定要填写不然使用 <keep-alive> 时会出现各种问题
 * meta : {
    noCache: true                // 【重要】如果设置为 true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 【重要】设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 【重要】设置该路由的图标，对应路径 src/assets/icons/svg
    breadcrumb: false            // 如果设置为 false，则不会在 breadcrumb 面包屑中显示
    activeMenu: '/system/user'   // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: "/",
    redirect: "/bpm/manager/model/design",
  },
  {
    path: "/demo",
    component: Demo,
  },

  {
    path: "/bpm",
    component: Layout,
    hidden: true,
    redirect: "redirect",
    // children: [{
    //   path: 'oa/leave/create',
    //   component: (resolve) => require(['@/views/bpm/oa/leave/create'], resolve),
    //   name: '发起 OA 请假',
    //   meta: { title: '发起 OA 请假', icon: 'form', activeMenu: '/bpm/oa/leave' }
    // }, {
    //   path: 'oa/leave/detail',
    //   component: (resolve) => require(['@/views/bpm/oa/leave/detail'], resolve),
    //   name: '查看 OA 请假',
    //   meta: { title: '查看 OA 请假', icon: 'view', activeMenu: '/bpm/oa/leave' }
    // }
    // ]
  },
  {
    path: "/bpm",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "manager/form/edit",
        component: (resolve) =>
          require(["@/views/bpm/form/formEditor"], resolve),
        name: "流程表单-编辑",
        meta: { title: "流程表单-编辑", activeMenu: "/bpm/manager/form" },
      },
      {
        path: "manager/definition",
        component: (resolve) =>
          require(["@/views/bpm/definition/index"], resolve),
        name: "流程定义",
        meta: { title: "流程定义", activeMenu: "/bpm/manager/model" },
      },
      {
        path: "manager/model/design",
        component: (resolve) =>
          require(["@/views/bpm/model/modelEditor"], resolve),
        name: "设计流程",
        meta: { title: "设计流程", activeMenu: "/bpm/manager/model" },
      },
      {
        path: "process-instance/create",
        component: (resolve) =>
          require(["@/views/bpm/processInstance/create"], resolve),
        name: "发起流程",
        meta: { title: "发起流程", activeMenu: "/bpm/task/my" },
      },
      {
        path: "process-instance/detail",
        component: (resolve) =>
          require(["@/views/bpm/processInstance/detail"], resolve),
        name: "流程详情",
        meta: { title: "流程详情", activeMenu: "/bpm/task/my" },
      },
    ],
  },
  {
    path: "/404",
    component: (resolve) => require(["@/views/error/404"], resolve),
    hidden: true,
  },
  {
    path: "/401",
    component: (resolve) => require(["@/views/error/401"], resolve),
    hidden: true,
  },
];

// 防止连续点击多次路由报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

export default new Router({
  base: process.env.VUE_APP_APP_NAME ? process.env.VUE_APP_APP_NAME : '/',
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
