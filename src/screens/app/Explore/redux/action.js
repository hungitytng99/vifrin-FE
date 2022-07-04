export function GET_EXPLORE_DESTINATIONS(payload) {
    return {
        type: "GET_EXPLORE_DESTINATIONS",
        payload,
    };
}
export function GET_EXPLORE_DESTINATIONS_SUCCESS(payload) {
    return {
        type: "GET_EXPLORE_DESTINATIONS_SUCCESS",
        payload,
    };
}
export function GET_EXPLORE_DESTINATIONS_FAIL(payload) {
    return {
        type: "GET_EXPLORE_DESTINATIONS_FAIL",
        payload,
    };
}
export function RESET_GET_EXPLORE_DESTINATIONS(payload) {
    return {
        type: "RESET_GET_EXPLORE_DESTINATIONS",
        payload,
    };
}