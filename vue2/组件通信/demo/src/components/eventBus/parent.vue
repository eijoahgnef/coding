<template>
  <div class="event">
    {{ sonVal }}
    <son></son>
  </div>
</template>

<script>
import son from './son.vue'
import { eventBus } from './bus'
export default {
    components: {
        son
    },
    data() {
        return {
            sonVal: ''
        }
    },
    methods: {
        gainMsg() {
            eventBus.$on('msg', (msg) => {
                this.sonVal = msg
            })
        },
    },
    mounted() {
        this.gainMsg()
    },

}
</script>

<style>

</style>