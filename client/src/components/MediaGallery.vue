
<template>
  <ul class="gallery">
    <li v-for="item in media" :key="item.key">
      <img
        v-if="item.type.includes('image')"
        class="media"
        :src="item.url"
        :alt="$t('image')"
      />
      <video
        v-if="item.type.includes('video')"
        controls
        class="media"
        :src="item.url"
        :alt="$t('video')"
      ></video>
      <div class="btn-container">
        <button
          class="open-media"
          @click="openMedia(item.key)"
          v-tooltip="$t('open')"
        >
          <img src="@/assets/images/icon/zoom-in.png" :alt="$t('open')" />
        </button>
        <a :href="item.url" :download="`${$t('file')}-${+new Date()}`">
          <button class="download-media" v-tooltip="$t('download')">
            <img
              src="@/assets/images/icon/download.png"
              :alt="$t('download')"
            />
          </button>
        </a>
        <button
          class="delete-media"
          @click="deleteMedia(item.key)"
          v-tooltip="$t('delete')"
        >
          <img src="@/assets/images/icon/trash.png" :alt="$t('delete')" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { MediaFile } from "@/components/VideoScreen.vue";

defineProps<{ media: MediaFile[] }>();
const emit = defineEmits<{
  (e: "deleteMedia", key: any): void;
  (e: "openMedia", key: any): void;
}>();

function deleteMedia(key: any) {
  emit("deleteMedia", key);
}
function openMedia(key: any) {
  emit("openMedia", key);
}
</script>

<style lang="scss" scoped>
.gallery {
  list-style: none;
}

li {
  position: relative;
  margin-bottom: 1em;

  &:hover {
    .btn-container {
      opacity: 1;
    }
  }
}

a {
  text-decoration: none;
}

.media {
  position: relative;
  width: 200px;
}

.btn-container {
  display: inline-flex;
  gap: 0.75em;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  opacity: 0;
}

button {
  display: flex;
  padding: 0.375rem;
  font-size: 1rem;
  color: #fff;
  background-color: #03a9f4;
  border: 1px solid #03a9f4;
  border-radius: 0.25rem;
  white-space: nowrap;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    opacity 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #1485fd;
    border-color: #1485fd;
  }

  &:active {
    background-color: #1a87fa;
    border-color: #1a87fa;
  }

  img {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}
</style>
