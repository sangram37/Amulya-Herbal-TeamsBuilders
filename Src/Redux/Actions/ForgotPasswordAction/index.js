import * as types from '../../Types';
import * as ConstantsApi from '../../../Constants/ApiConstants';
import { CallApi } from '../../../CallApi';
import ToastMessage from '../../../Components/ToastMessage';

export const forgotPassword = (payload, cb) => {
  return dispatch => {
    CallApi('POST', ConstantsApi.url.FORGOT_PASSWORD, payload)
      .then(res => {

        dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: res.data });
        return cb(true, false, res.data);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on Forgot password',
          // props:Colors.warning
        })
        return cb(false, true, 'Error While sending mail.');
      });
  };
};
