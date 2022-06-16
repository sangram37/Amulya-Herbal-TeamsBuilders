/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AdMob from '@react-native-admob/admob';

import App from './App';
import {name as appName} from './app.json';
AdMob.initialize();
AppRegistry.registerComponent(appName, () => App);
