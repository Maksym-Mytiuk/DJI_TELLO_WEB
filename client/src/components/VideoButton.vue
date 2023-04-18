<template>
  <div class="video-btn-container">
    <span v-show="isVideoRecording" class="timer">{{ timer }}</span>
    <button
      class="video-btn"
      :class="{ active: isVideoRecording }"
      @click="toggleVideoRecord"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{ isVideoRecording: boolean }>();
const emit = defineEmits(["startRecording", "stopRecording"]);

let timer = ref("00:00");
type timerId = string | number | NodeJS.Timeout;
let timerId: timerId;

watch(
  () => props.isVideoRecording,
  () => {
    const startTime = +new Date();
    if (props.isVideoRecording) {
      timerId = setInterval(() => {
        const diff = +new Date() - startTime;
        timer.value = new Date(diff).toISOString().slice(14, 19);
      }, 1000);
    } else {
      clearInterval(timerId);
      timer.value = "00:00";
    }
  }
);

function toggleVideoRecord() {
  const event = props.isVideoRecording ? "stopRecording" : "startRecording";
  console.warn(event);

  emit(event);
}
</script>

<style lang="scss" scoped>
.video-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .timer {
    margin-bottom: 0.25em;
    padding: 0.25em;
    background: #000;
    color: #fff;
    opacity: 0.65;
  }
}
.video-btn {
  --btn-size: 50px;
  position: relative;
  width: var(--btn-size);
  height: var(--btn-size);
  background: transparent;
  border-radius: 50%;
  opacity: 0.8;
  border: 2px solid #fff;
  outline: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:before {
    content: "";
    position: absolute;
    inset: 50%;
    width: calc(var(--btn-size) - 10px);
    height: calc(var(--btn-size) - 10px);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: red;
    transition: width 0.2s, height 0.2s, border-radius 0.2s;
  }
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.6;
  }

  &.active {
    &:before {
      width: calc(var(--btn-size) - 25px);
      height: calc(var(--btn-size) - 25px);
      border-radius: 0;
    }
  }
}
</style>
