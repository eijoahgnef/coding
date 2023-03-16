# 浏览器中的缓存？
1. 强缓存
2. 协商缓存 都是通过HTTP Header来实现的

# 关于HTTP缓存 的 header
- Expires 或者 Cache-Control的max-age
> Expires 标头使用明确的时间而不是通过指定经过的时间来指定缓存的生命周期（HTTP/1.0）。
>- Expires: Wed, 22 Oct 2022 08:12:00 GMT 表示资源会在 Wed, 22 Oct 2022 08:12:00 GMT后过期，需要再次请求 （受限于本地时间，如果修改本地时间，可能会造成缓存失效）
> 在 HTTP/1.1 中，Cache-Control 采用了 max-age——用于指定经过的时间。
>- Cache-Control: max-age=30 表示资源会在 30秒后过期，需要再次请求。

- If-Modified-Since
> 过时的响应不会立即被丢弃。HTTP 有一种机制，可以通过询问源服务器将陈旧的响应转换为新的响应。这称为验证，有时也称为重新验证。
> 验证是通过使用包含 If-Modified-Since 或 If-None-Match 请求标头的条件请求完成的。
以下响应在 22:22:22 生成，max-age 为 1 小时，因此你知道它在 23:22:22 之前是新鲜的。
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```
到 23:22:22 时，响应会过时并且不能重用缓存。因此，下面的请求显示客户端发送带有 If-Modified-Since 请求标头的请求，以询问服务器自指定时间以来是否有任何的改变。
```
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-Modified-Since: Tue, 22 Feb 2022 22:00:00 GMT
```
如果内容自指定时间以来没有更改，服务器将响应 304 Not Modified。
由于此响应仅表示“没有变化”，因此没有响应主体——只有一个状态码——因此传输大小非常小。
```
HTTP/1.1 304 Not Modified
Content-Type: text/html
Date: Tue, 22 Feb 2022 23:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```
收到该响应后，客户端将存储的陈旧响应恢复为新鲜的，并可以在剩余的 1 小时内重复使用它。

- ETag/If-None-Match
> ETag 响应标头的值是服务器生成的任意值。服务器对于生成值没有任何限制，因此服务器可以根据他们选择的任何方式自由设置值——例如主体内容的哈希或版本号。
如果 ETag 标头使用了 hash 值，index.html 资源的 hash 值是 deadbeef，响应如下：
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
ETag: "deadbeef"
Cache-Control: max-age=3600
```
如果该响应是陈旧的，则客户端获取缓存响应的 ETag 响应标头的值，并将其放入 If-None-Match 请求标头中，以询问服务器资源是否已被修改
```
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-None-Match: "deadbeef"
```
如果服务器为请求的资源确定的 ETag 标头的值与请求中的 If-None-Match 值相同，则服务器将返回 304 Not Modified。
但是，如果服务器确定请求的资源现在应该具有不同的 ETag 值，则服务器将其改为 200 OK 和资源的最新版本进行响应。
> 在评估如何使用 ETag 和 Last-Modified 时，请考虑以下几点：在缓存重新验证期间，如果 ETag 和 Last-Modified 都存在，则 ETag 优先。因此，如果你只考虑缓存，你可能会认为 Last-Modified 是不必要的。然而，Last-Modified 不仅仅对缓存有用；相反，它是一个标准的 HTTP 标头，内容管理 (CMS) 系统也使用它来显示上次修改时间，由爬虫调整爬取频率，以及用于其他各种目的。所以考虑到整个 HTTP 生态系统，最好同时提供 ETag 和 Last-Modified。

## 强制重新验证
如果你不希望重复使用响应，而是希望始终从服务器获取最新内容，则可以使用 no-cache 指令强制验证。
通过在响应中添加 Cache-Control: no-cache 以及 Last-Modified 和 ETag——如下所示——如果请求的资源已更新，客户端将收到 200 OK 响应，否则，如果请求的资源尚未更新，则会收到 304 Not Modified 响应。
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
ETag: deadbeef
Cache-Control: no-cache
```
max-age=0 和 must-revalidate 的组合与 no-cache 具有相同的含义。
```
Cache-Control: max-age=0, must-revalidate
```
# 强缓存 和 协商缓存
- 强缓存 
> 缓存策略：如果缓存资源有效，则直接使用缓存资源，不再向服务器重新请求
> 设置方式：http头信息中：Expires属性和Cache-Control属性
- 协商缓存 当强缓存到期了，就要发起请求验证资源是否有更新，如果没有更新，服务端返回304，那么直接更新强缓存的有效期
> 缓存策略：如果命中强制缓存，无需发起新的请求，直接使用缓存，如果没命中强制缓存，如果设置了协商缓存，这采用协商缓存，在使用协商缓存时，会先向服务器发起一个请求，如果资源没有发生修改，则返回一个 304 状态，让浏览器使用本地缓存副本，如果资源发生了修改，则返回修改后的资源。
可以设置 HTTP Header为：Last-Modified 或者 ETag

浏览器请求会在请求头里面携带 If-Modified-Since

Last-Modified: 本地文件最后一次修改的日期，当协商缓存执行时，会询问服务器在该日期后资源是否有更新（缺点：只要本地打开了缓存文件，即使没有修改文件，也会造成Last-Modified被修改）

ETag: 对比文件内容来确定文件是否被修改，类似于文件的指纹，将ETag发送给服务端，询问该资源的ETag有没有变动，没有的话就...

# 浏览器判断是否使用缓存？
- 第一次请求：
浏览器请求 ——> 无缓存 ——> 向web服务器请求 ——> 请求响应，缓存协商 ——> 呈现
- 第二次请求：
浏览器请求 ——> 有缓存，则判断是否过期？
 - 否 ——> 从缓存读取 ——> 呈现
 - 是 ——> ETag? ——> 
    - 是 ——> 向web服务器请求带If-None-Match ——> 200 or 304  304的情况会从缓存中读取然后呈现，200则会请求响应，缓存协商 
    - 否 ——> Last-Modified ——> 
          - 是  ——> 向web服务器请求带If-Modified-Since ——> 200 or 304  304的情况会从缓存中读取然后呈现，200则会请求响应，缓存协商 
          - 否  ——> 向web服务器请求 ——> 请求响应，缓存协商  ——> 呈现
200说明资源发生了变化，这个时候服务器会返回新的资源，304则是说明资源没发生变化，让浏览器直接使用本地副本。
# 如果什么缓存策略都没有设置的话，浏览器会怎么处理？
浏览器会启用一个启发式算法，通常会取响应头中的Date减去Last-Modified的值的10%作为缓存时间

# 浏览器缓存的优点？
- 减少了冗余的数据传输，节省了网费
- 减少了服务器的负担，大大提升了网站的性能
- 加快了客户端加载网页的速度
