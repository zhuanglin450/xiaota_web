<template>
  <div >
    <div class="stitle">
      <a class="float-left" style="color:royalblue; text-decoration:none;">公司管理</a>
    </div>
    <!-- <div class="flex-center-wrap" style="height: 3.5em; margin: 0.75em 2% 0.5em 2%; width:96%">
      <a>提交人：</a><el-input v-model="selAccount" placeholder="提交人"></el-input>
      <el-button style="margin-left: 1.5em" size="small" type="primary" icon="el-icon-search"
          @click="search">搜索
      </el-button>
    </div> -->
  <div style="padding:0.75em 2em 0.25em 2em; text-align:left;">
      <a>公司名：</a><el-input v-model="newCompanyName"  maxlength="32"></el-input><el-button size="small" type="primary" @click="addCompany">添加公司</el-button>
  </div>
    <div class="tableStyle">
      <el-table :data="tableData"
        style="margin-bottom: 20px;"
        row-key="id" border 
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">  <!-- default-expand-all lazy :load="loadNode" -->
        <el-table-column header-align="center" prop="companyName" label="公司名"></el-table-column>
        <el-table-column header-align="center" prop="departmentName" label="部门"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
                <el-button size="mini" v-if="scope.row.departmentName==''" type="primary" @click="handleAddDept(scope.$index, scope.row)">添加部门</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <!-- <el-button size="mini" type="primary" v-show="scope.row.btnPayable" @click="handlePay(scope.$index, scope.row)">支付</el-button>
                <el-button size="mini" type="primary" v-show="scope.row.btnCancleable"  @click="cancelOrder(scope.$index, scope.row)">撤单</el-button> -->
            </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <el-dialog title="添加公司" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" maxlength="32" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
  </el-dialog> -->
  </div>
</template>

<script>

import fetch from "../../assets/js/fetch";
import qs from "querystring";

export default {
  name: "companyList",
  data() {
      return {
        sdata:[],
        tableData:[],
        tableDataTemp:[],
        // dialogFormVisible: false,
        // form: {
        //   name: '',
        // },
        //formLabelWidth: '120px',
        newCompanyName:"",

      };
    }, 
     mounted: async function() { 

      await this.handle_get_list();

      await this.loadDepartment();
      this.tableData = this.tableDataTemp;
    },
    methods: {
      // 获取订单列表
      async handle_get_list()
      { 
          // let params = {
          //   'companyName': "",
          //   'page':1,
          //   'size':9999,
          // };

          // let paramurl = "?"+ qs.stringify(params);
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
          table.forEach(ele => {
              // ele.hasChildren = true;
              ele.departmentName = "";
          });
          
          this.tableDataTemp = table;
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
                let cp = this.tableDataTemp.find(item => item.id == ele.companyId);
                if(cp != undefined && cp != null)
                {
                  if(cp.children == null)
                    cp.children= []; 
                  ele.id += 1000000;
                  cp.children.push(ele);
                }
            });               
      },
      loadNode(tree, treeNode, resolve)
      {  
      },
      search()
      {
         this.handle_get_list(); 
      },
      async addCompany()
      {
          if(this.newCompanyName == "")
          {
            this.$message.warning( "请输入公司名");
            return;
          }

          let param = {
            companyId: "",
            companyName: this.newCompanyName,
            companyAddress: "",
            companyPhone: "",
          };

          fetch.post("/api/company/add_modify", param)
            .then(response => {
                    
              if(response.code != 200)
              {
                  this.$message.error( response.message);
                  return;
              } 


              this.$confirm('添加成功', '提示', {
                confirmButtonText : '确定',
                showCancelButton : false,
                type: 'success'
              })
            })
            .catch(error => {
                this.$message.error("获取列表错误");
            });
      },
      handleAddDept(index, row)
      {

      },
      handleDelete(index, row)
      {
        console.log(index, row);        
        let url = "";
        if(row.companyId == null )  // 公司
        {
          url = "company/"+ row.id;
        }
        else //部门
        {
          url = "department/"+ (row.id-1000000);
        }

        fetch.delete("/api/"+ url)
            .then(response => {                    
              if(response.code != 200)
              {
                  this.$message.error( response.message);
                  return;
              } 

              this.$message.success('删除成功');
            })
            .catch(error => {
                this.$message.error("请求s错误");
            });

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
  background-color: lightblue;
}

.tableStyle {
  padding: 0.5em 1.5em 5.5em 1.5em;
}
</style>

