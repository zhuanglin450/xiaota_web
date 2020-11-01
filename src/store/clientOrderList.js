// 模型审核 api
import fetch from "../assets/js/fetch";
import qs from "querystring";
export default {
  namespaced: true,//加了这句就找不到方法了，？为啥
  actions: {
    // 获取审核列表
    get_client_order_list({}, params) {
//      distance/qr/order? order_status=0&try_scope=1&start_time=2020-10-01&end_time=2020-10-21&offset=0&limit=10
      let url = "/api/distance/qr/order?";
      url += qs.stringify(params);

      let response  = fetch.get(url);
      return  response;
    }, 
    // 进行审核
    put_approve({}, params) {
      let url = `/api/models/procedures/sop_configs/approvals/${params.approval_id}`;
      let data = {
        approved: params.approved,
        comments: params.comments,
      };
      return fetch.put(url, data);
      // return fetch.post(url, data);
    }, 
    // 发布新任务
    publish_tag_task({}, params) {
      let url = "/api/tagging_tasks/publish";
      return fetch.post(url, params);
    }
  }
};
