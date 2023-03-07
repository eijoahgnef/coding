<template>
  <div class="son">
    
    <div class="wrap">
        <span><input type="text" :value="value" @input="handleChange"></span>
    </div>
  </div>
</template>

<script>
export default {
  props:["value"],
  methods: {
    handleChange(e) {
        // console.log(e.target.value);
        this.$emit("input", e.target.value)
    }

  },
};
</script>

<style lang="stylus" scoped>
span
    margin 0 10px
</style>>
