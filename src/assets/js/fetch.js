import Axios from "axios";

import store from "../../store/index";
import router from "../../router/index.js";

//响应拦截
Axios.interceptors.response.use(
  response => {
    
    if (response.status !=200 || response.data.code == undefined ) {
      return Promise.reject(response);
    }
    
    let rdate = response.data;
    // console.error(error.response);
    let appVue = document.getElementById("app").__vue__;
    switch (rdate.code) {
      case 200:
        return response;
      case 401:
        // let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
        store.commit({ type: "islogin", flag: false });
        // await store.dispatch("doLogoutAction", { accountId: userMessage2.id });
        router.push("/");
        if (sessionStorage.getItem("preErrStatus") != 401) {
          appVue.toast("请求超时", "danger", "操作提示");
        }
        sessionStorage.setItem("preErrStatus", rdate.code);
        return response;
      case 400:
        // appVue.toast(rdate.message, "warning", "操作提示");
        break;
      default: 
        // appVue.toast(rdate.message, "danger", "操作提示");
        break;
    }
    // 记录上次请求，防止多次401错误提示
    sessionStorage.setItem("preErrStatus", rdate.code);
    return response;
  },
  error => {
    let appVue = document.getElementById("app").__vue__;
    // if (error == undefined || error.response == undefined) {
    //   return Promise.reject(error);
    // }

    appVue.toast("请求失败", "warning", "操作提示");
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
