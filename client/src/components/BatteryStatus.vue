<template>
  <div class="battery">
    <div class="level">
      <div class="proggress" :style="{ width: `${percentage}%` }"></div>
    </div>
    <div class="percentage">{{ percentage }}%</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ percentage: number }>();
</script>

<style lang="scss" scoped>
.battery {
  display: flex;
  align-items: center;
  color: #fff;

  .percentage {
    font-size: 10px;
    margin-left: 0.75em;
  }

  .level {
    position: relative;
    width: 1.6em;
    height: 0.74em;
    background-color: transparent;
    outline: 1px solid #fff;
    border: 1px solid transparent;
    border-radius: 0.15em;
    margin-left: 0.1em;

    &:after {
      content: "";
      background-color: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    &:after {
      width: 0.1em;
      height: 0.35em;
      right: -0.2em;
      border-top-right-radius: 0.4em;
      border-bottom-right-radius: 0.4em;
    }

    .proggress {
      position: absolute;
      height: 100%;
      background: #fff;
      border-radius: 0.1em;
    }
  }
}
</style>
