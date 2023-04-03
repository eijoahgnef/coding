<template>
  <div class="page">
    page
  </div>
</template>

<script>
export default {
  setup() {
    console.log('来到page页');
  },
  beforeRouteEnter (to, from, next) {
    console.log("page的beforeRouteEnter", to.path, from.path);
    next(() => {
      console.log('调用beforeRouterEnter里的next的回调');
    })
  },
  beforeRouteUpdate(to, from) {
    console.log("page的beforeRouteUpdate", to.path, from.path);
  },
  beforeRouteLeave(to, from) {
    console.log("page的beforeRouteLeave", to.path, from.path);
  }
}
</script>

<style>

</style>