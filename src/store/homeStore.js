import fetch from "../assets/js/fetch"
import {localToUTCFormat} from "../assets/js/date"
export default {
    // namespaced: true,
    state: {
        lines:[],
        totalDay: '',
        operation: [],
        shifts: [],
        ptTime:'',
        ngAllInfo:"",
        utilizationInfo1:[],
        operationTime:[],
        procedure_operation_details:[],
        skuNames:[],
        skuNamesTime:[]
    },
    mutations: {
        setLines(state, data) {
            var linesInfo=[]
            data.map((item,i)=>{
                if(item.support_models){
                    linesInfo.push(item)
                }
            })
            state.lines = linesInfo
            sessionStorage.setItem("lines", JSON.stringify(data))
        },
        setTotalDay(state, data) {
            state.totalDay = data
        },
        setOperation(state, data) {
            state.operation = data
            sessionStorage.setItem("operation", JSON.stringify(data))
        },
        setShifts(state, data) {
            state.shifts = data
            data.unshift({id:"",name:"全部班次"})
            sessionStorage.setItem("shifts", JSON.stringify(data))
        },
        setProcedure(state,data){
            state.procedure=data
            sessionStorage.setItem("procedure",JSON.stringify(data))
        },
        setProcess_time(state,data){
            state.ptTime=data
            sessionStorage.setItem("ptTime",JSON.stringify(data))
        },
        setNGInfo(state,data){
            state.ngAllInfo=data
        },
        Init_Utilization_Rate1(state,data){
            state.utilizationInfo1=data
        },
        setOperationTime(state,data){
            state.operationTime=data
        },
        setOperation_details(state,data){
            state.procedure_operation_details=data
        },
        skuNames(state,data){
            state.skuNames=data.filter(item=>item.sku_name!="")
        },
        skuNamesTime(state,data){
            state.skuNamesTime=data.filter(item=>item.sku_name!="")
        }
    },
    actions: {
        async getLine({ commit }) {
            let data=await fetch.get("/api/lines?limit=10000")
            commit("setLines", data.data.lines)
            let data1=await fetch.get("/api/shifts")
            commit("setShifts", data1.data.shifts)
        },
        async getTotal({ commit }, stark) {
            let data = await fetch.get("/api/stat/" + stark.line_id + "/" + stark.model_id + "/total_detect_days")
            commit("setTotalDay", data.data.total_detect_days)
        },
        async getOperation({ commit }, stark) {
            stark.start_date=localToUTCFormat(stark.start_date+" 00:00:00")
            stark.end_date=localToUTCFormat(stark.end_date+" 23:59:59")
            let data=await fetch.get("/api/stat/" + stark.line_id + "/" + stark.model_id + "/top_operation_ng" + "?top=10&shift="
                + stark.operationShift_id + "&start_date=" + stark.start_date + "&end_date=" + stark.end_date)
            commit("setOperation",data.data.top_operation_ng)
        },
        async getProcedure({commit},stark){
            stark.start_date=localToUTCFormat(stark.start_date+" 00:00:00")
            stark.end_date=localToUTCFormat(stark.end_date+" 23:59:59")
            let data =await fetch.get("/api/stat/"+stark.line_id+"/"+stark.model_id+"/procedure_history_ng?"+"start_date="+stark.start_date+"&end_date="+stark.end_date+"&shift="+stark.procedureShift_id+"&granularity=1")
            commit("setProcedure",data.data.procedure_history_ng)
        },
        async getBalance({commit},stark){
            // stark.start_date=localToUTCFormat(stark.start_date+" 00:00:00")
            // stark.end_date=localToUTCFormat(stark.end_date+" 23:59:59")
            let data =await fetch.get("/api/stat/"+stark.line_id+"/"+stark.model_id+"/line_balance?"+"start_date="+stark.start_date+"&shift="+stark.balanceShift_id+"&sku_pt_no="+stark.sku_name)
            sessionStorage.setItem("lineBalance",JSON.stringify(data.data))
            commit("setProcess_time",data.data.pt_time)
        },
        async getOperationTime({commit},stark){
            // stark.start_date=localToUTCFormat(stark.start_date+" 00:00:00")
            // stark.end_date=localToUTCFormat(stark.end_date+" 23:59:59")
            let data=await fetch.get("/api/stat/"+stark.line_id+"/"+stark.model_id+"/procedure_operation_summary?"+"start_date="+stark.start_date+"&shift_id="+stark.timeShift_id+"&sku_pt_no="+stark.sku_pt_no)
            commit("setOperationTime",data.data.shift_procedures_summary)
        },
        async getOperation_details({commit},stark){
            let data=await fetch.get("/api/stat/procedure_operation_details?operation_summary_ids="+stark.operation_summary_ids)
            commit("setOperation_details",data.data.procedure_operation_details)
        },
        async getNG({commit},stark){
            stark.start_date=localToUTCFormat(stark.start_date+" 00:00:00")
            stark.end_date=localToUTCFormat(stark.end_date+" 23:59:59")
            let data =await fetch.get("/api/stat/"+stark.line_id+"/"+stark.model_id+"/all_ngs?"+"start_date="+stark.start_date+"&end_date="+stark.end_date+"&offset="+stark.offset+"&limit="+stark.limit+"&shift="+stark.ngShift_id)
            commit("setNGInfo",data.data)
        },
        async putPassword({commit},stark){
            await fetch.put("/api/accounts/"+stark.accountId+"/password",stark.password)
        },
        async deletLogin({commit},stark){
            await fetch.delete("/api/logout/"+stark.accountId)
        },
        async getUtilizationRate1({ commit }, line_id) {
            let data = await fetch.get("/api/stat/" + line_id + "/utilization_rate")
            if (data.code != 200) {
            }
            commit("Init_Utilization_Rate1", data.data.utilization_rate)
        },
        async getBalanceSkuName({commit},stark){
            let data = await fetch.get("/api/stat/"+stark.line_id+"/"+stark.model_id+"/sku_pt_no?start_date="+stark.date+"&end_date="+stark.date+"&shift="+stark.balanceShift_id)
            if (data.code != 200) {
            }
            commit("skuNames", data.data.model_sku_switch_shift_history)
        },
        async getTimeSkuName({commit},stark){
            let data = await fetch.get("/api/stat/"+stark.line_id+"/"+stark.model_id+"/sku_pt_no?start_date="+stark.date+"&end_date="+stark.date+"&shift="+stark.timeShift_id)
            if (data.code != 200) {
            }
            commit("skuNamesTime", data.data.model_sku_switch_shift_history)
        }
    }
}