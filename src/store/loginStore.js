import fetch from "../assets/js/fetch"
export default {
  state: {
    //是否登录判断
    islogin: '',
    // userInfo:{
    //   account:'',
    //   password:''
    // },
    // accounts:[],
    roles:[]
  },
  getters: {
    islogin: state => state.islogin
  },
  mutations: {
    // loginParam(state,stark) {
    //   //传入登录状态islogin
    //   state.userInfo.account = stark.account;
    //   state.userInfo.password = stark.userpass; 
    // },
    islogin(state,stark){
      
      let lislogin = JSON.parse(stark.flag);
      sessionStorage.setItem("islogin2", JSON.stringify(lislogin));
      state.islogin = lislogin;
      // state.userInfo.account = stark.username;
      // state.userInfo.password = stark.userpass;

      if(stark.flag == false)
      {
        //删除缓存
        sessionStorage.setItem("loginMsg", "");
        sessionStorage.setItem("roles", "");  
      }


    },
    // setAccounts(state,data){
    //   state.accounts=data
    //   sessionStorage.setItem("accounts",JSON.stringify(data))
    // },
    // setRoles(state,data){
    //   state.roles=data
    //   sessionStorage.setItem("roles",JSON.stringify(data))
    // }
  },
  actions: {
    async doLoginAction({ commit }, stark) {
 
      let data = await fetch.post("/api/login", stark);
      // commit("loginParam", stark);
       
      sessionStorage.setItem("loginMsg",JSON.stringify(data));
      if (data.code == 200) {
        // var appVue = document.getElementById("app").__vue__;
        // appVue.$message({ message: "用户名或密码错误", type: "error"});

        commit({ type: "islogin", flag: true}); 

        let dataR = await fetch.get("/api/roles");
        if (dataR.code == 200) {
            sessionStorage.setItem("roles",JSON.stringify(dataR.data.roles));
        }
      }
    },
    // async putPassword({ commit }, stark) {
    //   await fetch.put(
    //     "/api/accounts/" + stark.accountId + "/password",
    //     stark.password
    //   );
    // },
    async doLogoutAction({ commit }, stark) {
      await fetch.delete("/api/logout/" + stark.accountId);

      commit({ type: "islogin", flag: false}); 
      // 关闭mqtt
      // this.dispatch("stop_connect");
    }
  }
};
