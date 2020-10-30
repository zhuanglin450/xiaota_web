import mqtt from "mqtt";
import { equal_deep } from "../assets/js/tool";
export default {
  state: {
    client: null,
    mqtt_message: null
  },
  actions: {
    start_connect({ state, commit }) {
      // debugger
      if (!JSON.parse(sessionStorage.getItem("islogin")) ) {
        return;
      }
      // if (state.client) {
      //   state.client.end();
      // }
      // this.stop_connect();
      let client = mqtt.connect(MQTTURL);
      // 默认值为1
      let account_id = JSON.parse(sessionStorage.getItem("userMessage")).id;
      let topic = `topic/client/${account_id}`;
      client.on("connect", function() {
        client.subscribe(topic, function(err) {
          if (err) {
            console.log("连接失败");
          } else {
            // 设置客户端
            commit("set_client", client);
            console.log("订阅主题", topic);
          }
        });
      });
      client.on("message", function(topic, message) {
        let data = JSON.parse(message.toString());
        //设置token
        data.content = JSON.parse(data.content);
        //打印消息
        console.log("MQ:", JSON.stringify(data));
        // 只记录两条消息不一样的返回
        /*  if (state.mqtt_message && equal_deep(data, state.mqtt_message)) {
          // console.log("收到多条同样的消息");
          return;
        } */
        commit("set_mqtt_message", data);
      });
    },
    stop_connect({ state, commit }) {
      // 终止连接
      // console.log("关闭连接");
      if (state.client) {
        state.client.end();
        commit("set_client", null);
      }
    }
  },
  mutations: {
    set_mqtt_message(state, data) {
      state.mqtt_message = data;
    },
    set_client(state, client) {
      state.client = client;
    }
  }
};
