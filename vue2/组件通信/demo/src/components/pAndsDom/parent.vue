<template>
  <div class="parent">
    <div class="wrap">
        <span>在父组件里父组件的信息：{{ info }}</span>
        <span>在父组件里子组件的信息：{{ sonVal }}</span>
    </div>
    <button @click="changeSonInfo">改变子组件信息</button>
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
            info: '我是父组件',
            sonVal: ''
        }
    },
    mounted() {
        this.sonVal = this.$children[0].info
    },
    methods: {
        changeSonInfo() {
            this.$children[0].changeSon()
        },
        changeInfo() {
            this.info = '我变了'
        }
    },
}
</script>

<style lang="stylus" scope>
.wrap
    display flex
    flex-direction column
</style>