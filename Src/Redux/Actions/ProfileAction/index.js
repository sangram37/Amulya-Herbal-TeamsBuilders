import * as types from '../../Types';
import * as ConstantsApi from '../../../Constants/ApiConstants';
import {CallApi} from '../../../CallApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../../../Components/ToastMessage';

export const getuserData = (payload, cb) => {
  return dispatch => {
    CallApi('POST', ConstantsApi.url.USER_DATA_URL, payload)
      .then(res => {
        dispatch({type: types.USER_DATA, payload: res.userdata});
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

export const updatuserData = (payload, cb) => {
  return dispatch => {
    CallApi('POST', ConstantsApi.url.UPDATE_USER_DATA_URL, payload)
      .then(res => {
        //   dispatch({type: types.USER_LOGIN_DATA, payload: res.userdata});
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
export const ProfileData = userdata => {
  return async dispatch => {
    try {
      //     debugger;
      await dispatch({type: types.USER_DATA, payload: userdata});
    } catch (e) {
      // alert(e)
      alert('Error', JSON.stringify(e));
    }
  };
};
