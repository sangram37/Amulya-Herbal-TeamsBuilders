import * as types from "../../Types";
const INITIAL_STATE = {
    Brand: [],


};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.GET_BRAND:
            return { ...state, Brand: action.payload };

        default:
            return state;
    }
}