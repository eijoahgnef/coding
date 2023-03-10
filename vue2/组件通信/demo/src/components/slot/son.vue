<template>
  <div class="son">
    <input type="text" v-model="msg"><button @click="give">传输</button>
    <slot :list="list"></slot>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            msg: ""
        }
    },
    methods: {
        give() {
            this.list.push(this.msg)
            this.msg = ""
        }
    },
}
</script>

<style>

</style>