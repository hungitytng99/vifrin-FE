export function SEARCH_BY_KEY(payload) {
    return {
        type: "SEARCH_BY_KEY",
        payload,
    };
}
export function SEARCH_BY_KEY_SUCCESS(payload) {
    return {
        type: "SEARCH_BY_KEY_SUCCESS",
        payload,
    };
}
export function SEARCH_BY_KEY_FAIL(payload) {
    return {
        type: "SEARCH_BY_KEY_FAIL",
        payload,
    };
}
export function RESET_SEARCH_BY_KEY(payload) {
    return {
        type: "RESET_SEARCH_BY_KEY",
        payload,
    };
}