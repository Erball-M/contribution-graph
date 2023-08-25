<script setup>
</script>

<template>
  <div class="tooltip">
    <div class="tooltip__body">
      <slot></slot>
    </div>
    <div class="pointer">
      <div class="pointer__trinagle"></div>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  z-index: 100;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  translate: -50%;
  background: black;
  padding: 6px 9px;
  border-radius: 6px;
}
.tooltip__body {
}
.pointer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  top: 100%;
  left: 50%;
  translate: -50%;
  z-index: 101;
  overflow: hidden;
  width: 10px;
  height: 10px;
}
.pointer__trinagle {
  height: calc(100% * sin(45deg));
  width: calc(100% * sin(45deg));
  rotate: 45deg;
  translate: 0 -100%;
  background: black;
}
</style>