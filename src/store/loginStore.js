import fetch from "../assets/js/fetch"
export default {
  state: {
    //是否登录判断
    islogin: '',
    userInfo:{
      account:'',
      password:''
    },
    userMessage:'',
    accounts:[],
    roles:[]
  },
  getters: {
    islogin: state => state.islogin
  },
  mutations: {
    login(state,stark) {
      //传入登录状态islogin
      state.userInfo.account = stark.account;
      state.userInfo.password = stark.userpass; 
    },
    islogin(state,stark){
      state.userInfo.account = stark.username;
      state.userInfo.password = stark.userpass;
      let islogin = JSON.parse(stark.flag);
      sessionStorage.setItem("islogin", JSON.stringify(islogin));
      state.islogin = islogin;
      state.userInfo.account = stark.username;
      state.userInfo.password = stark.userpass;
    },
    setUserMessage(state,data){

      state.userMessage=data
      sessionStorage.setItem("userMessage",JSON.stringify(data))
      sessionStorage.setItem("code",JSON.stringify(data.code))
    },
    setAccounts(state,data){
      state.accounts=data
      sessionStorage.setItem("accounts",JSON.stringify(data))
    },
    setRoles(state,data){
      state.roles=data
      sessionStorage.setItem("roles",JSON.stringify(data))
    }
  },
  actions: {
    async getLogin({commit}) {
 
      ;//let data=await fetch.get("/api/accounts")
      ;//commit("setAccounts",data.data.accounts)
      //let data1=await fetch.get("/api/roles")
      //commit("setRoles",data1.data.roles)
      //let data2=await fetch.get("/api/permissions")
      //sessionStorage.setItem("permissions",JSON.stringify(data2.data.permissions))
    },
    async testAction({commit}) {

      let i =0;
      i++;
      ;//let data=await fetch.get("/api/accounts")
      ;//commit("setAccounts",data.data.accounts)
      //let data1=await fetch.get("/api/roles")
      //commit("setRoles",data1.data.roles)
      //let data2=await fetch.get("/api/permissions")
      //sessionStorage.setItem("permissions",JSON.stringify(data2.data.permissions))
    },
    async doLoginAction({ commit, state }) {
 
      let data = await fetch.post("/api/login", state.userInfo);
      commit("setUserMessage", data);
    },
    async putPassword({ commit }, stark) {
      await fetch.put(
        "/api/accounts/" + stark.accountId + "/password",
        stark.password
      );
    },
    async deletLogin({ commit }, stark) {
      await fetch.delete("/api/logout/" + stark.accountId);
      // 关闭mqtt
      this.dispatch("stop_connect");
    }
  }
};
