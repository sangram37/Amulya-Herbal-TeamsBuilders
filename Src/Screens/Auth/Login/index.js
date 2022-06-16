import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';

import BackHeader from '../../../Components/Header/BackHeader';
import GlobalStyles from '../../../Components/GlobalStyle';
import Colors from '../../../Constants/Colors';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginAuth, getotpdata } from '../../../Redux/Actions/UserLoginAction';
import ToastMessage from '../../../Components/ToastMessage';
import SmsRetriever from 'react-native-sms-retriever';
//redux
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import { CallApi } from '../../../CallApi';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      phone: '',
      password: '123456',
    };
  }
  onChangeHandle = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  _onPhoneNumberPressed = async () => {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      this.setState({ phone: phoneNumber.split('+91')[1] });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  onLogin = () => {
    this.setState({ loader: true });
    let form = JSON.stringify({
      mob: `+91${this.state.phone}`,
    });
    // return CallApi('POST', `getOtp/`, form).then(res => {
    //   // this.setState({qytloader: false, setindex: null});
    //   console.log('res update cart', res);
    //   this.setState({ loader: false });
    //   try {
    //     if (res.status === 'ok') {
    //       this.props.navigation.navigate('Otp', {
    //         mob: `+91${this.state.phone}`,
    //       });
    //       ToastMessage({
    //         text: res.message,
    //         type: 'type_info',
    //       });
    //     } else {
    //       ToastMessage({
    //         text: res.message,
    //         type: 'type_info',
    //       });
    //     }
    //   } catch (error) {
    //     ToastMessage({
    //       test: error,
    //       type: 'type_info',
    //     });
    //   }
    // });
    this.props.getotpdata(form, (success, error, data) => {
      this.setState({ loader: false });
      if (error) {
        this.setState({ loader: false });
      } else {
        if (data.status === 'ok') {
          this.props.navigation.replace('DrawerContainer');
          ToastMessage({
            text: data.message,
            type: 'type_info',
          });
        } else {
          this.setState({ loader: false });

          ToastMessage({
            text: data.message,
            type: 'type_info',
          });
        }
      }
    });
  };
  updateTotalItem() {
    let data = this.props.cartList;
    let val = this.props.cartList.length;
    // let val = 0;
    // data.map(item => {
    //   val = val + item.productQty;
    // });
    this.props.updateCartNumber(val);
    return val;
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        this._onPhoneNumberPressed();
      }, 1000);
    }
  }
  async componentWillUnmount() {
    await SmsRetriever.removeSmsListener();
  }
  render() {
    const { phone, loader, password } = this.state;
    return (
      <View style={GlobalStyles.container}>
        {/* <BackHeader
          navigation={this.props.navigation}
          cartnumber={this.props.cartNumber}
        /> */}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}> Sign In</Text>
          <Image style={styles.icon} source={source} />
          <Text style={styles.subTitle}>Please enter your phone number</Text>
        </View>
        <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
          <View style={GlobalStyles.textinput}>
            <InputComponent
              placeholder={'Enter your phone number'}
              value={phone}
              name={'phone'}
              autoCapitalize={'none'}
              keyboardType={'numeric'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View>
          <View style={{ ...GlobalStyles.bottonComponentView, marginTop: 20 }}>
            <ButtonComponent
              btnText={'SIGN IN'}
              // txtFontWeight={'bold'}
              btnAction={() => this.onLogin()}
              btnLoader={loader}
              alignSelf={'center'}
              btnBorderRadius={0}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: 'flex-end',
              marginRight: 20,
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <Text>Don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
              style={{}}>
              <Text style={{ color: Colors.primary }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

// redux
const mapStateToProps = state => {
  return {
    loginUserData: state.UserLoginReducer,
    cartList: state.CartReducer.cartList,
    cartNumber: state.CartReducer.cartNumber,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginAuth,
      getotpdata
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
