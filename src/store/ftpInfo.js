import axios from "../assets/js/fetch";
export default {
  namespaced: true,
  actions: {
    /**
     * 获取FTP信息
     */
    get_ftp_settings({}, params) {
      let url = `/api/storage_info/ftp_settings`;
      return axios.get(url);
    },
    /**
     * 设置ftp地址
     */
    set_ftp_settings({}, params) {
      let url = `/api/storage_info/ftp_settings`;
      return axios.put(url, params);
    },
    /**
     * 测试ftp地址
     */
    test_ftp_settings({}, params) {
      let url = `/api/storage_info/ftp_connection_test`;
      return axios.put(url, params);
    }
  }
};
