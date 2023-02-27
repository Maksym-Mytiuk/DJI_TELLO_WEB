<template>
  <div class="keyboard">
    <div class="row">
      <button
        v-tooltip="'Emergency stop'"
        class="btn0 control-btn Escape"
        @mousedown="onMouseDown('Escape')"
      >
        <span class="xs">esc</span>
      </button>
      <button class="btn0">
        <span class="xs noxscale">
          <span class="emoji">&#128261;</span>
        </span>
        <span class="lr xxxs">F1</span>
      </button>
      <button class="btn0">
        <span class="xs noxscale">
          <span class="emoji">&#128262;</span>
        </span>
        <span class="lr xxxs">F2</span>
      </button>
      <button class="btn0">
        <span class="xs noxscale">
          <span class="cascade"> </span>
          <span class="block"> </span>
        </span>
        <span class="lr xxxs">F3</span>
      </button>
      <button class="btn0">
        <span class="xxxs noxscale">
          <span class="apps"> </span>
        </span>
        <span class="lr xxxs">F4</span>
      </button>
      <button class="btn0">
        <span class="lr xxxs">F5</span>
      </button>
      <button class="btn0">
        <span class="lr xxxs">F6</span>
      </button>
      <button class="btn0">
        <span class="sm">
          <span class="left"> </span>
          <span class="left"> </span>
        </span>
        <span class="lr xxxs">F7</span>
      </button>
      <button class="btn0">
        <span class="sm">
          <span class="right"> </span>
          <span class="pause"> </span>
        </span>
        <span class="lr xxxs">F8</span>
      </button>
      <button class="btn0">
        <span class="sm">
          <span class="right"> </span>
          <span class="right"> </span>
        </span>
        <span class="lr xxxs">F9</span>
      </button>
      <button class="btn0">
        <span class="xs noxscale">
          <span class="emoji">&#128264;</span>
        </span>
        <span class="lr xxxs">F10</span>
      </button>
      <button class="btn0">
        <span class="xs noxscale">
          <span class="emoji">&#128265;</span>
        </span>
        <span class="lr xxxs">F11</span>
      </button>
      <button class="btn0">
        <span class="xs noxscale">
          <span class="emoji">&#128266;</span>
        </span>
        <span class="lr xxxs">F12</span>
      </button>
      <button class="btn0">
        <span class="xs noxscale">⏏</span>
      </button>
    </div>
    <div class="row">
      <button class="btn1">
        <span class="lr xxxs">F13</span>
      </button>
      <button class="btn1">
        <span class="lr xxxs">F14</span>
      </button>
      <button class="btn1">
        <span class="lr xxxs">F15</span>
      </button>
    </div>
    <div class="row">
      <button class="btn1">
        <span class="lr xxxs">F16</span>
      </button>
      <button class="btn1">
        <span class="lr xxxs">F17</span>
      </button>
      <button class="btn1">
        <span class="lr xxxs">F18</span>
      </button>
      <button class="btn1">
        <span class="lr xxxs">F19</span>
      </button>
    </div>
    <div class="row">
      <button class="btn2">
        <span class="sm">~<br />`</span>
      </button>
      <button class="btn2">
        <span class="sm">!<br />1</span>
      </button>
      <button class="btn2">
        <span class="sm">@<br />2</span>
      </button>
      <button class="btn2">
        <span class="sm">#<br />3</span>
      </button>
      <button class="btn2">
        <span class="sm">$<br />4</span>
      </button>
      <button class="btn2">
        <span class="sm">%<br />5</span>
      </button>
      <button class="btn2">
        <span class="sm">^<br />6</span>
      </button>
      <button class="btn2">
        <span class="sm">&amp;<br />7</span>
      </button>
      <button class="btn2">
        <span class="sm">*<br />8</span>
      </button>
      <button class="btn2">
        <span class="sm">(<br />9</span>
      </button>
      <button class="btn2">
        <span class="sm">)<br />0</span>
      </button>
      <button class="btn2">
        <span class="sm">_<br />-</span>
      </button>
      <button class="btn2">
        <span class="sm">+<br />=</span>
      </button>
      <button
        v-tooltip="'Land the drone'"
        class="btn3 control-btn Backspace"
        @mousedown="onMouseDown('Backspace')"
      >
        <span class="lr xs">delete</span>
      </button>
    </div>
    <div class="row">
      <button class="btn2">
        <span class="xs">fn</span>
      </button>
      <button class="btn2">
        <span class="xs">home</span>
      </button>
      <button class="btn2">
        <span class="xs">page up</span>
      </button>
    </div>
    <div class="row">
      <button class="btn2">
        <span class="xs">clear</span>
      </button>
      <button class="btn2">
        <span>=</span>
      </button>
      <button class="btn2">
        <span>/</span>
      </button>
      <button class="btn2">
        <span>*</span>
      </button>
    </div>
    <div class="row">
      <button class="btn3">
        <span class="ll xs">tab</span>
      </button>
      <button
        v-tooltip="`Turn clockwise on ${degreeRotatePerRequest} degrees`"
        class="btn2 control-btn KeyQ"
        @mousedown="onMouseDown('KeyQ')"
      >
        <span>Q</span>
      </button>
      <button
        v-tooltip="`fly forward on ${cmFlyPerRequest} cm`"
        class="btn2 control-btn KeyW"
        @mousedown="onMouseDown('KeyW')"
      >
        <span>W</span>
      </button>
      <button
        v-tooltip="`Turn counterсlockwise on ${degreeRotatePerRequest} degrees`"
        class="btn2 control-btn KeyE"
        @mousedown="onMouseDown('KeyE')"
      >
        <span>E</span>
      </button>
      <button class="btn2">
        <span>R</span>
      </button>
      <button class="btn2">
        <span>T</span>
      </button>
      <button class="btn2">
        <span>Y</span>
      </button>
      <button class="btn2">
        <span>U</span>
      </button>
      <button class="btn2">
        <span>I</span>
      </button>
      <button class="btn2">
        <span>O</span>
      </button>
      <button class="btn2">
        <span>P</span>
      </button>
      <button class="btn2">
        <span class="sm">{<br />[</span>
      </button>
      <button class="btn2">
        <span class="sm">}<br />]</span>
      </button>
      <button class="btn2">
        <span class="sm">|<br />\</span>
      </button>
    </div>
    <div class="row">
      <button class="btn2">
        <span class="xs noxpad">delete⌦</span>
      </button>
      <button class="btn2">
        <span class="xs">end</span>
      </button>
      <button class="btn2">
        <span class="xs">page down</span>
      </button>
    </div>
    <div class="row">
      <button class="btn2">
        <span>7</span>
      </button>
      <button class="btn2">
        <span>8</span>
      </button>
      <button class="btn2">
        <span>9</span>
      </button>
      <button class="btn2">
        <span>-</span>
      </button>
    </div>
    <div class="row">
      <button id="caps-lock" class="btn4">
        <span class="ul xs">•</span>
        <span class="ll xs">caps lock</span>
      </button>
      <button class="btn2 KeyA">
        <span>A</span>
      </button>
      <button
        v-tooltip="`fly back on ${cmFlyPerRequest} cm`"
        class="btn2 control-btn KeyS"
        @mousedown="onMouseDown('KeyS')"
      >
        <span>S</span>
      </button>
      <button class="btn2 KeyD">
        <span>D</span>
      </button>
      <button class="btn2">
        <span>F</span>
        <span class="bump"> </span>
      </button>
      <button class="btn2">
        <span>G</span>
      </button>
      <button class="btn2">
        <span>H</span>
      </button>
      <button class="btn2">
        <span>J</span>
        <span class="bump"> </span>
      </button>
      <button class="btn2">
        <span>K</span>
      </button>
      <button class="btn2">
        <span>L</span>
      </button>
      <button class="btn2">
        <span class="sm">:<br />;</span>
      </button>
      <button class="btn2">
        <span class="sm">&quot;<br />'</span>
      </button>
      <button
        v-tooltip="`Connect with the drone`"
        class="btn4 control-btn Enter"
        @mousedown="onMouseDown('Enter')"
      >
        <span class="lr xs">return</span>
      </button>
    </div>
    <div class="row"></div>
    <div class="row">
      <button class="btn2">
        <span>4</span>
      </button>
      <button class="btn2">
        <span>5</span>
        <span class="bump"> </span>
      </button>
      <button class="btn2">
        <span>6</span>
      </button>
      <button class="btn2">
        <span>+</span>
      </button>
    </div>
    <div class="row">
      <button
        v-tooltip="`Take of the drone`"
        class="btn5 control-btn ShiftLeft"
        @mousedown="onMouseDown('ShiftLeft')"
      >
        <span class="ll xs">shift</span>
      </button>
      <button class="btn2">
        <span>Z</span>
      </button>
      <button class="btn2">
        <span>X</span>
      </button>
      <button class="btn2">
        <span>C</span>
      </button>
      <button class="btn2">
        <span>V</span>
      </button>
      <button
        v-tooltip="`Start videostram`"
        class="btn2 control-btn KeyB"
        @mousedown="onMouseDown('KeyB')"
      >
        <span>B</span>
      </button>
      <button
        v-tooltip="`Finish videostream`"
        class="btn2 control-btn KeyN"
        @mousedown="onMouseDown('KeyN')"
      >
        <span>N</span>
      </button>
      <button class="btn2">
        <span>M</span>
      </button>
      <button class="btn2">
        <span class="sm">&lt;<br />,</span>
      </button>
      <button class="btn2">
        <span class="sm">&gt;<br />.</span>
      </button>
      <button class="btn2">
        <span class="sm">?<br />/</span>
      </button>
      <button
        v-tooltip="`Take of the drone`"
        class="btn5 control-btn ShiftRight"
        @mousedown="onMouseDown('ShiftRight')"
      >
        <span class="lr xs">shift</span>
      </button>
    </div>
    <div class="row">
      <button
        v-tooltip="`fly top on ${cmFlyPerRequest} cm`"
        class="btn2 control-btn ArrowUp"
        @mousedown="onMouseDown('ArrowUp')"
      >
        <span>
          <span class="up"> </span>
        </span>
      </button>
    </div>
    <div class="row">
      <button class="btn2">
        <span>1</span>
      </button>
      <button class="btn2">
        <span>2</span>
      </button>
      <button class="btn2">
        <span>3</span>
      </button>
      <button class="btn10">
        <span class="lr xs">enter</span>
      </button>
    </div>
    <div class="row">
      <button class="btn7">
        <span class="ll xs">control</span>
      </button>
      <button class="btn6">
        <span class="ul xxs">alt</span>
        <span class="ll xs">option</span>
      </button>
      <button class="btn7">
        <span class="ll xs">command</span>
        <span class="lr xs noxscale">⌘</span>
      </button>
      <button class="btn-longest">
        <span> </span>
      </button>
      <button class="btn7">
        <span class="ll xs noxscale">⌘</span>
        <span class="lr xs">command</span>
      </button>
      <button class="btn6">
        <span class="ur xxs">alt</span>
        <span class="lr xs">option</span>
      </button>
      <button class="btn7">
        <span class="lr xs">control</span>
      </button>
    </div>
    <div class="row">
      <button
        v-tooltip="`fly left on ${cmFlyPerRequest} cm`"
        class="btn2 control-btn ArrowLeft"
        @mousedown="onMouseDown('ArrowLeft')"
      >
        <span>
          <span class="left"> </span>
        </span>
      </button>
      <button
        v-tooltip="`fly down on ${cmFlyPerRequest} cm`"
        class="btn2 control-btn ArrowDown"
        @mousedown="onMouseDown('ArrowDown')"
      >
        <span>
          <span class="down"> </span>
        </span>
      </button>
      <button
        v-tooltip="`fly right on ${cmFlyPerRequest} cm`"
        class="btn2 control-btn ArrowRight"
        @mousedown="onMouseDown('ArrowRight')"
      >
        <span>
          <span class="right"> </span>
        </span>
      </button>
    </div>
    <div class="row">
      <button class="btn9">
        <span>0</span>
      </button>
      <button class="btn8">
        <span>.</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits<{ (e: "sendCommand", key: string): void }>();
const props =
  defineProps<{ degreeRotatePerRequest: number; cmFlyPerRequest: number }>();

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
});

function onKeydown(e: KeyboardEvent): void {
  highlightKeyboardButton(e.code);
  emit("sendCommand", e.code);
}

function onMouseDown(code: string) {
  highlightKeyboardButton(code);
  emit("sendCommand", code);
}

function highlightKeyboardButton(code: string) {
  const keyboardButton = document.getElementsByClassName(code)[0];

  if (keyboardButton && !keyboardButton.classList.contains("active")) {
    keyboardButton.classList.add("active");
    setTimeout(() => {
      keyboardButton.classList.remove("active");
    }, 150);
  }
}
</script>


<style lang="scss" scoped>
button {
  background-color: #eee;
  border: 0;
  border-radius: 0.125em;
  box-shadow: -0.2em -0.125em 0.125em rgba(0, 0, 0, 0.25),
    0 0 0 0.04em rgba(0, 0, 0, 0.3),
    0.02em 0.02em 0.02em rgba(0, 0, 0, 0.4) inset,
    -0.05em -0.05em 0.02em rgba(255, 255, 255, 0.8) inset;
  color: #777;
  font-size: 1em;
  outline: 0;
  position: relative;
  vertical-align: top;
  appearance: none;
  user-select: none;

  &.control-btn {
    background-color: #bbdefb;
  }

  &.active {
    background-color: #d32f2f;
  }

  &:not(:last-of-type) {
    margin-right: 0.35em;
  }

  span {
    display: inline-block;
  }

  > span {
    margin: auto;
    padding: 0.2em 0.375em;
    position: absolute;
    top: 50%;
    left: 0;
    font-size: 0.5em;
    line-height: 2;
    transform: translateY(-50%) scaleX(0.875);
    width: 100%;
  }
}

/* Keyboard */
.keyboard {
  background-image: linear-gradient(90deg, #888, #ccc);
  border-radius: 0.5em;
  box-shadow: -0.25em -0.25em 0.75em rgba(0, 0, 0, 0.6), 0 0 0 1px #aaa inset;
  display: grid;
  grid-template-columns: 21.25em 4.125em 5.65em;
  grid-template-rows: 0.75em 1.125em 1.125em 1.125em 1.125em 1.375em;
  grid-gap: 0.375em 0.875em;
  font-size: 36px;
  padding: 0.25em;
  width: 26.75em;
  height: 9em;
  overflow: hidden;
  @media (max-width: 1380px) {
    font-size: 32px;
  }
  @media (max-width: 1220px) {
    font-size: 28px;
  }
  @media (max-width: 1100px) {
    font-size: 24px;
  }
}
.row:nth-of-type(14) {
  text-align: center;
}
.row:nth-of-type(n + 14):nth-of-type(-3n + 17) {
  transform: translateY(0.25em);
}
.bump {
  border-radius: 0.1em;
  box-shadow: -0.05em -0.02em 0 0.05em rgba(0, 0, 0, 0.3);
  padding: 0;
  top: 85%;
  left: calc(50% - 0.4em);
  width: 0.8em;
  height: 0.15em;
}

/* Button size */
.btn0 {
  width: 1.19em;
  height: 0.75em;
}
.btn1 {
  width: 1.125em;
  height: 0.75em;
}
.btn2 {
  width: 1.125em;
  height: 1.125em;
}
.btn3 {
  width: 2em;
  height: 1.125em;
}
.btn4 {
  width: 2.3em;
  height: 1.125em;
}
.btn5 {
  width: 3.05em;
  height: 1.125em;
}
.btn6 {
  width: 1.5625em;
  height: 1.375em;
}
.btn7 {
  width: 1.8375em;
  height: 1.375em;
}
.btn8 {
  width: 1.125em;
  height: 1.375em;
}
.btn9 {
  width: 2.6875em;
  height: 1.375em;
}
.btn10 {
  width: 1.125em;
  height: 2.875em;
}
.btn-longest {
  width: 8.625em;
  height: 1.375em;
}

/* Button text alignment */
.ul,
.ll,
.ur,
.lr {
  top: 0;
  transform: scaleX(0.875);
}
.ul,
.ll {
  text-align: left;
  transform-origin: 0 50%;
}
.ur,
.lr {
  text-align: right;
}
.ll,
.lr {
  top: auto;
  bottom: 0;
}

/* Button font size */
.xxxs {
  font-size: 0.2em;
  line-height: 1.5;
}
.xxs {
  font-size: 0.25em;
  line-height: 1.5;
}
.xs {
  font-size: 0.3em;
  line-height: 1.125;
}
.sm {
  font-size: 0.4em;
  line-height: 1.25;
}

/* Icons */
.up,
.right,
.down,
.left {
  width: 0;
  height: 0;
  vertical-align: 0.1em;
}
.up {
  border-left: 0.25em solid transparent;
  border-right: 0.25em solid transparent;
  border-bottom: 0.5em solid currentColor;
}
.right {
  border-left: 0.5em solid currentColor;
  border-top: 0.25em solid transparent;
  border-bottom: 0.25em solid transparent;
}
.down {
  border-left: 0.25em solid transparent;
  border-right: 0.25em solid transparent;
  border-top: 0.5em solid currentColor;
}
.left {
  border-right: 0.5em solid currentColor;
  border-top: 0.25em solid transparent;
  border-bottom: 0.25em solid transparent;
}
.pause {
  border-left: 0.2em solid;
  border-right: 0.2em solid;
  vertical-align: 0.1em;
  width: 0.475em;
  height: 0.5em;
}
.emoji {
  filter: saturate(0);
}
.cascade:before,
.cascade:after,
.block {
  border: 1px solid;
}
.cascade {
  position: relative;
  height: 1em;
  width: 1.2em;
}
.cascade:before,
.cascade:after {
  content: "";
  position: absolute;
  height: 0.45em;
  width: 0.8em;
}
.cascade:before {
  top: 0;
  left: 0;
}
.cascade:after {
  right: 0;
  bottom: 0;
}
.block {
  margin-left: 0.1em;
  height: 0.8em;
  width: 0.6em;
  vertical-align: 0.1em;
}
.apps:before,
.apps:after {
  content: "\25A1\25A1\25A1";
  font-weight: bold;
  display: block;
  line-height: 0.875;
}

/* Miscellaneous */
.on {
  color: #8dff00;
  text-shadow: 0 0 2px #478800;
}
.noxpad {
  padding: 0.2em 0;
}
</style>
