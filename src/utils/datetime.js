import { MONTHNAMES } from "../configs";

export function getMounthAndDay(date, translation) {
    const dateVar = new Date(date);
    return `${translation(MONTHNAMES[dateVar.getMonth()])}  ${dateVar.getDate()}`
}