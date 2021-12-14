export function LOGIN(payload) {
  return {
    type: "LOGIN",
    payload,
  };
}

export function LOGIN_SUCCESS(payload) {
  return {
    type: "LOGIN_SUCCESS",
    payload,
  };
}

export function LOGIN_FAIL(payload) {
  return {
    type: "LOGIN_FAIL",
    payload,
  };
}

export function REGISTER(payload) {
  return {
    type: "REGISTER",
    payload,
  };
}

export function REGISTER_SUCCESS(payload) {
  return {
    type: "REGISTER_SUCCESS",
    payload,
  };
}

export function REGISTER_FAIL(payload) {
  return {
    type: "REGISTER_FAIL",
    payload,
  };
}


export function RESET_AUTH_STATE(payload) {
  return {
    type: "RESET_AUTH_STATE",
    payload,
  };
}


export function logout(payload) {
  return {
    type: "LOGOUT",
    payload,
  };
}
