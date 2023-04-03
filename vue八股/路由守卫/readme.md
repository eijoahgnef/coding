# 路由守卫有哪几种？
路由守卫分为三种：全局守卫（3个）、路由独享守卫（1个）、组件的守卫（3个）

每个守卫方法接收两个参数
- to：即将要进入的目标
- from：当前导航正要离开的路由
- next：（可选参数）你可以向任何导航守卫传递第三个参数，但是只能在所有的逻辑路径不重叠的情况下，否则钩子永远都不会被解析或报错。
  - next() 直接进 to 所指路由
  - next(false) 中断路由
  - next('route') 跳转指定路由 // next('/home)
  - next('error') 跳转错误路由
```
// 用户未能验证身份时重定向到 /login 
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

# 全局守卫
- 全局前置守卫  router.beforeEach 主要用于登录验证
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。
```
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})

```
false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

- 全局解析守卫 router.beforeResolve 
这和 router.beforeEach 类似，因为它在 每次导航时都会触发，但是确保在导航被确认之前，__同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用__。

- 全局后置钩子 router.afterEach 
和守卫不同的是，这些钩子不会接受next函数也不会改变导航本身，接受failure作为第三个参数

- 路由独享守卫 beforeEnter
beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects。它们只有在 从一个不同的 路由导航时，才会被触发。
```
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

- 组件内的守卫
    - beforeRouteEnter
    - beforeRouteUpdate
    - beforeRouteLeave
```
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```
## 完整的导航解析流程
导航被触发 ——> 在失活的组件里调用离开守卫 `beforeRouteLeave` ——> 调用全局的 `beforeEach` 守卫 ——> 
在 `重用的组件` 里调用 `beforeRouteUpdate` 守卫 ——> 在路由配置里调用 `beforeEnter` ——> 
解析异步路由组件 ——> 在被激活的组件里面调用 `beforeRouteEnter` ——> 调用全局的 `beforeResolve` 守卫 ——>
导航被确认 ——> 调用全局的 `afterEach` 钩子 ——> 触发 DOM 更新 ——> 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 next 的回调函数

## 导航守卫的开发场景
全局守卫：
- beforeEach：登录验证（鉴权）
组件内的守卫：
- beforeRouteLeave：可以访问组件实例this
①在路由切换的时候，对定时器进行清除，以免占用内存 ② 当页面中有未关闭的窗口，或未保存的内容是，阻止页面跳转
```
beforeRouteLeave (to, from, next) {
  window.clearInterval(this.timer) //清楚定时器
  next()
}
```
- beforeRouteUpdate：可通过this访问实例。当前路由query变更时，该守卫会被调用
- beforeRouteEnter：全局beforeResolve和全局afterEach之前调用
