<template>
  <div class="connection-status">
    <span class="status-icon" :class="isConnect && 'active'"></span>
    <span v-if="isConnect">{{ $t("connect") }}</span>
    <span v-else>{{ $t("disconnect") }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isConnect: boolean }>();
</script>

<style lang="scss" scoped>
.connection-status {
  display: inline-flex;
  align-items: center;
  color: #ccc;
}
.status-icon {
  margin-right: 5px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ff5e5e;
  transition: background-color 0.2s;
  &.active {
    background-color: #5eff84;
  }
}

span {
  font-size: 9px;
  font-weight: 600;
}
</style>