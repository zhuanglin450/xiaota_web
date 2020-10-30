import fetch from "../assets/js/fetch";
export default {
  // namespaced: true,
  state: {
    //NGinfo
    lines: [],
    oracleData: []
  },
  mutations: {
    Init_Line(state, data) {
      state.lines = data.lines;
      sessionStorage.setItem("lines", JSON.stringify(data.lines));
    },
    setOracle(state, data) {
      state.oracleData = data;
      state.oracleData.unshift({
        id: "手动输入",
        name: "手动输入"
      });
    }
  },
  actions: {
    async getlines({ commit }) {
      let data = await fetch.get("/api/lines?limit=10000");
      commit("Init_Line", data.data);
    },
    async getOracle({ commit }) {
      let data = await fetch.get("/api/factory_models?offset=&limit=100000");
      commit("setOracle", data.data.factory_models);
    },
    getSyncOracle({ commit }) {
      let appVue = document.getElementById("app").__vue__;
      fetch.get("/api/oracle/synchronous_data").then(res => {
        if (res.code == 200) {
          appVue.Toastcom.makeToast(appVue, res.message, "success", "操作提示");
        } else {
          appVue.Toastcom.makeToast(appVue, res.message, "warning", "操作提示");
        }
      });
    },
    // 删除sop
    async delete_procedure_sop({}, stark) {
      console.log(stark);
      let { procedure_id, sop_id } = stark;
      await fetch.delete(
        `/api/models/procedures/${procedure_id}/sop_configs/${sop_id}`
      );
    }
  }
};
