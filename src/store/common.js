// 通用 api
import axios from "../assets/js/fetch";
import qs from "querystring";
export default {
  namespaced: true,
  actions: {
    // 获取机型列表
    get_models({}, params) {
      let url = "/api/models?";
      url += qs.stringify(params);
      return axios.get(url);
    },
    // 获取工序列表
    get_procedures({}, params) {
      let url = `/api/models/${params.model_id}/procedures`;
      return axios.get(url);
    },
    // 获取用户
    get_users({}, params) {
      let url = "/api/accounts?";
      url += qs.stringify(params);
      return axios.get(url);
    }
  }
};
