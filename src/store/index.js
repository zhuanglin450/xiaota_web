// store文件夹下index.js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import homeStore from "./homeStore";
import loginStore from "./loginStore";
import dashboard from "./dashboard";
import selectLine from "./selectLine";
import audit from "./audit";
import common from "./common";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    lastLinedata: {},
    lastLineName: "",
    lastStationdetaildata: {},
    lastModeldetaildata: {},
    CurrentSelectedModelID: ""
  },
  modules: {
    homeStore,
    loginStore,
    dashboard,
    selectLine,
    audit,
    common
  },
  mutations: {
    changelastLineName(state, lastLineName) {
      state.lastLineName = lastLineName;
    },
    changelastLinedata(state, lastLinedata) {
      state.lastLinedata = lastLinedata;
    },
    changelastStationdetaildata(state, lastStationdetaildata) {
      state.lastStationdetaildata = lastStationdetaildata;
    },
    changelastModeldetaildata(state, lastModeldetaildata) {
      state.lastModeldetaildata = lastModeldetaildata;
    },
    changeCurrentSelectedModelID(state, CurrentSelectedModelID) {
      state.CurrentSelectedModelID = CurrentSelectedModelID;
    }
  }
});
