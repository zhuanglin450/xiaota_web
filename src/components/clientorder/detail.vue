<template>
  <div>
    <h3><a>订单号：{{No}}</a></h3>
    <div class="tableStyle">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        @row-dblclick="tableClick"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column header-align="center" prop="name" label="预设名" width="500" ></el-table-column>
        <el-table-column align="center" prop="len" label="长度" width="150"></el-table-column>
        <el-table-column ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data() {
      return {
        No:123456,
        tableData: [{
          id: 1, 
          name:'南京上海1',
          type:"固定码/通用码",
          len:"100" 
        }, {
          id: 2,
          No: 13246,
          name:'南京上海2',
          len:"100",
        }]
      };
    },
    methods: {
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              info: '上海市普陀区金沙江路 1519 弄'
            }])
        }, 1000)
      },
      //双击跳转
      tableClick(row, column, event){

          //this.$router.push("/admin/orderDetail");
      },
      handleCancel(index, row)
      {

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
  background-color: lightblue;
}

.tableStyle {
  padding: 0.5em 1.5em;
}
</style>
