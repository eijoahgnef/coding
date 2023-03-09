<template>
  <div class="son">
    <input type="text" v-model="val">
    <button @click="toParent">发送给父组件</button>
  </div>
</template>

<script>
import { eventBus } from './bus'
export default {
    data() {
        return {
            val: ''
        }
    },
    methods: {
        toParent() {
            console.log(this.val);
            console.log(eventBus);
            eventBus.$emit('msg', this.val)
        }
    },
}
</script>

<style>

</style>