<template>
  <div class="attrs">
    <input type="text" v-model="val"><button @click="add">确定</button>
    <son :msg="msg" :title="title"></son>
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
        val: '',
        title: '呆呆鹅',
        msg: ''
      }
    },
    methods: {
      add() {
        this.msg = this.val
        this.val = ''
      }
    },

}
</script>

<style>

</style>