<template>
  <div class="son">
    <span><input type="text" v-model="msg"></span>
    <button @click="add">添加</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            list: []
        }
    },
    methods: {
        add() {
            if (!this.msg) return
            this.list.push(this.msg)
            this.msg = ''
            this.$emit('emitList', this.list)
        }
    },
}
</script>

<style>

</style>