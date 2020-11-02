<template>
  <div>
    <div class="tableStyle">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        @row-dblclick="tableClick">
        <el-table-column header-align="center" prop="id" label="订单号" width="120"></el-table-column>  <!--sortable -->
        <el-table-column header-align="center" prop="presetName" label="预设名" ></el-table-column>
        <!--el-table-column align="center" prop="type" label="类型" width="150"></el-table-column-->
        <!--el-table-column align="center" prop="len" label="长度" width="100"></el-table-column-->
        <!--el-table-column align="center" prop="num" label="数量" width="80"></el-table-column-->
        <el-table-column align="center" prop="orderTime" label="下单日期" width="180"></el-table-column>
        <el-table-column align="center" prop="payTime" label="支付状态" width="90"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="140">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleViewDetail(scope.$index, scope.row)">查看</el-button>
                <el-button size="mini" type="primary" @click="handleCancel(scope.$index, scope.row)">撤单</el-button>
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
 
import { mapState, mapActions } from "vuex";

export default {
  name: "orderList",
  data() {
      return {
        order_status:null,
        try_scope:null,
        start_time:null,
        end_time:null,
        offset:null,
        limit:null,
        //每页显示多少条
        data_per_page: 20,
        //当前页码
        data_current_page: 1,
        data_total:0,
        tableData: []
      };
    },
    mounted: function() {
      console.log(this.$route.params);
    },
    created:function()
    {
      this.handle_get_list( ); 
    },
    methods: { 
        ...mapActions(
          {
            get_client_order_list:"clientOrderList/get_client_order_list"
            }),
          
        // 获取订单列表
        handle_get_list() {

          this.tableData = [];
          //get方法参数列表
          let getParams = {};
          if(this.order_status !=null)
          {
            getParams.order_status = this.order_status;
          }
          if(this.try_scope!=null)
          {
            getParams.try_scope = this.try_scope;
          }
          if(this.start_time!=null)
          {
            getParams.start_time = this.start_time;
          }
        if(this.end_time!=null)
          {
            getParams.end_time = this.end_time;
          }

          if(this.data_per_page!=null)
          {
            getParams.limit = this.data_per_page;

            if(this.data_current_page!=null)
            {
              getParams.offset = (this.data_current_page - 1) * this.data_per_page;
            }
          }

          let _this = this;
          let result = this.get_client_order_list(getParams)
          //成功返回
                .then(response => {
                    
                  if(response.code ==200 && response.data.errorCode ==0)
                  {
                    response.data.orders.forEach((obj) => {
              
                        if(obj.payTime == null || obj.payTime == undefined)
                        {
                          obj.payTime = "未支付";
                        }
                    });
                    _this.tableData = response.data.orders;
                    _this.data_per_page = response.data.request_count; 
                    _this.data_total = response.data.total_count; 
                  }
                  else
                  {
                    _this.$message.error("获取订单列表失败");
                  }

                })
                //失败返回
                .catch(error => {
                    _this.$message.error("获取订单列表错误");
                });


        },

      // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.data_per_page = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.data_current_page = currentPage;
                console.log(this.data_current_page)  //点击第几页
        },

      //双击跳转
      tableClick(row, column, event){

        let params = {
          // 'order_status':0,
          // 'try_scope':1,
          // 'account': 'admin1',
          // 'pay_status': 0,
          // 'start_time': '2020-10-1',
          // 'end_time': '2020-10-31',
           'offset':0,
           'limit':0
        };
        this.$axios.get("/server/distance/qr/order/"+row.id, params)
                //成功返回
                .then(response => {
                    console.log(response);
                })
                //失败返回
                .catch(error => {
                    console.log(error);
                });
          //this.$router.push("/client/orderdetail");
      },
      handleCancel(index, row)
      {

      },

      handleViewDetail(index, row)
      {

        this.$store.commit("clientOrderList/setViewId",row.id); 

        this.$router.push("/client/orderdetail");
      }
    }
};
</script>

<style scoped>
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
