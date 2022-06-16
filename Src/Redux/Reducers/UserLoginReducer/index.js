import * as types from '../../Types';

const initialState = {
  loginUser: '',
  loginUserStatus: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_DATA:
      return {
        ...state,
        loginUser: action.payload,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginUserStatus: action.payload,
      };
    default:
      return state;
  }
};
