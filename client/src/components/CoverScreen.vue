<template>
  <p v-if="!isConnect && !isVideoStreamOn" @click="emitCommand('Enter')">
    {{ $t("startDroneConnectInfo") }}
  </p>
  <p v-if="isConnect && !isVideoStreamOn" @click="emitCommand('KeyV')">
    {{ $t("startVideoStreamInfo") }}
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  isConnect: boolean;
  isVideoStreamOn: boolean;
}>();
const emit = defineEmits<{ (e: "sendCommand", key: string): void }>();

function emitCommand(command: string) {
  emit("sendCommand", command);
}
</script>

<style lang="scss" scoped>
p {
  position: absolute;
  inset: 0 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  font-size: 2em;
  line-height: 1.5;
  color: white;
  cursor: pointer;
  transition: opacity 200ms;
  animation: glow 1s infinite;
  opacity: 1;
}

@keyframes glow {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
