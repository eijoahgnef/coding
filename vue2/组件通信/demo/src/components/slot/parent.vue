<template>
  <div class="slot">
    <son v-slot="slotProps">
        <ul>
            <li v-for="(item, index) in slotProps.list" :key="index">{{ item }}</li>
        </ul>
    </son>
  </div>
</template>

<script>
import son from './son.vue'
export default {
    components: {
        son
    },
}
</script>

<style>

</style>