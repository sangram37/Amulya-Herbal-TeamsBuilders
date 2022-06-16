
import * as types from "../../Types";
const INITIAL_STATE = {
    homeLoading: false,
    checkout_Data: {},
    video_ads: ''

};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.VIDEO_ADS:
            return { ...state, video_ads: action.payload };

        default:
            return state;
    }
}