<template>
  <div style="margin-top:1em" class="clientorderNewVueBatch">
    <h3><a>批量生成新订单</a></h3>
    <div class="content" style="text-align:left">
        <el-form label-width="auto">
            <el-form-item label="预设名">
                <el-input placeholder="预设名" v-model="pShowname"  style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="长度">
                <el-input-number placeholder="长度" :min="0" v-model="pLen"></el-input-number>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="pType" default-first-option placeholder="请选择" class="type">
                    <el-option key="1" label="固定码" value="0"></el-option>
                    <el-option key="2" label="通用码" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数量">
                <el-input-number placeholder="数量" :min="1" v-model="pNum"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" >创建</el-button>
                <!-- <el-button>取消</el-button> -->
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import fetch from "../../assets/js/fetch";
import qs from "querystring";

export default {
  name: "newBatch",
  data() {
      return { 
          pShowname:"",
          pLen:"100",
          pType:"1",
          pNum:"10"
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
        fetch.post("/api/distance/qr/order", params)
            //成功返回
            .then(response => {   
                if(response.code != 200)
                {     
                    this.$alert('提交失败', '提示', { type: 'error', confirmButtonText: '确定'});
                    return;
                }

                this.$alert('提交成功', '提示', { type: 'success', confirmButtonText: '确定' });
            })
            //失败返回
            .catch(error => {
                this.$alert('提交失败', '提示', { type: 'error', confirmButtonText: '确定'});                   
            });
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
  background-color: #EBEEF5;
}

.content {
    width:20em;
    margin: 2em auto;
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
    width:12em;
}

.el-form-item {
    margin-bottom: 0.25em;
}

.type {
    margin-left: 0.5em;
}

.type .el-input
{
    width:9em;
}

</style>

<style>

.clientorderNewVueBatch .el-input-number__decrease
{
    left:0.9em;
    line-height: 2.25em;
    overflow: hidden;
}
.clientorderNewVueBatch .el-input-number__increase
{
    right:1.8em;
    line-height: 2.25em;
    overflow: hidden;
}

</style>
