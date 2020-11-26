<template>
  <div>
    <div class="dashbaordheader">
      <a class="dashbaordtitle">路由宝管理系统</a>
      <ul class="float-right headerInfo">
        <li>欢迎你，</li>
        <li style="font-size:1.5em; margin-left:0.125em;">{{userName}}</li>
      </ul>
    </div>
    <el-container class="dashbaordnavbar">
      <el-header style="height:3em;">
        <div class="menubar">
          <el-menu style="height:100%;"
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            background-color="rgb(50,64,87)"
            text-color="#fefefe"
            active-text-color="rgb(37,143,239)">
            <el-menu-item index="1">二维码订单</el-menu-item>
            <el-menu-item v-if="bMenuUser" index="2">系统管理</el-menu-item>
            <el-menu-item index="3">公司</el-menu-item>
          </el-menu>
        </div>
        <div class="gooutbar">
          <div style="height:100%; text-align:right;">
            <el-link type="info" @click="personInfo" style="color:#eeeeee; text-decoration:none">个人信息</el-link>
            <span style="margin-left:1em;" class="glyphicon glyphicon-log-out"></span>
            <el-link type="info" style="margin-right:0.25em; color:#eeeeee; text-decoration:none" @click="goOut">退出</el-link>
          </div>
        </div>
      </el-header>
      	<el-container>
            <el-aside width="8em">
	        <ul class="asideMenu">
	            <li v-for="item in asideMenuData" :key="item.index" style="color:#ffffff">{{item.text}}</li>
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
import { mapActions } from "vuex";
import fetch from "../assets/js/fetch";

export default {
  name: "admin",
  data() {
      return {
        bMenuUser : false,
        userName:'',
        activeIndex: '',  //1 用户 2 订单 3 公司
        asideMenuData:[{
          index:1,
          text:"订单信息"
        }]
      };
    },
    mounted: function() {
      //  let rol = sessionStorage.getItem("roles") ;
       let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
       if(userMessage2 != null && userMessage2.data !=null && userMessage2.data.roles !=null)
       {
          let roles = userMessage2.data.roles;
          if(roles.find( x=>x.name.toLowerCase()=='admin') )
          {
            this.bMenuUser = true;
          }
       }
       
       let url = this.$route.path;
       if(url.indexOf("user") != -1)
       {
         this.changAsideMenu(2);
       }
       else if(url.indexOf("order") != -1)
       {
         this.changAsideMenu(1);
       }
       else if(url.indexOf("company") != -1)
       {
         this.changAsideMenu(3);
       }
       else
       {
         this.changAsideMenu(0);
       }

       this.userName = userMessage2.data.account;
    },
    methods: {
      ...mapActions(["doLogoutAction"]),
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if(key==1)
        {
          this.$router.push("/admin/orderList"); //只修改二级路由 故本vue不重新加载 侧边栏不自动更新
          this.changAsideMenu(1);
        }
        else if(key==2)
        { 
          this.$router.push("/admin/manageusers");
          this.changAsideMenu(2);
        }
        else if(key==3)
        { 
          this.$router.push("/admin/companys");
          this.changAsideMenu(3);
        }
      },
      
      //更改二级菜单
      changAsideMenu(menuIndex)
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
            index:1,
            text:"用户管理"
          }] 
        }
        else if(menuIndex == 3){
          this.activeIndex = '3';
          this.asideMenuData = [{
            index:1,
            text:"公司管理"
          }] 
        }
        else{
          this.activeIndex = '';
          this.asideMenuData = []
        }
        
      },
      personInfo()
      {
          this.changAsideMenu(0);
          this.$router.push({
            name:"AdminPersonInfo",
            params: { userid: this.$route.params.userid}});  
      },
      async goOut()
      {
          let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
          let userid = userMessage2.data.id;

          await this.doLogoutAction({'accountId':userid});
          this.$router.push({ path:"/login" });

      //      fetch.delete("/api/logout/"+userid)
      //       //成功返回
      //       .then(response => {
      //          this.$router.push({ path:"/login" });
      //       })
      //       //失败返回
      //       .catch(error => {
      //              //this.$message.error("注销失败");
      //              this.$router.push({ path:"/login" });
      //       });
       }
      //methods over
    },
};
</script>

<style scoped>
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

.asideMenu {
  height: 2em;
  line-height: 2em;
  margin-top: 0.75em;
}

.el-header, .el-aside {
  background-color:rgb(50,64,87); 
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

.el-menu-item {
  height:100%;
  line-height: 3em;
}

.menubar {
  float:left; 
  width:84%; 
  height:100%; 
  padding-bottom:0.25em;
}

.gooutbar {
  float:right;
  width:15%;
  height:100%;  
  line-height:1.5; 
  font-size:12px; 
  padding:0.8em 0;
}

.menubar .el-menu.el-menu--horizontal {
  border-bottom: 0px;
}

</style>
