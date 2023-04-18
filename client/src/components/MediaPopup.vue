<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isOpen" class="popup">
        <div class="popup-container">
          <img
            v-if="mediaFile.type.includes('image')"
            class="media"
            :src="mediaFile.url"
            :alt="$t('image')"
          />

          <video
            v-if="mediaFile.type.includes('video')"
            autoplay
            controls
            class="media"
            :src="mediaFile.url"
            :alt="$t('video')"
          ></video>
        </div>

        <div class="close" @click="closePopup"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { MediaFile } from "@/components/VideoScreen.vue";

defineProps<{ isOpen: boolean; mediaFile: MediaFile }>();
const emit = defineEmits<{ (e: "closePopup"): void }>();

function closePopup() {
  emit("closePopup");
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.95);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 1;
}

.popup-container {
  height: 100%;
  display: flex;
}

img,
video {
  width: max-content;
  height: max-content;
  margin: auto;
}

.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
