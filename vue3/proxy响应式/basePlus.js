/**
 * weakMap: bucket 存放副作用函数的桶 target --> Map
 * Map: depsMap  原始对象 target的key key --> set
 * Set: deps 副作用函数集合 / key的依赖集合
 * 增加调度执行
 */
// 用一个全局变量存储被注册的副作用函数
let activeEffect
// cleanup 函数将副作用函数从依赖集合中移除
function cleanup(effectFn) {
    // 遍历 effectFn.deps 数组
    for (let i = 0; i < effectFn.deps.length; i++) {
        // deps 是依赖集合
        const deps = effectFn.deps[i]
        // 将 effectFn 从依赖集合中移除
        deps.delete(effectFn)
    }
    // 最后需要重置 effectFn.deps 数组
    effectFn.deps.length = 0
}
// effect 栈
const effectStack = []
function effect(fn, options= {}) {
    const effectFn = () => {
        // 调用 cleanup 函数完成清除工作
        cleanup(effectFn)
        // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
        activeEffect = effectFn
        // 在调用副作用函数之前将当前副作用函数压入栈中
        effectStack.push(effectFn)
        fn()
        // 在调用副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
        effectStack.pop() 
        activeEffect = effectStack[effectStack.length - 1]
    }
    // 将 options 挂载到 effectFn上
    effectFn.options = options  //  新增
    // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
    effectFn.deps = []
    // 执行副作用函数
    effectFn()
}

// 储存副作用函数的桶
const bucket = new WeakMap()


// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
    // 没有 activeEffect，直接 return
    if (!activeEffect) return
    let depsMap = bucket.get(target)
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
    // deps 就是一个与当前副作用函数存在联系的依赖集合
    // 将其添加到 activeEffect.deps 数组中
    activeEffect.deps.push(deps) //  新增
}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
    const depsMap = bucket.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)

    // effects && effects.forEach(fn => fn()) //  删除 避免无限循环
    // const effectsToRun = new Set(effects)  //  新增
    const effectsToRun = new Set()
    effects && effects.forEach(effectFn => {
        // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
        if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
        }
    })
    effectsToRun.forEach(effectFn => {
        // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
        if (effectFn.options.scheduler) {
            effectFn.options.scheduler(effectFn)
        } else {
            effectFn()
        }
    })
}

// 定义一个任务队列
const jobQueue = new Set()
// 使用 Promise.resolve() 创建一个 promise 实例，我们用它将一个任务添加到微任务队列
const p = Promise.resolve()

// 一个标志代表是否正在刷新队列
let isFlushing = false
function flushJob() {
    // 如果队列正在刷新，则什么都不做
    if (isFlushing) return
    // 设置为 true，代表正在刷新
    isFlushing = true
    // 在微任务队列中刷新 jobQueue 队列
    p.then(() => {
        jobQueue.forEach(job => job())
    }).finally(() => {
        // 结束后重置 isFlushing
        isFlushing = false
    })
}
const data = { foo: 1}
const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
        // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
        track(target, key)
        // 返回属性值
        return target[key]
    },
    // 拦截设置操作
    set(target, key, newVal) {
        target[key] = newVal
        // 把副作用函数从桶里取出来并执行
        trigger(target, key)
    }
})
effect(
    () => {
        console.log(obj.foo);
    },
    // options
    {
        // 调度器scheduler 是一个函数
        scheduler(fn) {
            // // 将副作用函数放到宏任务队列中执行
            // setTimeout(fn)
            jobQueue.add(fn)
            // 调用 flushJob 刷新队列
            flushJob()
        }
    }
)


obj.foo++
obj.foo++
obj.foo++

console.log('结束了');