// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from "./store"

//bootstrap
//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap-vue/dist/bootstrap-vue.css"
//import { BootstrapVue ,BootstrapVueIcons} from "bootstrap-vue"
//Vue.use(BootstrapVueIcons)
//Vue.use(BootstrapVue);


//toast 延迟弹框
import {toast} from "../src/assets/js/toast"
Vue.config.productionTip = false
Vue.prototype.toast=toast

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//import 'font-awesome/css/font-awesome.min.css'
// Array.prototype.getArrayIndex=function(obj){
//   for(var i=0;i<this.length;i++){
//     if(this[i]===obj){
//       return i
//     }
//   }
//   return -1
// }

//css 
import "./style/base.css"
import './style/common.css'

//调用浏览器打印
import Print from 'vue-print-nb'
Vue.use(Print);

import axios from 'axios'
// import fetch from './assets/js/fetch'
//当我们的项目是前后端分离的模式时,vue不会自动帮我们保存后端传来的cookie
axios.defaults.withCredentials = true; //保存cookie
// Vue.use(axios);
Vue.prototype.$axios = axios;
 
// 引用路由配置文件
import router from './router/index.js'
// 使用配置文件规则

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
