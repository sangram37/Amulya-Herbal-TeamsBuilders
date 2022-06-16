import * as types from "../../Types";

const initialState = {
  orderList: [],
orderDetails:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
      };
      case types.GET_ORDER_DETAILS:
        return {
          ...state,
          orderDetails: action.payload,
        };
   
    default:
      return state;
  }
};
