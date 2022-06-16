// import { GET_HOTEL_FILTER_LIST, GET_HOTEL_LIST } from "../../Types";
import { url } from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";
import ToastMessage from "../../../Components/ToastMessage";

export const CommonList = (payload, type, cb) => {
    return (dispatch) => {
        CallApi("POST", url.CONSTANT_ASSETS, payload)
            .then((res) => {

                dispatch({
                    type: type,
                    payload: res,
                });
                return cb(true, false, res);
            })
            .catch((error) => {
                ToastMessage({
                    type: 'type_info',
                    text: 'Please wait our devloper Working on it',
                    // props:Colors.warning
                })
                return cb(false, true, "Error While Getting Home Screen data.");
            });
    };
};
export const CommonContent = (payload, cb) => {
    return (dispatch) => {
        CallApi("POST", url.CONTENT_URl, payload)
            .then((res) => {

                // dispatch({
                //     type: types.GET_ADDRESS_LIST_SCREEN,
                //     payload: res,
                // });
                return cb(true, false, res);
            })
            .catch((error) => {
                ToastMessage({
                    type: 'type_info',
                    text: 'Please wait our devloper Working on it',
                    // props:Colors.warning
                })
                return cb(false, true, "Error While Getting Home Screen data.");
            });
    };
};
