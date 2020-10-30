<template>
  <div>
    <h3><a>批量生成新订�?</a></h3>
    <div class="content" style="text-align:left">

        <el-form ref="form" label-width="auto">
            <el-form-item label="预设�?">
                <el-input placeholder="预设�?" v-model="pShowname"  style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="长度">
                <el-input-number placeholder="长度" :min="1" v-model="pLen"></el-input-number>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="pType" default-first-option placeholder="请选择" class="type">
                    <el-option key="1" label="固定�?" value="1"></el-option>
                    <el-option key="2" label="通用�?" value="0"></el-option>
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

<!-- 
        <div><a>预设�?:</a><el-input placeholder="预设�?" v-model="pShowname"></el-input></div>
        <div><a>长度:</a><el-input placeholder="长度" v-model="pLen"></el-input></div>
        <div><a>类型:</a>
            <el-select v-model="pType" default-first-option placeholder="请选择">
                <el-option key="1" label="固定�?" value="固定�?"></el-option>
                <el-option key="2" label="通用�?" value="通用�?"></el-option>
            </el-select>
        </div>
        <div><a>数量:</a><el-input placeholder="数量" v-model="pNum"></el-input></div>
        
        <div><el-button style="width:12em; margin-top:0.5em;">确认</el-button></div> -->
    </div>
  </div>
</template>

<script>
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
      //双击跳转

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
        }
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

.el-input-number__decrease
{
    left:0.9em;
    line-height: 2.25em;
    overflow: hidden;
}
.el-input-number__increase
{
    right:1.9em;
    line-height: 2.25em;
    overflow: hidden;
}
</style>
