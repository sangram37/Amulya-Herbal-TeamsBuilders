import React, { useEffect } from 'react';
import { ImageBackground, Image, StatusBar, View, Text } from 'react-native';
import Colors from './Constants/Colors';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
const SplashScreen = props => {
  useEffect(async () => {
    const value = await AsyncStorage.getItem('token');
    console.log(value, 'sks', props.loginUserStatus);
    var token = AsyncStorage.getItem('fcmToken');
    console.log('fcm token', token)
    setTimeout(() => {
      if (value) {
        props.navigation.replace('DrawerContainer');
      } else {
        props.navigation.replace('Login');
      }
    }, 4000);
  }, []);

  useEffect(() => {
    checkPermission()
    createPushNotificationListner()
    return (
      createPushNotificationListner()

    )
  }, [])
  useEffect(() => {
    getMinimizeNotification()
    return (
      getMinimizeNotification()
    )
  }, [])
  const checkPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken(); //<---- Add this
    }
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcm', fcmToken);

      AsyncStorage.setItem('fcmToken', fcmToken);
    }
  };
  const createPushNotificationListner = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('createPushNotificationListner', remoteMessage);
      // Alert.alert(
      //   remoteMessage.notification.title,
      //   remoteMessage.notification.body,
      // );
      // Alert.alert(
      //   "Notification Recieved",
      //   remoteMessage.notification.body,
      //   [
      //     {
      //       text: "Cancel",
      //       style: "cancel"
      //     },
      //     {
      //       text: "Go to the page", onPress: () => {
      //         switch (remoteMessage.notification.android.clickAction) {
      //           // Customer 
      //           case 'VENDOR_BID_PLACED': this.props.navigation.navigate('Bid_req')
      //           case 'VENDOR_WORK_STARTED': this.props.navigation.navigate('Bid_req')
      //           case 'VENDOR_WORK_DELIVERD': this.props.navigation.navigate('Bid_req')
      //           // Vendor
      //           case 'CUSTOMER_ACCEPTED_BID': this.props.navigation.navigate('My_orders')
      //           case 'CUSTOMER_ACCEPTED_WORK': this.props.navigation.navigate('My_orders')
      //           case 'CUSTOMER_REJECTED_WORK': this.props.navigation.navigate('My_orders')
      //           case 'MESSAGE_INBOX': {
      //             // console.log(remoteMessage.data.sender_id)
      //             this.goToWebView(
      //               `https://pricemise.com/app/inbox/${this.state.uniqid}/${remoteMessage.data.sender_id}`,
      //               'Chat',
      //             )
      //           }
      //           default: console.log('no notification')
      //         }
      //       }
      //     }
      //   ]
      // );

    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp mess', remoteMessage);
      // switch (remoteMessage.notification.android.clickAction) {
      //   // Customer 
      //   case 'VENDOR_BID_PLACED': this.props.navigation.navigate('Bid_req')
      //   case 'VENDOR_WORK_STARTED': this.props.navigation.navigate('Bid_req')
      //   case 'VENDOR_WORK_DELIVERD': this.props.navigation.navigate('Bid_req')

      //   // Vendor
      //   case 'CUSTOMER_ACCEPTED_BID': this.props.navigation.navigate('My_orders')
      //   case 'CUSTOMER_ACCEPTED_WORK': console.log('Customer work accepted case')
      //   case 'CUSTOMER_REJECTED_WORK': console.log('vendor work Resjected case')

      //   default: console.log('no notification')
      // }

    });

    // // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });
  };

  const getMinimizeNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar translucent backgroundColor="transparent" />

      <View
        style={{
          width: '100%',
          height: '95%',
          backgroundColor: Colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image
          source={require('../Src/Assets/Images/logo1.png')}
          style={{ width: '100%', height: '55%' }}
          resizeMode="cover"
        />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 18,
          fontWeight: '700',
          letterSpacing: 0.5,
        }}>
        @Amulya Herbal
      </Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loginUserStatus: state.UserLoginReducer.loginUserStatus,
  };
};
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
