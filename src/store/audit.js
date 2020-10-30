// 模型审核 api
import axios from "../assets/js/fetch";
import qs from "querystring";
export default {
  namespaced: true,
  actions: {
    // 获取审核列表
    get_list({}, params) {
      let url = "/api/models/procedures/sop_configs/approvals?";
      // let url = "/api/models/procedures/sop_configs/apprval?";
      url += qs.stringify(params);
      return axios.get(url);
    },
    // 获取试用结果
    get_trial_result({}, params) {
      let url = `/api/models/procedures/sop_configs/approvals/${params.approval_id}/trial_result`;
      return axios.get(url);
    },
    // 进行审核
    put_approve({}, params) {
      let url = `/api/models/procedures/sop_configs/approvals/${params.approval_id}`;
      let data = {
        approved: params.approved,
        comments: params.comments,
      };
      return axios.put(url, data);
      // return axios.post(url, data);
    },
    // 获取视频
    get_video({}, params) {
      let url = `/api/videos?`;
      url += qs.stringify(params);
      return axios.get(url);
    },
    // 获取模板列表
    get_templates({}, params) {
      let url = `/api/label_templates?`;
      url += qs.stringify(params);
      return axios.get(url);
    },
    // 发布新任务
    publish_tag_task({}, params) {
      let url = "/api/tagging_tasks/publish";
      return axios.post(url, params);
    }
  }
};
