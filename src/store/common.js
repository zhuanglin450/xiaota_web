// 通用 api
import axios from "../assets/js/fetch";
import qs from "querystring";
export default {
  namespaced: true,
  actions: {
    // 获取用户
    get_users({}, params) {
      let url = "/api/accounts?";
      url += qs.stringify(params);
      return axios.get(url);
    }
  }
};
