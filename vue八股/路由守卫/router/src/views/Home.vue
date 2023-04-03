<template>
  <div class="home">
    <button @click="togo">跳转</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    console.log("来到home页");
    const router = useRouter()
    const togo = () => {
      router.push('/page')
    }
    return {
      togo
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log("home的beforeRouteEnter", to.path, from.path);
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log("home的beforeRouteUpdate", to.path, from.path);
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log("home的beforeRouteLeave", to.path, from.path);
    next()
  }
}
</script>

<style>

</style>