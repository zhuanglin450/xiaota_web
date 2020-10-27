<template>
  <div>
    <div class="stitle">
      <a class="float-left" style="color:#303133;">个人信息</a>
    </div>
    <div class="content">
        <!-- <el-input placeholder="请设置密码" v-model="pPassword" show-password></el-input> -->
        <!-- <el-input placeholder="请确认密码" v-model="pPassword" show-password></el-input> -->
        <div><a>姓名:</a><el-input placeholder="姓名" v-model="pShowname"></el-input></div>
        <div><a>手机号码:</a><el-input placeholder="手机号码" v-model="pTel"></el-input></div>
        <div><a>邮箱:</a><el-input placeholder="邮箱" v-model="pEmail"></el-input></div>
        <div><a>单位:</a><el-input placeholder="单位" v-model="pCompany"></el-input></div>
        <div><a>部门:</a><el-input placeholder="部门" v-model="pBumen"></el-input></div>
        <div><a>职位:</a><el-input placeholder="职位" v-model="pZhiwei"></el-input></div>
        <div><a>地址:</a><el-input placeholder="地址" v-model="pAddr"></el-input></div>
        <div><a>验证码:</a><el-input placeholder="验证码" ></el-input></div>
        <div><el-button style="width:12em; margin-top:0.5em;">确认</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personInfo",
  data() {
      return { 
          pShowname:"",
          pTel:"",
          pEmail:"",
          pCompany:"",
          pBumen:"",
          pZhiwei:"",
          pAddr:"",
      };
    },
    methods: {
      //双击跳转
    }
};
</script>

<style>

.stitle {
  font-family: "Microsoft YaHei","微软雅黑";  
  height: 2em;
  line-height: 2em;
  padding: 0 2em;
  background-color: #EBEEF5;
}

.content {
    margin-top:2em;
}
.content div{
    height:3.25em;
}
.content a{
    width: 6em;
    text-align: right;
    display: inline-block;
}

.el-input{
    width:21em;
}
</style>
