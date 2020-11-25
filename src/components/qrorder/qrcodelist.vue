<template>
  <div class="qrorderQrcodelistVue">
    <div class="stitleAddBack">
      <a class="float-left" style="color: royalblue">二维码图案</a>
      <el-link class="float-right" type="info" @click="goBack">返回</el-link>
    </div>
    <div style="padding: 1em 0 0.25em 0; text-align:right">
      <a class="bar1">大小：</a>
      <el-select style="margin-right: 2em;" placeholder="请选择"
        v-model="selectVal" 
        @change="selectChanged">
        <el-option
          v-for="item in sizeoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-right: 2em;" v-print="'#printContent'">
        打印
      </el-button>
    </div>
    <div class="flex-row-left-wrap qrlistStyle" style="margin-top:1.5em;" id="printContent" >
        <div v-for="item in qrcontent" :key="item.qr_id" style="padding:1em 1.5em">
          <div class="bar2" >
            <a>编号: {{item.qr_id}}</a><br>
            <a>间距: {{item.distance + "m"}}</a><br>
            <a>名称: {{item.qr_name}}</a>
          </div>
          <div style="margin-top:0.75em" ref="codeDiv"></div>
        </div> 
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

import fetch from "../../assets/js/fetch";
import qs from "querystring";

export default {
  name: "qrcodeList",
  components: { QRCode },
  data() {
    return {
        q1:null,
        sizeoptions: [{
          value: '1',
          label: '40 * 40px'
        }, {
          value: '2',
          label: '50 * 50px',
          disabled: false
        }, {
          value: '3',
          label: '100 * 100px'
        }, {
          value: '4',
          label: '200 * 200px'
        }],
        selectVal: '',
        qrcontent:null,
      };
  },
  computed:{
    // qrId:function(){
    //     if(this.qrcontent != null )
    //       return this.qrcontent.qr_id;
    //     return "";
    // },
    // qrDistance:function(){
    //     if(this.qrcontent != null )
    //       return this.qrcontent.distance + "m";
    //     return "";
    // },
    // qrName:function(){
    //     if(this.qrcontent != null )
    //       return this.qrcontent.qr_name;
    //     return "";
    // },
  },
  mounted: function() {
        let qrcontent = this.$route.params.qrcontent;
        if(qrcontent != null )
        {
          this.qrcontent = qrcontent;
        }

        //获取二维码展示大小
        let mode = sessionStorage.getItem("qrsizemode");
        if(mode)
        {
          this.sizeoptions = JSON.parse(mode);
          if(this.qrcontent && this.qrcontent.length>0) 
            setTimeout(() => {
              this.qq(this.qrcontent); //先等dom 加载完成 及 ref 有效
            }, 300); 
        }
        else
        {
        let url = "/api/distance/qr/size/mode";
        fetch.get(url).then(response => {          
              if(response.code != 200)
              {     
                  this.$message.error( response.message);
                  return;
              }

              let arrmode = response.data.size_mode;
              let i=1;
              let arr = [];
              arrmode.forEach(ele => {
                  arr.push({
                    id : ele.id,
                    value: ''+i,
                    label: ele.width + ' * '+ ele.height + "px",
                    disabled: false,
                    width: ele.width,
                    height: ele.height
                  });
                  i++;
              });
              if(arr.length != 0)
              {
                  this.sizeoptions = arr;
                  sessionStorage.setItem("qrsizemode", JSON.stringify(this.sizeoptions));
              }

              if(this.qrcontent && this.qrcontent.length>0) this.qq(this.qrcontent);
          })
          .catch(error => { //失败返回
              this.$message.error("请求数据失败!");
          });
          }      
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    qq(qrcontent, wid, hei){
     
     if(qrcontent == null)
        return;

     if(wid == null ) wid = 120;
     if(hei == null ) hei = 120;

      if(qrcontent.length==1)
      {
        this.$refs.codeDiv[0].innerHTML = ''; //清除已有的
        this.q1 = new QRCode(this.$refs.codeDiv[0], {
            text: JSON.stringify(qrcontent[0]),
            width: wid,
            height: hei,
            colorDark: "#333333", //二维码颜色
            colorLight: "#ffffff", //二维码背景色
            correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
        });
      }
      else
      {
        for(let i=0;i<qrcontent.length;++i)
        {
          this.$refs.codeDiv[i].innerHTML = ''; //清除已有的
          this.q1 = new QRCode(this.$refs.codeDiv[i], {
              text: JSON.stringify(qrcontent[i]),
              width: wid,
              height: hei,
              colorDark: "#333333", //二维码颜色
              colorLight: "#ffffff", //二维码背景色
              correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
          });

        }
      }
    },
    selectChanged(val){ 
        if(val<=0 || val > this.sizeoptions.length)
          return;
        let oo = this.sizeoptions[val-1];
        if(this.qrcontent && this.qrcontent.length>0) this.qq(this.qrcontent, oo.width, oo.height);
        // this.q1.width = oo.width;
        // this.q1.height = oo.height;
    },
  },
};
</script>

<style scoped>

a {
  text-decoration:none; 
}

.stitleAddBack {
  font-family: "Microsoft YaHei", "微软雅黑";
  height: 2em;
  line-height: 1.25;
  padding: 0.4em 2em;
  background-color: lightblue;
}

.el-link.el-link--info {
  color: #fefefe;
}

.el-link.el-link--info:hover {
  color: #ffffff;
}

.el-input {
    width:7.5em;
}

.el-select-dropdown__item {
    text-align: center;
}

.bar1{
    color: #606266; 
    font-size: 1.25em;
    margin-top:0.25em;
    text-align: left;
}

.bar2{
    color: #606266; 
    font-size: 1em;
    text-align: left;
    
  
}

.qrlistStyle {
  padding: 0.5em 1.5em 5.5em 1.5em;
}
</style>

<style>
.qrorderQrcodelistVue img {
  width: auto;
  /*page-break-after:always // 下一个div 为新的页面*/
}

.qrorderQrcodelistVue canvas {
  page-break-inside: avoid; /*// 下一个div 为新的页面*/
}

</style>