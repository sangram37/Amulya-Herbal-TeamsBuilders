import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';

import BackHeader from '../../../../Components/Header/BackHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../Constants/Colors';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from '../../../../Components/GlobalStyle';
import { CallApi } from '../../../../CallApi';
import ToastMessage from '../../../../Components/ToastMessage';
import Loader from '../../../../Components/Loader';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NoInternetModal } from '../../../../Components/NoInternetModal';

import NetInfo from '@react-native-community/netinfo';
//redux

export class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
      Offline: false,
    };
  }
  componentDidMount() {
    // Toast.show("Hello World",);
    this.getAddress();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getAddress();
      },
    );
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      console.log(Offline, 'hiiii');
      this.setState({ Offline: Offline });
    });
    // this.setState({interstitialAd: this.createAd()});
  }

  componentWillUnmount() {
    this.willFocusSubscription;
    this.removeNetInfoSubscription;
  }
  getAddress = () => {
    this.setState({ loader: true });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi(
      'GET',
      `shipping/address/?user=${this.props.userid}`,
      '',
    ).then(res => {
      this.setState({ loader: false });
      console.log('res alldata', res);

      try {
        this.setState({ address: res });
      } catch (error) {
        ToastMessage({
          text: error,
          type: 'type_info',
        });
      }
    });
  };

  render() {
    return (
      <View style={GlobalStyles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title="Address"
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
        <View style={{ backgroundColor: '#f0f0f0', flex: 1 }}>
          {this.state.loader ? (
            <Loader />
          ) : (
            <FlatList
              data={this.state.address}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      paddingVertical: 3,
                      marginVertical: 5,
                      backgroundColor: '#fff',
                      borderColor: 0.17,
                      borderColor: Colors.light_gray,
                      marginHorizontal: 5,
                      borderRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                    }}>
                    <View style={{ paddingHorizontal: 7 }}>
                      {/* <Text style={{marginTop: 5}}>
                        {item.f_name} {item.l_name}Sangram
                      </Text> */}
                      <Text style={{ marginTop: 7, color: Colors.light_dark }}>
                        {item.address}, {item.city}, {item.state}
                      </Text>
                      {item.pincode ? (
                        <Text
                          style={{
                            marginTop: 7,

                            color: Colors.light_dark,
                          }}>
                          Pincode:{item.pincode}
                        </Text>
                      ) : null}
                      <Text
                        style={{
                          marginTop: 7,
                          marginBottom: 7,
                          color: Colors.light_dark,
                        }}>
                        Mobile:{item.mobileNumber}
                      </Text>
                      {item.email ? (
                        <Text
                          style={{
                            marginTop: 3,
                            marginBottom: 7,
                            color: Colors.light_dark,
                          }}>
                          Email:{item.email}
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        borderTopWidth: 1,
                        borderTopColor: '#f0f0f0',
                        padding: 7,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',

                          borderRightWidth: 1,

                          borderRightColor: '#f0f0f0',
                        }}>
                        <Pressable
                          onPress={() =>
                            this.props.navigation.navigate('AddEditAddress', {
                              item,
                            })
                          }>
                          <Text style={{ color: 'blue' }}>Edit</Text>
                        </Pressable>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Pressable>
                          <Text style={{ color: 'blue' }}>Remove</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
        <Pressable
          style={{ bottom: 30, right: 20, position: 'absolute' }}
          onPress={() => this.props.navigation.navigate('AddEditAddress')}>
          <Ionicons name="add-circle-sharp" size={50} color={Colors.primary} />
        </Pressable>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
