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
        @row-dblclick="tableClick">
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
        sdata:[],
        // tableData: [{
        //   id: 1,
        //   number:1,
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   info: '上海市',
        //   status: '已支付',
        //   bcancel: '已撤销', 
        // }]
        tableData:[]
      };
    },
    mounted: function() {
        let params = {
          'order_status': 0,
          'try_scope': 1,
          'pay_status': 0,
          'start_time': '2020-10-1',
          'end_time': '2020-12-31',
          'offset': 0,
          'limit': 0
        };
        this.$axios.get("/api/distance/qr/order", params)
              //成功返回
              .then(response => {
                  if(response.status != 200)
                  {
                      this.$message.error("请求数据失败!");
                      return;
                  }                  
                  if(response.data.code != 200)
                  {     
                      this.$message.error( response.data.message);
                      return;
                  }
 
                  this.sdata = response.data.data.orders;
                  let tableData = [];
                  this.sdata.forEach(ele  => {
                      tableData.push({
                        id: ele.id,
                        number: ele.id,
                        date: ele.orderTime,
                        name: ele.account,
                        info: ele.presetName,
                        status: ele.orderStatus==0?'未支付':'已支付',
                        bcancel: ele.orderStatus==2?'已撤销':'', 
                      })
                  });

                  this.tableData = tableData;

              })
              //失败返回
              .catch(error => {
                  this.$message.error("请求数据失败!");
              });

    },
    methods: { 
      //双击跳转
      tableClick(row, col, event){
          this.$router.push({"name":'adminQrOrderDetail', params:{"orderid":row.id}});
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
