<template>
  <div class="ref">
    <son ref="child"></son>
    <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import son from './son.vue'
export default {
    data() {
        return {
            list: []
        }
    },
    components: {
        son
    },
    mounted() {
        this.list = this.$refs.child?.list
    },
}
</script>

<style>

</style>