# 虚拟DOM
对真是DOM的抽象，以js对象作为基础的树，用对象的属性来描述节点，最终可以通过一些列操作使`这棵树`映射到真实环境上。
在js对象中，虚拟DOM表现为一个`Object`对象。并且最少包含标签名(tag)、属性(attrs)和子元素对象(children)三个属性。
创建虚拟DOM就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟DOM对象的节点与真实DOM一一照应。
- 为什么要用虚拟DOM呢？
> 页面的性能问题，大部分都是由DOM操作引起的。操作DOM的代价是很昂贵的。如果直接操作DOM进行增删改查的话对于开发者的心智负担是比较大的。
> 用传统的原生api去操作DOM，浏览器会从构建DOM树开始从头到尾执行一遍流程。
> 当在一次操作中，需要更新10个DOM节点，浏览器收到第一个更新DOM请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程。
> 而通过vnode，同样更新10个DOM节点，虚拟DOM不会立即操作DOM，而是将这10次更新的`diff`的内容保存到本地的一个`js`对象中，最终将这个js对象一次性attach到DOM树上，避免大量的无谓计算。

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