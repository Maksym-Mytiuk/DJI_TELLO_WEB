<template>
  <VDropdown class="language-dropdown" v-model:shown="isShow">
    <button @click="show">{{ selectedLanguage }}</button>

    <template #popper>
      <button
        @click="changeLanguage(lang)"
        v-for="lang in filteredLanguages"
        :key="lang"
      >
        {{ lang }}
      </button>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { i18n, languages, type language } from "@/localize";

const emit = defineEmits<{ (e: "changeLanguage", lang: string): void }>();

const isShow = ref(false);
const selectedLanguage = ref(
  languages.includes(i18n.global.locale) ? i18n.global.locale : languages[1]
);

const filteredLanguages = computed(() =>
  languages.filter((lang: string) => lang !== selectedLanguage.value)
);

function changeLanguage(lang: language) {
  hide();
  i18n.global.locale = lang;
  selectedLanguage.value = lang;
}

function show() {
  isShow.value = true;
}

function hide() {
  isShow.value = false;
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  cursor: pointer;
}

button {
  padding: 0.3em;
  border: 1px solid #ccc;
  cursor: pointer !important;
}
</style>

<style>
.v-popper__arrow-container {
  display: none;
}
</style>