
<template>
  <ul class="gallery">
    <li v-for="(screenshot, index) in screenshots" :key="index">
      <img :src="screenshot.img" :alt="$t('screenshot')" />
      <div class="btn-container">
        <a
          :href="screenshot.img"
          :download="`${$t('screenshot')}-${+new Date()}`"
        >
          <button class="download-screenshot" v-tooltip="$t('download')">
            <img
              src="@/assets/images/icon/download.png"
              :alt="$t('download')"
            />
          </button>
        </a>
        <button
          class="delete-screenshot"
          @click="deleteScreenshot(screenshot.key)"
          v-tooltip="$t('delete')"
        >
          <img src="@/assets/images/icon/trash.png" :alt="$t('delete')" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  screenshots: { img: string; key: string }[];
}>();
const emit = defineEmits<{ (e: "deleteScreenshot", key: any): void }>();

function deleteScreenshot(key: any) {
  emit("deleteScreenshot", key);
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

img {
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
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
