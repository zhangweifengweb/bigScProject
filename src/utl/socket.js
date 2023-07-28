import dizhi from "../../vue.config";
import router from "../router";
// import Vue from "vue";
// import Router from "vue-router";
// Vue.use(Router);
var websock = null;
var global_callback = null;
// var serverPort = "18128"; //webSocket连接端口
// var serverHttp = "172.16.226.101";
function initWebSocket(val, callback) {
  // console.log("参数", val);
  // console.log("地址sss", router);
  let serverHttpserverPort =
    dizhi.devServer.proxy["/JBTSHJ"].target.split("//")[1];
  //初始化weosocket
  //ws地址
  var wsuri = "ws://" + serverHttpserverPort + "/websocket/" + val;
  global_callback = callback;
  websock = new WebSocket(wsuri);
  websock.onmessage = function (e) {
    websocketonmessage(e);
  };
  // websock.onclose = function (e) {
  //   websocketclose(e);
  // };
  router.afterEach(function () {
    websock.close();
    // console.log("aaaaa", to, from, next);
  });
  websock.onopen = function () {
    websocketOpen();
  };
  //连接发生错误的回调方法
  websock.onerror = function () {
    console.log("WebSocket连接发生错误");
  };
}
//数据接收
function websocketonmessage(e) {
  console.log("数据返回成功！");
  global_callback(JSON.parse(e.data));
}

//数据发送
// function websocketsend(agentData) {
//   websock.send(JSON.stringify(agentData));
// }

//关闭
function websocketclose(e) {
  console.log("connection closed (" + e + ")");
}

function websocketOpen(e) {
  console.log("连接成功");
}

// initWebSocket();
export { initWebSocket };
