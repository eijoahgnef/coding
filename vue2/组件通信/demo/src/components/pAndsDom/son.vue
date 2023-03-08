<template>
  <div class="son">
    <div class="wrap">
        <span>在子组件里父组件的信息：{{ fatherVal }}</span>
        <span>在子组件里子组件的信息： {{ info }}</span>
    </div>
    <button @click="changeFatherInfo">改变父组件信息</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            info: '我是子组件',
            fatherVal: ''
        }
    },
    mounted() {
        this.fatherVal = this.$parent.info
    },
    methods: {
        changeSon() {
            this.info = '我变了'
        },
        changeFatherInfo() {
            this.$parent.changeInfo()
        }
    },
}
</script>

<style lang="stylus" scoped>
.wrap
    display flex
    flex-direction column
</style>