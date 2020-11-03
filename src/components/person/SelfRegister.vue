<template>
  <div>
    <div class="header1">
      <a class="headertitle1">路由宝</a>    
    </div> 
    <div class="content1">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="7em">
        <el-form-item label="账号:" prop="pAccount" >
          <el-input v-model="ruleForm.pAccount" placeholder="账号" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="请设置密码:" prop="pPassword" >
          <el-input v-model="ruleForm.pPassword" placeholder="请设置密码" maxlength="20" minlength="6"  show-password></el-input>
        </el-form-item>
        <el-form-item label="请确认密码:" prop="pPassword2" >
          <el-input v-model="ruleForm.pPassword2" placeholder="请确认密码" maxlength="20" minlength="6"  show-password></el-input>
        </el-form-item>
         <el-form-item label="姓名:" prop="pShowname" >
          <el-input v-model="ruleForm.pShowname" placeholder="姓名" maxlength="20"></el-input>
        </el-form-item>
         <el-form-item label="手机号码:" prop="pTel" >
          <el-input v-model="ruleForm.pTel" placeholder="手机号码" maxlength="11"></el-input>
        </el-form-item>
         <el-form-item label="邮箱:" prop="pEmail" >
          <el-input v-model="ruleForm.pEmail" placeholder="邮箱" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="单位:" prop="pCompany" >
          <el-input v-model="ruleForm.pCompany" placeholder="单位" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="部门:" prop="pBumen" >
          <el-input v-model="ruleForm.pBumen" placeholder="部门" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="职位:" prop="pZhiwei" >
          <el-input v-model="ruleForm.pZhiwei" placeholder="职位" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="pAddr" >
          <el-input v-model="ruleForm.pAddr" placeholder="地址" maxlength="100"></el-input>
        </el-form-item>
        <!--div><a>验证码:</a><el-input placeholder="验证码" ></el-input></!--div -->
        <el-form-item>
          <el-button type="primary" style="width:12em; margin-top:0.5em;" @click="postRegist">立即注册</el-button>
        </el-form-item>

      </el-form>    
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfRegister",
  data() {

      var validatePass = async (rule, value, callback) => {
        if(rule.field == "pPassword2"){}
        if (value === "") {
          callback(new Error("请输入密码"));
        }
        else if(value != this.ruleForm.pPassword){
          callback(new Error("二次输入密码不一样"));
        }
      }

      return { 
        ruleForm:{
          pAccount:"",
          pPassword:"",
          pPassword2:"",
          pShowname:"",
          pTel:"",
          pEmail:"",
          pCompany:"",
          pBumen:"",
          pZhiwei:"",
          pAddr:"",
        },
        rules: {
          pAccount:[{required: true, message: '请填写账号', trigger: 'change'}],
          pPassword:[{required: true, message: '请填写密码', trigger: 'change'}],
          pShowname:[{required: true, message: '请填写姓名', trigger: 'change'}],
          pPassword2:[{required: true, message: '请填写姓名', trigger: 'change'},
                        { validator: validatePass, trigger: "change" }],
          pTel:[{required: true, min:11, max:11, message: '输入位数有误', trigger: 'blur'}]
        }
      };
    },
    mounted: function() {
    },
    methods: {
      postRegist()
      {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
                
            let params = {
                'account': this.ruleForm.pAccount,
                'password': this.ruleForm.pPassword,
                "name": this.ruleForm.pShowname,
                "email":this.ruleForm.pEmail, 
                "title":this.ruleForm.pZhiwei,
                "phone":this.ruleForm.pTel,
                "company":this.ruleForm.company,
                "department":this.ruleForm.pBumen,
                "address":this.ruleForm.pAddr,
                "roles": [4]//app 上是3，web上是4
              };

            this.$axios.post("/api/accounts/customer/4",params)
              //成功返回
              .then(response => {
                  if(response.status == 200 && response.data.code == 200) {
                      this.$router.push({ path:"/client/login" });
                  }
                  else
                  {
                    this.$message.error("注册用户失败!");
                  }
              })
              //失败返回
              .catch(error => {
                    this.$message.error("注册用户失败!");
              });

          } else {
            this.$message.error('填写有误!');
            return false;
          }
        });

      },
    },
};
</script>

<style>

.el-link.el-link--info
{
  color: #fbfbfb;
}

.el-link.el-link--info:hover {
    color: #ffffff;
}

.el-form-item {
  margin-bottom:0.375em;
}

.el-form-item.is-error{
  margin-bottom:0.875em;
}


.content1 .el-form-item__label {
  line-height: 2em !important;
  margin-top: 0.5em !important;
  margin-bottom: 0em !important;
}

.content1 .el-form-item__error {
  padding-top: 0;
  left:1em;
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
.content1 .el-form{
    margin: 0 auto;
    width:26em;
}
.content1 a{
    width: 6em;
    text-align: right;
    display: inline-block;
    color:#606266;
}

.el-input {
  width:20em;
}
</style>
