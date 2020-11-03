<template>
  <div>
    <div class="stitleAddBack">
      <a class="float-left" style="color: royalblue">二维码图案</a>
      <el-link class="float-right" type="info" @click="goBack">返回</el-link>
    </div>
    <div style="padding: 1em 0; text-align:left">
      <span class="bar1" style="margin-left: 2em;">
          <a>间距:10m</a>
      </span>
      <el-select class="float-right" style="margin-right: 2em;" placeholder="请选择"
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
      <a class="bar1 float-right">大小：</a>
      <el-button type="info" plain class="float-right" size="small" style="margin-right: 2em;">输出到图像
      </el-button>
    </div>
    <div class="flex-around" style="margin-top:2em">
        <div><div ref="codeDiv"></div><br><a></a></div>
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
  mounted: function() {
        let qrcontent = this.$route.params.qrcontent;
        if(qrcontent != null )
        {
          this.qrcontent = qrcontent;
        }

        let mode = sessionStorage.getItem("qrsizemode");
        if(mode==1)
        {
          this.sizeoptions = JSON.parse(mode);
          if(this.qrcontent) this.qq(this.qrcontent);
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

              if(this.qrcontent) this.qq(this.qrcontent);
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
     
     if(wid == null ) wid = 120;
     if(hei == null ) hei = 120;

      this.$refs.codeDiv.innerHTML = ''; //清除已有的
      this.q1 = new QRCode(this.$refs.codeDiv, {
          text: JSON.stringify(qrcontent),
          width: wid,
          height: hei,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });   
    },
    selectChanged(val){ 
      console.log(11);
        if(val<=0 || val > this.sizeoptions.length)
          return;
        let oo = this.sizeoptions[val-1];
        if(this.qrcontent) this.qq(this.qrcontent, oo.width, oo.height);
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
  color: #fbfbfb;
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
    color: #606266; font-size: 1.5em
}
</style>
