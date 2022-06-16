
import * as types from "../../Types";
const INITIAL_STATE = {
    homeLoading: false, Address: [],
    checkout_Data:{}
    
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.GET_ADDRESS_LIST_SCREEN:
            return { ...state, Address: action.payload };

        default:
            return state;
    }
}