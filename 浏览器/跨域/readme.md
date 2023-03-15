# 浏览器的同源策略
定义：协议、主机、端口都相同
目的：为了保证用户信息的安全，防止恶意的网站窃取数据。
限制范围：
- cookie、localStorage 和 indexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

# 实现跨域的方式
- JSONP(json with padding)
> 限制：需要服务的支持，只能发起GET请求
- CORS （后端手段）
- nginx （后端手段）
- websocket
> 没有http响应头，因此没有跨域限制
- postMessage()

跨源资源共享标准新增了一组 HTTP 标头字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨源请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（例如 Cookie 和 HTTP 认证相关数据）。