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
由上其实可以看出，JS引擎线程其实就是一条主线，所有的线程都是围绕着他进行着。