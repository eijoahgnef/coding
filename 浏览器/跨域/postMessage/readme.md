# postMessage方法基本语法
postMessage(message, targetOrigin)方法接受两个参数
# message：要传递的数据。
在传递参数的时候需要使用JSON.stringify()方法对对象参数序列化
# targetOrigin：字符串参数
该参数用于指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写
# message事件的常用属性
事件的属性存在于什么地方呢？事件的各类属性都存储在参数当中。
data：消息
origin：消息来源地址
source：源DOMWindow对象
# postMessage实现跨域的核心知识
>- 需要使用到iframe标签（依赖于iframe标签实现A——>B，B——>A的数据交互），A域与B域通过iframe标签构建成父子级关系
>- 使用postMessage方法进行信息的发送
>- 使用message事件进行“信息发送”的监听和数据（信息）的接收