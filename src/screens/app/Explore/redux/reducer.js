import { REQUEST_STATE } from "configs";
import { combineReducers } from "redux";
import { GET_EXPLORE_DESTINATIONS, GET_EXPLORE_DESTINATIONS_FAIL, GET_EXPLORE_DESTINATIONS_SUCCESS, RESET_GET_EXPLORE_DESTINATIONS } from "./action";

const defaultState = {};

export default combineReducers({
  listDestinations: (state = defaultState, action) => {
    switch (action.type) {
      case GET_EXPLORE_DESTINATIONS().type: {
        return {
          ...state,
          state: REQUEST_STATE.REQUEST,
        };
      }
      case GET_EXPLORE_DESTINATIONS_SUCCESS().type: {
        const { data } = action.payload;
        return {
          ...state,
          data: data.map(destination => {
            if (destination.medias[0]) {
              return {
                id: destination.id,
                src: destination.medias[0].url,
                width: destination.medias[0].width,
                height: destination.medias[0].height,
                name: destination?.name,
                description: destination?.description,
                average_score: destination?.averageScore,
              }
            }
          }),
          state: REQUEST_STATE.SUCCESS,
        };
      }
      case GET_EXPLORE_DESTINATIONS_FAIL().type: {
        return {
          ...state,
          state: REQUEST_STATE.ERROR,
        };
      }
      case RESET_GET_EXPLORE_DESTINATIONS().type: {
        return {
          ...defaultState,
        };
      }

      default:
        return state;
    }
  },
});
