<template>
  <ul class="gallery">
    <li v-for="(screenshot, index) in screenshots" :key="index">
      <a :href="screenshot" :download="`screenshot-${+new Date()}`">
        <img :src="screenshot" alt="screenshot" />
        <button>Download</button>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{ screenshots: string[] }>();
</script>

<style lang="scss" scoped>
.gallery {
  list-style: none;
}

li {
  margin-bottom: 1em;
}

a {
  position: relative;
  display: flex;
  width: max-content;
  &:hover {
    button {
      opacity: 1;
    }
  }
}

img {
  position: relative;
  width: 200px;
}

button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: 1px solid #007bff;
  border-radius: 0.25rem;
  white-space: nowrap;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    opacity 0.2s ease-in-out;
  cursor: pointer;

  opacity: 0;

  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }

  &:active {
    background-color: #0062cc;
    border-color: #005cbf;
  }
}
</style>
