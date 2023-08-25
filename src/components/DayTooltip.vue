<script setup>
import { computed } from "vue";
import Tooltip from "./ui/Tooltip.vue";
import { daysFull, months } from "../assets/constants/dateNames";

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
});

const prettyDates = computed(() => {
  const res = {};
  const date = props.day.date;

  const dayIndex = date.getDay();
  res["weekDay"] = dayIndex === 0 ? daysFull[6] : daysFull[dayIndex - 1];

  const monthIndex = date.getMonth();
  res["monthName"] = months[monthIndex];

  res["date"] = date.getDate();
  res["year"] = date.getFullYear();

  return res;
});
</script>

<template>
  <Tooltip>
    <div class="count">
      {{ props.day.contributions }}
      {{
        [0, 1].includes(props.day.contributions)
          ? "contribution"
          : "contributions"
      }}
    </div>
    <time class="time" :datetime="props.day.date.toISOString()">
      {{ prettyDates.weekDay }}, {{ prettyDates.monthName }}
      {{ prettyDates.date }}, {{ prettyDates.year }}
    </time>
  </Tooltip>
</template>

<style scoped>
.count {
  font-size: 12px;
  color: white;
  text-align: center;
  margin-bottom: 4px;
}
.time {
  font-size: 10px;
  white-space: nowrap;
}
</style>