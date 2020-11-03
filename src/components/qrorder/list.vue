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
        <el-table-column align="center" prop="date" label="日期" width="180"></el-table-column>
        <el-table-column align="center" prop="name" label="提交人" width="180"></el-table-column>
        <el-table-column header-align="center" prop="info" label="定制信息"></el-table-column>
        <el-table-column align="center" prop="status" label="支付状态" width="160"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="250">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleViewDetail(scope.$index, scope.row)">查看</el-button>
                <el-button size="mini" type="primary" v-show="scope.row.btnPayable" @click="handlePay(scope.$index, scope.row)">支付</el-button>
                <el-button size="mini" type="primary" v-show="scope.row.btnCancleable"  @click="cancelOrder(scope.$index, scope.row)">撤单</el-button>
            </template>
        </el-table-column>
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
        deleteOrderId:0,
        payOrderId:0,
      };
    }, 
    mounted: function() {
        
      this.handle_get_list();
    },
    methods: { 
      //双击跳转
      tableClick(row, col, event){
          this.$router.push({"name":'adminQrOrderDetail', params:{"orderid":row.id}});
      },
      handleViewDetail(index, row)
      {
        this.$router.push({"name":'adminQrOrderDetail', params:{"orderid":row.id}});
      },
      // 获取订单列表
      async handle_get_list()
      {
          let params = {
            'order_status': 0,//all status
            'try_scope': 3,//all companies' orders
            'start_time': '',
            'end_time': '',
            'offset': (this.data_current_page - 1) * this.data_per_page,
            'limit': this.data_per_page
          };

          let paramurl = "?"+ qs.stringify(params);
          fetch.get("/api/distance/qr/order" + paramurl)
                //成功返回
                .then(response => {              
                    if(response.code != 200)
                    {     
                        this.$message.error( response.message);
                        return;
                    }

                    this.sdata = response.data.orders;
                    let tableData = [];
                    this.sdata.forEach(ele  => {

                        let btnCancleable = true;
                        let btnPayable = true;
                        let status = '';

                          if( ele.orderStatus ==3)
                          {//已经撤销的先显示
                              status = "已撤销";
                              btnCancleable = false;
                              btnPayable = false;
                          }
                          else if(ele.orderStatus ==1)
                          {
                              status = "未支付";  

                          }
                          else
                          {//2已支付,显示支付日期
                              status = ele.payTime;

                              btnCancleable = false;
                              btnPayable    = false;
                          };



                        tableData.push({
                          id: ele.id,
                          number: ele.id,
                          date: ele.orderTime,
                          name: ele.account,
                          info: ele.presetName,
                          status: status,
                          btnCancleable: btnCancleable,
                          btnPayable:btnPayable
                        });
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

      handlePay(index, row)
      {

          this.payOrderId = row.id;
                  //一定是用反单引号啊！不要写成单引号了！！
          this.$confirm(`确定要更改订单[ ${this.payOrderId}]为支付状态吗？`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 正常跳转
                 
                this.confirmPay();

              }).catch(() => {
                // 如果取消跳转地址栏会变化，这时保持地址栏不变
                var k = 0;
              });
      },

      async confirmPay()
      {
        fetch.put("/api/distance/qr/order/"+this.payOrderId+"/pay",{})
            //成功返回
            .then(response => {
                if(response.code == 200 && response.data.errorCode ==0) {
                   
                    this.$message.success("订单支付成功");  

                    this.handle_get_list();
                }
                else
                {
                  this.$message.error("订单支付失败");      
                }
            })
            //失败返回
            .catch(error => {
                   this.$message.error("订单支付发起失败");            
            });
      },

      cancelOrder(index, row)
      {
       
          this.deleteOrderId = row.id;
 
          //一定是用反单引号啊！不要写成单引号了！！
          this.$confirm(`确定要撤销订单[ ${this.deleteOrderId}]吗？`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 正常跳转
                this.confirmDelete();
              }).catch(() => {
                // 如果取消跳转地址栏会变化，这时保持地址栏不变
                var k = 0;
              });
      },
      async confirmDelete()
      {
        //this.deleteVisible = false;

        fetch.delete("/api/distance/qr/order/"+this.deleteOrderId)
            //成功返回
            .then(response => {
                if(response.code == 200 && response.data.errorCode ==0) {
                   this.handle_get_list();
                    this.$message.success("订单撤销成功");  
                }
                else
                {
                  this.$message.error("订单撤销失败");      
                }
            })
            //失败返回
            .catch(error => {
                   this.$message.error("订单撤销失败");            
            });
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
  padding: 0.5em 1.5em 5.5em 1.5em;
}
</style>
