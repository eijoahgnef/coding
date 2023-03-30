/**
 * weakMap: bucket 存放副作用函数的桶 target --> Map
 * Map: depsMap  原始对象 target的key key --> set
 * Set: deps 副作用函数集合 / key的依赖集合
 * whatch(source, (newVal, oldVal, onCleanup) => {},options = {immediate})
 * onCleanup为一个函数，类似于事件监听器，可以用这个函数注册一个回调，这个回调函数会在当前副作用函数过期时执行。
 */
// 用一个全局变量存储被注册的副作用函数
let activeEffect
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
        const res = fn()
        // 在调用副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
        effectStack.pop() 
        activeEffect = effectStack[effectStack.length - 1]
        return res
    }
    // 将 options 挂载到 effectFn上
    effectFn.options = options  //  新增
    // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
    effectFn.deps = []
    if (!options.lazy) {
        // 执行副作用函数
        effectFn()
    }
    // 将副作用函数作为返回值返回
    return effectFn
}
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
function traverse(value, seen = new Set()) {
    // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
    if (typeof value !== 'object' || value === null || seen.has(value)) return
    // 将数据添加到seen中，代表遍历地读取过了，避免循环引用引起的死循环
    seen.add(value)
    // 暂时不考虑数组等其他结构
    // 假设 value 就是一个对象，使用for...in 读取对象的每一个值，并递归的调用traverse 进行处理
    for (const k in value) {
        traverse(value[k], seen)
    }
    return value
}
function watch(source, cb, options = {}) {
    let getter
    // 如果source是函数，说明用户传递的是getter，所以直接吧source 赋值给 getter
    if (typeof source === 'function') {
        getter = source
    } else {
        // 否则按照原来的实现调用traverse 递归地读取
        getter = () => traverse(source)
    }
    let oldValue, newValue

    // cleanup 用来存储用户注册的过期函数
    let cleanup
    // 定义 onInvalidate 函数
    function onInvalidate(fn) {
        // 将过期回调存储到 cleanup中
        cleanup = fn
    }

    // 提取 scheduler 调度函数为一个独立的 job 函数
    const job = () => {
        newValue = effectFn()
        // 在调用回调函数 cb 之前，先调用过期函数
        if (cleanup) {
            cleanup()
        }
        // 将 onInvalidate 作为回调函数的第三个参数，以便用户使用
        cb(newValue, oldValue, onInvalidate)
        oldValue = newValue
    }
    // 使用 effect 注册副作用函数时，开启 lazy 选项，并把返回值存储到 effectFn中以便后续手动调用
    const effectFn = effect(
        // 调用 traverse 递归调用地读取
        () => getter(),
        {
            lazy: true,
            // 使用 job 函数作为调度器函数
            scheduler: () => {
                // 在调度函数中判断flush 是否为 'post'，如果是，将其放到微任务队列中执行
                if (options.flush === 'post') {
                    const p = Promise.resolve()
                    p.then(job)
                } else {
                    job()
                }
            }
            // scheduler() {
            //     // 在 scheduler 中重新执行副作用函数，得到的是新值
            //     newValue = effectFn()
            //     // 将旧值和新值作为回调函数的参数
            //     cb(newValue, oldValue)
            //     // 更新旧值，不然下一次会得到错误的旧值
            //     oldValue = newValue
            // }
        }
    )
    if (options.immediate) {
        // 当 immediate 为true 时立即执行 job，从而触发回调执行
        job()
    } else {
        oldValue = effectfn()
    }
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

watch(
    // getter 函数
    () => obj.foo,
    // 回调函数
    (newVal, oldValue) => {
        console.log('obj.foo 的值变了',newVal, oldValue);
    },
    {
        immediate:true
    }
)

obj.foo++