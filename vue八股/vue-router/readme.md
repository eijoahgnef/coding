# vue-router 中的路由模式
- hash
- history
为了实现单页应用，所以就有了前端路由。类似于服务端路由，前端路由实现起来其实就是，匹配不同的url路径，就行解析，然后动态的渲染出去区域html内容。
# vue-router
- 嵌套路由映射
- 动态路由选择
- 模块化、基于组件的路由配置
- 路由参数、查询、通配符


# hash
- 区别
    - url地址上有#
    - 刷新页面不会发生请求，页面不会有任何问题，不需要后端配合
- 实现的原理：原生的hashChange事件，只要是通过事件监听hash值的变化，window.onHashChange = function(){}
- 优点：兼容性较好

# history
- 区别：
    - url地址上没有#
    - 刷新页面会发生请求，会导致页面出现404，需要后端配合解决
- 实现的原理：利用history api中的popState()、pushState()来实现
- 优点：地址干净，美观