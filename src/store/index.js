// store文件夹下index.js

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import fetch from "../assets/js/fetch";

import loginStore from "./loginStore";
import info from "./info";
import clientOrderList from "./clientOrderList";
//import serverInfo from "./serverInfo";
//import ftpInfo from "./ftpInfo";
import userManagement from "./userManagement";

//import pictureTask from "./pictureTask";
//import logs from "./logs";
//import training_tasks from "./training_tasks";
//import training_models from "./training_models";
//import training_details from "./training_details";
//import mqtt from "./mqtt";
import common from "./common";
//import modelManagementAudit from "./modelManagementAudit";
//import markTasksAudit from "./markTasksAudit";
//import templateTask from "./templateTask";



// vuex:refere to: https://www.jianshu.com/p/2e5973fe1223
//以下是些样例?? 可以根据需要修??
const store =
  new Vuex.Store({
    modules: {
      loginStore, // 登录状态
      info, // 登录用户个人信息
      clientOrderList, //客户端订单列表
      //modelManagement, // 训练模型结果
      //serverInfo, // 服务器信息
      //ftpInfo, // Ftp服务器信息
      userManagement, // 用户管理
      //logs, // 训练日志
      //training_tasks, // 训练任务
      //training_models, // 训练模型详情
      //training_details, //训练详情
      //mqtt, // mqtt
      common, // 通用
      //modelManagementAudit, // 模型审核
      //markTasksAudit, // 标记任务审核
      //templateTask // 标签模板的弹窗
    },
    state: {
      modelData: [],
      procedureData: []
    },
    mutations: {
      setModelData(state, data) {
        data.push({
          id: "",
          name: "全部"
        });
        state.modelData = data;
      },
      setProcedureData(state, data) {
        data.push({
          id: "",
          name: "全部"
        });
        state.procedureData = data;
      }
    },
    actions: {
          
    }
  });  
  export default store

