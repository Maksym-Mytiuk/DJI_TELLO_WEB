

<template>
  <main>
    <VideoScreen :percentage="percentage" @sendCommand="sendCommand" />

    <div class="controls">
      <KeyBoard class="keyboard" @sendCommand="sendCommand" />
      <div class="sliders-wrapper">
        <RangeSlider
          caption="set speed cm/s"
          :min="10"
          :max="100"
          :init="100"
          @update="setSpeed"
        />
        <RangeSlider
          caption="set fly distance cm/s"
          :min="20"
          :max="500"
          :init="cmFlyPerRequest"
          @update="setDistance"
        />
        <RangeSlider
          caption="set rotate angle cm/s"
          :min="1"
          :max="360"
          :init="degreeRotatePerRequest"
          @update="setAngle"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import socket from "@/utils/socket";
import { commands } from "@/utils/commands";
import { DroneEvent } from "@/utils/events";

import VideoScreen from "@/components/VideoScreen.vue";
import KeyBoard from "@/components/KeyBoard.vue";
import RangeSlider from "@/components/RangeSlider.vue";

let percentage = ref(0);
let cmFlyPerRequest = ref(20);
let degreeRotatePerRequest = ref(30);

onMounted(() => {
  socket.on(DroneEvent.State, (state) => {
    percentage.value = +state?.bat;
  });

  socket.on(DroneEvent.Disconnect, (arg: unknown) => {
    console.warn("disconnect");
    console.warn(arg);
  });
});

function sendCommand(key: string) {
  const command = getDroneCommandByKey(key);
  console.warn(command);

  if (command) {
    socket.emit(DroneEvent.Command, command);
  }
}

function setSpeed(value: number) {
  socket.emit(commands.set.speed, value);
}

function setDistance(value: number) {
  cmFlyPerRequest.value = value;
}

function setAngle(value: number) {
  degreeRotatePerRequest.value = value;
}

function getDroneCommandByKey(key: string) {
  const droneCommand: { [key: string]: string } = {
    ArrowUp: `${commands.action.up} ${cmFlyPerRequest.value}`,
    ArrowDown: `${commands.action.down} ${cmFlyPerRequest.value}`,
    ArrowLeft: `${commands.action.left} ${cmFlyPerRequest.value}`,
    ArrowRight: `${commands.action.right} ${cmFlyPerRequest.value}`,

    KeyW: `${commands.action.forward} ${cmFlyPerRequest.value}`,
    KeyS: `${commands.action.back} ${cmFlyPerRequest.value}`,
    KeyQ: `${commands.action.rotateLeft} ${degreeRotatePerRequest.value}`,
    KeyE: `${commands.action.rotateRight} ${degreeRotatePerRequest.value}`,

    Enter: `${commands.control.init}`,
    ShiftLeft: `${commands.control.takeoff}`,
    ShiftRight: `${commands.control.takeoff}`,
    Backspace: `${commands.control.land}`,
    Escape: `${commands.emergency.stop}`,

    KeyV: `${commands.control.videoStreamOn}`,
    KeyB: `${commands.control.videoStreamOff}`,

    KeyR: `${commands.read.speed}`,
  };

  return droneCommand[key];
}
</script>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 100vh;
  padding: 0 25px;
  overflow: hidden;

  @media (max-width: 1024px) {
    justify-content: space-evenly;
  }
}

.video-container {
  margin: 0 auto;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 50px;

  .sliders-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    max-width: 250px;

    .range-slider {
      margin-top: 50px;
    }

    @media (max-width: 1024px) {
      max-width: initial;
      flex-direction: row;
      justify-content: space-around;
      .range-slider {
        width: 200px;
      }
    }
  }

  @media (max-width: 1024px) {
    gap: 20px;
    flex-direction: column-reverse;
    align-items: center;
  }
}
</style>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  font: 1em -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
</style>