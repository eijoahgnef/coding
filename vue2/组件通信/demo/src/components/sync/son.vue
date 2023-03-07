<template>
  <div class="son">
    <ul>
      <li v-for="(item, index) in msgList" :key="index">
        <span>{{ item }}</span>
        <span @click="cancel(index)">删除</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
  data() {
    return {
      msgList: this.list,
    };
  },
  methods: {
    cancel(index) {
        this.msgList.splice(index, 1)
    }
  },
};
</script>

<style lang="stylus" scoped>
span
    margin 0 10px
</style>>
