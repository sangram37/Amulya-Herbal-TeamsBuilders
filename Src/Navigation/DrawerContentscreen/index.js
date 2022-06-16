import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
  Image,
  Platform,
} from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import GlobalStyles from '../../Components/GlobalStyle';
import Colors from '../../Constants/Colors';

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//icon
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logOut } from '../../Redux/Actions/UserLoginAction';
import ToastMessage from '../../Components/ToastMessage';
import { color } from 'react-native-reanimated';
import Fonts from '../../Constants/Fonts';

//redux
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  GAMBannerAd,
  InterstitialAd,
} from '@react-native-admob/admob';
import { DOMAIN_NAME } from '../../Constants/ApiConstants';
function SideBarScreen(props) {
  onLogooutCall = () => {
    props.navigation.toggleDrawer();

    Alert.alert(
      'Logout',
      'Are you sure to Logout',
      [
        { text: 'Yes,Logout', onPress: () => userLogout() },
        {
          text: 'Cancel',
          onPress: () =>
            ToastMessage({
              type: 'type_info',
              text: 'Logout cancel',
              // props:Colors.warning
            }),
        },
      ],
      { cancelable: false },
    );
  };
  userLogout = () => {
    props.logOut((success, error) => {
      if (error) {
        // alert(error, 'Error Login ');
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on it',
          // props:Colors.warning
        });
      } else {
        props.navigation.navigate('Login');
      }
    });
  };
  screennavigation = pageName => {
    props.navigation.toggleDrawer();
    props.navigation.navigate(pageName);
  };
  const webViewnavigation = (naviName, url, name) => {
    props.navigation.toggleDrawer();
    props.navigation.navigate(naviName, { url: url, name: name });
  };
  screennavigationlogindata = pageName => {
    props.navigation.toggleDrawer();
    //   if (props.loginUserStatus === 1) {
    //     props.navigation.navigate(pageName);
    //   } else {
    //     ToastMessage({
    //       type: 'type_info',
    //       text: 'Please Login Your Account',
    //       // props:Colors.warning
    //     });
    //   }
    // };
    ToastMessage({
      type: 'type_info',
      text: 'Please Login Your Account',
      // props:Colors.warning
    });
  };
  console.log(props.loginUserStatus, 'bapii');
  return (
    // <ImageBackground
    //   source={require('../../Assets/Images/Background.jpg')}
    //   style={{width: '100%', height: '100%'}}>
    <View style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props} style={{ top: -10 }}>
          {/* <Text style={{color: 'black'}}>hiii</Text> */}
          {/* <ImageBackground
            // source={require('../../Assets/Images/profile.png')}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-YldHw4r7HoQYbJ7SRH-R9l9Nj1trt2aBCg&usqp=CAU',
            }}
            style={{
              backgroundColor: '#fff',
              height: 200,
              alignItems: 'flex-end',
              flexDirection: 'row',
            }}>
            <DrawerItem
              icon={({color, size}) => (
                <MaterialCommunityIcons
                  name="blank"
                  color={Colors.light_dark}
                  size={20}
                />
              )}
              label="Welcome"
              labelStyle={{color: Colors.white}}
              style={{
                justifyContent: 'flex-end',
                backgroundColor: Colors.light_dark,
                opacity: 0.7,
                width: '100%',
                marginLeft: 0,
                marginBottom: 0,
                marginTop: 0,
              }}
            />
          </ImageBackground> */}
          {/* <BannerAd
            size={BannerAdSize.MEDIUM_RECTANGLE}
            unitId={TestIds.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            style={{alignSelf: 'center'}}
            onAdFailedToLoad={error => console.log(error)}
            // ref={this.banref}
          /> */}
          <TouchableOpacity
            style={{
              // marginBottom: Platform.OS === 'ios' ? 30 : 10,
              flexDirection: 'row',
              // marginHorizontal: 10,
              // borderRadius: 10,

              padding: 10,
              paddingTop: 15,
              paddingBottom: 15,
              backgroundColor: Colors.primary,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.toggleDrawer()}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              <Entypo name="home" color={Colors.white} size={17} />
              <Text style={{ marginLeft: 30, fontSize: 14, color: Colors.white }}>
                HOME
              </Text>
            </View>

            <Image
              source={require('../../Assets/Images/logo1.png')}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* <DrawerItem
            icon={({color, size}) => (
              <Entypo name="home" color={Colors.light_dark} size={17} />
            )}
            label="HOME"
            labelStyle={{color: 'black'}}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          /> */}
          <View style={GlobalStyles.divider} />

          {/* <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="hanger"
                color={Colors.light_dark}
                size={20}
              />
            )}
            label="SHOP"
            labelStyle={{color: 'black', }}
            onPress={() => {
              screennavigationlogindata('Category');
            }}
          /> */}

          {/* <View style={GlobalStyles.divider} />

          <DrawerItem
            icon={({color, size}) => (
              <Feather name="heart" color={Colors.light_dark} size={20} />
            )}
            label="WISHLIST"
            labelStyle={{color: 'black', }}
            onPress={() => {
              screennavigationlogindata('Wishlist');
            }}
          />
          <View style={GlobalStyles.divider} /> */}

          {/* <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                color={Colors.light_dark}
                size={25}
              />
            )}
            label="ORDER"
            labelStyle={{color: 'black', }}
            onPress={() => {
              screennavigation('MyOrders');
            }}
          />
          <View style={GlobalStyles.divider} /> */}

          <DrawerItem
            icon={({ color, size }) => (
              <Feather name="user" color={Colors.light_dark} size={20} />
            )}
            label="PROFILE"
            labelStyle={{ color: 'black' }}
            onPress={() => {
              screennavigation('Profile');
            }}
          />
          <View style={GlobalStyles.divider} />

          <DrawerItem
            icon={({ color, size }) => (
              <Entypo name="location" color={Colors.light_dark} size={20} />
            )}
            label="ADDRESS"
            labelStyle={{ color: 'black' }}
            onPress={() => {
              screennavigation('AddressList');
            }}
          />
          <View style={GlobalStyles.divider} />
          {/* <DrawerItem
            icon={({ color, size }) => (
              <Entypo name="location" color={Colors.light_dark} size={20} />
            )}
            label="ADDRESS"
            labelStyle={{ color: 'black' }}
            onPress={() => {
              screennavigation('RewardScreen');
            }}
          />
          <View style={GlobalStyles.divider} /> */}
          <DrawerItem
            icon={({ color, size }) => (
              <Entypo
                name="info-with-circle"
                color={Colors.light_dark}
                size={20}
              />
            )}
            label="ABOUT US"
            labelStyle={{ color: 'black' }}
            onPress={() => {
              webViewnavigation(
                'WebViewComponent',
                `${DOMAIN_NAME}about-us`,
                'ABOUT US',
              );
            }}
          />
          <View style={GlobalStyles.divider} />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="text-box-check"
                color={Colors.light_dark}
                size={20}
              />
            )}
            label="TERMS & CONDITIONS"
            labelStyle={{ color: 'black' }}
            onPress={() =>
              webViewnavigation(
                'WebViewComponent',
                `${DOMAIN_NAME}terms-and-conditions`,
                'TERMS & CONDITIONS',
              )
            }
          />
          <View style={GlobalStyles.divider} />
          <DrawerItem
            icon={({ color, size }) => (
              // <Entypo name="info" color={Colors.light_dark} size={20} />
              <MaterialIcons
                name="privacy-tip"
                color={Colors.light_dark}
                size={20}
              />
            )}
            label="PRIVACY POLICY"
            labelStyle={{ color: 'black' }}
            onPress={() => {
              webViewnavigation(
                'WebViewComponent',
                `${DOMAIN_NAME}privacy-policy`,
                'PRIVACY POLICY',
              );
            }}
          />
          <View style={GlobalStyles.divider} />
          <DrawerItem
            icon={({ color, size }) => (
              // <Entypo name="info" color={Colors.light_dark} size={20} />
              <MaterialIcons
                name="privacy-tip"
                color={Colors.light_dark}
                size={20}
              />
            )}
            label="FAQ"
            labelStyle={{ color: 'black' }}
            onPress={() => {
              screennavigation('FAQ');
            }}
          />
          <View style={GlobalStyles.divider} />
        </DrawerContentScrollView>
      </View>
      <View style={GlobalStyles.divider} />
      {props.loginUserStatus === 'ok' ? (
        <TouchableOpacity
          style={{
            marginBottom: Platform.OS === 'ios' ? 30 : 10,
            flexDirection: 'row',
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => onLogooutCall()}>
          <Entypo name="log-out" color={Colors.light_dark} size={20} />
          <Text style={{ marginLeft: 30, fontSize: 17 }}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            marginBottom: Platform.OS === 'ios' ? 30 : 10,
            flexDirection: 'row',
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => screennavigation('Login')}>
          <Entypo name="login" color={Colors.light_dark} size={20} />
          <Text style={{ marginLeft: 30, fontSize: 17 }}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
const mapStateToProps = state => {
  return {
    loginUserStatus: state.UserLoginReducer.loginUserStatus,
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOut,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SideBarScreen);
