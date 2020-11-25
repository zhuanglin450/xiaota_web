<template>
  <div>
    <div style="text-align:right; margin-top:0.25em; margin-right:1em "> 
      <el-button type="primary" @click="downTemplateFile" size="small">订单模板</el-button>
      <el-upload
        style="display:inline-block"
        class="upload-demo"
        action="/api/file/import/distanceQrOrder"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :file-list="fileList">
        <el-button size="small" type="primary">订单导入</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <div class="tableStyle">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id" border default-expand-all>
        <el-table-column header-align="center" prop="id" label="订单号" width="120"></el-table-column>  <!--sortable -->
        <el-table-column header-align="center" prop="presetName" label="预设名" ></el-table-column>
        <!--el-table-column align="center" prop="type" label="类型" width="150"></el-table-column-->
        <!--el-table-column align="center" prop="len" label="长度" width="100"></el-table-column-->
        <!--el-table-column align="center" prop="num" label="数量" width="80"></el-table-column-->
        <el-table-column align="center" prop="orderTime" label="下单日期" width="180"></el-table-column>
        <el-table-column align="center" prop="payTime" label="支付状态" width="120"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="180">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleViewDetail(scope.$index, scope.row)">查看</el-button>
                <el-button size="mini" type="primary" v-show="(scope.row.orderStatus != 3) && (scope.row.orderStatus != 2)"  @click="cancelOrder(scope.$index, scope.row)">撤单</el-button>
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

   <!--el-dialog  v-model="deleteVisible" :append-to-body="true">
      <h4 style="font-weight: bold; ">确认要撤销订单[ {{deleteIndex+1}} ]吗？</h4>
      <span slot="footer" class="dialog-footer" >
                <el-button @click="deleteVisible = false">返回</el-button >
                <el-button @click="confirmDelete" type="primary">确定</el-button >
            </span >
    </el-dialog -->
  </div>  
</template>

<script>
 
import fetch from "../../assets/js/fetch";
import { mapState, mapActions } from "vuex";

export default {
  name: "orderList",
  data() {
      return {
        deleteOrderId:0,
        deleteVisible:false,
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
        tableData: [],
        fileList:[],
      };
    },
    mounted: function() {
      // console.log(this.$route.params);
      this.handle_get_list( ); 
    },
    created:function()
    {
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
              
                        if( obj.orderStatus ==3)
                        {//已经撤销的先显示
                            obj.payTime = "已撤销";
                        }
                        else if(obj.orderStatus ==1)
                        {
                            obj.payTime = "未支付";           
                        }
                        else
                        {//2已支付,显示支付日期

                        }
                    });
                    _this.tableData = response.data.orders;
                    //_this.data_per_page = response.data.request_count; 
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
 
      cancelOrder(index, row)
      {
       
          this.deleteOrderId = row.id;
          //this.deleteVisible = true; 
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
                    this.$message("订单撤销成功");  
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
      handleViewDetail(index, row)
      {
        //this.$store.commit("clientOrderList/setViewId",row.id); 
        this.$router.push({'path':"/client/orderdetail", query:{'viewid': row.id} });
      },
      downTemplateFile()
      {
          // 文件地址
          const link = document.createElement('a');
          link.href = "/api/file/getTemplate/distanceQrOrder";
          link.click()
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleUploadError(){
         this.$message.error("上传失败") ;
      },
      handleUploadSuccess(response){
        if(response.code == 200 && response.data.errorCode ==0) 
            this.$message.success("上传成功") ;
        else
            this.$message.error("上传失败") ;
      },
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
  padding: 0.5em 1.5em 5.5em 1.5em;  
}
</style>
