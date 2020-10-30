import axios from "axios";
import fetch from "../assets/js/fetch";
export default {
  // namespaced: true,
  state: {
    //summary
    summaryInfo: "",
    // procedures
    procedureStatus: [],

    //NGinfo
    NGInfo: [],

    //NG top10 graph
    topOperationNG: [],

    //线平衡率
    lineBalance: [],

    //稼动率
    UtilizationInfo: [],

    //线长页面：
    ProcedureAndStation: [],

    //班次信息
    shiftInfo: [],

    //流水线信息：
    lineInfo: [],
    //ftp空间信息
    ftpInfo:""
  },
  mutations: {
    Init_Summary(state, data) {
      //sessionStorage.removeItem("startTime");
      data.pt_rate = data.actural_pt_time / data.pt_time;
      state.summaryInfo = data;
    },
    Init_Procedures(state, data) {
      state.procedureStatus = data.procedure_status;
    },
    Init_NGInfo(state, data) {
      state.NGInfo = data;
    },
    Init_NGGraph(state, data) {
      sessionStorage.removeItem("topOperationNG");
      state.topOperationNG = data.top_operation_ng;
      sessionStorage.setItem(
        "topOperationNG",
        JSON.stringify(state.topOperationNG)
      );
    },

    Init_LineBalanceGraph(state, data) {
      sessionStorage.removeItem("lineBalance");
      state.lineBalance = data;
      sessionStorage.setItem("lineBalance", JSON.stringify(data));
    },

    Init_Utilization_Rate(state, data) {
      sessionStorage.removeItem("UtilizationInfo");
      state.UtilizationInfo = data;
      sessionStorage.setItem("UtilizationInfo", JSON.stringify(data));
    },

    get_ProcedureAndStation(state, data) {
      state.ProcedureAndStation = data;
    },
    get_ShiftInfo(state, data) {
      state.shiftInfo = data;
    },
    get_LineInfo(state, data) {
      state.lineInfo = data;
    },
    openShift(state, data) {
      sessionStorage.setItem("errMessage", JSON.stringify(data));
    },
    //获取ftp剩余天数
    getExhaustion_days(state,data){
      state.ftpInfo=data
    }
  },
  actions: {
    //获取指定机型的工序 procedures
    async getProcedureFromModel({ commit }, currentModel) {
      let data = await fetch.get(
        "/api/models/" +
          currentModel.model_id +
          "/procedures?offset=0&limit=10&line=" +
          currentModel.line_id
      );
      if (data.code != 200) {
      }
      commit("get_ProcedureAndStation", data.data);
    },
    //切换制定流水线的班次和机型
    async switchModel({ commit }, stark) {
      await fetch.put("/api/lines/" + stark.line_id + "/switch", {
        shift_id: stark.shift_id,
        model_id: stark.model_id,
        start_now: true
      });
    },
    async switchModelMessage({ commit }, stark) {
      let data = await fetch.get(
        "/api/lines/" +
          stark.line_id +
          "/can_start?shift_id=" +
          stark.shift_id +
          "&model_id=" +
          stark.model_id
      );
      commit("openShift", data.data);
    },
    //班次信息
    async getShiftInfo({ commit }) {
      let data = await fetch.get("/api/shifts");
      if (data.code != 200) {
      }
      commit("get_ShiftInfo", data.data.shifts);
    },

    //停工
    async stopLine({ commit }, line_id) {
      let data = await fetch.put("/api/lines/" + line_id + "/stop");
      if (data.code != 200) {
      }
    },
    //开工
    async startLine({ commit }, line_id) {
      let data = await fetch.put("/api/lines/" + line_id + "/start");
      if (data.code != 200) {
      }
    },
    //
    //Summary
    async getLineInfo({ commit }, line_id) {
      let data = await fetch.get("/api/lines/" + line_id);
      if (data.code != 200) {
      }
      commit("get_LineInfo", data.data);
    },
    //获取NGtop10
    async getTop10NG({ commit }, line_id) {
      let data = await fetch.get(
        "/api/dashboard/" + line_id + "/top_operation_ng/?top = 10"
      );
      if (data.code != 200) {
      }
      commit("Init_NGGraph", data.data);
    },
    //线平衡率
    async getLineBalance({ commit }, line_id) {
      let data = await fetch.get("/api/dashboard/" + line_id + "/line_balance");
      if (data.code != 200) {
      }
      commit("Init_LineBalanceGraph", data.data);
    },
    //Summary
    async getSummary({ commit }, line_id) {
      let data = await fetch.get(
        "/api/dashboard/" + line_id + "/summary?statistics_info=1"
      );
      if (data.code != 200) {
      }
      commit("Init_Summary", data.data);
    },
    //获取NG记录
    async getAllNGs({ commit }, line_id) {
      //offset 从第几条数据开始查， limit 查询几条数据。
      let data = await fetch.get(
        "/api/dashboard/" + line_id + "/procedures_ng_rate"
      );
      if (data.code != 200) {
      }
      commit("Init_NGInfo", data.data.procedure_ng_rate);
    },
    //获取procedures
    async getProcedures({ commit }, line_id) {
      let data = await fetch.get("/api/dashboard/" + line_id + "/procedures");
      if (data.code != 200) {
      }
      commit("Init_Procedures", data.data);
    },
    //获取稼动率
    async getUtilizationRate({ commit }, line_id) {
      let data = await fetch.get(
        "/api/dashboard/" + line_id + "/utilization_rate"
      );
      if (data.code != 200) {
      }
      commit("Init_Utilization_Rate", data.data.utilization_rate);
    },
    // 获取统计等级
    async getStatLevels() {
      let data = await fetch.get("api/system/stat_levels");
      if (data.code === 200) {
        return data.data;
      }
    },
    async resolveNGItem({ commit }, NG_Info) {
      let data = await fetch.delete(
        "/api/dashboard/" + NG_Info.result_id + "/" + NG_Info.operation_index
      );
      if (data.code != 200) {
      }
    },
    //给服务器发送命令。一般用在用户点击停班以及开班切换班次时候 WebUI给服务器发送
    //用户点击
    sendCmd({ commit }, CMDInfo) {
      var str = "";
      if (CMDInfo.stationID != "") {
        str = "/api/client/" + CMDInfo.stationID + "/cmd";
      } else {
        str = "/api/client/cmd";
      }
      axios
        .post(str, {
          destination: CMDInfo.postbody.destination,
          "content-type": CMDInfo.postbody.contentType,
          content: CMDInfo.postbody.content
        })
        .then(response => {
          if (response.data.code != 200) {
            alert(response.message);
          }
        })
        .catch(function(error) {
          alert(error.message);
        });
    },
    async getFtpSpace({commit}){
      let data=await fetch.get("api/video/free_space")
      if(data.code==200){
        commit("getExhaustion_days",data.data)
      }else if(data.code==400){
        commit("getExhaustion_days",data)
      }
    }
  }
};
