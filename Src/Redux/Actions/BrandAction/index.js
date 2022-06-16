import * as types from "../../Types";
import * as ConstantsApi from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";
import ToastMessage from "../../../Components/ToastMessage";

export const brandList = (payload, cb) => {
    return (dispatch) => {
        CallApi("POST", ConstantsApi.url.BRAND_URL, payload)
            .then((res) => {

                dispatch({
                    type: types.GET_BRAND,
                    payload: res.brands,
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