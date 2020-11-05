<template>
  <div>
    <div class="stitlebar">
      <a class="float-left" style="color: royalblue; text-decoration:none;">系统管理 / 用户管理 / 添加用户 </a>
      <a class="float-right" style="text-decoration:underline;" @click="goback">返回</a>
    </div>
    <div class="content">
        <div><a>账号:</a><el-input placeholder="账号" v-model="accountInfo.account" maxlength="20"></el-input></div>
        <div><a>请设置密码:</a><el-input placeholder="输入密码" v-model="accountInfo.password" minlength="6" maxlength="20" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>请确认密码:</a><el-input placeholder="请确认密码" v-model="pPassword2" minlength="6" maxlength="20" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>姓名:</a><el-input placeholder="姓名" v-model="accountInfo.name" maxlength="20"></el-input></div>
        <div><a>手机号码:</a><el-input placeholder="手机号码" v-model="accountInfo.phone" maxlength="11"></el-input></div>
        <div><a>邮箱:</a><el-input placeholder="邮箱" v-model="accountInfo.email" maxlength="32"></el-input></div>
        <div><a>单位:</a><el-input placeholder="单位" v-model="accountInfo.company" maxlength="32"></el-input></div>
        <div><a>部门:</a><el-input placeholder="部门" v-model="accountInfo.department" maxlength="32"></el-input></div>
        <div><a>职位:</a><el-input placeholder="职位" v-model="accountInfo.title" maxlength="32" ></el-input></div>
        <div><a>地址:</a><el-input placeholder="地址" v-model="accountInfo.address" maxlength="100"></el-input></div>
        <div v-if="isError" style="width:18em; height:2em; margin:0 auto" >
          <el-alert  style="height:2em;"  :title="errorMsg"  type="error" :closable="false"></el-alert></div>
        <!--div><a>验证码:</a><el-input placeholder="验证码" ></el-input></!--div-->
        <div><el-button style="width:12em; margin-top:0.25em;" @click="postUpdaeInfo">确认</el-button></div>
    </div>
  </div>
</template>

<script>

import fetch from "../../assets/js/fetch";
import qs from "querystring";

// import { get } from 'lodash';

export default {
  name: "adminAdduser",
  data() {
      return {
          pPassword2:"", 
          accountInfo:{
            'account':"",
            'name':"",
            'password':"",
            'email':"",
            'title':"",
            'phone':"",
            'company':"",
            'department':"",
            'address':"",
            'roles':"2"
          },
          isError:false,
          errorMsg:""

      };
    },
    mounted:function(){
       let url = this.$route.path.toLowerCase();
     },
    created:function()
    {
      // let userMessage = JSON.parse(sessionStorage.getItem("userMessage"));
      // let userid = userMessage.data.id;
      // this.getAccountInfor(userid);
    },
    methods: {
      //双击跳转
      postUpdaeInfo(){
        //必须使用this 调用！！， 在数据绑定时也可以因为直接的名称空间已经是this了。            

        if(this.accountInfo.account == "")
        {
          this.isError = true;
          this.errorMsg = "账号不能为空"
          return ;
        }
        if(this.accountInfo.password == "")
        {
          this.isError = true;
          this.errorMsg = "密码不能为空"
          return ;
        }
        if(this.accountInfo.password != this.pPassword2 )
        {
          this.isError = true;
          this.errorMsg = "两次密码不一样"
          return ;
        }
        if(this.accountInfo.phone == "" )
        {
          this.isError = true;
          this.errorMsg = "手机号不能为空"
          return ;
        }
        if(this.accountInfo.email == "" )
        {
          this.isError = true;
          this.errorMsg = "邮箱不能为空"
          return ;
        }
        this.isError = false;


        let params = this.accountInfo;
        fetch.post("/api/accounts", params)
            //成功返回
            .then(response => {
                if(response.code != 200 || response.data.errorCode !=0)
                {
                    if(131073 == response.code) 
                      this.$alert('提交失败，账号名已存在!', '提示', { type: 'error', confirmButtonText: '确定' });
                    else
                      this.$alert('提交失败', '提示', { type: 'error', confirmButtonText: '确定' });
                    return;
                }
                    
                this.$alert('提交成功', '提示', { type: 'success', confirmButtonText: '确定' });
                 
            })
            //失败返回
            .catch(error => {
                this.$alert('提交失败', '提示', { type: 'error', confirmButtonText: '确定' });
            });
      },

      goback()
      { 
        this.$router.push("/admin/manageusers");
      }

    }
};
</script>

<style scoped>

.stitlebar {
  font-family: "Microsoft YaHei","微软雅黑";  
  height: 2em;
  line-height: 2em;
  padding: 0 2em;
  background-color: lightblue;
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
