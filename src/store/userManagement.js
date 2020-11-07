import fetch from "../assets/js/fetch"
export default{
    state:{
        accounts:[]
    },
    mutations:{
        // setAccounts(state,data){
        //     state.accounts=data
        // }
    },
    actions:{
        //获取用户列表
        // async getAccounts({commit}){
        //     let data=await fetch.get("/api/accounts?roles=&offset=&limit=99999")
        //     commit("setAccounts",data.data.accounts)
        // },
        //添加用户
        // async postUser({commit},stark){
        //     await fetch.post("/api/accounts",stark)
        // },
        //编辑用户信息
        // async edit_user({commit},stark){
        //     await fetch.put("/api/accounts/"+stark.accountId,stark.user_form)
        // },
        //重置密码
        // resetWord({commit},stark){
        //     fetch.delete("/api/accounts/"+stark.accountId+"/password")
        // },
        //删除用户信息
        // async deleteUser({commit},stark){
        //     await fetch.delete("/api/accounts/"+stark.accountId)
        // }
    }
}