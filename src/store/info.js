import fetch from "../assets/js/fetch"
export default{
    state:{
        account_info:'',
        account_info_server:''
    },
    mutations:{
        setaccountInfo(state,data){
            state.account_info=data;
        },
        setaccountInfoServer(state,data){
            state.account_info_server = data;
        }
    },
    actions:{
        //获取用户
        async getAccountInfor({commit}, stark){
            let response = await fetch.get("/api/accounts/"+stark);

            if(response.code == 200 && response.data.errorCode ==0) {

                commit("setaccountInfo",response.data.account_info);     
                commit("setaccountInfoServer",response.data.account_info);                        
              }
              else
               {
                var appVue = document.getElementById("app").__vue__;
                appVue.$message.error("获取个人信息失败");
              }
        }, 
        async setAccountInfor({commit}, stark){
            let response = await fetch.put("/api/accounts/"+stark.userid,stark.account_info);

            stark.account_info.password = null;
            if(response.code == 200 && response.data.errorCode ==0) {

                commit("setaccountInfoServer", stark.account_info);
                var appVue = document.getElementById("app").__vue__;
                appVue.$message.success("更新个人信息成功");
              }
              else
               {
                   var appVue = document.getElementById("app").__vue__;
                    appVue.$message.error("更新个人信息失败");
              }            
        }, 
    }
}