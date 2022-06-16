import * as types from "../../Types";
const INITIAL_STATE = {
    homeLoading: false, wishList: [],
    wishListNumber: null,

};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.ADD_TO_WISHLIST:
            return { ...state, wishList: action.payload };
        case types.WISHLIST_NUMBER:
            return { ...state, wishListNumber: action.payload };
        default:
            return state;
    }
}