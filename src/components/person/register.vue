<template>
  <div>
    <div class="header1">
      <a class="headertitle1">路由宝</a>    
    </div> 
    <div class="content1">
        <div><a>用户名:</a><el-input placeholder="用户名" v-model="pName"></el-input></div>
        <div><a>请设置密码:</a><el-input placeholder="请设置密码" v-model="pPassword" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>请确认密码:</a><el-input placeholder="请确认密码" v-model="pPassword" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>姓名:</a><el-input placeholder="姓名" v-model="pShowname"></el-input></div>
        <div><a>手机号码:</a><el-input placeholder="手机号码" v-model="pTel"></el-input></div>
        <div><a>邮箱:</a><el-input placeholder="邮箱" v-model="pEmail"></el-input></div>
        <div><a>单位:</a><el-input placeholder="单位" v-model="pCompany"></el-input></div>
        <div><a>部门:</a><el-input placeholder="部门" v-model="pBumen"></el-input></div>
        <div><a>职位:</a><el-input placeholder="职位" v-model="pZhiwei"></el-input></div>
        <div><a>地址:</a><el-input placeholder="地址" v-model="pAddr"></el-input></div>
        <div><a>验证码:</a><el-input placeholder="验证码" ></el-input></div>
        <div><el-button type="primary" style="width:12em; margin-top:0.5em;">立即注册</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
      return { 
          pName:"",
          pShowname:"",
          pTel:"",
          pEmail:"",
          pCompany:"",
          pBumen:"",
          pZhiwei:"",
          pAddr:"",
      };
    },
    mounted: function() {      
       let url = this.$route.path;
       if(url.indexOf("usermanager") != -1)
       {
       }
    },
    methods: {
      
      //methods over
    },
};
</script>

<style scoped>

.el-link.el-link--info
{
  color: #fbfbfb;
}

.el-link.el-link--info:hover {
    color: #ffffff;
}


.header1 {
  height: 4em;
  line-height: 4em;
  background: #1d8ce0;
  color: #c0ccda;
  padding: 0 2em;
  width: 100%;
  text-align: left;
}

.headertitle1 {
  font-weight: bold;
  color: #ffffff;
  font-size: 1.875em;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  letter-spacing: 0.375em;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-menu.el-menu--horizontal {
  border-bottom: 0px;
}


.el-header, .el-aside {
	background-color:rgb(50,64,87); 
}

.el-submenu__title{
    height:100% !important;
    line-height: 3em !important;
}

.content1 {
    margin-top:1.5em;
}
.content1 div{
    height:3em;
}
.content1 a{
    width: 6em;
    text-align: right;
    display: inline-block;
    color:#606266;
}
</style>
