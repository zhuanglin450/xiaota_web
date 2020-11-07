import store from "../store/index";
import Vue from 'vue'
import Router from 'vue-router'

import Admin from '@/components/admin'
import personInfo from '@/components/person/info'

import QrOrderList from '@/components/qrorder/list'
import adminQrOrderDetail from '@/components/qrorder/detail'
import QrOrderQrcodeList from '@/components/qrorder/qrcodelist'
import adminUserlist from '@/components/systemManage/userlist'
import adminAdduser from '@/components/systemManage/adduser'

import Login from '@/components/login'
import SelfRegister from '@/components/person/SelfRegister'

import Client from '@/components/client'
// import personInfo from '@/components/person/info'

import ClientOrderList from '@/components/clientorder/list'
import ClientOrderDetail from '@/components/clientorder/detail'
import ClientOrderNewBatch from '@/components/clientorder/newBatch'
import ClientOrderNew from '@/components/clientorder/new'


//cv���´�����·�ɵ�ַ�ظ��ı�������(һ������)
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }


Vue.use(Router)

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


const router = new Router({
    mode: "hash", //hashģʽ�Ĺ���ԭ����hashchange�¼���������window����hash�ı仯��������url����������һ��#xx��������¼���
    routes: [
        {
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
            path: '/selfRegister',
            name: 'SelfRegister',
            component: SelfRegister
        },
        {
            path: '/admin',
            name: 'Admin',
            // meta: {
            //       requireAuth: true // ��Ӹ��ֶΣ���ʾ�������·������Ҫ��¼��
            // },
            component: Admin,
            children: [
                {
                    path: '/admin/personinfos',
                    name: 'AdminPersonInfo',
                    component: personInfo,
                },{
                    path: '/admin/manageusers',
                    name: 'adminUserlist',
                    component: adminUserlist,
                },{
                    path: '/admin/adduser',
                    name: 'adminAdduser',
                    component: adminAdduser,
                },
                {
                    path: '/admin/orderList',
                    name: 'adminQrOrderList',
                    component: QrOrderList,
                },
                {
                    path: '/admin/orderDetail',
                    name: 'adminQrOrderDetail',
                    component: adminQrOrderDetail,
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
            //       requireAuth: true //��Ӹ��ֶΣ���ʾ�������·������Ҫ��¼��
            // },
            component: Client,
            children: [{
                    path: '/client/personinfos',
                    name: 'ClientPersonInfo',
                    component: personInfo,
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
        // {
        //     path: '*',
        //     redirect: '/',
        //     hidden: true
        // }

    ]
})


// /**
//  * ǰ������,�ж���ת��Щҳ���Ƿ�����Ҫ��¼״̬��
//  */


router.beforeEach((to, from, next) => {
//   /**
//    * ������ҳ����Ҫ��¼���Զ���ת��Ҫ���õ�ַ����
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

/**
 * ˢ��islogin��ֵ,������loginʱȢ����isLogin��ֵ,�ᱨ��
 */
  if (window.sessionStorage.getItem("islogin2")) { 
    store.commit({
      type: "islogin",
      flag: window.sessionStorage.getItem("islogin2")
    });
  }

  if (to.meta.requireAuth) {
    //�жϸ�·���Ƿ���Ҫ��¼Ȩ��
    if (store.getters.islogin) {
      //�жϱ����Ƿ����access_token
      //history_path��Ҫʱ��ס�ϴη��ʵ�·��
      sessionStorage.removeItem("history_path");
      next();
    } else {
      next({
        path: "/"
      });
    }
    next();
  } else {
    next();
  }

//   /*������� ���� token �� ������ֱ����ת�� ��¼ҳ��*/
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
});
export default router;