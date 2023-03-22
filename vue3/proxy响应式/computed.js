/**
 * weakMap: bucket 存放副作用函数的桶 target --> Map
 * Map: depsMap  原始对象 target的key key --> set
 * Set: deps 副作用函数集合 / key的依赖集合
 * 增加调度执行
 * computed的实现
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
// effect 栈
const effectStack = []

function effect(fn, options = {}) {
    const effectFn = () => {
        // 调用 cleanup 函数完成清除工作
        cleanup(effectFn)
        // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
        activeEffect = effectFn
        // 在调用副作用函数之前将当前副作用函数压入栈中
        effectStack.push(effectFn)
        // 将执行结果存储到res中
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
    // 只有非 lazy 的时候或者不存在options的时候，才执行
    if (!options.lazy) {
        // 执行副作用函数
        effectFn()
    }
    // 将副作用函数作为返回值返回
    return effectFn
}

function computed(getter) {
    // value 用来缓存上一次计算的值
    let value
    // dirty 标志，用来标识是否需要重新计算值。为true 则意味“脏”，需要计算
    let dirty = true

    // 把getter 作为副作用函数，创建一个 lazy 的 effect
    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            if (!dirty) {
                dirty = true
                // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
                trigger(obj, 'value')
            }
        }
    })
    const obj = {
        get value() {
            // 只有“脏”时才计算值，并将得到的值缓存到 value 中
            if (dirty) {
                value = effectFn()
                // 将 dirty 设置为 false，下一次访问直接使用缓存到 value 中的值
                dirty = false
            }
            track(obj, 'value')
            return value
        }
    }

    return obj
}

const data = {
    foo: 1,
    bar: 2
}
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

const sumRes = computed(() => obj.foo + obj.bar)
effect(() => {
    console.log(sumRes.value);
})
obj.foo++


/**
 * 首先，在computed函数里会注册一个副作用函数 [() => obj.foo + obj.bar,lazy, scheduler ]
 * 因为lazy为true，则懒执行，
 * 然后，注册副作用函数 console.log(sumRes.value)，
 * 因为无options，则执行副作用函数，sumRes.value，调用sumRes里的getter
 * 数据为脏数据，则执行更新缓存value，根据computed内部获取到的副作用函数，即[() => obj.foo + obj.bar,lazy, scheduler ]
 * 获取value对obj的foo和bar进行了依赖收集 最终的set里存储的都是[Function () => obj.foo + obj.bar]{options: {lazy:true,scheduler:Function}}
 * 得到value=3，数据变成非脏
 * 当执行obj.foo++，先是执行代理对象中的get，track(追踪)obj ——> foo
 * 然后代理对象中set方法中触发trigger，获取到obj ——> foo ——> [Function () => obj.foo + obj.bar]{options: {lazy:true,scheduler:Function}}
 * 执行scheduler，因为数据非脏，触发computed内部副作用函数，然后就可以重新获取value缓存值
 * 重新追踪 sumRes ——> value
 */
