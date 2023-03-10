<template>
  <div class="home">
    <div class="wrap">
      <div @click="toggle('/props')" class="btn">props传值</div>
      <div @click="toggle('/sync')" class="btn">.sync</div>
      <div @click="toggle('/model')" class="btn">v-model</div>
      <div @click="toggle('/ref')" class="btn">ref</div>
      <div @click="toggle('/emit')" class="btn">emit/v-on</div>
      <div @click="toggle('/attrs')" class="btn">attrs/listeners</div>
      <div @click="toggle('/child')" class="btn">children/parent</div>
      <div @click="toggle('/provide')" class="btn">provide/inject</div>
      <div @click="toggle('/eventBus')" class="btn">EventBus</div>
      <div @click="toggle('/vuex')" class="btn">Vuex</div>
      <div @click="toggle('/root')" class="btn">root</div>
      <div @click="toggle('/slot')" class="btn">slot</div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        toggle(path) {
            
            this.$router.push(path)
        }
    },
};
</script>

<style lang="stylus">
.home
    display flex
    justify-content center
    .wrap

        .btn
            width 120px
            border 1px solid #000
            border-radius 10px
            margin 10px 0
            box-shadow 0 4px 8px black
        .btn:hover
            scale (1.2)
</style>
