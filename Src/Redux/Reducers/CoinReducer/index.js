import * as types from "../../Types";
const INITIAL_STATE = {
    coinNumber: null,

};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.COIN_NUMBER:
            return { ...state, coinNumber: action.payload };
        default:
            return state;
    }
}