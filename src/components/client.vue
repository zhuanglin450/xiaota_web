<template>
  <div class="clientVue"  style="margin-top:0">
    <div class="dashbaordheader">
      <a class="dashbaordtitle">路由宝客户系统</a>
      <ul class="float-right headerInfo">
        <li>欢迎你，</li>
        <li style="font-size:1.8em; margin-left:0.125em;">{{userName}}</li>
      </ul>
    </div>
    <el-container class="dashbaordnavbar">
      <el-header style="height:3em; ">
        <div style="width:84%; height:100%; float:left; padding-bottom:0.25em">
          <el-menu class="el-menu-demo" style="height:100%;"
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            background-color="rgb(50,64,87)"
            text-color="#fefefe"
            active-text-color="rgb(37,143,239)">
            <el-menu-item style="height:100%; line-height:3" index="1">订单列表</el-menu-item>
            <el-submenu style="height:100%; line-height:3" index="2">
                <template slot="title">新订单</template>
                <el-menu-item index="2-1">逐个添加</el-menu-item>
                <el-menu-item index="2-2">批量添加</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div style="width:15%; height:100%; float:right; line-height:1.5; font-size:12px; padding:0.8em 0">
          <div style="height:100%; float:right;">
            <el-link type="info" @click="personInfo"  style="color:#eeeeee; text-decoration:none">个人信息</el-link>
            <span style="margin-left:1em;" class="glyphicon glyphicon-log-out"></span>
            <el-link type="info" style="margin-right:0.25em; color:#eeeeee; text-decoration:none" @click="goOut">退出</el-link>
          </div>
        </div>
      </el-header>
      <el-main>
		  <router-view/>

	  </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import fetch from "../assets/js/fetch";

export default {
  name: "client",
  data() {
      return {
        userName:'',
        activeIndex: '',
        asideMenuData:[{
          index:1,
          text:"订单信息"
        }]
      };
    },
    mounted: function() {      
       let url = this.$route.path;
       
       if(url.indexOf("orderNewbatch") != -1 )
       {
         this.activeIndex = '2-2';
       }
       else if(url.indexOf("orderNew") != -1 )
       {
         this.activeIndex = '2-1';
       }
       else if(url.indexOf("order") != -1){
         this.activeIndex = '1';
       }
       else
       {
         this.activeIndex = '';
       }
       let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
       this.userName = userMessage2.data.account;
    },
    methods: {
      ...mapActions(["doLogoutAction"]),
      handleSelect(key, keyPath) {
         //console.log(key, keyPath);
        if(key==1)
        {
          this.$router.push("/client/orderlist");
          this.activeIndex = '1';
        }
        if(key=="2-1")
        { 
          this.$router.push("/client/orderNew");
          this.activeIndex = '2-1';
        }
        if(key=="2-2")
        { 
          this.$router.push("/client/orderNewbatch");
          this.activeIndex = '2-2';
        }

      },
      personInfo(){
          this.activeIndex = '';
          this.$router.push({
            name:"ClientPersonInfo",
            params: { userid: this.$route.params.userid}});  
      },
      async goOut(){

          let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
          let userid = userMessage2.data.id;

          await this.doLogoutAction({'accountId':userid});
          this.$router.push({ path:"/login" });

          // fetch.delete("/api/logout/"+userid)
          //   //成功返回
          //   .then(response => {
          //       this.$router.push({ path:"/login" });
          //   })
          //   //失败返回
          //   .catch(error => {
          //          //this.$message.error("注销失败");
          //          this.$router.push({ path:"/login" });
          //   });
      }
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

.headertitle {
  font-weight: bold;
  color: #ffffff;
  font-size: 1.875em;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  letter-spacing: 0.375em;
}

.headerInfo li {
  float: left;
  margin-left: 0.5em;
  color: #f0f0f0;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
}

.asideMenu {
	height: 2em;
	line-height: 2em;
	margin-top: 0.75em;
}

.el-header, .el-aside {
	background-color:rgb(50,64,87); 
}
 
.el-header ul.el-menu{
    border-bottom: 0px;
}

.dashbaordheader {
    height: 4em;
    line-height: 4em;
    background: #1d8ce0;
    color: #c0ccda;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 2em;
    width: 100%;
    text-align: left;
}

.dashbaordtitle {
    font-weight: bold;
    color: #ffffff;
    font-size: 2em;
    letter-spacing: 0.125em;
}

.dashbaordtitle:hover {
    text-decoration: none;
} 

.dashbaordnavbar {
    position: fixed;
    top: 4em;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
} 
</style>

<style>

.clientVue .el-menu--horizontal>.el-submenu .el-submenu__title 
{
    height:100% !important;
    line-height: 3 !important;
    border-bottom: 0px !important;
} 

</style>