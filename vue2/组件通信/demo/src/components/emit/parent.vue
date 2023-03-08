<template>
  <div class="emit">
    <!-- <son v-on:emitList="gainList"></son> -->
    <son @emitList="gainList"></son>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import son from './son.vue'
export default {
    components: {
        son
    },
    data() {
      return {
        list:[]
      }
    },
    methods: {
      gainList(list) {
        this.list = list
      }
    },
}
</script>

<style>

</style>