import { createI18n } from "vue-i18n";
import { uk } from "./uk";
import { en } from "./en";

export type language = "uk" | "en";

export const languages: language[] = ["uk", "en"];

export const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: languages[1],
  messages: { uk, en },
});
