<template>
  <div>
    <div class="dashbaordheader">
      <a class="dashbaordtitle">路由宝管理系统</a>
      <ul class="float-right headerInfo">
        <li>欢迎你</li>
        <li style="width:4em; font-size:1.8em; text-align:right; margin-right:20px">{{userName}}</li>
        <!--li>[杭州]</！li-->
      </ul>
    </div>
    <el-container class="dashbaordnavbar">
      <el-header style="height:3em;">
        <div style="width:84%; height:100%; float:left; padding-bottom:0.25em">
          <el-menu
            style="height:100%;"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="rgb(50,64,87)"
            text-color="#fefefe"
            active-text-color="rgb(37,143,239)">
            <el-menu-item style="height:100%; line-height:3em" index="1">二维码订单</el-menu-item>
            <el-menu-item style="height:100%; line-height:3em" index="2">系统管理</el-menu-item>
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
	    <el-container>
        <el-aside width="8em">
		      <ul class="asideMenu">
			      <li v-for="item in asideMenuData" :key="item.id" style="color:#ffffff" >{{item.text}}</li>
    		  </ul>
	      </el-aside>
        <el-main>
		      <router-view/>

	      </el-main>
	    </el-container>
    </el-container>
  </div>
</template>

<script>
import fetch from "../assets/js/fetch";

export default {
  name: "admin",
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
       if(url.indexOf("usermanager") != -1)
       {
         this.changeMenu(2);
       }
       else if(url.indexOf("order") != -1)
       {
         this.changeMenu(1);
       }
       else
       {
         this.changeMenu(0);
       }

       let userMessage = JSON.parse(sessionStorage.getItem("userMessage"));
       this.userName = userMessage.data.account;
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if(key==1)
        {
          this.$router.push("/admin/orderList");
          this.changeMenu(1);
        }
        if(key==2)
        { 
          this.$router.push("/admin/usermanager");
          this.changeMenu(2);
        }

      },
      
      //更改二级菜单
      changeMenu(menuIndex)
      {        
        if(menuIndex == 1){
          this.activeIndex = '1';
          this.asideMenuData = [{
            index:1,
            text:"订单信息"
          }] 
        }
        else if(menuIndex == 2){
          this.activeIndex = '2';
          this.asideMenuData = [{
            index:2,
            text:"用户管理"
          }] 
        }
        else{
          this.activeIndex = '';
          this.asideMenuData = []
        }
        
      },
      personInfo()
      {
          this.activeIndex = '';
          this.$router.push({
            name:"AdminPersonInfo",
            params: { userid: this.$route.params.userid}});  
      },
      goOut()
      {
          let userMessage = JSON.parse(sessionStorage.getItem("userMessage"));

          let userid = userMessage.data.id;

          fetch.delete("/api/logout/"+userid)
            //成功返回
            .then(response => {
               this.$router.push({ path:"/login" });
            })
            //失败返回
            .catch(error => {
                   //this.$message.error("注销失败");
                   this.$router.push({ path:"/login" });
            });
      }
      //methods over
    },
};
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: 0px !important;
}

.admin_a {
  color: #f0f0f0;
}

.header {
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

.el-main {
  padding: 0;
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
    
}

.dashbaordnavbar {
    position: fixed;
    top: 4em;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
