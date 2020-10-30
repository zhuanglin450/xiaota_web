// store文件夹下index.js
import fetch from "../assets/js/fetch";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import homeStore from "./homeStore";
import loginStore from "./loginStore";
import dashboard from "./dashboard";
import ftpInfo from "./ftpInfo";
//import selectLine from "./selectLine";
//import audit from "./audit";
//import logs from "./logs";
import mqtt from "./mqtt";
import common from "./common";



//以下是些样例?? 可以根据需要修??
export default new Vuex.Store({
  modules: {
    loginStore, // 登录状??
    markTasks, // 标记任务
    pictureTask, // 图片标签列表
    modelManagement, // 训练模型结果
    serverInfo, // 服务器信??
    ftpInfo, // Ftp服务器信??
    userManagement, // 用户管理
    logs, // 训练日志
    training_tasks, // 训练任务
    training_models, // 训练模型详情
    training_details, //训练详情
    mqtt, // mqtt
    common, // 通用
    modelManagementAudit, // 模型审核
    markTasksAudit, // 标记任务审核
    templateTask // 标签模板的弹??
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
    //获取机型列表
    async getModelList({ commit }) {
      // await fetch.get("/api/models/sync_mira_data")
      let data = await fetch.get("/api/models");
      commit("setModelData", data.data.models);
    },
    //获取指定机型下的工序
    async getProcedureList({ commit }, stark) {
      // await fetch.get("/api/models/sync_mira_data")
      let data = await fetch.get(
        "/api/models/" + stark.model_id + "/procedures"
      );
      commit("setProcedureData", data.data.procedures);
    }
  }
});
