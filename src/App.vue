<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import DayTooltip from "./components/DayTooltip.vue";
import Palette from "./components/Palette.vue";
import { generateDateObjects } from "./assets/utils/dateUtils";
import { months, days } from "./assets/constants/dateNames";

const data = ref({});
onMounted(() => {
  async function fetchData() {
    const response = await fetch("https://dpg.gg/test/calendar.json");
    const json = await response.json();
    data.value = json;
  }
  fetchData();
});

const year = computed(() => generateDateObjects(data.value));
const selected = ref(null);

function removeSelected(e) {
  const t = e.target.closest(".td");
  if (!t) {
    selected.value = null;
  }
}

onMounted(() => document.addEventListener("click", removeSelected));
onUnmounted(() => document.removeEventListener("click", removeSelected));
</script>

<template>
  <div class="container">
    <table class="table">
      <thead>
        <th class="th"></th>
        <th
          v-for="(colspan, monthName) in year.months"
          :key="monthName"
          class="th"
          :colspan="colspan"
        >
          {{ monthName }}
        </th>
      </thead>
      <tbody class="tbody">
        <tr
          v-for="(row, rowIndex) in year.days"
          :key="row[0].formattedDatetime + 'row'"
          class="tr"
        >
          <td class="weekName">
            {{ [0, 2, 4].includes(rowIndex) ? days[rowIndex] : "" }}
          </td>
          <td
            v-for="day in row"
            :key="day.formattedDatetime + 'day'"
            class="td"
            :class="{ td_selected: selected === day.id }"
            :style="{ background: day.color }"
            @click="selected = day.id"
          >
            <DayTooltip
              v-if="selected === day.id"
              class="tooltip"
              :day="day"
            ></DayTooltip>
          </td>
        </tr>
      </tbody>
    </table>
    <Palette></Palette>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 0 20px;
  max-width: 900px;
  margin: 0 auto;
}
.table {
  border-collapse: separate;
  border-spacing: 2px;
  margin-bottom: 15px;
}
.th,
.td {
  border-spacing: 5px;
  font-weight: normal;
}
.td {
  width: 15px;
  height: 15px;
  background: #ededed;
  position: relative;
}
.tooltip {
}
.td:hover {
  outline: 1px solid #808080;
}
.weekName {
  background: none;
}
.td_selected {
  outline: 1px solid black;
}
</style>
