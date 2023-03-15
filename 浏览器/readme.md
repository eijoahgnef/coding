# 常见的浏览器内核有哪些？
> Trident(IE)、WebKit(Safari,旧版的Chrome)、Presto(Opera)、Blink(Chrome、Opera)、Geckoy(Firefox)、chromium(chrome)

# 浏览器的主要组成部分是什么？
- __用户界面__：包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
- __浏览器引擎__：在用户界面和呈现引擎之间传送指令。
- __呈现引擎__：负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
- __网络__：用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
- __用户界面后端__：用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
- __JavaScript解释器__：用于解析和执行 JavaScript 代码。
- __数据存储__：这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

# 浏览器进程都有哪些？
- GPU进程：绘制UI界面
- 网络进程：加载网络资源
- 插件进程： 负责插件的运行,因为插件可能崩溃，所以需要通过插件进程来隔离，以保证插件崩溃也不会对浏览器和页面造成影响。
- 浏览器主进程：界面显示、用户交互、子进程管理、存储功能 
- 渲染进程：核心任务是将HTML、CSS、JS转换为用户可与之交互的网页，排版引擎Blink和v8引擎都运行在该进程中。

# 在浏览器中打开两个页面，会开启几个进程？
1个浏览器进程，1个网络进程，1个GPU进程，通常一个Tab页对应一个渲染进程，但是有其他情况：
1. 如果页面中有iframe的话，iframe也会运行在单独的进程中
2. 如果页面有插件，插件也需要开启一个单独的进程
3. 如果浏览器中装了扩展，一个扩展对应一个进程
4. 如果两个页面属于同一站点，并且从a页面中打开b页面，那么他们会公用一个渲染进程

同一站点(same-site): 根域名+协议，比如baidu.com加上协议https, 包含了该根域名下的所有子域名和不同端口
Chrome的默认策略是，每个标签对应一个渲染进程，但如果从一个页面打开了新页面，新页面与原页面属于同一站点，那么新页面会复用父页面的渲染进程，官方把这个默认策略叫 process-per-site-instance。在这种情况下，一个页面崩溃，会导致同一站点的页面同时崩溃，因为他们使用了同一个渲染进程。

# 渲染进程中的线程有哪些？
- 浏览器默认为每个Tab标签创建一个渲染进程，渲染进程运行在沙箱模式下。
    - GUI渲染线程
    - JavaScript 引擎线程
    - 定时触发线程
    - 事件触发线程
    - 异步 http 请求线程

1. GUI渲染线程
- 主要负责页面的渲染，解析HTML、CSS，构建DOM树，布局和绘制等。
- 当界面需要重绘或者由于某种操作引发回流时，将执行改线程。
- 该线程与JS引擎线程互斥，当执行JS引擎时(任务队列不空闲)，GUI渲染会被挂起，当任务队列空闲时，JS引擎才会去执行GUI渲染。

2. JS引擎线程
- 该线程主要是负责处理JavaScript脚本，执行代码。
- 也是主要负责执行准备好待执行的事件，即定时器计时结束，或者异步请求成功并正确返回时，将一次进入任务队列，等待JS引擎线程的执行。
- 该线程与GUI渲染线程互斥，当JS引擎线程执行JavaScript脚本时间过长，将导致页面渲染的阻塞。

3. 定时器触发线程
- 负责执行异步定时器一类的函数的线程，如：setTimeout、setInterval。
- 主线程依次执行代码时，遇到定时器，会将定时器交给该线程处理，当计时完毕后，事件触发线程会将计时完毕的事件加入到任务对列的尾部，等待JS引擎线程执行。

4. 事件触发线程
- 主要负责将准备好的事件交给JS引擎线程执行。

5. 异步http请求线程
- 负责执行异步请求一类的函数的线程。
- 主线程依次执行代码时，遇到异步请求，会将函数交给线程处理，当监听到状态码变更，如果有回调函数，事件触发线程会将回调函数加入到任务队列的尾部，等待JS引擎线程的执行。

# 浏览器如何渲染UI的？  (大致为5个步骤)
- 首先，解析HTML，生成DOM树
[![xfRI0J.png](https://s1.ax1x.com/2022/10/27/xfRI0J.png)](https://imgse.com/i/xfRI0J)
> HTML解析器在开始工作时，会默认创建一个`根为document`的空 DOM 结构，同时会将一个StartTag document 的Token 压入栈底。然后分词器解析出俩的第一个StartTag  html Token会被压入到栈中，并且创建第一个html的DOM节点，添加到document上，当遇到StartTag div 时 则会生成一个div的节点，而文本`呆呆鹅`则会直接加入到DOM树中，此后分词器解析出第一个EndTag div ，这个时候HTML解析器会去判断当前栈顶是否是StartTag div，如果是StartTag div就会从栈顶弹出StartTag div。接下来的解析都是按照上面的那三个规则。
- 构建CSSOM树：浏览器通过解析CSS文件来构建CSSOM树。
> 过程类似于 DOM 的产生，但是这个过程更加消耗性能，因为CSS是可以自己定义的，也可以继承得到。这个过程浏览器需要递归得到CSSOM树，这样才能确定每一个元素到底是什么样式。
-  渲染树：DOM + CSSOM生成Render Tree（渲染树）（display: none节点不会出现在渲染树中)渲染树长什么样呢，其实就是在DOM树的基础上给每个节点注明了属性，
- 接着进入布局（Layout）阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标
-  绘制（Paint）：随后调用GPU进行绘制（Paint），遍历Render Tree的节点，并将元素呈现出来。
> 注意点：JS会阻塞DOM树的形成。因为JS会操作DOM节点，所以阻塞DOM树的生成。CSS 加载会阻塞 DOM 树的渲染。

# 浏览器重绘和重排（回流）的区别？
- 重排: 当元素几何属性发生变化时，导致页面布局发生变动，浏览器会重新渲染部分或者全部文档的过程就称为重排。
- 重绘: 当元素的非几何属性发生变化时，但是不会影响其在文档流中的位置，浏览器会对元素进行重新绘制，这个过程就是重绘。
> 发生重排的情况：①页面的初次渲染，这是开销最大的一次重排。②添加/删除可见的DOM元素。③改变元素位置。④改变元素尺寸、内容或者字体大小。⑤改变浏览器窗口尺寸⑥查询某些属性或者调用某些计算方法： offsetTop、offsetLeft、offsetWidth、offsetHeight scrollTop、scrollLeft、scrollWidth、scrollHeight clientTop、clientLeft、clientWidth、clientHeight getComputedStyle() getBoundingClientRect。

# 浏览器的本地存储？
cookie、localStorage、sessionStorage
1. cookie  （4kb）
document.cookie = "username=; expires=;path=;domian="
- expires：过期时间，当过了到期日期时，浏览器会自动删除该cookie，如果想删除一个cookie，只需要把它过期时间设置成过去的时间即可
- path：路径，值可以是一个目录，或者是一个路径。
- domain：主机名，是指同一个域下的不同主机，例如：www.baidu.com和map.baidu.com就是两个不同的主机名。默认情况下，一个主机中创建的cookie在另一个主机下是不能被访问的，但可以通过domain参数来实现对其的控制：document.cookie = "name=value;domain=.baidu.com"
这样，所有*.baidu.com的主机都可以访问该cookie。
> 缺点：
> 1. 容量缺陷。Cookie的体积上限只有4KB，只能用来储存少量的信息
> 2. 性能缺陷。Cookie紧跟域名，不管域名下面的某一个地址需不需要这个Cookie，请求都会携带上完整的Cookie,这样随着请求数的增多，会造成巨大的性能浪费的，因为请求携带了很多不必要的内容
> 3. 安全缺陷。由于Cookie以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在Cookie的有效期内重新发送给服务器，这是相当危险，另外，在HttpOnly为false的情况下，Cookie信息能直接通过JS脚本来读取
> 4. 只能用document.cookie = '...'来修改。

2. localStorage (5M甚至更大)
以键值对(Key-Value)的方式存储，永久存储，永不失效，除非手动删除。IE8+支持，打开同域的新页面也能访问得到
应用场景：利用localStorage的较大容量和持久特性，可以利用loaclStorage存储一些内容稳定的资源，比如官网的logo，存储Base64格式的图片资源，因此利用localStorage。

3. sessionStorage (5M甚至更大)
sessionStorage操作的方法与localStroage是一样的，区别在于 sessionStorage 在关闭页面后即被清空
> 应用场景：
> - 可以用它对表单信息进行维护，将表单信息存储在里面，可以保证页面，即使刷新也不会让之前的表单信息丢失
> - 可以用它存储本次浏览记录，如果关闭页面后不需要这些记录，用sessionStorage

4. cookie、localStorage、sessionStorage之间的区别
- cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
- 存储大小限制不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
- 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
- 作用域不同，sessionStorage不在不同的浏览器页面中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。
- Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。
- Web Storage 的 api 接口使用更方便，cookie的原生接口不友好，需要自己封装。

# 前端如何实现实时通讯？
- 短轮询
- 长轮询
- websocket
- SSE（长连接）
> 长轮询和短轮询的区别：
> - 相同点：http长轮询和http短轮询都会持续一段时间
> - 不同点：间隔是发生在服务端还是浏览器端：长轮询在服务端会hold一段时间，短轮询在浏览器端hold一段时间。

> websocket和SSE的区别:
> websocket是全双工通道，可以双向通信，而SSE是单向通道，只能服务器向浏览器发生，因为信息流本质上就是下载。
> SSE 使用HTTP协议，现有的服务器软件都支持。websocket是一个独立协议
> SSE 属于轻量级，使用简单，websocket 协议相对复杂
> SSE 默认支持断线重连，websocket 需要自己实现
> SSE 一般只用来传送文本，二进制数据需要编码后传送，websocket 默认支持传送二进制数据
> SSE 支持自定义发送的消息的类型