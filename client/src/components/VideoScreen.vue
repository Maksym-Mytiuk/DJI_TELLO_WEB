<template>
  <div class="video-container">
    <CoverScreen
      :isConnect="isDroneConnect"
      :isVideoStreamOn="isVideoStreamOn"
      @sendCommand="emitCommand"
    />
    <BatteryStatus :percentage="percentage" />
    <ConnectionStatus :isConnect="isDroneConnect" />
    <video ref="player" id="player" src="" autoplay></video>
    <PhotoButton v-if="isVideoStreamOn" @click="doScreenshot" />
    <ScreenshotGallery v-if="screenshots" :screenshots="screenshots" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import JMuxer from "jmuxer";
import socket from "@/utils/socket";
import { DroneEvent } from "@/utils/events";

import BatteryStatus from "@/components/BatteryStatus.vue";
import ConnectionStatus from "@/components/ConnectionStatus.vue";
import CoverScreen from "@/components/CoverScreen.vue";
import PhotoButton from "@/components/PhotoButton.vue";
import ScreenshotGallery from "@/components/ScreenshotGallery.vue";

const props = defineProps<{ percentage: number }>();
const emit = defineEmits<{ (e: "sendCommand", key: string): void }>();

const isDroneConnect = ref(true);
const isVideoStreamOn = ref(true);

const player: Ref<HTMLVideoElement> | Ref<null> = ref(null);
const screenshots: Ref<string[]> = ref([]);

onMounted(() => {
  const jmuxer = new JMuxer({
    node: player.value,
    mode: "video",
    fps: 30,
    debug: false,
    flushingTime: 150,
    clearBuffer: true,
  });

  socket.on(DroneEvent.VideoStreamOn, (stream) => {
    const streamData = new Uint8Array(stream);
    isVideoStreamOn.value = true;
    jmuxer.feed({ video: streamData });
  });

  socket.on(DroneEvent.VideoStreamOff, () => {
    console.warn("DroneEvent.VideoStreamOff");
    isVideoStreamOn.value = false;
  });

  socket.on(DroneEvent.Status, () => {
    console.warn("DroneEvent.Status");
    isDroneConnect.value = true;
  });

  socket.on(DroneEvent.Disconnect, () => {
    isDroneConnect.value = false;
    isVideoStreamOn.value = false;
  });
});

function emitCommand(command: string) {
  emit("sendCommand", command);
}

function doScreenshot() {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  if (player.value) {
    const droneVideoWidth = 960;
    const droneVideoHeight = 720;

    canvas.width = droneVideoWidth;
    canvas.height = droneVideoHeight;

    ctx.drawImage(player.value, 0, 0, droneVideoWidth, droneVideoHeight);
    const image = canvas.toDataURL("image/webp");

    screenshots.value.push(image);
  }
}
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;
  max-width: 760px;
  max-height: 595px;
  width: 100%;
  height: 100%;
  padding: 40px 20px 20px;
  background: #222;
  border-radius: 16px;
}

video {
  max-width: 720px;
}

.battery {
  position: absolute;
  top: 15px;
  right: 20px;
}

.connection-status {
  position: absolute;
  top: 15px;
  left: 20px;
}

.photo-btn {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.gallery {
  max-height: 580px;
  position: fixed;
  top: 20px;
  right: 20px;
  overflow-y: scroll;
  cursor: pointer;

  &::-webkit-scrollbar {
    width: 15px;
    background-color: transparent;
    position: relative;
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: padding-box;
    border-radius: 18px;
    background-color: #ccc;
  }

  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>