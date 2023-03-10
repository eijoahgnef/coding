<template>
  <div class="root">
    <span>{{ gainVal }}</span>
    <button @click="gain">获取</button>
    <son></son>
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
            gainVal: '父组件的值'
        }
    },
    methods: {
        gain() {
            this.gainVal = this.$root.rootVal
        }
    },
}
</script>

<style>

</style>