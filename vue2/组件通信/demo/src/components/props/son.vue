<template>
  <div class="son">
    <ul>
        <li v-for="(item, index) in msgList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        list: Array
    },
    data() {
        return {
            msgList: this.list
        }
    },
}
</script>

<style>

</style>