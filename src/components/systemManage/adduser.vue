<template>
  <div class="systemManageAdduserVue">
    <div class="stitlebar">
      <a class="float-left" style="color: royalblue; text-decoration:none;">系统管理 / 用户管理 / 添加用户 </a>
      <el-link class="float-right" type="info"  @click="goback">返回</el-link>
      <!-- <a class="float-right" style="text-decoration:underline;" @click="goback">返回</a> -->
    </div>
    <div class="content">
        <div><a>账号:</a><el-input placeholder="账号" v-model="accountInfo.account" maxlength="20"></el-input></div>
        <div><a>请设置密码:</a><el-input placeholder="输入密码" v-model="accountInfo.password" minlength="6" maxlength="20" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>请确认密码:</a><el-input placeholder="请确认密码" v-model="pPassword2" minlength="6" maxlength="20" show-password style="margin-left:0.5em"></el-input></div>
        <div><a>姓名:</a><el-input placeholder="姓名" v-model="accountInfo.name" maxlength="20"></el-input></div>
        <div><a>手机号码:</a><el-input placeholder="手机号码" v-model="accountInfo.phone" maxlength="11"></el-input></div>
        <div><a>邮箱:</a><el-input placeholder="邮箱" v-model="accountInfo.email" maxlength="32"></el-input></div>
        <div><a>单位:</a>
        <el-select filterable allow-create default-first-option placeholder="单位" v-model="accountInfo.company" maxlength="32"
            @change="changeCompanyName" >
           <el-option v-for="item in companyoptions"
              :key="item.id"
              :label="item.companyName"
              :value="item.companyName">
            </el-option>
          </el-select>
        </div>
        <div><a>部门:</a>
        <el-select filterable allow-create default-first-option placeholder="部门" v-model="accountInfo.department" maxlength="32">
           <el-option v-for="item in departmentoptions"
              :key="item.id"
              :label="item.departmentName"
              :value="item.departmentName">
            </el-option>
          </el-select>
        </div>
        <div><a>职位:</a><el-input placeholder="职位" v-model="accountInfo.title" maxlength="32" ></el-input></div>
        <div><a>地址:</a><el-input placeholder="地址" v-model="accountInfo.address" maxlength="100"></el-input></div>
        <div class="rolesSelDiv"><a style="vertical-align:top">角色:</a><div class="rolesSel">
          <el-checkbox-group v-model="selroles">
            <el-checkbox v-for="role1 in allroles" :label="role1.label" :key="role1.id"></el-checkbox>
          </el-checkbox-group></div>
          <!-- <el-select v-model="accountInfo.roles" default-first-option placeholder="请选择" class="rolesSel">
              <el-option key="1" label="1" value="1"></el-option>
              <el-option key="2" label="2" value="2"></el-option>
              <el-option key="3" label="3" value="3"></el-option>
              <el-option key="4" label="4" value="4"></el-option>
          </el-select> -->
        </div>
        <div v-if="isError" style="width:18em; height:2em; margin:0 auto" >
          <el-alert style="height:2em;" :title="errorMsg"  type="error" :closable="false"></el-alert></div>
        <!--div><a>验证码:</a><el-input placeholder="验证码" ></el-input></!--div-->
        <div><el-button style="width:8em; margin-top:0.125em" type="primary" @click="postUpdaeInfo">确认</el-button></div>
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
            'roles':""
          },
          allroles:[],
          selroles:[],                    
          isError:false,
          errorMsg:"",
          companyoptions:[],
          departmentoptions:[],
          allDepartment:null,
      };
    },
    mounted: async function(){
        let roles = JSON.parse(sessionStorage.getItem("roles"));
        if(roles != null)
        {
            let arr = [];
            roles.forEach(ele => {
                arr.push({
                    id: ele.id,
                    label: ele.roleDisplayName
                });
            });
            this.allroles = arr;
        }

      //  let url = this.$route.path.toLowerCase();

        
        this.allDepartment = new Map();
        await this.loadCompany();
        await this.loadDepartment();
     },
    created:function()
    {
      // let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
      // let userid = userMessage2.data.id;
      // this.getAccountInfor(userid);
    },
    methods: {
      //双击跳转
      postUpdaeInfo(){
        //必须使用this 调用！！， 在数据绑定时也可以因为直接的名称空间已经是this了。            
        
        let roles = JSON.parse(sessionStorage.getItem("roles"));
        if(roles == null)
        {
          this.isError = true;
          this.errorMsg = "角色不能为空"
          return ;
        }

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
        if(this.selroles.length == 0 )
        {
          this.isError = true;
          this.errorMsg = "请选择角色"
          return ;
        }
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (this.accountInfo.email != '' && !regEmail.test(this.accountInfo.email)) 
        {
          this.isError = true;
          this.errorMsg = "邮箱格式不正确"
          return ;
        }
        

        this.isError = false;

        //查角色id
        let str = "";
        this.selroles.forEach(ele=> {
            roles.forEach(ele2 => {
                if(ele2.roleDisplayName == ele)
                {
                    str += ele2.id + ",";
                }
            });
        });
        this.accountInfo.roles = str.substr(0, str.length-1);

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
      },
      
      async loadCompany()
      {
          let response = await fetch.get("/api/company");
          if(response.code == null)
          {
              this.$message.error("请求数据失败!");
              return;
          }
          if(response.code != 200)
          {
              this.$message.error( response.message);
              return;
          }
 
            //请求成功
          let table = response.data.companyList;  
          this.companyoptions = table;
      },
      async loadDepartment()
      {  
          let response = await fetch.get("/api/department"); 
          if(response.code == null)
          {
            this.$message.error("请求数据失败!");
            return;
          }
          if(response.code != 200)
          {
              this.$message.error( response.message);
              return;
          }

          //成功返回
          let depts = response.data.departments;
          depts.forEach( ele => {
                if( ele.departmentName == null || ele.departmentName == '')
                  return;

                let cp = this.companyoptions.find(item => item.id == ele.companyId);
                if(cp != undefined && cp != null)
                {
                  if(this.allDepartment.has( cp.companyName))
                  {
                    let arr = this.allDepartment.get( cp.companyName );
                    arr.push(ele);
                  }
                  else
                  {
                    let arr = [];
                    arr.push(ele);
                    this.allDepartment.set(cp.companyName, arr);
                  }
                }
            });               
      },
      changeCompanyName()
      {
          this.accountInfo.department = "";
          if(!this.allDepartment.has(this.accountInfo.company))
          {
              this.departmentoptions = [];
          }
          else
          {
              this.departmentoptions = this.allDepartment.get(this.accountInfo.company);
          }
      },

    }
};
</script>

<style scoped>

.el-link.el-link--info
{
  color: #fefefe;
}

.el-link.el-link--info:hover {
    color: #ffffff;
}

.stitlebar {
  font-family: "Microsoft YaHei","微软雅黑";  
  height: 2em;
  line-height: 1.25;
  padding: 0.4em 2em;
  background-color: lightblue;
}

.content {
    padding-bottom: 5.5em;
    margin-top:1em;
}
.content > div{
    height:2.9em;
}
.content a{
    width: 6em;
    text-align: right;
    display: inline-block;
}

.el-input, .el-select {
    width:21em;
}

.rolesSelDiv  {
  min-height: 1.8em;
  height: auto !important;
  margin-bottom: 0.2em;
}

.rolesSel  {
  width:21em;
  display: inline-block;
  text-align: left;
  padding-left: 1em;
}
 
</style>

<style>
.systemManageAdduserVue .el-select .el-input.el-input--suffix {
  padding: 0 0.5em;
  width: 100%;
}
</style>