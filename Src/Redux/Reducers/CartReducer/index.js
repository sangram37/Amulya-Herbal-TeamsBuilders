
import * as types from "../../Types";
const INITIAL_STATE = {
    homeLoading: false, cartList: [],
    checkout_Data: {},
    cartNumber: null,

};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.ADD_TO_CART:
            return { ...state, cartList: action.payload };
        case types.CHECKOUT_DATA:
            return { ...state, checkout_Data: action.payload };
        case types.CART_NUMBER:
            return { ...state, cartNumber: action.payload };
        default:
            return state;
    }
}