# GET 和 POST是什么？
- GET
> GET方法请求一个指定资源的表示形式，使用GET的请求应该只被用于获取数据。
- POST
> POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态化或副作用。
本质上都是TCP连接，并无差别

# 区别
- GET在浏览器回退时是无害的，而POST会再次提交请求。
- GET产生的URL地址可以被Bookmark，而POST不可以。
- GET请求会被浏览器主动cache，而POST不会，除非手动设置。
- GET请求只能进行url编码，而POST支持多种编码方式。
- GET请求参数会完整保留在浏览器历史记录里，而POST中的参数不会保留。
- GET请求在URL中传送的参数是有长度限制的，而POST没有。
- 对参数的数据类型，GET只接收ASCll字符，而POST没有限制。
- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
- GET参数通过URL传递，POST放在Request body中。
