import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CallApi } from '../../../../CallApi';
import ButtonComponent from '../../../../Components/ButtonComponent';
import GlobalStyles from '../../../../Components/GlobalStyle';
import BackHeader from '../../../../Components/Header/BackHeader';
import InputComponent from '../../../../Components/InputComponent';
import { styles } from './stylesheet';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NoInternetModal } from '../../../../Components/NoInternetModal';
import NetInfo from '@react-native-community/netinfo';
//redux
class AddEditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Last_name: '',
      Company_name: '',
      Country: '',
      Address: '',
      City: '',
      State: '',
      Postcode: '',
      Phone: '',
      email: '',
      loader: false,
      Offline: false,
    };
  }
  onChangeHandle = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  componentDidMount() {
    if (this.props.route.params) {
      this.editaddress();
    }
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      console.log(Offline, 'hiiii');
      this.setState({ Offline: Offline });
    });
    // this.setState({interstitialAd: this.createAd()});
  }

  componentWillUnmount() {
    this.removeNetInfoSubscription;
  }
  editaddress = () => {
    const item = this.props.route.params.item;
    this.setState({
      // Name: item.f_name,
      // Last_name: item.l_name,
      // Company_name: item.company,
      Country: item.country_id,
      Address: item.address,
      City: item.city,
      State: item.state,
      Postcode: item.pincode,
      Phone: item.mobileNumber,
      // email: item.email,
    });
  };
  cleardata = () => {
    this.setState(
      {
        Name: '',
        Last_name: '',
        Company_name: '',
        Country: '',
        Address: '',
        City: '',
        State: '',
        Postcode: '',
        Phone: '',
        email: '',
        loader: false,
      },
      () => this.props.navigation.goBack(),
    );
  };
  addaddress = () => {
    this.setState({ loader: true });
    let formdata = new FormData();
    let form = JSON.stringify({
      address: this.state.Address,
      city: this.state.City,
      state: this.state.State,
      pincode: this.state.Postcode,
      mobileNumber: this.state.Phone,
      user: this.props.userid,
    });

    return CallApi('POST', 'shipping/address/', form).then(res => {
      this.setState({ loader: false });
      console.log('res address', res);
      try {
        this.cleardata();
      } catch (error) {
        ToastMessage({
          text: error,
          type: 'type_info',
        });
      }
    });
  };
  submitEdit = () => {
    this.setState({ loader: true });
    let formdata = new FormData();

    // this.props.EditAddress(formdata, (success, error, data) => {
    //   this.setState({loader: false});
    //   if (error) {
    //   } else {
    //     if (data.status === 1) {
    //       this.cleardata();
    //     } else {
    //       alert('please wait devloper are working this error');
    //     }
    //   }
    // });
    let form = JSON.stringify({
      address: this.state.Address,
      city: this.state.City,
      state: this.state.State,
      pincode: this.state.Postcode,
      mobileNumber: this.state.Phone,
      user: 1,
    });

    return CallApi('PUT', 'shipping/address/', form).then(res => {
      this.setState({ loader: false });
      console.log('res address', res);
      try {
        this.cleardata();
      } catch (error) {
        ToastMessage({
          text: error,
          type: 'type_info',
        });
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
  render() {
    const {
      email,
      Name,
      Last_name,
      Company_name,
      Country,
      Address,
      Postcode,
      loader,
      Phone,
      State,
      City,
    } = this.state;
    return (
      <View style={GlobalStyles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title={this.props.route.params ? 'Edit Address' : ' Add Address'}
          cartnumber={this.props.cartNumber}
          coin={this.props.coin}
        />
        {this.state.Offline ? (
          <NoInternetModal
            show={this.state.Offline}
            onRetry={this.getApisection}
            isRetrying={this.state.loader}
          />
        ) : null}
        <ScrollView>
          {/* <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Name</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={Name}
              name={'Name'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View> */}
          {/* <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Last Name</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={Last_name}
              name={'Last_name'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View> */}
          {/* <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Company Name</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={Company_name}
              name={'Company_name'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View> */}
          <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Address</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={Address}
              name={'Address'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View>

          <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Town / City</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={City}
              name={'City'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View>
          {/* <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Country</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={Country}
              name={'Country'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View> */}

          <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>State / Country</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={State}
              name={'State'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View>
          <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Postcode</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={Postcode}
              name={'Postcode'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View>
          <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Phone</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={Phone}
              name={'Phone'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View>
          {/* <View style={GlobalStyles.textinput}>
            <Text style={styles.textheaderstyle}>Email</Text>
            <InputComponent
              // placeholder={'Enter your email'}
              value={email}
              name={'email'}
              autoCapitalize={'none'}
              // keyboardType={'email-address'}
              onChangeHandle={this.onChangeHandle}
              marginTop={5}
            />
          </View> */}
          {this.props.route.params ? (
            <View style={{ ...GlobalStyles.bottonComponentView, marginTop: 20 }}>
              <ButtonComponent
                btnText={'SUBMIT'}
                // txtFontWeight={'bold'}
                btnAction={() => this.submitEdit()}
                btnLoader={loader}
                alignSelf={'center'}
                btnBorderRadius={0}
              />
            </View>
          ) : (
            <View style={{ ...GlobalStyles.bottonComponentView, marginTop: 20 }}>
              <ButtonComponent
                btnText={'SUBMIT'}
                // txtFontWeight={'bold'}
                btnAction={() => this.addaddress()}
                btnLoader={loader}
                alignSelf={'center'}
                btnBorderRadius={0}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartNumber: state.CartReducer.cartNumber,
    userid: state.UserLoginReducer.loginUser,
    coin: state.CoinReducer.coinNumber,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddEditAddress);
