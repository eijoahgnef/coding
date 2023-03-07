<template>
  <div class="model">
    <son v-model="value"></son>
    <div>{{ value }}</div>
    <button @click="change">改变</button>
    <!-- <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>{{ item }}</span>
        <span @click="cancel(index)">删除</span>
      </li>
    </ul> -->
  </div>
</template>

<script>
import son from "./son.vue";
export default {
  components: {
    son,
  },
  data() {
    return {
      value: 'haha',
    };
  },
  methods: {
    change() {
        this.value = '我变了'
    }
  },
};
</script>

<style></style>
