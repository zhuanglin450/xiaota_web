<template>
  <div>
    <div class="stitle">
      <a class="float-left" style="color:royalblue;">订单信息</a>
      <!-- <a class="float-right" style="text-decoration:underline;">返回</a> -->
    </div>
    <div class="tableStyle">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        @row-dblclick="tableClick"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column header-align="center" prop="number" label="订单号" width="180"></el-table-column>  <!--sortable -->
        <el-table-column header-align="center" prop="date" label="日期" width="180"></el-table-column>
        <el-table-column header-align="center" prop="name" label="提交人" width="180"></el-table-column>
        <el-table-column header-align="center" prop="info" label="定制信息"></el-table-column>
        <el-table-column header-align="center" prop="status" label="支付状态" width="90"></el-table-column>
        <el-table-column header-align="center" prop="bcancel" label="已撤单" width="90"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data() {
      return {
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          info: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          info: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          info: '上海市普陀区金沙江路 1519 弄',
        //   children: [{
        //       id: 31,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       info: '上海市普陀区金沙江路 1519 弄'
        //     }, {
        //       id: 32,
        //       date: '2016-05-01',
        //       name: '王小虎',
        //       info: '上海市普陀区金沙江路 1519 弄'
        //   }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          info: '上海市普陀区金沙江路 1516 弄'
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
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              info: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      },
      //双击跳转
      tableClick(row, column, event){

          this.$router.push("/admin/orderDetail");
      }
    }
};
</script>

<style>
a {
  color: #ffffff;
}

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
