import * as React from 'react';
// import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import SplashScreen from '../../SplashScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';
import Login from '../../Screens/Auth/Login';
import Signup from '../../Screens/Auth/Signup';
import ForgotPassword from '../../Screens/Auth/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContainer from '../DrawerContainer';

import { Easing } from 'react-native';
import TabNavigation from '../TabNavigation';
import ProductDetails from '../../Screens/Dashboard/ProductDetails';
import Products from '../../Screens/Dashboard/Products/Products';
import Profile from '../../Screens/UserDetails/Profile/Profile';
import DpList from '../../Screens/Dp/DpList';
import DpDetails from '../../Screens/Dp/DpDetails';
import AddressList from '../../Screens/UserDetails/Address/AddressList';
import AddEditAddress from '../../Screens/UserDetails/Address/AddEditAddress';
import MyOrders from '../../Screens/Order/MyOrders';
// import Cart from '../../Screens/Cart';
import WebViewComponent from '../../Screens/WebViewComponent';
import Dp from '../../Screens/Dp';
import Otp from '../../Screens/Auth/Otp';
import OrderDetails from '../../Screens/Order/OrderDetails';
import Search from '../../Screens/Dashboard/Search';
import Category from '../../Screens/Dashboard/Category';
import Video from '../../Screens/Dashboard/Video';
import VideoDetails from '../../Screens/Dashboard/Video/VideoDetails';
import GenerateBill from '../../Screens/GenerateBill';
import CartList from '../../Screens/CartList';
import NewProduct from '../../Screens/Dashboard/NewProduct';
import Broucher from '../../Screens/Dashboard/Broucher';
import Earning from '../../Screens/Dashboard/Earning';
import PdfView from '../../Screens/PdfView';
import BroucherLanguage from '../../Screens/Dashboard/Broucher/BroucherLanguage';
import FAQ from '../../Screens/FAQ';
import RewardScreen from '../../Screens/RewardScreen';
import AppOpenAdExample from '../../Screens/AppOpenAdExample';
import { AppOpenAdProvider, TestIds } from '@react-native-admob/admob';
import Transaction from '../../Screens/Dashboard/CoinSection/Transaction';
const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffess: 3000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeconfig = {
  animation: 'timing',
  config: {
    durection: 1000,
    easing: Easing.linear,
  },
};
const coustomtrans = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  CardStyleInterpolators: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['180deg', '0deg'],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              })
              : 1,
          },
        ],
      },
    };
  },
};
// const appopenExamol = () => {

// }
export default function RootNavigation() {
  const [splashDismissed, setSplashDismissed] = React.useState(false);
  return (
    // <AppOpenAdProvider
    //   unitId={TestIds.APP_OPEN}
    //   options={{ showOnColdStart: true, loadOnDismissed: splashDismissed }}
    // >
    <NavigationContainer>
      {splashDismissed ? (
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            // ...coustomtrans
            headerShown: false,
            gestureEnabled: true,
            // transitionSpec:{
            //   open:config,
            //   close:closeconfig
            // },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DrawerContainer" component={DrawerContainer} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="DpList" component={DpList} />
          <Stack.Screen name="DpDetails" component={DpDetails} />
          <Stack.Screen name="AddressList" component={AddressList} />
          <Stack.Screen name="AddEditAddress" component={AddEditAddress} />
          <Stack.Screen name="MyOrders" component={MyOrders} />
          {/* <Stack.Screen name="Cart" component={Cart} /> */}
          <Stack.Screen name="WebViewComponent" component={WebViewComponent} />
          <Stack.Screen name="Dp" component={Dp} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="VideoDetails" component={VideoDetails} />
          <Stack.Screen name="GenerateBill" component={GenerateBill} />
          <Stack.Screen name="CartList" component={CartList} />
          <Stack.Screen name="NewProduct" component={NewProduct} />
          <Stack.Screen name="Broucher" component={Broucher} />
          <Stack.Screen name="Earning" component={Earning} />
          <Stack.Screen name="PdfView" component={PdfView} />
          <Stack.Screen name="BroucherLanguage" component={BroucherLanguage} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="RewardScreen" component={RewardScreen} />
          <Stack.Screen name="Transaction" component={Transaction} />

        </Stack.Navigator>
      ) : (
        <AppOpenAdExample
          onSplashDismissed={() => setSplashDismissed(true)}
        />
      )}
    </NavigationContainer>
    // </AppOpenAdProvider>
  );
};
