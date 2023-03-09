<template>
  <div class="son">
    <button @click="login">登录</button>
    <button @click="out">退出</button>
  </div>
</template>

<script>
import store from '../../store'
export default {
    methods: {
        login() {
            store.commit('changeStatus', '已登录')
        },
        out() {
            store.commit('changeStatus', '退出登录啦')
        }
    },
}
</script>

<style>

</style>