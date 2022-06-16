import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Constants/ApiConstants';

// const API = 'http://77.68.124.139/odisha-tourism/admin/public/api/auth/';

const loaddata = async (url, options) => {
  try {
    console.log('Api data=>', url, options);
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const CallApi = async (method, apiPath, params) => {
  let token = await AsyncStorage.getItem('token');
  const url = `${BASE_URL + apiPath}`;
  let options = {
    method: method,
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: params,
  };

  return loaddata(url, options);
};
export const CallApiPagination = async (method, apiPath, params) => {
  let token = await AsyncStorage.getItem('token');
  const url = apiPath;
  let options = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: params,
  };

  return loaddata(url, options);
};
