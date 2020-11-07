import Axios from "axios";

import store from "../../store/index";
import router from "../../router/index.js";

//响应拦截
Axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error == undefined || error.response == undefined) {
      return Promise.reject(error);
    }
    if (error.response) {
      // console.error(error.response);
      let appVue = document.getElementById("app").__vue__;
      switch (error.response.status) {
        case 401:
          let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
          store.commit({ type: "islogin", flag: false });
          await store.dispatch("deletLogin", { accountId: userMessage2.id });
          router.push("/");
          if (sessionStorage.getItem("preErrStatus") != 401) {
            appVue.toast(error.response.data.message, "danger", "操作提示");
          }
          break;
        case 400:
          appVue.toast(error.response.data.message, "warning", "操作提示");
          break;
        default:
          appVue.toast(error.response.data.message, "danger", "操作提示");
          break;
      }
      // 记录上次请求，防止多次401错误提示
      sessionStorage.setItem("preErrStatus", error.response.status);
    }
    return Promise.reject(error);
  }
);
Axios.defaults.withCredentials = true;
const fetch = {
  get: function(url) {
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then(
          ({ data }) => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },
  post: function(url, params, config) {
    return new Promise((resolve, reject) => {
      Axios.post(url, params, config)
        .then(
          ({ data }) => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },
  put: function(url, params) {
    return new Promise((resolve, reject) => {
      Axios.put(url, params)
        .then(
          ({ data }) => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  },
  delete: function(url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, params)
        .then(
          ({ data }) => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default fetch;
