import * as types from "../../Types";
import * as ConstantsApi from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";
import ToastMessage from "../../../Components/ToastMessage";

export const homeScreenDetailsData = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.HOME_PAGE_URL, payload)
      .then((res) => {

        dispatch({
          type: types.GET_HOME_SCREEN_DETAiLS,
          payload: res,
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
