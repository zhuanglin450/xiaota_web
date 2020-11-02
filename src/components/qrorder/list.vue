<template>
  <div>
    <div class="stitle">
      <a class="float-left" style="color:royalblue; text-decoration:none;">订单信息</a>
      <!-- <a class="float-right" style="text-decoration:underline;">返回</a> -->
    </div>
    <div class="tableStyle">
      <el-table :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id" border default-expand-all
        @row-dblclick="tableClick">
        <el-table-column align="center" prop="number" label="订单号" width="180"></el-table-column>  <!--sortable -->
        <el-table-column align="center" prop="orderTime" label="日期" width="180"></el-table-column>
        <el-table-column align="center" prop="account" label="提交人" width="180"></el-table-column>
        <el-table-column header-align="center" prop="presetName" label="定制信息"></el-table-column>
        <el-table-column align="center" prop="status" label="支付状态" width="90"></el-table-column>
        <el-table-column align="center" prop="bcancel" label="已撤单" width="90"></el-table-column>
      </el-table>
      <div class="paginationClass">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" 
            :current-page="data_current_page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="data_per_page" 
            layout="total, sizes, prev, pager, next, jumper"
            :total="data_total">
          </el-pagination>
      </div> 
    </div>
  </div>
</template>

<script>

import fetch from "../../assets/js/fetch";
import qs from "querystring";

export default {
  name: "orderList",
  data() {
      return {
        sdata:[],
        tableData:[],
        //每页显示多少条
        data_per_page: 20,
        //当前页码
        data_current_page: 1,
        data_total:0,
      };
    },
    mounted: function() {
        // console.log(this.data_per_page) ;
        this.handle_get_list();
    },
    methods: { 
      
      // 获取订单列表
      handle_get_list() {
        let params = {
          'order_status': 0,
          'try_scope': 1,
          'pay_status': 0,
          'start_time': null,
          'end_time': null,
          'offset': (this.data_current_page - 1) * this.data_per_page,
          'limit': this.data_per_page
        };

        let url = "/api/distance/qr/order?";
        url += qs.stringify(params);
        fetch.get(url)
              //成功返回
              .then(response => {          
                  if(response.code != 200)
                  {     
                      this.$message.error( response.data.message);
                      return;
                  }
 
                  this.sdata = response.data.orders;
                  let tableData = [];
                  this.sdata.forEach(ele  => {
                      tableData.push({
                        id: ele.id,
                        number: ele.id,
                        orderTime: ele.orderTime,
                        account: ele.account,
                        presetName: ele.presetName,
                        status: ele.orderStatus==0?'未支付':'已支付',
                        bcancel: ele.orderStatus==2?'已撤销':'', 
                      })
                  });

                  this.tableData = tableData;
                  this.data_total = response.data.total_count; 
              })
              //失败返回
              .catch(error => {
                  this.$message.error("请求数据失败!");
              });
      },
      handleSizeChange: function (size) {
        this.data_per_page = size;
        if(this.data_total == this.tableData.length && this.data_total <= this.data_per_page)
            return;
        this.handle_get_list() ;
        // console.log(this.data_per_page)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.data_current_page = currentPage;
        if(this.data_total == this.tableData.length && this.data_total <= this.data_per_page)
            return;
        this.handle_get_list() ;
        // console.log(this.data_current_page)  //点击第几页
      },
      //双击跳转
      tableClick(row, col, event){
          this.$router.push({"path":'/admin/orderDetail', query:{"orderid":row.id}});
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
  padding: 0.5em 1.5em 8em 1.5em;
}
</style>
