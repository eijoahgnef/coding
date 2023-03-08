<template>
  <div class="son">
    <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    inject: ['list'],
    data() {
        return {
            
        }
    },

}
</script>

<style>

</style>