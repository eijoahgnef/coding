<template>
  <div class="index">
    <div ref="list" class="infinite-list-container" @scroll="scrollEvent">
      <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
      <div class="infinite-list" :style="{ transform: getTransform }">
        <div
          ref="items"
          class="infinite-list-item"
          v-for="item in visibleData"
          :key="item.id"
          :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, } from "vue";
export default {
  setup() {
    let listData = [];
    let itemSize = 100;
    let start = ref(0);
    let end = ref(null)
    let screenHeight = document.documentElement.clientHeight;
    const list = ref(null);
    let startOffset = ref(0);
    for (let i = 0; i < 1000; i++) {
      listData.push({ id: i, value: i });
    }
    // 列表总高度
    var listHeight = computed(() => {
      return listData.length * itemSize;
    });
    // 可显示的列表项数
    var visibleCount = computed(() => {
      return Math.ceil(screenHeight / itemSize);
    });
    // 偏移量对应的style
    var getTransform = computed(() => {
      return `translateY(${startOffset.value}px)`;
    });
    // 获取真是显示列表数据
    var visibleData = computed(() => {
      return listData.slice(start.value, Math.min(end.value, listData.length));
    });
    end.value = start.value + visibleCount.value;
    const scrollEvent = () => {
      // 当前滚动位置
      let scrollTop = list.value.scrollTop;
      // 此时的开始索引
      start.value = Math.floor(scrollTop / itemSize);
      // 此时的结束索引
      end.value = start.value + visibleCount.value;
      console.log(start.value, end, screenHeight);
      // 此时的偏移量
      startOffset.value = scrollTop - (scrollTop % itemSize);
      console.log(start.value, end);
      console.log(visibleData.value);
    };
    console.log(listData);
    return {
      listData,
      itemSize,
      listHeight,
      visibleCount,
      getTransform,
      visibleData,
      list,
      scrollEvent,
    };
  },
};
</script>

<style>
.index {
    width: 100%;
    height: 100%;
}
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
