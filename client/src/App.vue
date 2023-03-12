<template>
  <main>
    <VideoScreen
      :isControlsHidden="isControlsHidden"
      @sendCommand="sendCommand"
    />
    <div class="controls" :class="{ 'controls-hidden': isControlsHidden }">
      <KeyBoard
        class="keyboard"
        :cmFlyPerRequest="cmFlyPerRequest"
        :degreeRotatePerRequest="degreeRotatePerRequest"
        @sendCommand="sendCommand"
      />
      <div class="sliders-wrapper">
        <RangeSlider
          :caption="$t('setSpeed')"
          :min="10"
          :max="100"
          :init="100"
          @update="setSpeed"
        />
        <RangeSlider
          :caption="$t('setDistance')"
          :min="20"
          :max="500"
          :init="cmFlyPerRequest"
          @update="setDistance"
        />
        <RangeSlider
          :caption="$t('setRotate')"
          :min="1"
          :max="360"
          :init="degreeRotatePerRequest"
          @update="setAngle"
        />
      </div>
    </div>

    <img
      v-tooltip="$t('toggleControls')"
      src="./assets/images/icon/keyboard.svg"
      class="keyboard-icon"
      :class="{ 'controls-hidden': isControlsHidden }"
      @click="toggleControlsVisibility"
    />

    <LanguageDropdown />
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
import LanguageDropdown from "@/components/LanguageDropdown.vue";

let cmFlyPerRequest = ref(20);
let degreeRotatePerRequest = ref(30);

let isControlsHidden = ref(false);

onMounted(() => {
  socket.on(DroneEvent.Disconnect, (arg: unknown) => {
    console.warn("disconnect");
    console.warn(arg);
  });
});

function sendCommand(key: string) {
  const command = getDroneCommandByKey(key);
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

function toggleControlsVisibility() {
  isControlsHidden.value = !isControlsHidden.value;
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
    padding: 0 10px;
    justify-content: space-evenly;
  }
}

.video-container {
  margin: 0 auto;

  @media (max-width: 1265px) {
    margin: 0 80px;
  }

  @media (max-width: 1120px) {
    margin: 0;
  }
}

.keyboard-icon {
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 64px;
  opacity: 0.7;
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;

  &.controls-hidden {
    transform: rotateX(180deg);
  }

  &:hover {
    opacity: 1;
  }
}

.controls {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 50px;

  &.controls-hidden {
    position: absolute;
    top: 100%;
  }

  .sliders-wrapper {
    display: flex;
    flex-direction: column;
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

.language-dropdown {
  position: absolute;
  top: 1em;
  right: 1em;
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
  overflow: hidden;
}
</style>
