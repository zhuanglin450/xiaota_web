// store�ļ�����index.js

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
//������Щ����?? ���Ը�����Ҫ��??
const store =
  new Vuex.Store({
    modules: {
      loginStore, // ��¼״̬
      info, // ��¼�û�������Ϣ
      clientOrderList, //�ͻ��˶����б�
      //modelManagement, // ѵ��ģ�ͽ��
      //serverInfo, // ��������Ϣ
      //ftpInfo, // Ftp��������Ϣ
      userManagement, // �û�����
      //logs, // ѵ����־
      //training_tasks, // ѵ������
      //training_models, // ѵ��ģ������
      //training_details, //ѵ������
      //mqtt, // mqtt
      common, // ͨ��
      //modelManagementAudit, // ģ�����
      //markTasksAudit, // ����������
      //templateTask // ��ǩģ��ĵ���
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
          
    }
  });  
  export default store

