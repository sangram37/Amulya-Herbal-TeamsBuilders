import * as types from "../../Types";
const INITIAL_STATE = {
    resentView: [],
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.ADD_TO_RESENTVIEW:
            return { ...state, resentView: action.payload };
        default:
            return state;
    }
}