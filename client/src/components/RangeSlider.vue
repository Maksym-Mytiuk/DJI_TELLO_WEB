<template>
  <div class="range-slider">
    <Slider v-model="speed" :min="min" :max="max" @change="update" />
    <div class="values-wrapper">
      <span>{{ min }}</span>
      <span>{{ max }}</span>
    </div>
    <p v-if="caption">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Slider from "@vueform/slider";

const props = defineProps<{
  caption?: string;
  min: number;
  max: number;
  init: number;
}>();
const emit = defineEmits<{ (e: "update", value: number): void }>();

const speed = ref(props.init);

function update(value: number) {
  emit("update", value);
}
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped lang="scss">
.range-slider {
  position: relative;
}

.values-wrapper {
  position: absolute;
  top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    font-size: 0.75em;
    color: #7e7d7d;
  }
}

p {
  margin: 3px 0;
  font-size: 0.8em;
  text-align: center;
  color: #3f3f3f;
}
</style>

<style lang="scss">
.slider-tooltip {
  --slider-tooltip-bg: #03a9f4;
}
.slider-connect {
  --slider-connect-bg: #03a9f4;
}
.slider-handle {
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  &:focus {
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  }
}
</style>