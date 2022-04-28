import { I18LANGUAGE } from "configs";
import i18n from "languages";

export function changeLanguage(lng) {
    localStorage.setItem(I18LANGUAGE, lng);
    i18n.changeLanguage(lng);
}