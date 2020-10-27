<template>
  <div>
    <div class="tableStyle">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        @row-dblclick="tableClick"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column header-align="center" prop="No" label="订单号" width="120"></el-table-column>  <!--sortable -->
        <el-table-column header-align="center" prop="name" label="预设名" ></el-table-column>
        <el-table-column align="center" prop="type" label="类型" width="150"></el-table-column>
        <el-table-column align="center" prop="len" label="长度" width="100"></el-table-column>
        <el-table-column align="center" prop="num" label="数量" width="80"></el-table-column>
        <el-table-column align="center" prop="date" label="下单日期" width="180"></el-table-column>
        <el-table-column align="center" prop="paystatus" label="支付状态" width="90"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="140">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleCancel(scope.$index, scope.row)">撤单</el-button>
            </template>
        </el-table-column>
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
          No: 13246,
          name:'南京上海',
          type:"固定码/通用码",
          len:"100",
          num:10,
          date: '2016-05-02 15:00:00',
          paystatus: '已支付'
        }, {
          id: 2,
          No: 13246,
          name:'',
          type:"固定码/通用码",
          len:"100",
          num:10,
          date: '2016-05-02 15:00:00',
          paystatus: '已支付'
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

          this.$router.push("/client/orderdetail");
      },
      handleCancel(index, row)
      {

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
