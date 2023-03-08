<template>
  <div class="parent">
    <son></son>
  </div>
</template>

<script>
import son from './son.vue'
export default {
    components: {
        son
    },
    provide: {
        list: ['123','hahah']
    },
}
</script>

<style>

</style>