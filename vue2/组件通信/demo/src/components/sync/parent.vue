<template>
  <div class="sync">
    
    <div class="wrap">
        <span><input type="text" v-model="msg"></span>
        <button @click="sub">确定</button>
    </div>
    <!-- 双向绑定  :variable.sync="variable" -->
    <son :list.sync="list"></son>
  </div>
</template>

<script>
import son from '../sync/son.vue'
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