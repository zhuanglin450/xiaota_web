// 模型审核 api
import fetch from "../assets/js/fetch";
import qs from "querystring";

export default {
    namespaced: true, //加了这句就找不到方法了，？为啥
    state: {
    //    view_id: '',
    },
    getters: {
      //  viewId: state => state.view_id
    },
    mutations: {
        setViewId(state, data) {
            //state.view_id = data;
            //sessionStorage.setItem("order_list_viewId", data);
        },
    },

    actions: {
        // 获取order 列表
        get_client_order_list({}, params) {
            //      distance/qr/order? order_status=0&try_scope=1&start_time=2020-10-01&end_time=2020-10-21&offset=0&limit=10
            let url = "/api/distance/qr/order?";
            url += qs.stringify(params);

            let response = fetch.get(url);
            return response;
        },
 
    }
};