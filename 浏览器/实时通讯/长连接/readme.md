# 长连接
目前 http 协议普遍使用的是 1.1 版本, 之前有个 1.0 版本,两者之间的一个区别是 1.1 支持 http 长连接, 或者叫持久连接。
1.0 不支持 http 长连接, 每次一个 http请求响应后都关闭 tcp 连接, 下个 http 请求会重新建立 tcp 连接。
多个 http 请求共用一个 tcp 连接; 这样可以减少多次临近 http 请求导致 tcp建立关闭所产生的时间消耗。
http 1.1 中在请求头和相应头中用 connection字段标识是否是 http长连接, connection: keep-alive, 表明是 http 长连接; connection:closed, 表明服务器关闭 tcp 连接。
与 connection 对应的一个字段是 keep-live, http 响应头中出现, 他的格式是 timeout=30,max=5, timeout 是两次 http 请求保持的时间(s), , max 是这个 tcp 连接最多为几个 http请求重用
- 优点：
> 消息即时到达，不发无用请求；管理起来也相对方便。
- 缺点：
> 服务器维护一个长连接会增加开销