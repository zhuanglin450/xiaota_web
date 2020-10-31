import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index.js";
import Admin from '@/components/admin'
import QrOrderList from '@/components/qrorder/list'
import QrOrderDetail from '@/components/qrorder/detail'
import QrOrderQrcodeList from '@/components/qrorder/qrcodelist'
import systemManager_User from '@/components/systemManager/user'

import Login from '@/components/login'
import SelfRegister from '@/components/person/SelfRegister'

import Client from '@/components/client'
import ClientPersonInfo from '@/components/person/info'
import ClientOrderList from '@/components/clientorder/list'
import ClientOrderDetail from '@/components/clientorder/detail'
import ClientOrderNewBatch from '@/components/clientorder/newBatch'
import ClientOrderNew from '@/components/clientorder/new'

//push
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}

Vue.use(Router)

const router = new Router({
    mode: "hash", //hash模式的工作原理是hashchange事件，可以在window监听hash的变化。我们在url后面随便添加一个#xx触发这个事件。
    routes: [{
            path: '/',
            name: "login",
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/SelfRegister',
            name: 'SelfRegister',
            component: SelfRegister
        },
        {
            path: '/admin',
            name: 'Admin',
            // meta: {
            //       requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            // },
            component: Admin,
            children: [{
                    path: '/admin/usermanager',
                    name: 'adminSystemManager_User',
                    component: systemManager_User,
                },
                {
                    path: '/admin/orderList',
                    name: 'adminQrOrderList',
                    component: QrOrderList,
                },
                {
                    path: '/admin/orderDetail',
                    name: 'adminQrOrderDetail',
                    component: QrOrderDetail,
                },
                {
                    path: '/admin/orderQrcodeList',
                    name: 'adminQrOrderQrcodeList',
                    component: QrOrderQrcodeList,
                }
            ]
        },
        {
            path: '/client',
            name: 'Client',
            // meta: {
            //       requireAuth: true //添加该字段，表示进入这个路由是需要登录的
            // },
            component: Client,
            children: [{
                    path: '/client/personinfos',
                    name: 'ClientPersonInfo',
                    component: ClientPersonInfo,
                },
                {
                    path: '/client/orderlist',
                    name: 'ClientOrderList',
                    component: ClientOrderList,
                },
                {
                    path: '/client/orderdetail',
                    name: 'ClientOrderDetail',
                    component: ClientOrderDetail,
                },
                {
                    path: '/client/orderNewbatch',
                    name: 'ClientOrderNewBatch',
                    component: ClientOrderNewBatch,
                },
                {
                    path: '/client/orderNew',
                    name: 'ClientOrderNew',
                    component: ClientOrderNew,
                },
            ]

        },
        {
            path: '*',
            redirect: '/',
            hidden: true
        }

    ]
})

/**
 * 刷新islogin的值
 */
// if (window.sessionStorage.getItem("islogin")) {
//   // store.commit({
//   //   type: "islogin",
//   //   flag: window.sessionStorage.getItem("islogin")
//   // });
// }
// /**
//  * 前置守卫
//  */


// router.beforeEach((to, from, next) => {
//   /**
//    * 标记审核页面需要登录后自动跳转，要将该地址保存
//    */
// /*  if (
//     (to.name == "modelManagementAudit" ||
//       to.name == "taggingTasksDetail" ||
//       to.name == "taggingTasksAudit") &&
//     !sessionStorage.getItem("history_path")
//   ) {
//     sessionStorage.setItem("history_path", to.fullPath);
//   }
// */
//   if (to.meta.requireAuth) {
//     // 判断该路由是否需要登录权限
//     // if (store.getters.islogin) {
//     //   //判断本地是否存在access_token
//     //   //history_path必要时记住上次访问的路径
//     //   sessionStorage.removeItem("history_path");
//     //   next();
//     // } else {
//     //   next({
//     //     path: "/"
//     //   });
//     // }
//     next();
//   } else {
//     next();
//   }

//   /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
//   if (to.fullPath == "/") {
//     // if (store.getters.islogin) {
//     //   next({
//     //     path: from.fullPath
//     //   });
//     // } else {
//     //   next();
//     // }

//     next();
//   }
// });
export default router;