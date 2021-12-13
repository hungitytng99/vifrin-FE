export function GET_LIST_FOLLOWER(payload) {
  return {
    type: "GET_LIST_FOLLOWER",
    payload,
  };
}

export function GET_LIST_FOLLOWER_SUCCESS(payload) {
  return {
    type: "GET_LIST_FOLLOWER_SUCCESS",
    payload,
  };
}

export function GET_LIST_FOLLOWER_FAIL(payload) {
  return {
    type: "GET_LIST_FOLLOWER_FAIL",
    payload,
  };
}

export function GET_LIST_FOLLOWING(payload) {
  return {
    type: "GET_LIST_FOLLOWING",
    payload,
  };
}

export function GET_LIST_FOLLOWING_SUCCESS(payload) {
  return {
    type: "GET_LIST_FOLLOWING_SUCCESS",
    payload,
  };
}
export function GET_LIST_FOLLOWING_FAIL(payload) {
  return {
    type: "GET_LIST_FOLLOWING_FAIL",
    payload,
  };
}

export function FOLLOW(payload) {
  return {
    type: "FOLLOW",
    payload,
  };
}

export function FOLLOW_SUCCESS(payload) {
  return {
    type: "FOLLOW_SUCCESS",
    payload,
  };
}
export function FOLLOW_FAIL(payload) {
  return {
    type: "FOLLOW_FAIL",
    payload,
  };
}

export function UNFOLLOW(payload) {
  return {
    type: "UNFOLLOW",
    payload,
  };
}

export function UNFOLLOW_SUCCESS(payload) {
  return {
    type: "UNFOLLOW_SUCCESS",
    payload,
  };
}
export function UNFOLLOW_FAIL(payload) {
  return {
    type: "UNFOLLOW_FAIL",
    payload,
  };
}

export function DELETE_FOLLOW(payload) {
  return {
    type: "DELETE_FOLLOW",
    payload,
  };
}

export function DELETE_FOLLOW_SUCCESS(payload) {
  return {
    type: "DELETE_FOLLOW_SUCCESS",
    payload,
  };
}
export function DELETE_FOLLOW_FAIL(payload) {
  return {
    type: "DELETE_FOLLOW_FAIL",
    payload,
  };
}

export function CHECK_ISCURRENT_USER(payload) {
  return {
    type: "CHECK_ISCURRENT_USER",
    payload,
  };
}

export function GET_LIST_POST_BY_USERNAME(payload) {
  return {
    type: "GET_LIST_POST_BY_USERNAME",
    payload,
  };
}

export function GET_LIST_POST_BY_USERNAME_SUCCESS(payload) {
  return {
    type: "GET_LIST_POST_BY_USERNAME_SUCCESS",
    payload,
  };
}
export function GET_LIST_POST_BY_USERNAME_FAIL(payload) {
  return {
    type: "GET_LIST_POST_BY_USERNAME_FAIL",
    payload,
  };
}

export function GET_DETAIL_POST_BY_ID(payload) {
  return {
    type: "GET_DETAIL_POST_BY_ID",
    payload,
  };
}

export function GET_DETAIL_POST_BY_ID_SUCCESS(payload) {
  return {
    type: "GET_DETAIL_POST_BY_ID_SUCCESS",
    payload,
  };
}
export function GET_DETAIL_POST_BY_ID_FAIL(payload) {
  return {
    type: "GET_DETAIL_POST_BY_ID_FAIL",
    payload,
  };
}

export function CREATE_POST(payload) {
  return {
    type: "CREATE_POST",
    payload,
  };
}

export function CREATE_POST_SUCCESS(payload) {
  return {
    type: "CREATE_POST_SUCCESS",
    payload,
  };
}
export function CREATE_POST_FAIL(payload) {
  return {
    type: "CREATE_POST_FAIL",
    payload,
  };
}

export function RESET_CREATE_POST_STATE(payload) {
  return {
    type: "RESET_CREATE_POST_STATE",
    payload,
  };
}

export function RESET_PROFILE_STATE(payload) {
  return {
    type: "RESET_PROFILE_STATE",
    payload,
  };
}

export function RESET_DETAIL_PROFILE_STATE(payload) {
  return {
    type: "RESET_DETAIL_PROFILE_STATE",
    payload,
  };
}

