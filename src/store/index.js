// store文件夹下index.js

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import fetch from "../assets/js/fetch";

import loginStore from "./loginStore";
import info from "./info";
import clientOrderList from "./clientOrderList";
import userManagement from "./userManagement";

import common from "./common";



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
        state:{

        },
        mutations: {

        },
        actions: {

        }
    });
export default store