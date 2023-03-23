<template>
<div class="wrap">
  <indexVue></indexVue>
</div>
</template>

<script>
import indexVue from './components/index.vue'
export default {
  name: 'App',
  components: {
    indexVue
  }
}
</script>

<style>
html,body,#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.wrap {
  width: 100%;
  height: 100%;
}
</style>
