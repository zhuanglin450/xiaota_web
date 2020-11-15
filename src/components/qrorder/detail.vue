<template>
  <div>
    <div class="stitleAddBack">
      <a class="float-left" style="color:royalblue;">订单详情</a>
      <el-link class="float-right" type="info" @click="goBack">返回</el-link>
    </div>
    <div class="tableStyle">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border default-expand-all>
        <el-table-column align="center" prop="id" label="二维码编号" width="100"></el-table-column>  <!--sortable -->
        <el-table-column align="center" prop="distance" label="间距" width="100"></el-table-column>  <!--sortable -->
        <el-table-column align="center" prop="num" label="数量" width="100"></el-table-column>
        <el-table-column header-align="center" prop="info" label="额外信息"></el-table-column>
        <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleCreate(scope.$index, scope.row)">产生二维码</el-button>
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
  name: "adminQrOrderDetail",
  data() {
      return {
        sdata :[],
        tableData:[],
        //每页显示多少条
        data_per_page: 20,
        //当前页码
        data_current_page: 1,
        data_total:0,
      };
    },
    mounted: function() {  
      this.handle_get_list() ; 
    },
    methods: {
      goBack()
      {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },  
      //产生二维码
      handleCreate(index, row)
      {
          this.$router.push({"name":'adminQrOrderQrcodeList', 
            params:{"qrcontent":this.sdata[row.sdataIndex]}});
      },
      // 获取订单列表
      handle_get_list() {

        let orderid =  sessionStorage.getItem("adminQrOrderDetail_id");
 
        if(orderid == null || orderid == "" || orderid <=0)
        {
          this.tableData = [];
          return;
        }
        let params = { 
          'offset': (this.data_current_page - 1) * this.data_per_page,
          'limit': this.data_per_page
        };
        
        let url = "/api/distance/qr/order/"+orderid+"?";
        url += qs.stringify(params);
        fetch.get(url)
          //成功返回
          .then(response => { 
              if(response.code != 200)
              {     
                  this.$message.error( response.message);
                  return;
              }
              this.sdata = response.data.order_details;
              let tableData = [];
              let i =0;
              this.sdata.forEach(ele  => {
                  tableData.push({
                    sdataIndex : i,
                    id: ele.qr_id,
                    distance: ele.distance,
                    num: '1',
                    info: ele.preset_name
                  });
                  i++;
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
    }
};
</script>

<style scoped>
a {
  color: #ffffff;
}

.el-link.el-link--info
{
  color: #fefefe;
}

.el-link.el-link--info:hover {
    color: #ffffff;
}

.stitleAddBack {
  font-family: "Microsoft YaHei","微软雅黑";  
  height: 2em;
  line-height: 1.25;
  padding: 0.4em 2em;
  background-color: lightblue;
}

.tableStyle {
  padding: 0.5em 1.5em 5.5em 1.5em;
}
</style>
