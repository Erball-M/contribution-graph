<script setup>
import Tooltip from "./ui/Tooltip.vue";

const data = [
  { color: "#EDEDED", title: "No" },
  { color: "#ACD5F2", title: "1-9" },
  { color: "#7FA8C9", title: "10-19" },
  { color: "#527BA0", title: "20-29" },
  { color: "#254E77", title: "30+" },
];
</script>

<template>
  <div class="palette">
    <div class="palette__point">Меньше</div>
    <ul class="palette__list">
      <li
        v-for="item in data"
        :key="item.color"
        class="palette__item"
        :style="{ background: item.color }"
      >
        <Tooltip class="tooltip">
          <div class="tooltip__title">{{ item.title }} contributions</div>
        </Tooltip>
      </li>
    </ul>
    <div class="palette__point">Больше</div>
  </div>
</template>

<style scoped>
.palette {
  display: flex;
  gap: 6.5px;
}
.palette__point {
}
.palette__list {
  display: flex;
}
.palette__item {
  display: block;
  width: 15px;
  height: 15px;
  position: relative;
}
.tooltip {
  display: none;
}
.palette__item:hover > .tooltip {
  display: block;
}
.tooltip__title {
  font-size: 12px;
  color: white;
  text-align: center;
  white-space: nowrap;
}
</style>