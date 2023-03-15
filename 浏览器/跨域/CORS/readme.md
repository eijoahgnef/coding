# 什么是CORS？
跨源资源共享（CORS，或通俗地译为跨域资源共享）是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其他源（域、协议或端口），使得浏览器允许这些源访问加载自己的资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的“预检”请求。在预检中，浏览器发送的头中标示有 HTTP 方法和真实请求中会用到的头。

CORS 机制允许 Web 应用服务器进行跨源访问控制，从而使跨源数据传输得以安全进行。现代浏览器支持在 API 容器中（例如 XMLHttpRequest 或 Fetch）使用 CORS，以降低跨源 HTTP 请求所带来的风险

# 什么情况下需要CORS？
- 由 XMLHttpRequest 或 Fetch API 发起的跨源 HTTP 请求。
- Web 字体（CSS 中通过 @font-face 使用跨源字体资源），因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
- WebGL 贴图。
- 使用 drawImage() 将图片或视频画面绘制到 canvas。
- 来自图像的 CSS 图形 (en-US)。

# 简单请求
某些请求不会触发 CORS 预检请求。
若请求满足所有下述条件，则该请求可视为简单请求：
- 使用下列方法之一：
> - GET
> - HEAD
> - POST
- 除了被用户代理自动设置的标头字段（例如 Connection、User-Agent 或其他在 Fetch 规范中定义为禁用标头名称的标头），允许人为设置的字段为 Fetch 规范定义的对 CORS 安全的标头字段集合。该集合为：
> - Accept
> - Accept-Language
> - Content-Language
> - Content-type
> - Range（只允许简单的范围标头值 如 bytes=256- 或 bytes=127-255）
- Content-Type 标头所指定的媒体类型的值仅限于下列三者之一：
> - text/plain
> - multipart/form-data
> - application/x-www-form-urlencoded
- 如果请求是使用 XMLHttpRequest 对象发出的，在返回的 XMLHttpRequest.upload 对象属性上没有注册任何事件监听器；也就是说，给定一个 XMLHttpRequest 实例 xhr，没有调用 xhr.upload.addEventListener()，以监听该上传请求。
- 请求中没有使用 ReadableStream 对象。

# 预检请求
与简单请求不同，“需预检的请求”要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。
OPTIONS的会包括，origin、Access-Control-Request-Method、Access-Control-Request-Headers

所以要实现前端跨域，方法之一就是后端允许源。