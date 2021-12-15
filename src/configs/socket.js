export function SOCKET_CREATE_COMMENT(data) {
  return {
    type: "SOCKET_CREATE_COMMENT",
    data: data,
  };
}

export function SOCKET_TYPING_COMMENT(data) {
  return {
    type: "SOCKET_TYPING_COMMENT",
    data: data,
  };
}
