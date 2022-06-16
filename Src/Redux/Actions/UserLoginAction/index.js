import * as types from '../../Types';
import * as ConstantsApi from '../../../Constants/ApiConstants';
import { CallApi } from '../../../CallApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../../../Components/ToastMessage';

export const loginAuth = (payload, cb) => {
  return dispatch => {
    return CallApi('POST', `verifyOtp/`, payload)
      .then(res => {
        console.log(res, 'bapi');
        dispatch({ type: types.USER_LOGIN_DATA, payload: res.user_id });
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.status });
        AsyncStorage.setItem('user_id', JSON.stringify(res.user_id));
        AsyncStorage.setItem('token', JSON.stringify(res.token));
        return cb(true, false, res);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        });
        return cb(false, true, res.message);
      });
  };
};
export const getotpdata = (payload, cb) => {
  return dispatch => {
    return CallApi('POST', `getOtp/`, payload)
      .then(res => {
        console.log(res, 'bapi');
        dispatch({ type: types.USER_LOGIN_DATA, payload: res.user_id });
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.status });
        AsyncStorage.setItem('user_id', JSON.stringify(res.user_id));
        AsyncStorage.setItem('token', JSON.stringify(res.token));
        return cb(true, false, res);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        });
        return cb(false, true, res);
      });
  };
};
export const logOut = cb => {
  return async dispatch => {
    try {
      //     debugger;
      await dispatch({ type: types.ADD_TO_CART, payload: [] });
      await dispatch({ type: types.USER_LOGIN_DATA, payload: '' });
      await dispatch({ type: types.USER_LOGIN_SUCCESS, payload: null });
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('token');
      return cb(true, false);
    } catch (e) {
      // alert(e)
      alert('Error', JSON.stringify(e));
      return cb(false, true);
    }
  };
};
