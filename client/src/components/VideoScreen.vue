<template>
  <div class="video-container" :class="{ 'controls-hidden': isControlsHidden }">
    <CoverScreen
      :isConnect="isDroneConnect"
      :isVideoStreamOn="isVideoStreamOn"
      @sendCommand="emitCommand"
    />
    <div class="drone-statuses">
      <div class="col">
        <ConnectionStatus :isConnect="isDroneConnect" />
      </div>
      <div class="col" v-if="isDroneConnect">
        <div>{{ $t("height") }}: {{ height }}</div>
        <div>{{ $t("flyTime") }}: {{ time }}</div>
        <BatteryStatus :percentage="percentage" />
      </div>
    </div>
    <video ref="player" id="player" src="" autoplay></video>
    <div class="media-btn-container">
      <PhotoButton v-if="isVideoStreamOn" @click="takePhoto" />
      <VideoButton
        v-if="isVideoStreamOn"
        :isVideoRecording="isVideoRecording"
        @startRecording="startRecording"
        @stopRecording="stopRecording"
      />
    </div>

    <MediaGallery
      v-if="media && !isControlsHidden"
      :media="media"
      @deleteMedia="deleteMedia"
      @openMedia="openPopup"
    />

    <MediaPopup
      :isOpen="isPopupOpen"
      :mediaFile="popupMediaFile"
      @closePopup="closePopup"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from "vue";
import JMuxer from "jmuxer";
import socket from "@/utils/socket";
import { DroneEvent } from "@/utils/events";
import MediaDB from "@/utils/mediaDB";

import BatteryStatus from "@/components/BatteryStatus.vue";
import ConnectionStatus from "@/components/ConnectionStatus.vue";
import CoverScreen from "@/components/CoverScreen.vue";
import PhotoButton from "@/components/PhotoButton.vue";
import VideoButton from "@/components/VideoButton.vue";
import MediaGallery from "@/components/MediaGallery.vue";
import MediaPopup from "@/components/MediaPopup.vue";

export type MediaFile = { url: string; key: any; type: string };

defineProps<{ isControlsHidden: boolean }>();
const emit = defineEmits<{ (e: "sendCommand", key: string): void }>();

const isDroneConnect = ref(false);
const isVideoStreamOn = ref(false);

const percentage = ref(0);
const height = ref(0);
const time = ref("00:00");

const player: Ref<HTMLVideoElement> | Ref<null> = ref(null);

const mediaDB = new MediaDB();
const media: Ref<MediaFile[]> = ref([]);
const isPopupOpen = ref(false);
let popupMediaFile = reactive({}) as MediaFile;

const isVideoRecording = ref(false);
let videoRecorder: MediaRecorder;
const recordedChunks: BlobPart[] = [];
const fps = 30;

onMounted(async () => {
  const video = player.value;
  if (video) {
    const jmuxer = new JMuxer({
      node: video,
      mode: "video",
      fps,
      debug: false,
      flushingTime: 50,
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
    socket.on(DroneEvent.State, (state) => {
      time.value = getTimeFromSeconds(+state?.time || 0);
      percentage.value = +state?.bat;
      height.value = +state?.h;
    });
  }

  await getAll();
});

function emitCommand(command: string) {
  emit("sendCommand", command);
}

function startRecording() {
  if (!player.value) return;

  const playerStream = player.value.captureStream(fps);
  const mimeType = "video/webm;codecs=vp9";

  isVideoRecording.value = true;

  videoRecorder = new MediaRecorder(playerStream, { mimeType });
  videoRecorder.start();

  videoRecorder.ondataavailable = (event: { data: BlobPart }) => {
    recordedChunks.push(event.data);

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    saveMedia(blob);
  };
}

function stopRecording() {
  isVideoRecording.value = false;
  videoRecorder.stop();
}

function openPopup(key: any) {
  const mediaFile = media.value.find((item) => item.key === key);
  if (mediaFile) {
    popupMediaFile = mediaFile;
    isPopupOpen.value = true;
  }
}

function closePopup() {
  popupMediaFile = {} as MediaFile;
  isPopupOpen.value = false;
}

async function takePhoto() {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  if (player.value) {
    const droneVideoWidth = 960;
    const droneVideoHeight = 720;

    canvas.width = droneVideoWidth;
    canvas.height = droneVideoHeight;

    ctx.drawImage(player.value, 0, 0, droneVideoWidth, droneVideoHeight);
    const img = canvas.toDataURL("image/png");
    const blob = await fetch(img).then((res) => res.blob());

    saveMedia(blob);
  }
}

async function saveMedia(blob: Blob) {
  const item = await mediaDB.save(blob);
  media.value.push(item);
}

async function deleteMedia(key: number) {
  await mediaDB.delete(key);

  media.value = media.value.filter((item) => item.key !== key);
}

async function getAll() {
  media.value = await mediaDB.getAll();
}

function getTimeFromSeconds(time: number) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  return `${convertNumericToTime(minutes)}:${convertNumericToTime(seconds)}`;
}

function convertNumericToTime(numeric: number) {
  return numeric.toString().padStart(2, "0");
}
</script>

<style lang="scss" scoped>
.video-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 760px;
  max-height: 595px;
  width: 100%;
  height: 100%;
  padding: 40px 20px 20px;
  background: #222;
  border-radius: 16px;

  video {
    max-width: 720px;
  }

  &.controls-hidden {
    max-width: 1000px;
    max-height: 780px;

    video {
      max-width: 960px;
      width: 100%;
    }
  }
}

.drone-statuses {
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: #fff;
  .col {
    display: flex;
    align-items: center;
    gap: 1.5em;
  }
}

.media-btn-container {
  display: flex;
  align-items: flex-end;
  gap: 1em;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.gallery {
  max-height: 580px;
  position: fixed;
  top: 20px;
  right: 40px;
  overflow-y: scroll;

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
