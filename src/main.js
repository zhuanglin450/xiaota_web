// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//element-ui
import ElementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)

import './assets/css/common.css'

import axios from 'axios'
// Vue.use(axios);
Vue.prototype.$axios = axios;

// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用

//Vue.use(VueRouter)
// 引用路由配置文件
import _router from './router/index.js'
// 使用配置文件规则

// _router.beforeEach((to, from, next) => {
//     //NProgress.start();
//     if (to.path == '/login') {
//         sessionStorage.removeItem('user');
//     }
//     let user = JSON.parse(sessionStorage.getItem('user'));
//     if (!user && to.path != '/login') {
//         next({ path: '/login' })
//     } else {
//         if(to.path == '/login' || to.path == '/404' || to.path == '/no_permission'
//             || to.path == '/home' || to.path == '//home/task'
//             || to.path == '/home/statistics' || to.path == '/home/basic_data'|| to.path == '/home/system') {
//             next()
//         } else {
//             if(user != null && user.rolebs_scope != null){
//                 if(user.rolebs_scope.indexOf(to.path) != -1) {
//                     next()
//                 } else {
//                     next({ path: '/no_permission' })
//                 }

//             } else {
//                 next({ path: '/no_permission' })
//             }
//         }
//         next()
//     }
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
