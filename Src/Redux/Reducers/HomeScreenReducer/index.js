import * as types from "../../Types";

const initialState = {
  homeScreenData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_HOME_SCREEN_DETAiLS:
      return {
        ...state,
        homeScreenData: action.payload,
      };
   
    default:
      return state;
  }
};
