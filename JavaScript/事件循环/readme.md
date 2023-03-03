# 事件循环
> 主线程从任务队列中读取事件，这个过程是循环不断的，整个的这种运动机制称为EventLoop

# 宏任务和微任务有哪些？
> 宏任务：setTimeout、script、setInterval、I/O、UI render
> 微任务：process nextTick、promise.then、awaite、MutationObserve
> UI render的执行时间：根据HTML standard，在一轮事件循环之后，下一轮循环开始之前进行UI render

# 宏任务、微任务是怎么执行的？
> 先执行同步代码，遇到了异步宏任务则将其放入宏任务对列中，遇到异步微任务则将其放入微任务对列中，当所有的同步代码执行完了，再将异步微任务调入主线程执行，在执行微任务所遇到的新的微任务，会直接加入到此次循环的微任务队列里，微任务执行完毕后再将异步宏任务调入主线程执行，一直到所有任务执行完毕。