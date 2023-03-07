<template>
  <div class="parent">
    <div class="wrap">
        <span><input type="text" v-model="msg"></span>
        <button @click="sub">确定</button>
    </div>
    <son :list="list"></son>
  </div>
</template>

<script>
import son from './son.vue';
export default {
    components: {
        son
    },
    data() {
        return {
            msg: '',
            list: []
        }
    },
    methods: {
        sub() {
            this.list.push(this.msg)
            this.msg = ''
        }
    },
}
</script>

<style>

</style>