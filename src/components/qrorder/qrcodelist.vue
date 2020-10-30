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
      <el-select class="float-right" style="margin-right: 2em;" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in sizeoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      <a class="bar1 float-right">大小：</a>
      <el-button type="info" plain class="float-right" style="margin-right: 2em;">输出到图像
      </el-button>
    </div>
    <div class="flex-around" style="margin-top:2em">
        <div><div ref="codeDiv"></div><br><a>nnnnnnn</a></div>

    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  name: "qrcodeList",
  components: { QRCode },
  data() {
    return {
        sizeoptions: [{
          value: '选项1',
          label: '5 * 5px'
        }, {
          value: '选项2',
          label: '8 * 8px',
          disabled: false
        }, {
          value: '选项3',
          label: '10 * 10px'
        }, {
          value: '选项4',
          label: '20 * 20px'
        }],
        value: ''
      };
  },
  mounted: function() {      
    let qrcontent = this.$route.params.qrcontent;
    if(qrcontent == null )
    {
      return;
    }
    this.q1 = new QRCode(this.$refs.codeDiv, {
        text: JSON.stringify(qrcontent),
        width: 120,
        height: 120,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
    });
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },

    qq(){
        
    }
  },
};
</script>

<style scoped>
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
