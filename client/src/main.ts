import { createApp } from "vue";
import { VTooltip, Dropdown } from "floating-vue";
import { i18n } from "@/localize";

import "./assets/style/main.scss";
import "floating-vue/dist/style.css";

import App from "./App.vue";

const app = createApp(App);
app.use(i18n);
app.directive("tooltip", VTooltip);
app.component("VDropdown", Dropdown);
app.mount("#app");
