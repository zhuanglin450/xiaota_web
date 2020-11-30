<template>
  <div class="personInfoVue">
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
        <div><a>职位:</a><el-input placeholder="职位" v-model="accountInfo.title"></el-input></div>
        <div><a>地址:</a><el-input placeholder="地址" v-model="accountInfo.address"></el-input></div>
        <!--div><a>验证码:</a><el-input placeholder="验证码" ></el-input></!--div-->
        <div><el-button style="width:12em; margin-top:0.25em;" type="primary" @click="postUpdaeInfo">确认</el-button></div>
    </div>
  </div>
</template>

<script>
import fetch from "../../assets/js/fetch";
import { get } from 'lodash';
//引入mapState，mapActions
import { mapState, mapActions } from "vuex";

export default {
  name: "personInfo",
  data() {
      return {
          pPassword:"",
          pPassword2:"",
          bUpdatePassword:false,
          companyoptions:[],
          departmentoptions:[],
          allDepartment:null,
          // accountInfo: {
          //   "account":"",
          //   "name":"",
          //   "phone":"",
          //   "email":"",
          //   "company":"",
          //   "department":"",
          //   "title":"",
          //   "address":"",
          //   "password":"",
          // }
      };
    },
    mounted: async function(){
      let url = this.$route.path.toLowerCase();

      if(url.indexOf("/client/personinfos") != -1 ||
        url.indexOf("/admin/personinfos") != -1
      )
      {//from customer page，from admin page

      }

      this.allDepartment = new Map();
      await this.loadCompany();
      await this.loadDepartment();
     },

  computed: {
         ...mapState({
          accountInfo: (state) => state.info.account_info, //引入info状态中定义的account_info状态变量 
        }),
    },
    created:function()
    {
      let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
      let userid = userMessage2.data.id;
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
            this.accountInfo.password = this.pPassword;
          } 
          else
          {
            this.accountInfo.password = null;
          }
              
         let userMessage2 = JSON.parse(sessionStorage.getItem("loginMsg"));
         let userid = userMessage2.data.id;
         this.setAccountInfor({
              userid: userid,
              account_info: this.accountInfo  
            });
      },

      enableUpdatePassword()
      { 

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

.stitle {
  font-family: "Microsoft YaHei","微软雅黑";  
  height: 2em;
  line-height: 2em;
  padding: 0 2em;
  background-color: #EBEEF5;
}

.content {
    margin:1em auto;
    width:32em;
}

.content div{
    height:3em;
}

.content > div {
    width:100%;
}


.content a{
    width: 6em;
    text-align: right;
    display: inline-block;
}

.el-input, .el-select {
    width:21em;
}

</style>

<style>
.personInfoVue .el-select .el-input.el-input--suffix {
  padding: 0 0.5em;
  width: 100%;
}
</style>