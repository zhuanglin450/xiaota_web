<template>
  <div>
    <h3><a>批量生成新订单</a></h3>
    <div class="content" style="text-align:left">

        <el-form ref="form" label-width="auto">
            <el-form-item label="预设名">
                <el-input placeholder="预设名" v-model="pShowname"></el-input>
            </el-form-item>
            <el-form-item label="长度">
                <el-input placeholder="长度" v-model="pLen" style="width:10em"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="pType" default-first-option placeholder="请选择" class="type">
                    <el-option key="1" label="固定码" value="固定码"></el-option>
                    <el-option key="2" label="通用码" value="通用码"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数量">
                <el-input placeholder="数量" v-model="pNum" style="width:10em"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">创建</el-button>
                <!-- <el-button>取消</el-button> -->
            </el-form-item>
        </el-form>

<!-- 
        <div><a>预设名:</a><el-input placeholder="预设名" v-model="pShowname"></el-input></div>
        <div><a>长度:</a><el-input placeholder="长度" v-model="pLen"></el-input></div>
        <div><a>类型:</a>
            <el-select v-model="pType" default-first-option placeholder="请选择">
                <el-option key="1" label="固定码" value="固定码"></el-option>
                <el-option key="2" label="通用码" value="通用码"></el-option>
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
          pLen:"",
          pType:"",
          pNum:""
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
    width:16em;
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
