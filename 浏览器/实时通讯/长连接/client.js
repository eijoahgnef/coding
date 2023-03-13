// 前端部分
// 可以检测浏览器是否支持SSE
if ('EventSource' in window) {
    // ...
}
// 使用SSE，
var source = new EventSource(url)
// 上面的url可以与当前网址同域。跨域时，可以指定第二个参数，打开withCredentials属性，表示是否一起发送cookie
// var source = new EventSource(url, {withCredentials: true})
// 基本用法
source.onopen = function (event) {
    // ...
}
// 另一种写法
source.addEventListener('open', function (event) {
    // ...
}, false)
// 客户端收到服务器发来的数据，就会触发message事件，可以在onmessage属性的回调函数。
source.onmessage = function (event) {
    var data = event.data
}
// 另一种写法
source.addEventListener('message', function (event) {
    var data = event.data
}, false)
// 上面的代码中，事件对象的data属性就是服务器端传回的数据（文本格式）

// 如果发生通信错误（比如连接中断），就会触发error事件，可以在onerror属性定义回调函数。
source.onerror = function (event) {
    // handle error event
};

// 另一种写法
source.addEventListener('error', function (event) {
    // handle error event
}, false);
source.close();