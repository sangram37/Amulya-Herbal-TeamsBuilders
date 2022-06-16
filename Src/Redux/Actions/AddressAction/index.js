import * as types from "../../Types";
import * as ConstantsApi from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";
import ToastMessage from "../../../Components/ToastMessage";

export const AddAddress = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.ADD_ADDRESS_URL, payload)
      .then((res) => {

        // dispatch({
        //   type: types.GET_CATEGORY_SCREEN,
        //   payload: res.category,
        // });
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
export const EditAddress = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.EDIT_ADDRESS_URL, payload)
      .then((res) => {

        //   dispatch({
        //     type: types.GET_CATEGORY_PRODUCT_LIST_SCREEN,
        //     payload: res.products,
        //   });
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
export const DeleteAddress = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.DELETE_ADDRESS_URL, payload)
      .then((res) => {

        //   dispatch({
        //     type: types.GET_CATEGORY_PRODUCT_LIST_SCREEN,
        //     payload: res.products,
        //   });
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
export const GetAddress = (payload, cb) => {
  return (dispatch) => {
    CallApi("POST", ConstantsApi.url.ADDRESS_LISTING_URL, payload)
      .then((res) => {

        dispatch({
          type: types.GET_ADDRESS_LIST_SCREEN,
          payload: res.products,
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