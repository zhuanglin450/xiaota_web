// store�ļ�����index.js
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



//������Щ����?? ���Ը�����Ҫ��??
export default new Vuex.Store({
  modules: {
    loginStore, // ��¼״??
    markTasks, // �������
    pictureTask, // ͼƬ��ǩ�б�
    modelManagement, // ѵ��ģ�ͽ��
    serverInfo, // ��������??
    ftpInfo, // Ftp��������??
    userManagement, // �û�����
    logs, // ѵ����־
    training_tasks, // ѵ������
    training_models, // ѵ��ģ������
    training_details, //ѵ������
    mqtt, // mqtt
    common, // ͨ��
    modelManagementAudit, // ģ�����
    markTasksAudit, // ����������
    templateTask // ��ǩģ��ĵ�??
  },
  state: {
    modelData: [],
    procedureData: []
  },
  mutations: {
    setModelData(state, data) {
      data.push({
        id: "",
        name: "ȫ��"
      });
      state.modelData = data;
    },
    setProcedureData(state, data) {
      data.push({
        id: "",
        name: "ȫ��"
      });
      state.procedureData = data;
    }
  },
  actions: {
    //��ȡ�����б�
    async getModelList({ commit }) {
      // await fetch.get("/api/models/sync_mira_data")
      let data = await fetch.get("/api/models");
      commit("setModelData", data.data.models);
    },
    //��ȡָ�������µĹ���
    async getProcedureList({ commit }, stark) {
      // await fetch.get("/api/models/sync_mira_data")
      let data = await fetch.get(
        "/api/models/" + stark.model_id + "/procedures"
      );
      commit("setProcedureData", data.data.procedures);
    }
  }
});
