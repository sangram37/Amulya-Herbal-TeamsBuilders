import * as types from '../../Types';

import * as ConstantsApi from '../../../Constants/ApiConstants';
import { CallApi } from '../../../CallApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../../../Components/ToastMessage';
export const getCountryDetails = (payload, cb) => {
  return dispatch => {
    CallApi('POST', ConstantsApi.url.COUNTRY_DETAILS, payload)
      .then(res => {

        dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: res.data });
        return cb(true, false, res.data);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        })
        return cb(false, true, 'Error getting country List');
      });

  };
};

export const getStateList = (payload, cb) => {

  return dispatch => {
    CallApi('POST', ConstantsApi.url.STATE_DETAILS, payload)
      .then(res => {

        dispatch({ type: types.GET_STATE_DETAILS_SUCCESS, payload: res.data });
        return cb(true, false, res.data);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        })
        return cb(false, true, 'Error getting State List');
      });
  };
};

export const getCityList = (payload, cb) => {

  return dispatch => {
    CallApi('POST', ConstantsApi.url.CITY_DETAILS, payload)
      .then(res => {

        dispatch({ type: types.GET_CITY_DETAILS_SUCCESS, payload: res.data });
        return cb(true, false, res.data);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        })
        return cb(false, true, 'Error getting country List');
      });
  };
};
export const signUp = (payload, cb) => {

  return dispatch => {
    CallApi('POST', ConstantsApi.url.USER_SIGNUP, payload)
      .then(res => {

        dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: res });
        AsyncStorage.setItem('user_id', JSON.stringify(res.userdata.user_id))
        return cb(true, false, res);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        })
        return cb(false, true, 'Error getting country List');
      });
  };
};
