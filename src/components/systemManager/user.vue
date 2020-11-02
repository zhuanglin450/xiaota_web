<template>
  <div>
    <div class="stitlebar">
      <a class="float-left" style="color: royalblue">系统管理 / 用户管理</a>
      <!-- <a class="float-right" style="text-decoration:underline;">返回</a> -->
    </div>
    <div class="flex-center" style="height: 3.5em; margin: 0.75em 2.5% 0.5em 2.5%; width:95%">
      <a>账号：</a><el-input v-model="inputAccout" placeholder="账号" style="width:27.5%" ></el-input>
      <a>姓名：</a><el-input v-model="inputName" placeholder="姓名" style="width:27.5%"></el-input>

      <el-button style="margin-left: 2em" size="small" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button style="margin-left: 1em" size="small" type="primary" icon="el-icon-plus">用户</el-button>
    </div>
    <div class="list">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column header-align="center" prop="id" label="序号" width="50"></el-table-column>
         <!--sortable --> 
        <el-table-column header-align="center" prop="accout" label="账号" width="120"></el-table-column>
        <el-table-column header-align="center" prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column header-align="center" prop="info" label="单位"></el-table-column>
        <el-table-column header-align="center" prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column header-align="center" prop="phone" label="手机" width="110"></el-table-column>
        <el-table-column header-align="center" prop="role" label="角色" width="80"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "systemManager_User",
  data() {
    return {
      inputAccout: "",
      inputName: "",
      tableData: [
        {
          id: 1,
          accout: "",
          name: "王小虎",
          info: "",
          email: "1876811111111@qq.com",
          phone: "18768111111",
          role: "管理员",
        },
      ],
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            accout: "",
            name: "王小虎",
            info: "上海市普陀区金沙江路 1518 弄",
            email: "1144444455@qq.com",
            phone: "18768111111",
            role: "管理员",
          },
          {
            id: 2,
            accout: "",
            name: "王小虎",
            info: "上海市普陀区金沙江路 1518 弄",
            email: "1144444455@qq.com",
            phone: "18768111111",
            role: "管理员",
          },
        ]);
      }, 1000);
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

.list {
  padding: 0.5em 1.5em;
}
</style>
