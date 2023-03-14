# JSONP的实现
- 利用src不受同源策略约束的性质来实现跨域获取数据。只能通过get请求。
- 利用jquery中的$.getJSON()实现JSONP