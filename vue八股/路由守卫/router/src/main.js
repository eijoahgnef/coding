import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 全局解析守卫
router.beforeResolve((to, from, next) => {
    console.log("beforeResolve", to.path, from.path);
    if (to.path === '/page') {
        console.log('hhaha');
        next('/home')
    } else {
        next()
    }
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
    console.log("beforeEach：", to.path, from.path);
    next()
})
// 全局后置钩子
router.afterEach((to, from) => {
    console.log("afterEach：", to.path, from.path);
})
createApp(App).use(router).mount('#app')
