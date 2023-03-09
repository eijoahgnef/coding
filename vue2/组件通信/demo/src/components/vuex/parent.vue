<template>
  <div class="vuex">
    <span>{{ getMsg }}</span>
    <son></son>
  </div>
</template>

<script>
import son from './son.vue'
import store from '../../store'
export default {
    components: {
        son
    },
    computed: {
        getMsg () {
            return store.state.loginStatus
        }
    },
    data() {
        return {
            // msg: ''
        }
    },
    mounted() {
        // this.msg = store.state.loginStatus
    },
}
</script>

<style>

</style>