<template>
  <div>
    <!-- <div class="stitle">
      <a class="float-left" style="color:#303133;">个人信息</a>
    </div> -->
    <div class="content">
        <div><a>账号:</a><el-input placeholder="账号" :readonly="true" :disabled="true" v-model="accountInfo.account"></el-input></div>
 
        <div style="height:2em" ><el-checkbox v-model="bUpdatePassword"  @change='enableUpdatePassword' >设置密码</el-checkbox></div>

        <div><a>请设置密码:</a><el-input placeholder="输入密码" :disabled="!bUpdatePassword" v-model="pPassword" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>请确认密码:</a><el-input placeholder="请确认密码" :disabled="!bUpdatePassword" v-model="pPassword2" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>姓名:</a><el-input placeholder="姓名" v-model="accountInfo.name"></el-input></div>
        <div><a>手机号码:</a><el-input placeholder="手机号码" v-model="accountInfo.phone"></el-input></div>
        <div><a>邮箱:</a><el-input placeholder="邮箱" v-model="accountInfo.email"></el-input></div>
        <div><a>单位:</a><el-input placeholder="单位" v-model="accountInfo.company"></el-input></div>
        <div><a>部门:</a><el-input placeholder="部门" v-model="accountInfo.department"></el-input></div>
        <div><a>职位:</a><el-input placeholder="职位" v-model="accountInfo.title"></el-input></div>
        <div><a>地址:</a><el-input placeholder="地址" v-model="accountInfo.address"></el-input></div>
        <!--div><a>验证码:</a><el-input placeholder="验证码" ></el-input></!--div-->
        <div><el-button style="width:12em; margin-top:0.25em;" @click="postUpdaeInfo">确认</el-button></div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';
//引入mapState，mapActions
import { mapState, mapActions } from "vuex";

export default {
  name: "personInfo",
  data() {
      return {  
          pPassword:"",
          pPassword2:"",
          bUpdatePassword:false
      };
    },
    mounted:function(){
       let url = this.$route.path.toLowerCase();

       if(url.indexOf("/client/personinfos") != -1 ||
          url.indexOf("/admin/personinfos") != -1
       )
       {//from customer page，from admin page
 
       }
     },

  computed: {
         ...mapState({
          accountInfo: (state) => state.info.account_info, //引入info状态中定义的account_info状态变量 
        }),
    },
    created:function()
    {
      let userMessage = JSON.parse(sessionStorage.getItem("userMessage"));

      let userid = userMessage.data.id;

      this.getAccountInfor(userid); 
    },
    methods: {

      //引入vuex模块info间共享的状态更新获取方法
      ...mapActions(["setAccountInfor",'getAccountInfor']),

      //双击跳转
      postUpdaeInfo(){

        //必须使用this 调用！！， 在数据绑定时也可以因为直接的名称空间已经是this了。  
          if(this.bUpdatePassword)
          {
            this.accountInfo.password = this.password;
          } 
          else
          {
            this.accountInfo.password = null;
          }
              
         let userMessage = JSON.parse(sessionStorage.getItem("userMessage"));

         let userid = userMessage.data.id;
         this.setAccountInfor({
              userid: userid,
              account_info: this.accountInfo  
            });
      },

      enableUpdatePassword()
      { 

      }
    }
};
</script>

<style scoped>

.stitle {
  font-family: "Microsoft YaHei","微软雅黑";  
  height: 2em;
  line-height: 2em;
  padding: 0 2em;
  background-color: #EBEEF5;
}

.content {
    margin-top:1em;
}
.content div{
    height:3em;
}
.content a{
    width: 6em;
    text-align: right;
    display: inline-block;
}

.el-input{
    width:21em;
}
</style>
