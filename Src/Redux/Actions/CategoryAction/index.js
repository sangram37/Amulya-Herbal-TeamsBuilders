import * as types from "../../Types";
import * as ConstantsApi from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";
import ToastMessage from "../../../Components/ToastMessage";

export const categoryScreenData = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.CATEGORY_URL, payload)
      .then((res) => {

        dispatch({
          type: types.GET_CATEGORY_SCREEN,
          payload: res.category,
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
export const categoryProductListing = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.CATEGORY_PRODUCT_LISTING_URL, payload)
      .then((res) => {

        dispatch({
          type: types.GET_CATEGORY_PRODUCT_LIST_SCREEN,
          payload: res.products,
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
export const categoryProductDetails = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.CATEGORY_PRODUCT_DETAILS_URL, payload)
      .then((res) => {

        dispatch({
          type: types.GET_CATEGORY_PRODUCT_DETAILS_SCREEN,
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
export const categoryListing = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.CATEGORY_LISTING_URL, payload)
      .then((res) => {

        dispatch({
          type: types.GET_CATEGORY_LIST,
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
export const categorySearch = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.CATEGORY_SEARCH_URL, payload)
      .then((res) => {


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
