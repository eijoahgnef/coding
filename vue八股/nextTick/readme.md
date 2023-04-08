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
优先级：promise ——> MutationObserver ——> setImmediate ——> setTimeout

```
Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
};
```
其内部调用的也是`nextTick`函数。 （index.ts）

nextTick执行过程：
- 将回调函数包装后放入到callbacks等待执行
- 将执行函数放到微任务或者宏任务中
- 事件循环到了微任务或者宏任务，执行函数会依次执行callbacks中的回调


解释：将nextTick里的回调函数放入到callbacks数组中，这些回调函数会在flushCallbacks这个执行函数中执行，而后会将这个执行函数放入到微任务或者宏任务中去等待执行，放入到哪个异步任务中呢？这个根据当前环境来的，判断的优先级为，promise（then中）、MutationObserver、setImmediate、setTimeout，当事件循环到这个异步函数时，就会调用执行函数，执行函数就会依次执行callbacks中的回调函数。
扩展：只有执行完callbacks里的函数才会去执行下一个nextTick（也就是flushCallbacks执行完），这里利用的是pending去控制是否执行异步任务，然后在flushCallbacks中会改变pending的值，使得下一次的nextTIck能正常执行。

对于执行函数放入到异步任务的优先级中，为什么优先使用微任务？
因为在执行下一次宏任务之前会执行一次UI渲染，等待的时长要比微任务长，所以能使用微任务的时候优先使用微任务。