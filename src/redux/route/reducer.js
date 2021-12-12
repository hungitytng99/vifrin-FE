import { set_route_path } from "./action";

const defaultState = {
  currentRoutePath: "/",
};

export default function routeReducer(state = defaultState, action) {
  switch (action.type) {
    case set_route_path().type: {
      return {
        ...state,
        currentRoutePath: action.payload,
      };
    }

    default:
      return state;
  }
}
