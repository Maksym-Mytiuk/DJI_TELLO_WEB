<template>
  <button class="photo-btn"></button>
</template>

<style lang="scss" scoped>
.photo-btn {
  --btn-size: 45px;
  position: relative;
  width: var(--btn-size);
  height: var(--btn-size);
  background: #fff;
  border-radius: 50%;
  opacity: 0.8;
  border: 4px solid transparent;
  outline: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:before {
    content: "";
    position: absolute;
    inset: 50%;
    width: calc(var(--btn-size) + 4px);
    height: calc(var(--btn-size) + 4px);
    border: 2px solid #fff;
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
