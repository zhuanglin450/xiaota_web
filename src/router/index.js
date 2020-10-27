import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import AdminLogin from '@/components/adminLogin'
import Admin from '@/components/admin'
import QrOrderList from '@/components/qrorder/list'
import QrOrderDetail from '@/components/qrorder/detail'
import QrOrderQrcodeList from '@/components/qrorder/qrcodelist'
import systemManager_User from '@/components/systemManager/user'

import Login from '@/components/login'
import Register from '@/components/person/register'

import Client from '@/components/client'
import ClientPersonInfo from '@/components/person/info'
import ClientOrderList from '@/components/clientorder/list'
import ClientOrderDetail from '@/components/clientorder/detail'
import ClientOrderNewBatch from '@/components/clientorder/newBatch'
import ClientOrderNew from '@/components/clientorder/new'

//push
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

Vue.use(Router)

const _router = new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/adminlogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/admin/usermanager',
          name: 'systemManager_User',
          component: systemManager_User,
        },
        {
          path: '/admin/orderList',
          name: 'orderList',
          component: QrOrderList,
        },
        {
          path: '/admin/orderDetail',
          name: 'orderDetail',
          component: QrOrderDetail,
        },
        {
          path: '/admin/orderQrcodeList',
          name: 'OrderQrcodeList',
          component: QrOrderQrcodeList,
        }
      ]
    },
    {
      path: '/client',
      name: 'Client',
      component: Client,
      children: [
        {
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

export default _router;