<template>
  <div class="bg">
    <div class="login-container">
      <h1 class="title">路由宝</h1>
      <!-- ref="ruleForm", rules 是必须的  -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="4em" >
        <el-form-item label="账号:" prop="account" >
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pass">
          <el-input v-model="ruleForm.pass" placeholder="密码" auto-complete="off" type="password"></el-input>
        </el-form-item>
          <!-- <div class="alert alert-danger" v-if="isError" style="margin-top: 10px;padding: 5px;">
              {{errorMsg}}!
          </div> -->
          <el-form-item >
        <el-alert :title="errorMsg" v-if="isError" type="error" :closable="false"></el-alert>
          </el-form-item>
        <div style="text-align: center; margin-left: 20px">
          <el-button id="btnlogin" @click="submitForm('ruleForm')" type="primary" style="width:60%;" :loading="logining" >
              登录
          </el-button>
        </div>
        <div style="text-align:left; margin-top:0.9em; margin-left:5em  ">
	    <el-link type="primary" @click="forgotpassword" >忘记密码</el-link>
	    <span> &ensp; &ensp; &ensp; &ensp; &ensp; </span>
            <span style="color:skyblue">     还没有账号？<el-link type="primary" @click="register" >马上注册</el-link> 
	    </span>
        </div> 

      </el-form>
    </div>
  </div>
</template>

<script>

// refs 子父组件
// $route name params/ path query
// vue代理
import { mapActions } from "vuex";

var _this;
// import "../assets/js/util";
export default {
  name:"login",
  data() {
    _this = this;

    //ele-ui form 校验写法
    var validatePass = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        //var crypto = require("crypto");
        //function cryp(word) {
        //  var md5 = crypto.createHash("md5");
        //  return md5.update(word).digest("hex");
        //}
        // this.$store.commit({
        //   type: "login",
        //   username: cryp(this.ruleForm.name),
        //   userpass: cryp(this.ruleForm.pass),
        // });
        //   this.$store.commit({
        //   type: "login",
        //   useraccount: this.ruleForm.account,
        //   userpass: this.ruleForm.pass,
        // });
        // await this.getUserInfo();
        // let code = JSON.parse(sessionStorage.getItem("code"));
        // if (code !== 200) {
        //   callback(new Error("密码错误"));
        // } else {
        //   callback();
        // }
      }
    };

    var validateaccount = (rule, value, callback) => {
      let nameInfo = [];
      // JSON.parse(sessionStorage.getItem("accounts")).map((item, i) => {
      //   nameInfo.push(item.name);
      // });
       if (value === "") {
         callback(new Error("请输入用户名"));
      // } else if (nameInfo.indexOf(value) === -1) {
      //   callback(new Error("用户不存在"));
       } else {
         callback();
       }
    };
    
    return {
      logining: false,
      //account, pass需要rules对应起来，大小写匹配
      ruleForm: {
        account: "",
        pass: ""
      }, 
      rules: {
        account: [{ validator: validateaccount, trigger: "change" }],
        pass: [{ validator: validatePass, trigger: "change" }],
      },
      checked: true,
      isError: false,
      errorMsg: ""
    };
  },
  
  mounted() {
    document.onkeydown = function (e) {
      var event = e || event;
      if (event.keyCode === 13) {
        let btnlogin = document.getElementById("btnlogin");
        // btnlogin.click();
        submitForm('ruleForm');
      }
    };
  },
  created() {
  },
  methods: {
    ...mapActions(["doLoginAction"]),
    async submitForm(formName) {
 
      this.$refs[formName].validate(async (valid) => {
        if (valid) {

          this.$store.commit({
                      type: "login",
                      account: this.ruleForm.account,
                      userpass: this.ruleForm.pass,
            });
            
            await this.doLoginAction();

            let code = JSON.parse(sessionStorage.getItem("code"));
            if (code !== 200) {
                this.$message({
                message: "用户名或密码错误",
                type: "error",
              });
              return;
            }

          let userMessage = JSON.parse(sessionStorage.getItem("userMessage"));          
          sessionStorage.setItem(
            "oldPassword",
            JSON.stringify(this.ruleForm.pass)
          );

          // let permissions = userMessage;
          // let permissionBits = [];
          // permissions.map((item, i) => {
          //   for (let i = 0; i < userRolePermissions.length; i++) {
          //     if ((item.bit & userRolePermissions[i]) === item.bit) {
          //       permissionBits.push(item.bit);
          //     }
          //   }
          // });
 
          this.$message({ message: "恭喜，登录成功", type: "success"});
          this.$store.commit({ type: "islogin", flag: true});
        // if (sessionStorage.getItem("history_path")) {
        //     // 跳转审核后，清除历史
        //     this.$router.push(sessionStorage.getItem("history_path"));
        //     sessionStorage.removeItem("history_path");
        //   } else {
        //     this.$router.push("entry");
        //   }

          
            //route to different home page accroding to role
            var roles = userMessage.data.roles;
            
            if(roles.find( x=>x.name.toLowerCase()=='admin'))
            {
             this.$router.push({ name:"adminQrOrderList"});
            }
            else if(roles.find( x=>x.name.toLowerCase()=='business_man')){
              //later it should be no account manage permission
              this.$router.push({ name:"adminQrOrderList"});
            }
            else
            {                
              if( roles.find( x=>x.name.toLowerCase()=='customer_order'))
              {
               //   query: { userid: response.data.data.id} });
                this.$router.push({ name:"ClientOrderList"});
              }
            }

          // }
        } else {
          this.$message({
            message: "抱歉，登录失败",
            type: "warning",
          });
        }
      });
    },
    register()
    {
        this.$router.push("/selfRegister");
    },
    forgotpassword()
    {
    },  
  },
  destroyed: function() {
    // console.log("destroyed vue");
    document.onkeydown = null;
  },
};

//快捷键登录
// $(function() {
//   document.onkeydown = function(e) {
//     var ev = document.all ? window.event : e;
//     if (ev.keyCode == 13) {
//       //enter key
//       _this.login();
//     }
//   };
// });
</script>

<style scoped>
.bg {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  /*background: url(assets/bg1.jpg) center !important;
    background-size: cover;*/
  /*background-image: url("../assets/img/background.jpg");*/
  filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  margin: 8em auto;
  border: 2px solid #8492a6;
  width: 450px;
  padding: 35px 35px 15px 35px;
}

.title {
  color:cadetblue;
  width: 380px;
  margin-top: 0em;
  margin-bottom: 1em;
  text-align: center;
  /*color: #505458;*/
  font-weight: bold;
  font-size: 2.75em;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  letter-spacing: 0.375em;  
}

.el-input {
  width:100%
}

.el-form-item__content {
  line-height: 2em;
}

.el-alert {
  padding: 0 1em;
  line-height: 2em;
}
</style>