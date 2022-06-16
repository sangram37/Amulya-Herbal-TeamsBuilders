import * as types from '../../Types';

const initialState = {
  forgotPasswordData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD_FETCHING:
      return {
        ...state,
        forgotPasswordData: action.payload,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordData: action.payload,
      };
    case types.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordData: action.payload,
      };

    default:
      return state;
  }
};
