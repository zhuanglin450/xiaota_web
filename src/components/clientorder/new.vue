<template>
  <div>
    <h3><a>逐个生成新订单</a></h3>
    <div class="tableStyle">
      <!--div style="text-align:left">
          <a>预设名:</a><el-input style="width:16em; margin-left:1em" placeholder="预设名" v-model="pShowname"></el-input>
      </!--div-->
      <el-table
        :data="dynamicValidateForm.orders"
        style="width: 100%;margin-top: 1em;"
        row-key="id"
        border default-expand-all>
        <el-table-column header-align="center" label="二维码名" >
            <template slot-scope="scope">
                <el-input v-model="scope.row.preset_name"> </el-input>    
            </template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="190">
            <template  slot-scope="scope">
                <el-select v-model="scope.row.type" default-first-option placeholder="请选择" class="type">
                    <el-option key="1" label="固定码" value="0"></el-option>
                    <el-option key="2" label="通用码" value="1"></el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column align="center" label="长度" width="190">
            <template slot-scope="scope">
              <div style="margin-top:8px ">
                 <el-input-number type="number" v-model="scope.row.distance" :min="0" ></el-input-number >
              </div> 
            </template>         

        </el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="140">
            <template slot-scope="scope">
                <!-- el-button type="success"  icon="el-icon-plus" size="mini" circle 
                    @click="handleAdd(scope.$index, scope.row)">
                </ -->
                <el-button type="danger"  icon="el-icon-minus" size="mini" circle 
                    @click="handleRemove(scope.$index, scope.row)">
                </el-button>
            </template>
        </el-table-column>
      </el-table>
      
      <el-col :span="24" >
         <div class="title" style="margin-top: 20px; margin-bottom: 10px; margin-left: 5px" >总数量：{{sum}}</div>
      </el-col>
      <br>
      <el-col :span="24">
          <el-button type="primary" icon="add"  @click="handleAdd" >新增条目</el-button>
          <el-button type="primary" icon="add"  @click="onSubmit" >提交</el-button>

      </el-col>
      <!--el-button @click="onSubmit" type="primary" style="margin-top:1em">创建</!--el-button -->
    </div>
  </div>
</template>

<script>

import {isStringEmpty} from "../../assets/js/tool.js"
import fetch from "../../assets/js/fetch";

export default {
  name: "new",
  data() {
      return {
        pShowname:"",

        dynamicValidateForm:{
                orders: [{
                    preset_name:"",
                    type:1,  
                    distance:0, 
                    count:1, 
                    serial_number:""
                } ]
        }
      };
    },
    computed:{
      sum(){

        var sum = this.dynamicValidateForm.orders.length;
 
        return sum;
      }
    },
    methods: {
 
      validateForm(formObj)
      {

          let errorMsg = "";
          var errorIndex = -1;

          for (var i = 0; i < formObj.length; i++) {
            
            if ( isStringEmpty(formObj[i].preset_name ) )
            {
                errorIndex = i+1;
                errorMsg = "第 " + errorIndex + ' 行预设名为空，请输入有效名称!';
                break;
            }

            if(formObj[i].type == 0 && formObj[i].distance==0)
            {
                errorIndex = i+1;
                errorMsg = "第 " + errorIndex + ' 行固定码间距长度为0，请输入有效数值!';
                break;
            }
          } 

          let  noError = errorIndex > -1 ? false: true;
          if (!noError) {
            this.$message.error(errorMsg);
          }

          return noError;
      },
      onSubmit(){
        
        var bOK = this.validateForm(this.dynamicValidateForm.orders);
        if(!bOK)
        {
            return;
        }

        let params = this.dynamicValidateForm;
        fetch.post("/api/distance/qr/order", params)
            //成功返回
            .then(response => {
                if(response.code != 200 || response.data.errorCode !=0)
                {
                    this.$alert('提交失败', '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                    });
                    return;
                }
                else{

                    this.$alert('提交成功', '提示', {
                            confirmButtonText: '确定',
                            type: 'success',
                    });
                } 
            })
            //失败返回
            .catch(error => {
                this.$alert('提交失败', '提示', {
                        confirmButtonText: '确定',
                        type: 'error',
                });                     
            });
        }, 

      handleAdd(index, row)
      {
        this.dynamicValidateForm.orders.push({
          id:this.dynamicValidateForm.orders.length+1,
          preset_name: '',
          type: 1,
          distance:'',
          count:1,
          serial_number:''
        });
      },
      handleRemove(index, row)
      {
          this.dynamicValidateForm.orders.splice(index, 1); 
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
  width: 70em;
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
