// 服务器向浏览器发送的 SSE 数据，必须是 UTF-8 编码的文本，具有如下的 HTTP 头信息
// Content-Type: text/event-stream
// Cache-Control: no-cache
// Connection: keep-alive
var http = require("http");

http.createServer(function (req, res) {
  var fileName = "." + req.url;

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function () {
      res.write("data: " + "我一直在！" + "\n\n")

    }, 1000);

    req.socket.addListener("close", function () {
      clearInterval(interval);
    }, false);
  }
}).listen(8844, ()=> {
    console.log('端口已在8844');
});
