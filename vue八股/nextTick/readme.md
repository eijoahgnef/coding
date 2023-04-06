# nextTick
当在vue中更改响应式状态时，最终的DOM更新并不是同步生效的，而是由vue将他们缓存在一个队列中，直到下一个`tick`才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。
以下代码，在更改count++后，打印此时的视图中的count拿到的是老值，因为在更改count后vue并不会马上去更新DOM，而是将修改数据的操作放在了一个异步操作队列中，如果我们一直修改数据，异步操作队列还会进行去重，等待同一事件循环中的所有数据变化完成之后，会将队列中的事件取出进行处理，进行DOM更新。
如果没有`nextTick`更新机制，那么count假设有十万次更新，那么就要去更新十万次视图，但是有了`nextTick`机制，只需要更新一次，所以这也是一种优化策略。
```
setup() {
    let count = ref(0)
    const change = async() => {
        count.value++
        count.value++
        //  DOM 还未更新
        console.log(document.getElementById('wrap').textContent); // 0
        <!-- 写法一 -->
        nextTick(() => {
        console.log(document.getElementById('wrap').textContent); // 2
        })
        <!-- 写法二 -->
        await nextTick()
        //  DOM 此时已经更新
        console.log(document.getElementById('wrap').textContent); // 2
    }
    return {
        count,
        change
    }
}
```
## 使用场景
- 如果想要在修改数据后立刻得到更新后的DOM结构，可以使用`nextTick`
- 在vue2的created和vue3的setup中进行DOM操作一定要放在`nextTick()`的回调函数中，因为在`created`的时候DOM还没有进行任何渲染，所以无法操作DOM。
- 在使用某个第三方插件时，希望在vue生成的某些DOM动态发生变化时重新应用改插件，也会用到`nextTick`。


# 实现原理
将传入的回调函数包装成异步任务，异步任务又分微任务和宏任务，为了尽快执行所以优先选择微任务； nextTick 提供了四种异步方法 Promise.then、MutationObserver、setImmediate、setTimeOut(fn,0)