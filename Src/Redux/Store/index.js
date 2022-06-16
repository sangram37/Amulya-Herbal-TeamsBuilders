import {createStore, applyMiddleware} from 'redux';
import RootReducer from '../Reducers/RootReducer';
import thunk from 'redux-thunk';
import {persistReducer,persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function configureStore() {
  const persistConfig = {
    key: 'root',
    keyPrefix: '',
    storage: AsyncStorage,
    timeout: 0,
    whitelist: ['user_auth'],
  };
  const persistedReducer = persistReducer(persistConfig, RootReducer);
  let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
  return persistStore(store);
}
