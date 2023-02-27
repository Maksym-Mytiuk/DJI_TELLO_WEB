<template>
  <button class="photo-btn"></button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
</script>

<style lang="scss" scoped>
.photo-btn {
  --btn-size: 50px;
  position: relative;
  width: var(--btn-size);
  height: var(--btn-size);
  background: #fff;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  transition: opacity 0.2s;
  border: 0;
  outline: none;

  &:before {
    content: "";
    position: absolute;
    inset: 50%;
    width: calc(var(--btn-size) - 10px);
    height: calc(var(--btn-size) - 10px);
    border: 2px solid;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.6;
  }
}
</style>
