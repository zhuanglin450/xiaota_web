// store�ļ�����index.js

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
        state:{

        },
        mutations: {

        },
        actions: {

        }
    });
export default store