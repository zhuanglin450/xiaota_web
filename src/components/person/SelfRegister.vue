<template>
  <div class="personSelfRegisterVue">
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
          <el-select filterable allow-create default-first-option placeholder="单位" v-model="ruleForm.pCompany" maxlength="32"
            @change="changeCompanyName" >
           <el-option v-for="item in companyoptions"
              :key="item.id"
              :label="item.companyName"
              :value="item.companyName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门:" prop="department" >
          <el-select filterable allow-create default-first-option placeholder="部门" v-model="ruleForm.department" maxlength="32">
           <el-option v-for="item in departmentoptions"
              :key="item.id"
              :label="item.departmentName"
              :value="item.departmentName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位:" prop="pZhiwei" >
          <el-input v-model="ruleForm.pZhiwei" placeholder="职位" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="地址:" prop="pAddr" >
          <el-input v-model="ruleForm.pAddr" placeholder="地址" maxlength="100"></el-input>
        </el-form-item>
        <!--div><a>验证码:</a><el-input placeholder="验证码" ></el-input></!--div -->
        <el-form-item>
          <el-button type="primary" style="width:10em; margin-top:0.5em;" @click="postRegist">立即注册</el-button>
          <el-button style="width:6em; margin-left:1em;" @click="goback">返回</el-button>
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
        else if (value.length < 6) {
          callback(new Error("密码长度不能小于6位"));
        }
        else if (rule.field == "pPassword2" && value != this.ruleForm.pPassword){
          callback(new Error("二次输入密码不一样"));
        }
      }

      var valemail = async (rule, value, callback) => {
          var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (value != '' && !regEmail.test(value)) {
              callback(new Error("邮箱格式不正确"));
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
          department:"",
          pZhiwei:"",
          pAddr:"",
        },
        rules: {
          pAccount:[{required: true, message: '请填写账号', trigger: 'change'}],
          pShowname:[{required: true, message: '请填写姓名', trigger: 'change'}],
          pPassword:[{required: true, message: '请填写密码', trigger: 'change'},
                    { validator: validatePass, trigger: "change" }],
          pPassword2:[{required: true, message: '请填写密码', trigger: 'change'},
                    { validator: validatePass, trigger: "change" }],
          pTel:[{required: true, min:11, max:11, message: '输入位数有误', trigger: 'blur'}],
          pEmail:[{required: true, message: '请填写邮箱地址', trigger: 'change'},
                  {validator: valemail, trigger: "blur"}]
        },
        companyoptions:[],
        departmentoptions:[],
        allDepartment:null,
      };
    },
    mounted: async function() {

      this.allDepartment = new Map();
      await this.loadCompany();
      await this.loadDepartment();

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
                "company":this.ruleForm.pCompany,
                "department":this.ruleForm.department,
                "address":this.ruleForm.pAddr,
                "roles": [4]//app 上是3，web上是4
              };

            this.$axios.post("/api/accounts/customer/4",params)
              //成功返回
              .then(response => {
                  if(response.status == 200 && response.data.code == 200) {
                      this.$router.push({ path:"/login" });
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
      goback(){
          this.$router.push({ path:"/login" });
      },
      sendEmail: function() {
          var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (this.ruleForm.pEmail != '' && !regEmail.test(this.ruleForm.pEmail)) {
              this.$message({
                  message: '邮箱格式不正确',
                  type: 'error'
              })
              this.ruleForm.pEmail = ''
          }
      },
      async loadCompany()
      {
          let response = await this.$axios.get("/api/company");
          console.log(response);
          if(response.status != 200)
          {
              this.$message.error("请求数据失败!");
              return;
          }
          if(response.data.code != 200)
          {
              this.$message.error( response.data.message);
              return;
          }
 
            //请求成功
          let table = response.data.data.companyList;  
          this.companyoptions = table;
      },
      async loadDepartment()
      {  
          let response = await this.$axios.get("/api/department"); 
          console.log(response);
          if(response.status != 200)
          {
            this.$message.error("请求数据失败!");
            return;
          }
          if(response.data.code != 200)
          {
              this.$message.error( response.data.message);
              return;
          }

          //成功返回
          let depts = response.data.data.departments;
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
          this.ruleForm.department = "";
          if(!this.allDepartment.has(this.ruleForm.pCompany))
          {
              this.departmentoptions = [];
          }
          else
          {
              this.departmentoptions = this.allDepartment.get(this.ruleForm.pCompany);
          }
      },
    },
};
</script>

<style scoped>

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
 
.headertitle1:hover {
    text-decoration: none;
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

.content1 .el-input, .content1 .el-select  {
  width:20em;
}

.content1 .el-input + .el-form-item__error {
  left:1em;
}

</style>
<style>

.personSelfRegisterVue .el-select .el-input.el-input--suffix {
  padding: 0 0.5em;
  width: 100%;
}

</style>