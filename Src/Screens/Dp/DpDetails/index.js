import React, { Component } from 'react';
import { Pressable, Text, View, Share } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../Constants/Colors';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from '../../../Components/GlobalStyle';
import { CallApi } from '../../../CallApi';
import ToastMessage from '../../../Components/ToastMessage';
import Loader from '../../../Components/Loader';
import BackHeader from '../../../Components/Header/BackHeader';
import Clipboard from '@react-native-community/clipboard';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//redux

export class DpDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: [],
    };
  }
  componentDidMount() {
    // Toast.show("Hello World",);
    // this.getAddress();
    // this.willFocusSubscription = this.props.navigation.addListener(
    //   'focus',
    //   () => {
    //     this.getAddress();
    //   },
    // );
  }
  // componentWillUnmount() {
  //   this.willFocusSubscription();
  // }
  getAddress = () => {
    this.setState({ loader: true });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', `shipping/address/`, '').then(res => {
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
  copyToClipboard = data => {
    ToastMessage({
      text: 'Copy successful',
      type: 'type_info',
    });
    Clipboard.setString(data);
  };
  onShare = async item => {
    try {
      const result = await Share.share({
        title: 'TEAMS BUILDER',
        message: `        
             ${item.dpName},
        ${item.dpAddress},
        ${item.cityName}, ${item.state},
        Pincode : ${item.pincode},
        DPID : ${item.dpID}
        Mobile : ${item.mob},
        Email : ${item.emailAddress}

          `,
      });
      // console.log(Share.sharedAction);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    const item = this.props.route.params.item;
    return (
      <View style={GlobalStyles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title="Address"
          cartnumber={this.props.cartNumber}
          coin={this.props.coin}
        />

        <View style={{ backgroundColor: '#f0f0f0', flex: 1 }}>
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
              <Text style={{ marginTop: 5 }}>{item.dpName}</Text>
              <Text style={{ marginTop: 7, color: Colors.light_dark }}>
                {item.dpAddress}, {item.cityName}, {item.state}
              </Text>
              {item.dpID ? (
                <Text
                  style={{
                    marginTop: 7,

                    color: Colors.light_dark,
                  }}>
                  DPID : {item.dpID}
                </Text>
              ) : null}
              {item.pincode ? (
                <Text
                  style={{
                    marginTop: 7,

                    color: Colors.light_dark,
                  }}>
                  Pincode : {item.pincode}
                </Text>
              ) : null}
              <Text
                style={{
                  marginTop: 7,
                  marginBottom: 7,
                  color: Colors.light_dark,
                }}>
                Mobile : {item.mob},{item.alternative_mob}
              </Text>
              {item.emailAddress ? (
                <Text
                  style={{
                    marginTop: 3,
                    marginBottom: 7,
                    color: Colors.light_dark,
                  }}>
                  Email : {item.emailAddress}
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
                <Pressable onPress={() => this.copyToClipboard(item.mob)}>
                  <Text style={{ color: 'blue' }}>Copy</Text>
                </Pressable>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable onPress={() => this.onShare(item)}>
                  <Text style={{ color: 'blue' }}>Share</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartNumber: state.CartReducer.cartNumber,
    coin: state.CoinReducer.coinNumber,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DpDetails);
