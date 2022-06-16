import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Constants/ApiConstants';
// const API = 'http://77.68.124.139/odisha-tourism/admin/public/api/auth/';

const loaddata = async (url, options) => {
  try {
    console.log('Api data=>', url, options);
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

export const FormDatCallApi = async (method, apiPath, params) => {
  let token = await AsyncStorage.getItem('token');
  //   console.log('bapitoken', token);
  const url = `${BASE_URL + apiPath}`;
  let options = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  };

  return loaddata(url, options);
};
