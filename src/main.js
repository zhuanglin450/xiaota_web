// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { BootstrapVue ,BootstrapVueIcons} from "bootstrap-vue"
import store from "./store"
import "./style/base.css"
import './style/common.css'
import {toast} from "../src/assets/js/toast"
Vue.config.productionTip = false

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
Array.prototype.getArrayIndex=function(obj){
  for(var i=0;i<this.length;i++){
    if(this[i]===obj){
      return i
    }
  }
  return -1
}



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

Vue.prototype.toast=toast
Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
