import * as types from '../../Types';

const initialState = {
  getCountryDetails: [],
  getStateList: [],
  getSignUpData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUNTRY_LOADING:
      return {
        ...state,
        getCountryDetails: action.payload,
      };
    case types.GET_COUNTRY_SUCCESS:
      return {
        ...state,
        getCountryDetails: action.payload,
      };
    case types.GET_COUNTRY_FAILURE:
      return {
        ...state,
        getCountryDetails: action.payload,
      };
    case types.GET_STATE_DETAILS_LOADING:
      return {
        ...state,
        getStateList: action.payload,
      };
    case types.GET_STATE_DETAILS_SUCCESS:
      return {
        ...state,
        getStateList: action.payload,
      };
    case types.GET_STATE_DETAILS_FAILURE:
      return {
        ...state,
        getStateList: action.payload,
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        getSignUpData: action.payload,
      };

    default:
      return state;
  }
};
