<template>
  <div>
    <div class="stitlebar">
      <a class="float-left" style="color: royalblue; text-decoration:none;">系统管理 / 用户管理</a>
      <!-- <a class="float-right" style="text-decoration:underline;">返回</a> -->
    </div>
    <div class="flex-center" style="height: 3.5em; margin: 0.75em 2.5% 0.5em 2.5%; width:95%">
      <a>账号：</a><el-input v-model="inputAccout" placeholder="账号" style="width:27.5%" ></el-input>
      <a>姓名：</a><el-input v-model="inputName" placeholder="姓名" style="width:27.5%"></el-input>

      <el-button style="margin-left: 2em" size="small" type="primary" icon="el-icon-search"
          @click="search">搜索
      </el-button>
      <el-button style="margin-left: 1em" size="small" type="primary" icon="el-icon-plus"
          @click="add">用户
      </el-button>
    </div>
    <div class="tableStyle">
      <!--最大高度需要自动 -->
      <el-table :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        max-height="360"
        row-key="id" border default-expand-all>
        <el-table-column align="center" prop="id" label="序号" width="50"></el-table-column>         <!--sortable --> 
        <el-table-column align="center" prop="account" label="账号" width="120"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column header-align="center" prop="company" label="单位"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机" width="110"></el-table-column>
        <el-table-column align="center" prop="roles" label="角色" width="80"></el-table-column>
      </el-table>
      <div class="paginationClass">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" 
            :current-page="data_current_page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="data_per_page" 
            layout="total, sizes, prev, pager, next, jumper"
            :total="data_total">
          </el-pagination>
      </div> 
    </div>
  </div>
</template>

<script>

import fetch from "../../assets/js/fetch";
import qs from "querystring";

export default {
  name: "adminUserlist",
  data() {
    return {
      inputAccout: "",
      inputName: "",
      tableData: [],
      //每页显示多少条
      data_per_page: 20,
      //当前页码
      data_current_page: 1,
      data_total:0,
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData(){
      let params = {
          'roles': null,
          'offset': (this.data_current_page - 1) * this.data_per_page,
          'limit': this.data_per_page,
          'account':this.inputAccout,
          'name':this.inputName,
        };

        let url = "/api/accounts?";
        url += qs.stringify(params);
        fetch.get(url).then(response => { //成功返回          
              if(response.code != 200)
              {     
                  this.$message.error( response.message);
                  return;
              }

              this.tableData = response.data.accounts;
              this.data_total = response.data.total_count; 
          })
          //失败返回
          .catch(error => {
              this.$message.error("请求数据失败!");
          });
    },
    handleSizeChange: function(size) {
      this.data_per_page = size;
      if(this.data_total == this.tableData.length && this.data_total <= this.data_per_page)
          return;
      this.requestData() ; 
    },
    handleCurrentChange: function(currentPage){
      this.data_current_page = currentPage;
      if(this.data_total == this.tableData.length && this.data_total <= this.data_per_page)
          return;
      this.requestData() ; 
    },
    search()
    {
      this.requestData();
    },
    add(){
        this.$router.push("/admin/adduser");
    },
  },
};
</script>

<style scoped>
a {
  color: #606266;
}

.stitlebar {
  font-family: "Microsoft YaHei","微软雅黑";  
  height: 2em;
  line-height: 2em;
  padding: 0 2em;
  background-color: lightblue;
}

.tableStyle {
  padding: 0.5em 1.5em 5.5em 1.5em;
}
</style>
