export function CREATE_SOCKET_CONNECTION(payload) {
  return {
    type: "CREATE_SOCKET_CONNECTION",
    payload,
  };
}

export function CREATE_SOCKET_CONNECTION_SUCCESS(payload) {
  return {
    type: "CREATE_SOCKET_CONNECTION_SUCCESS",
    payload,
  };
}

export function CREATE_SOCKET_CONNECTION_FAIL(payload) {
  return {
    type: "CREATE_SOCKET_CONNECTION_FAIL",
    payload,
  };
}

export function RESET_SOCKET_CONNECTION(payload) {
  return {
    type: "RESET_SOCKET_CONNECTION",
    payload,
  };
}
