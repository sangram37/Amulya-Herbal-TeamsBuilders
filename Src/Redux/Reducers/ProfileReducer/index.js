import * as types from '../../Types';

const initialState = {
  userdata: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_DATA:
      return {
        ...state,
        userdata: action.payload,
      };

    default:
      return state;
  }
};
