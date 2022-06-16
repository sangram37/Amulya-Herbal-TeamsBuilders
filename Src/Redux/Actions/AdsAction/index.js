import * as types from "../../Types";
import * as ConstantsApi from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";
import ToastMessage from "../../../Components/ToastMessage";

export const AddAds = (payload, cb) => {
    return (dispatch) => {
        CallApi("GET", 'adsense', '')
            .then((res) => {
                let videoads = res.find(
                    element => element.ad_type === 'video_ads',
                );
                dispatch({
                    type: types.VIDEO_ADS,
                    payload: videoads,
                });
                return cb(true, false, res);
            })
            .catch((error) => {
                ToastMessage({
                    type: 'type_info',
                    text: 'Please wait our devloper Working on Home Screen',
                    // props:Colors.warning
                })
                return cb(false, true, "Error While Getting Home Screen data.");
            });
    };
};