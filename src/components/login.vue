<template>
  <div class="bg">
    <div class="login-container">
      <h1 class="title">路由宝</h1>
      <el-form :model="ruleForm2" label-position="left" label-width="4em">
        <el-form-item label="账号:" prop="account">
          <el-input type="text" v-model="ruleForm2.account" @change="onChange" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="checkPass">
          <el-input v-model="ruleForm2.checkPass" placeholder="密码" @focus="onKeyup" auto-complete="off" type="password" ></el-input>
        </el-form-item>
          <!-- <div class="alert alert-danger" v-if="isError" style="margin-top: 10px;padding: 5px;">
              {{errorMsg}}!
          </div> -->
          <el-form-item >
        <el-alert :title="errorMsg" v-if="isError" type="error" :closable="false"></el-alert>
          </el-form-item>
        <div style="text-align: center; margin-left: 20px">
          <el-button @click="login" type="primary" style="width:60%;" :loading="logining">
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

var _this;
// import "../assets/js/util";
export default {
  name:"login",
  data() {
    _this = this;
    return {
      logining: false, 
      ruleForm2: {
        account: "",
        checkPass: ""
      }, 
      checked: true,
      isError: false,
      errorMsg: ""
    };
  },
  methods: {
    register()
    {
        this.$router.push("/SelfRegister");
    },
    forgotpassword()
    {
    	;
    },
    validateForm() {
      this.errorMsg = "";
      var iserror = false;
      if (this.ruleForm2.account == null || this.ruleForm2.account == "" ) {
        iserror = true;
        this.errorMsg = "账号不能为空";
        return true;
      }
      if (this.ruleForm2.checkPass == null || this.ruleForm2.checkPass == "") {
        iserror = true;
        this.errorMsg = "密码不能为空";
        return true;
      }
      return iserror;
    },

    onChange: function() {
      // this.isError = this.validateForm();
    },
    onKeyup: function() {
    //   if (
    //     isStringEmpty(this.ruleForm2.name) &&
    //     !isStringEmpty(_this.ruleForm2.account)
    //   ) {
    //     // $.ajax({
    //     //   url: this.submitUrl,
    //     //   type: "POST",
    //     //   dataType: "json",
    //     //   data: { account: _this.ruleForm2.account },
    //     //   success: function(data) {
    //     //     _this.isError = data.status == 0;
    //     //     if (!_this.isError) {
    //     //       _this.ruleForm2.name = data.info.name;
    //     //     } else {
    //     //       _this.errorMsg = "未找到匹配的姓名！";
    //     //     }
    //     //   },
    //     //   error: function(info) {
    //     //     _this.errorMsg = "服务器访问出错";
    //     //     _this.isError = true;
    //     //   }
    //     // });
    //   }
    //  this.isError = this.validateForm();
    },
    reset: function() {
      this.ruleForm2.account = "";
      this.ruleForm2.checkPass = "";
    },

    login: function() {
      
      this.isError = this.validateForm();
      if (this.isError) {
        return ;
      }

      let params = {
          'account': this.ruleForm2.account, // 'zhuang_admin',
          'password': this.ruleForm2.checkPass // '123456'
      };
      this.$axios.post("/api/login", params)
          //成功返回
          .then(response => {
              if(response.status != 200)
              {
                _this.errorMsg = "服务器访问出错";
                _this.isError = true;
                return;
              }
              
              if(response.data.code != 200)
              {
                _this.errorMsg = "账号或密码错误";
                _this.isError = true;
                return;
              }

              // sessionStorage  
              //route to different home page accroding to role
              var roles = response.data.data.roles;
              
              if(roles.find( x=>x.name.toLowerCase()=='admin'))
              {
                this.$router.push({ name:"adminQrOrderList", 
                          params: { userid: response.data.data.id} });
              }
              else if(roles.find( x=>x.name.toLowerCase()=='business_man')){
                //later it should be no account manage permission
                this.$router.push({ name:"adminQrOrderList", 
                          params: { userid: response.data.data.id} });
              }
              else
              {                
                if( roles.find( x=>x.name.toLowerCase()=='customer_order'))
                {
                  //   query: { userid: response.data.data.id} });
                  this.$router.push({ name:"ClientOrderList", 
                      params: { userid: response.data.data.id} });
                }
              }	 
          })
          //失败返回
          .catch(error => {
              _this.errorMsg = "服务器访问出错";
              _this.isError = true;
                
          });
    }
  },

  mounted: function() {},
  destroyed: function() {
    console.log("destroyed vue");
    document.onkeydown = null;
  }
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