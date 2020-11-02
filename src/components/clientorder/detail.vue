<template>
  <div>
    <h3><a>订单号：{{No}}</a></h3>
    <div class="tableStyle">
      <el-table :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id" border default-expand-all >
        <el-table-column colspan='1' header-align="center" prop="qr_id" label="二维码编号" ></el-table-column>
        <el-table-column colspan='10' header-align="center" prop="qr_name" label="二维码名称" ></el-table-column>
        <el-table-column colspan='10' header-align="center" prop="preset_name" label="下单预设名" ></el-table-column>
        <el-table-column colspan='1'  align="center" label="类型" >
              <template slot-scope="scope">
                  <div>
                      {{scope.row.type | filterTypeName}}
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
        No:1,
        tableData: []
      };
    },
    mounted: function(){
      //   ...mapState({
      //   viewOrderId: (state) => state.clientOrderList.view_id, //引入clientOrderList状态中定义的view_id状态变量 
      // }),
        this.quereyData();

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
    },
    methods: {
      quereyData()
      {
          let viewid = this.$route.query.viewid;
          if(viewid == null || viewid <=0 )
              return;

          this.No = viewid;
          //let viewid =  this.No;//this.$store.state.clientOrderList.view_id;
            let params = {
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
