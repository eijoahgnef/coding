<template>
  <div class="son">
    <div class="wrap">
    </div>
    <grandson v-bind="$attrs"></grandson>
  </div>
</template>

<script>
import grandson from './grandson.vue';
export default {
  components: {
    grandson
  },
  mounted() {
    console.log(this.$attrs);
  },
}
</script>

<style>

</style>