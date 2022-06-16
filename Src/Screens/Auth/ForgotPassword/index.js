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
} from 'react-native';

import InputComponent from '../../../Components/InputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';

import BackHeader from '../../../Components/Header/BackHeader';
import GlobalStyles from '../../../Components/GlobalStyle';
import Colors from '../../../Constants/Colors';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { forgotPassword } from '../../../Redux/Actions/ForgotPasswordAction';
import ToastMessage from '../../../Components/ToastMessage';
import Fonts from '../../../Constants/Fonts';
//redux
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      email: '',
    };
  }
  onChangeHandle = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  forgotPassword = () => {
    const { email, password } = this.state;
    if (email == '') {
      alert('please Enter Your Email Address');
      return;
    } else {
      this.setState({ loader: true });

      let formdata = new FormData();
      formdata.append('email', this.state.email);
      formdata.append('request_type', 'forgot_password');

      this.props.forgotPassword(formdata, (success, error, data) => {
        this.setState({ loader: false });
        if (error) {
          // ToastMessage({
          //     type: 'type_info',
          //     text: 'Please wait our devloper Working on it',
          //     // props:Colors.warning
          // })
        } else {
          this.props.navigation.goBack();
          ToastMessage({
            text: 'Please check your mail',
            type: 'type_info',
          });
        }
      });
    }
  };
  updateTotalItem() {
    let data = this.props.cartList;
    // let val = 0;
    // data.map((item) => {
    //     val = val + item.numberOfItem
    // })
    // return val;
    let val = this.props.cartList.length;
    // let val = 0;
    // data.map(item => {
    //   val = val + item.productQty;
    // });
    this.props.updateCartNumber(val);
    return val;
  }
  render() {
    const { email, loader, password } = this.state;
    return (
      <View style={GlobalStyles.container}>
        <BackHeader
          navigation={this.props.navigation}
          cartnumber={this.props.cartNumber}
          coin={this.props.coin}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: '30%' }}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                paddingLeft: 15,
                // fontFamily: Fonts.Akt_bold,
              }}>
              Username or email
            </Text>

            <View style={GlobalStyles.textinput}>
              <InputComponent
                placeholder={'Enter your email'}
                value={email}
                name={'email'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                onChangeHandle={this.onChangeHandle}
                marginTop={5}
              />
            </View>
          </View>

          <View style={{ ...GlobalStyles.bottonComponentView, marginTop: 30 }}>
            <ButtonComponent
              btnText={'SUBMIT'}
              // txtFontWeight={'bold'}
              btnAction={() => this.forgotPassword()}
              btnLoader={loader}
              alignSelf={'center'}
              btnBorderRadius={0}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

// redux
const mapStateToProps = state => {
  return {
    forgotPassword_data: state.ForgotPasswordReducer,
    cartList: state.CartReducer.cartList,
    cartNumber: state.CartReducer.cartNumber,
    coin: state.CoinReducer.coinNumber,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      forgotPassword,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
