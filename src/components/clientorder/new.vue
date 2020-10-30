<template>
  <div>
    <h3><a>逐个生成新订�?</a></h3>
    <div class="tableStyle">
      <div style="text-align:left">
          <a>预设�?:</a><el-input style="width:16em; margin-left:1em" placeholder="预设�?" v-model="pShowname"></el-input>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top: 1em;"
        row-key="id"
        border default-expand-all
        @row-dblclick="tableClick">
        <el-table-column header-align="center" prop="name" label="二维码名" >
            <template slot-scope="scope">
                <el-input @click="handleCancel(scope.$index, scope.row)"></el-input>    
            </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="类型" width="150">
            <template  slot-scope="scope">
                <el-select v-model="scope.row.type" default-first-option placeholder="请选择" class="type">
                    <el-option key="1" label="固定�?" value="0"></el-option>
                    <el-option key="2" label="通用�?" value="1"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="len" label="长度" width="100">
            <template slot-scope="scope">
                <el-input @click="handleCancel(scope.$index, scope.row)"></el-input>    
            </template>
        </el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="140">
            <template slot-scope="scope">
                <el-button type="success"  icon="el-icon-plus" size="mini" circle 
                    @click="handleCancel(scope.$index, scope.row)">
                </el-button>
                <el-button type="danger"  icon="el-icon-minus" size="mini" circle 
                    @click="handleCancel(scope.$index, scope.row)">
                </el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-button @click="onSubmit" type="primary" style="margin-top:1em">创建</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "new",
  data() {
      return {
        pShowname:"",
        tableData: [{
          id: 1,
          No: 13246,
          name:'南京上海',
          type:"固定�?",
          len:"100",
        }, {
          id: 2,
          No: 13246,
          name:'',
          type:"通用�?",
          len:"100",
          num:10,
          date: '2016-05-02 15:00:00',
          paystatus: '已支�?'
        }]
      };
    },
    methods: {
      onSubmit(){

        if(this.pShowname == null || this.pShowname == "")
        {
            this.$message("请输入预设名!");
            return;
        }

        let params = {
            "orders":[{
                'preset_name': this.pShowname, 
                'type': this.pType,
                'distance': this.pLen,
                'count': this.pNum
            }]
        };
        this.$axios.post("/api/distance/qr/order", params)
            //成功返回
            .then(response => {
                if(response.status != 200)
                {
                    this.$alert('提交失败', '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                    });
                    return;
                }
                
                if(response.data.code != 200)
                {     
                    this.$alert('提交失败', '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                    });
                    return;
                }

                 this.$alert('提交成功', '提示', {
                        confirmButtonText: '确定',
                        type: 'success',
                 });
            })
            //失败返回
            .catch(error => {
                this.$alert('提交失败', '提示', {
                        confirmButtonText: '确定',
                        type: 'error',
                });                     
            });
        },

      //双击跳转
      tableClick(row, column, event){

          this.$router.push("/client/orderdetail");
      },
      handleCancel(index, row)
      {

      }
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
  padding: 0.5em 0;
  width: 50em;
  margin: 0 auto;
}

.tableStyle .el-input
{
    width: 100%;
    padding: 0;
}

.tableStyle .el-table .cell {
    padding: 0 0.25em;
}

</style>
