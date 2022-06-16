/*
Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments
*/
import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';

// import {ActivityIndicator} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ToastMessage from '../../../Components/ToastMessage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAuth } from '../../../Redux/Actions/UserLoginAction';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import Colors from '../../../Constants/Colors';

import GlobalStyles from '../../../Components/GlobalStyle';
import ButtonComponent from '../../../Components/ButtonComponent';
import RNOtpVerify from 'react-native-otp-verify';
import { CallApi } from '../../../CallApi';
const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

let url = 'http://77.68.124.139/odisha-tourism/admin/public/generate_otp.php';

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OTP = prop => {
  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getHash().then(console.log).catch(console.log);
      RNOtpVerify.getOtp()
        .then(p => RNOtpVerify.addListener(otpHandler))
        .catch(p => console.log(p));
      // let myInterval = setInterval(() => {
      //   if (seconds > 0) {
      //     setSeconds(seconds - 1);
      //   }
      //   if (seconds === 0) {
      //     // setSeconds(30);
      //     // setButtonLoader(true)
      //   }
      // }, 1000);
      return () => RNOtpVerify.removeListener();
    }
  });
  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const otpVerification = otp => {
    // prop.navigation.replace('DrawerContainer');
    setLoader(true);
    let form = JSON.stringify({
      mob: prop.route.params.mob,
      otp: otp ? otp : value,
    });
    // return CallApi('POST', `verifyOtp/`, form).then(res => {
    //   // this.setState({qytloader: false, setindex: null});
    //   console.log('res update cart', res);
    //   setLoader(false);
    //   try {
    //     prop.navigation.replace('DrawerContainer');
    //       AsyncStorage.setItem('user_id', JSON.stringify(res.userdata.user_id));
    //   } catch (error) {
    //     ToastMessage({
    //       test: error,
    //       type: 'type_info',
    //     });
    //   }
    // });
    prop.loginAuth(form, (success, error, data) => {
      setLoader(false);
      if (error) {
      } else {
        if (data.status === 'ok') {
          prop.navigation.replace('DrawerContainer');
          // ToastMessage({
          //   test: data.message,
          //   type: 'type_info',
          // });
        } else {
          alert(data.message);
        }
      }
    });
  };
  // useEffect(()=>{
  //   console.log(prop.route.params.inputData,"hi----------")
  // },[])
  const otpHandler = (message: string) => {
    console.log(message, 'bapi');
    if (message === null || message === 'Timeout Error.') {
    } else {
      const otp = /(\d{4})/g.exec(message)[1];
      setValue(otp);

      otpVerification(otp);

      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.root}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Verification</Text>
            <Image style={styles.icon} source={source} />
            <Text style={styles.subTitle}>
              Please enter the verification code{'\n'}
              we send to your phone number
            </Text>
          </View>

          <View style={styles.WrapperBottom}>
            <View style={{ marginBottom: 25 }}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={value => {
                  setValue(value);
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
            </View>

            {/* {seconds == 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setSeconds(30);
                }}>
                <Text>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              <Text> {seconds} </Text>
            )} */}

            <View style={{ ...GlobalStyles.bottonComponentView, marginTop: 20 }}>
              <ButtonComponent
                btnText={'SUBMIT'}
                // txtFontWeight={'bold'}
                btnAction={() => otpVerification()}
                btnLoader={loader}
                alignSelf={'center'}
                btnBorderRadius={0}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginAuth,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
