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
        <el-table-column colspan='1' header-align="center" prop="qr_id" label="二维码编号" ></el-table-column>
        <el-table-column colspan='10' header-align="center" prop="qr_name" label="二维码名称" ></el-table-column>
        <el-table-column colspan='10' header-align="center" prop="preset_name" label="下单预设名" ></el-table-column>
        <el-table-column colspan='1'  align="center" label="类型" >
              <template scope="scope">
                  <div>
                      {{scope.row.type| filterTypeName}}
                  </div>
              </template>
        </el-table-column>
        <el-table-column colspan='1'  align="center" prop="distance" label="间距长度" ></el-table-column>
        <!--el-table-column align="center" prop="serial_number" label="序列号" width="150"></!--el-table-column-->
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import fetch from "../../assets/js/fetch";
import qs from "querystring";

export default {
  name: "orderList",
  data() {
      return {
        No:123456,
        tableData: [ 
         ]
      };
    },
    computed: {
         ...mapState({
          viewOrderId: (state) => state.clientOrderList.view_id, //引入clientOrderList状态中定义的view_id状态变量 
        }),
    },
    filters:
    {     
      filterTypeName(id){
          let result = '';
          if(id==0)
          {
              result = '固定码';
          }
          else if(id == 1)
          {
            result = '通用码';
          }
 
          return result;
      },
    },
     created:function()
    {
          this.quereyData();
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
      quereyData()
      {
          
          this.No = sessionStorage.getItem("order_list_viewId");//this.$store.getters["clientOrderList/viewId"];//or this.$store.state.clientOrderList.view_id;

          let viewid =  this.No;//this.$store.state.clientOrderList.view_id;
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
            
            let param = "?"+ qs.stringify(params);
 
            fetch.get("/api/distance/qr/order/"+viewid+ param )
                  //成功返回
                  .then(response => {
                      if(response.code == 200 && response.data.errorCode==0)
                      {
                          this.tableData = response.data.order_details;
                      }
                      else
                      {
                        this.$message.error("获取订单详情异常");
                      }
                  })
                  //失败返回
                  .catch(error => {
                       this.$message.error("获取订单详情失败");
                  });
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

<style scoped>
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
