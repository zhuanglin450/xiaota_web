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
        <el-table-column align="center" prop="space" label="间距" width="100"></el-table-column>  <!--sortable -->
        <el-table-column align="center" prop="num" label="数量" width="100"></el-table-column>
        <el-table-column header-align="center" prop="info" label="额外信息"></el-table-column>
        <!-- <el-table-column align="center" prop="operate" label="操作"  width="180"></el-table-column> -->
        <el-table-column align="center"  label="操作"  width="180">
            <!-- <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
            </template> -->
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleCreate(scope.$index, scope.row)">产生二维码</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data() {
      return {
        sdata :[],
        // tableData: [{
        //   sdataIndex:0,  
        //   id:1,
        //   space: 10,
        //   num: '100000',
        //   info: '王小虎'
        // } ]
        tableData:[]
      };
    },
    mounted: function() {  
        let orderid = this.$route.params.orderid;
        if(orderid == null || orderid == "" || orderid <=0)
        {
          this.tableData = [];
          return;
        }
        let params = { 
          'offset': 0,
          'limit': 0
        };
        this.$axios.get("/api/distance/qr/order/"+orderid, params)
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
              this.sdata = response.data.data.order_details;
              let tableData = [];
              let i =0;
              this.sdata.forEach(ele  => {
                  tableData.push({
                    sdataIndex : i,
                    id: ele.qr_id,
                    space: ele.distance,
                    num: '1',
                    info: ele.preset_name
                  });
                  i++;
              });
              this.tableData = tableData;
          })
          //失败返回
          .catch(error => {
              this.$message.error("请求数据失败!");
          });
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
      }
    }
};
</script>

<style scoped>
a {
  color: #ffffff;
}

.el-link.el-link--info
{
  color: #fbfbfb;
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
  padding: 0.5em 1.5em;
}
</style>
