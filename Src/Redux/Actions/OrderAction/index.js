import * as types from '../../Types';
import * as ConstantsApi from '../../../Constants/ApiConstants';
import { CallApi } from '../../../CallApi';
import ToastMessage from '../../../Components/ToastMessage';


export const orderlist = (payload, cb) => {
  return dispatch => {
    CallApi('POST', ConstantsApi.url.ORDER_LIST, payload)
      .then(res => {

        dispatch({ type: types.GET_ORDER_LIST, payload: res.userdata });

        return cb(true, false, res);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        })
        return cb(false, true, res.message);
      });
  };
};
export const orderdetails = (payload, cb) => {
  return dispatch => {
    CallApi('POST', ConstantsApi.url.ORDER_DETAILAS, payload)
      .then(res => {

        dispatch({ type: types.GET_ORDER_DETAILS, payload: res.userdata });

        return cb(true, false, res);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        })
        return cb(false, true, res.message);
      });
  };
};