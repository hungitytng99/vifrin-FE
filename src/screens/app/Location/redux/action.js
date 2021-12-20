export function GET_DETAIL_LOCATION(payload) {
  return {
    type: "GET_DETAIL_LOCATION",
    payload,
  };
}

export function GET_DETAIL_LOCATION_SUCCESS(payload) {
  return {
    type: "GET_DETAIL_LOCATION_SUCCESS",
    payload,
  };
}
export function GET_DETAIL_LOCATION_FAIL(payload) {
  return {
    type: "GET_DETAIL_LOCATION_FAIL",
    payload,
  };
}
