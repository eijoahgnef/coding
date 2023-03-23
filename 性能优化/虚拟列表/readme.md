# 虚拟列表
>__虚拟列表__ 其实是按需显示的一种实现，即只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能。
假设有1万条记录需要同时渲染，我们屏幕的可见区域的高度为500px,而列表项的高度为50px，则此时我们在屏幕中最多只能看到10个列表项，那么在首次渲染的时候，我们只需加载10条即可。
## 实现
虚拟列表的实现，实际上就是在首屏加载的时候，只加载可视区域内需要的列表项，当滚动发生时，动态通过计算获得可视区域内的列表项，并将非可视区域内存在的列表项删除。
```
<!-- 可视区域 -->
<div class="infinite-list-container">
    <!-- 为容器内的占位，高度为总列表高度，用于形成滚动条 -->
    <div class="infinite-list-phantom"></div>
    <!-- 渲染区域 -->
    <div class="infinite-list">
        <!-- item-1 -->
        <!-- item-2 -->
        <!-- ...... -->
        <!-- item-n -->
    </div>
</div>
```
- 监听可视区域的`scroll`事件，获取滚动位置`scrollTop`
- 假定`可视区域`高度固定，为`screenHeight`
- 假定`列表每项`高度固定，为`itemSize`
- 假定`列表数据`为`listData`
- 假定`当前滚动位置`为`scrollToop`
则
- 列表总高度`listHeight` = listData * itemSize
- 可显示的列表项数`visibleCount` = Math.ceil(screenHeight / itemSize)
- 数据的其实索引`startIndex` = Math.floor(scrollTop / itemSize)
- 数据的结束索引`endIndex` = startIndex + visibleCount
- 列表显示数据为`visibleData` = listData.slice(startIndex, endIndex)
当滚动后，由于`渲染区域`相对于`可视区域`已经发生了偏移，此时需要获取一个偏移量`startOffset`，通过样式控制将`渲染区域`偏移至`可视区域`中。
- 偏移量`startOffset` = scrollTop - (scrollTop % itemSize)