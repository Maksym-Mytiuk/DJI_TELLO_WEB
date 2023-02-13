<template>
  <div class="video-container">
    <CoverScreen
      :isConnect="isDroneConnect"
      :isVideoStreamOn="isVideoStreamOn"
      @sendCommand="emitCommand"
    />
    <BatteryStatus class="battery" :percentage="percentage" />
    <ConnectionStatus class="connection" :isConnect="isDroneConnect" />
    <video id="player" src="" autoplay></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import JMuxer from "jmuxer";
import socket from "@/utils/socket";
import { commands } from "@/utils/commands";
import { DroneEvent } from "@/utils/events";

import BatteryStatus from "@/components/BatteryStatus.vue";
import ConnectionStatus from "@/components/ConnectionStatus.vue";
import CoverScreen from "@/components/CoverScreen.vue";

const props = defineProps<{ percentage: number }>();
const emit = defineEmits<{ (e: "sendCommand", key: string): void }>();

const isDroneConnect = ref(false);
const isVideoStreamOn = ref(false);
let jmuxer: JMuxer | null;

onMounted(() => {
  socket.on(DroneEvent.VideoStreamOn, (stream) => {
    const streamData = new Uint8Array(stream);
    isVideoStreamOn.value = true;
    jmuxer?.feed({ video: streamData });
  });

  socket.on(DroneEvent.VideoStreamOff, () => {
    console.warn("DroneEvent.VideoStreamOff");
    isVideoStreamOn.value = false;
    jmuxer = null;
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

  if (command === commands.control.videoStreamOn && !isVideoStreamOn) {
    jmuxer = new JMuxer({
      node: "player",
      mode: "video",
      fps: 30,
      debug: false,
      flushingTime: 10,
    });
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

.connection {
  position: absolute;
  top: 15px;
  left: 20px;
}
</style>