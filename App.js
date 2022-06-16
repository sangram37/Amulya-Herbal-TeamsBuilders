import * as React from 'react';
import { View, Text } from 'react-native';

import RootReducer from './Src/Redux/Reducers/RootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from './Src/Navigation/RootNavigation';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
//add redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxThunk from 'redux-thunk';
import { toStatement } from '@babel/types';
import { ToastConfig } from './Src/Components/ToastMessage/ToastConfig';
//End redux

export default function App() {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [],
  };
  const persistedReducer = persistReducer(persistConfig, RootReducer);
  let store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
        <Toast config={ToastConfig} ref={ref => Toast.setRef(ref)} />
      </PersistGate>
    </Provider>
  );
}
