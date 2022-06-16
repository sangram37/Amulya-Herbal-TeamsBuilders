import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { CallApi } from '../../CallApi';
import GlobalStyles from '../../Components/GlobalStyle';
import Loader from '../../Components/Loader';
import MainHeader from '../../Components/MainHeader';
import ToastMessage from '../../Components/ToastMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCartNumber } from '../../Redux/Actions/CartAction';
import { updateCoinNumber } from '../../Redux/Actions/CoinAction'
import BackHeader from '../../Components/Header/BackHeader';
//redux
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Imageurl from '../../Constants/Imageurl';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  GAMBannerAd,
  InterstitialAd,
} from '@react-native-admob/admob';
import CustumDropDown from '../../Components/CustumDropDown';
import EmptyDropDownStyle from '../../Components/EmptyDropDownStyle';
import { NoInternetModal } from '../../Components/NoInternetModal';
const snapPoints = ['0%', '40%'];
import NetInfo from '@react-native-community/netinfo';
class CartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateComp: false,
      qytloader: false,
      cartList_add: [],
      saveList: [],
      loader: false,
      setindex: null,
      address: null,
      dppoint_modal: false,
      dppoint: '',
      dppoint_arr: [],
      addresslist: [],
      addresstype: 0,
      carttype: 'cart',
      blankarray: [],
      dppoint_name: '',
      interstitialAd: this.createAd(),
      adLoaded: false,
      Offline: false,
      banneraddid: '',
    };
    this.bottomSheetRef = React.createRef();
    this.cartdata = [];
  }
  // updateCartLoc(item, x) {
  //   if (x === '+') {
  //     return Number(item) + 1;
  //   } else if (x === '-') {
  //     if (item > 1) {
  //       return Number(item) - 1;
  //     } else {
  //       return Number(item);
  //     }
  //   } else {
  //     return Number(item);
  //   }
  // }
  TotalPrice() {
    let data = this.state.cartList_add;
    let val = 0;
    data.map(item => {
      val = val + Number(item.product.discount) * Number(item.productQty);
    });
    return val; //54
  }
  TotalSavings() {
    let data = this.state.cartList_add;
    let val = 0;
    data.map(item => {
      val =
        val +
        Number(
          Number(item.product.productPrice) - Number(item.product.discount),
        ) *
        Number(item.productQty);
    });
    return val; //54
  }
  mrpTotal() {
    let data = this.state.cartList_add;
    let val = 0;
    data.map(item => {
      val = val + Number(item.product.productPrice) * Number(item.productQty);
    });
    return val; //54
  }
  personalVolume() {
    let data = this.state.cartList_add;
    let val = 0;
    data.map(item => {
      val = val + Number(item.product.personalVolume) * Number(item.productQty);
    });
    return val.toFixed(2); //54
  }
  businessVolume() {
    let data = this.state.cartList_add;
    let val = 0;
    data.map(item => {
      val = val + Number(item.product.businessVolume) * Number(item.productQty);
    });
    return val.toFixed(2); //54
  }
  onRetry = () => {
    this.getDpData();
    this.cartApiData();
    // this.gatesavelaterdata();
    this.getAddress();
  };
  componentDidMount() {
    console.log(this.props.videoId, "sangram")
    this.onRetry();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        // this.cartApiData();
        // this.gatesavelaterdata();
        this.getAddress();
      },
    );
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      this.setState({ Offline: Offline });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.interstitialAd !== prevState.interstitialAd) {
      this.setState({ adLoaded: false });
      prevState.interstitialAd?.destroy();
    }
  }
  createAd() {
    const ad = InterstitialAd.createAd(
      this.props.videoId ? this.props.videoId.unit_id : TestIds.INTERSTITIAL_VIDEO,
      // 'ca-app-pub-6922004427566783/5804888653',
      {
        loadOnDismissed: true,
        requestOptions: {
          requestNonPersonalizedAdsOnly: true,
        },
      },
    );
    ad.addEventListener('adLoaded', () => {
      this.setState({ adLoaded: true });
    });
    ad.addEventListener('adDismissed', () => {
      this.billgenerate();
    });
    return ad;
  }
  //   componentWillUnmount() {
  //     InterstitialAd?.destroy();
  //   }
  getaddapilist = () => {
    return CallApi('GET', 'adsense', '').then(res => {
      // "bill_list": 10, "dp_list": 10, "id": "b29a8185-b5cd-44c8-ae69-512e87c8e078", "product_list": 10
      try {
        let banneraddid = res.find(
          element => element.ad_type === 'video_ads',
        );
        console.log(banneraddid, 'jhggkkk');
        this.setState({
          banneraddid,

        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  componentWillUnmount() {
    this.willFocusSubscription;
    this.removeNetInfoSubscription;
  }
  cartApiData = x => {
    {
      x ? null : this.setState({ loader: true });
    }
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi(
      'GET',
      `cart/?savelater=false&user=${this.props.userid}`,
      '',
    ).then(res => {
      // console.log('res alldata', res);

      try {
        this.setState({
          cartList_add: res,
          blankarray: res,
          qytloader: false,
          setindex: null,
          loader: false,
        });
      } catch (error) {
        this.setState({
          qytloader: false,
          setindex: null,
          loader: false,
        });
        // ToastMessage({
        //   type: 'type_info',
        //   text: 'Please Login Your Account',
        // });
      }
    });
  };
  gatesavelaterdata = x => {
    {
      x ? null : this.setState({ loader: true });
    }
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi(
      'GET',
      `cart/?savelater=true&user=${this.props.userid}`,
      '',
    ).then(res => {
      // console.log('res alldata', res);

      try {
        this.setState({
          saveList: res,
          qytloader: false,
          setindex: null,
          loader: false,
        });
      } catch (error) {
        this.setState({ loader: false, qytloader: false, setindex: null });
        // ToastMessage({
        //   type: 'type_info',
        //   text: 'Please Login Your Account',
        // });
      }
    });
  };
  updateCartLoc = (item, type, index) => {
    let qty =
      type == '+' ? Number(item.productQty) + 1 : Number(item.productQty) - 1;
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    let form = JSON.stringify({
      productQty: qty,
    });
    // console.log(form);
    if (qty === 0) {
      return CallApi('DELETE', `delete/cart/${item.id}/`, form).then(res => {
        // this.setState({qytloader: false, setindex: null});
        // console.log('res update cart', res);
        try {
          if (res.status === 'ok') {
            this.setState({ setindex: null }, () => this.removelocaly(item.id));
          }
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    } else {
      return CallApi('PATCH', `update/cart/${item.id}/`, form).then(res => {
        // this.setState({qytloader: false, setindex: null});
        console.log('res update cart', res);
        try {
          if (res.status === 'ok') {
            this.setState({ setindex: null }, () =>
              this.updatelocaly(res.data, item.id),
            );
          }
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    }
  };
  removelocaly = id => {
    let arr = this.state.cartList_add;

    arr = arr.filter(item => {
      return item.id !== id;
    });

    return this.setState({ cartList_add: arr, qytloader: false });
  };
  updatelocaly = (item, id) => {
    let arr = this.state.cartList_add;
    if (item.savelater) {
    } else {
      arr.find(data => {
        if (data.id == id) {
          data.productQty = item.productQty;
        }
      });
      return this.setState({ cartList_add: arr, qytloader: false });
    }
  };
  checkbill = () => {
    if (this.state.dppoint === '') {
      ToastMessage({
        text: 'Please chose distributionpoint',
        type: 'type_info',
      });
    } else if (
      this.state.address === undefined ||
      this.state.address === null
    ) {
      ToastMessage({
        text: 'Please add address',
        type: 'type_info',
      });
    } else {
      if (this.state.adLoaded) {
        this.state.interstitialAd?.show();
      } else {
        this.billgenerate();
      }
    }
  };
  billgenerate = () => {
    console.log(this.state.address);
    if (this.state.dppoint === '') {
      ToastMessage({
        text: 'Please chose distributionpoint',
        type: 'type_info',
      });
    } else if (
      this.state.address === undefined ||
      this.state.address === null
    ) {
      ToastMessage({
        text: 'Please add address',
        type: 'type_info',
      });
    } else {
      let form = JSON.stringify({
        user: this.props.userid,
        shippingDetails: this.state.address.id,
        distributionpoint: this.state.dppoint,
      });
      console.log(form);
      this.setState({ loader: true, cartList_add: [] });
      return CallApi('POST', 'generate/order/', form).then(res => {
        // this.setState({qytloader: false, setincartList_add: [], dex: null});
        console.log('res bapi oreder', res);

        if (res.status === 'ok') {
          // this.setState({loader:false,})
          Alert.alert(
            'Teams Builder',
            'Bill generated successfully',
            [{ text: 'Ok', onPress: () => console.log('create') }],
            { cancelable: false },
          );
          this.updatecoinNumber(res.user_coin)
          // let x = this.state.cartList_add;
          // x = x.splice(0, x.length);
          this.setState({ loader: false });
        } else {
          this.setState({ loader: false, cartList_add: this.state.blankarray });
          if (res.required_coins) {
            Alert.alert(
              'Required Coins',
              `${res.message}, Required Coins:-${res.required_coins}`,
              [
                { text: 'Go To Coin', onPress: () => this.props.navigation.navigate('Credits') },
                {
                  text: 'OK',
                  onPress: () => { }

                },
              ],
              { cancelable: false },
            );
          } else {
            ToastMessage({
              text: 'Please try after some time',
              type: 'type_info',
            });
          }

        }
      });
    }
  };
  getAddress = () => {
    // this.setState({loader: true});
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi(
      'GET',
      `shipping/address/?user=${this.props.userid}`,
      '',
    ).then(res => {
      //   this.setState({loader: false});
      //   console.log('res alldata', res);

      try {
        this.setState({
          address: res[0],
          addresslist: res,
          addresstype: 0,
        });
      } catch (error) {
        ToastMessage({
          text: error,
          type: 'type_info',
        });
      }
    });
  };
  delete = item => {
    this.setState({ loader: true });
    let form = JSON.stringify({
      productQty: 0,
    });
    return CallApi('DELETE', `delete/cart/${item.id}/`, form).then(res => {
      // this.setState({qytloader: false, setindex: null});
      console.log('res update cart', res);
      try {
        if (res.status === 'ok') {
          this.setState({ setindex: null, loader: false }, () =>
            this.removelocaly(item.id),
          );
        }
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  savefromlater = item => {
    this.setState({ loader: true });
    let form = JSON.stringify({
      productQty: 1,
      savelater: true,
    });
    return CallApi('PATCH', `update/cart/${item.id}/`, form).then(res => {
      // this.setState({qytloader: false, setindex: null});
      // console.log('res update cart', res);
      try {
        this.setState({ setindex: null, loader: false }, () =>
          this.removelocaly(item.id),
        );

        // this.cartApiData('x');
        // this.gatesavelaterdata('x');
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  removefromlater = item => {
    this.setState({ loader: true });
    let form = JSON.stringify({
      productQty: 1,
      savelater: false,
    });
    return CallApi('PATCH', `update/cart/${item.id}/`, form).then(res => {
      // this.setState({qytloader: false, setindex: null});
      // console.log('res update cart', res);
      try {
        this.cartApiData('x');
        this.gatesavelaterdata('x');
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  getDpData = () => {
    // this.setState({loader: true});
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', 'distributionpoint', '').then(res => {
      //   this.setState({loader: false});
      console.log('res dpdat', res);

      try {
        this.setState({ dppoint_arr: res.results });
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  updateTotalItem() {
    let data = this.state.cartList_add;
    // let val = 0;
    let val = this.state.cartList_add.length;
    // data.map(item => {
    //   val = val + item.productQty;
    // });
    this.props.updateCartNumber(val);
    return val;
  }
  updatecoinNumber(coin) {
    this.props.updateCoinNumber(coin)
  }
  handlePresentModalPress = () => {
    this.bottomSheetRef.current.present();
  };
  editaddress = item => {
    this.bottomSheetRef.current.close();
    this.props.navigation.navigate('AddEditAddress', {
      item,
    });
  };
  getItemLayout = (data, index) => ({ length: 108, offset: 108 * index, index });
  render() {
    const VIEWABILITY_CONFIG = {
      minimumViewTime: 300,
      viewAreaCoveragePercentThreshold: 100,
      waitForInteraction: true,
    };

    const { address } = this.state;
    console.log(this.props, 'hlw');
    return (
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          {this.state.Offline ? (
            <NoInternetModal
              show={this.state.Offline}
              onRetry={this.onRetry}
              isRetrying={this.state.loader}
            />
          ) : null}

          <View style={GlobalStyles.container}>
            <BackHeader
              navigation={this.props.navigation}
              cartnumber={this.updateTotalItem()}
              title={'Cart'}
              coin={this.props.coin}
            />

            <View style={GlobalStyles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.light,
                }}>
                <Pressable
                  onPress={() => this.setState({ carttype: 'cart' })}
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    // backgroundColor:
                    //   this.state.carttype === 'cart'
                    //     ? Colors.red
                    //     : Colors.white,
                    padding: 3,
                  }}>
                  <Text
                    style={{
                      padding: 5,
                      color:
                        this.state.carttype === 'cart'
                          ? Colors.primary
                          : Colors.black,
                      fontSize: 16,
                    }}>
                    Cart
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.setState({ carttype: 'saveforlater' }, () =>
                      this.gatesavelaterdata(),
                    )
                  }
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    // backgroundColor:
                    //   this.state.carttype === 'saveforlater'
                    //     ? Colors.red
                    //     : Colors.white,
                    padding: 3,
                    borderLeftWidth: 0.5,
                    borderLeftColor: Colors.light,
                  }}>
                  <Text
                    style={{
                      padding: 5,
                      color:
                        this.state.carttype === 'saveforlater'
                          ? Colors.primary
                          : Colors.black,
                      fontSize: 16,
                    }}>
                    Save For Later
                  </Text>
                </Pressable>
              </View>

              {this.state.loader ? (
                <Loader />
              ) : (
                <View style={{ flex: 1 }}>
                  {this.state.carttype === 'cart' ? (
                    <View style={{ flex: 1 }}>
                      {this.state.cartList_add.length ? (
                        <ScrollView>
                          <FlatList
                            getItemLayout={this.getItemLayout}
                            initialNumToRender={10}
                            // maxToRenderPerBatch={10}
                            windowSize={10}
                            removeClippedSubviews={true}
                            viewabilityConfig={VIEWABILITY_CONFIG}
                            data={this.state.cartList_add}
                            renderItem={({ item, index }) => {
                              return Number(item.productQty) >= 0 ? (
                                <>
                                  <View style={styles.cartListItemWrapper}>
                                    <View
                                      style={styles.cartListItemWrapperInner}>
                                      <View style={styles.cartImageSection}>
                                        <Image
                                          style={styles.productImageStyle}
                                          source={{
                                            uri:
                                              item.product.productImages
                                                .length >= 1
                                                ? item.product.productImages[0]
                                                : Imageurl.noimage,
                                          }}
                                        />
                                      </View>

                                      <View style={styles.itemDescView}>
                                        <View style={styles.titleDescView}>
                                          <Text
                                            style={styles.titleTextStyle}
                                            numberOfLines={2}>
                                            {item.product.productName}
                                          </Text>
                                        </View>
                                        <View style={styles.titleDescView}>
                                          <Text
                                            style={styles.titleTextStyle}
                                            numberOfLines={2}>
                                            Quantity : {item.product.quantity}
                                          </Text>
                                        </View>
                                        {/* <View style={styles.priceView}>
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                              }}>
                              MRP ₹{' '}
                              {Number(
                                Number(item.product.productPrice) *
                                  item.productQty,
                              )}
                            </Text>
                          </View> */}
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                          }}>
                                          <View style={styles.priceView}>
                                            <Text style={styles.price}>
                                              MRP :{''}
                                            </Text>
                                            <Text style={styles.price}>
                                              ₹
                                              {Number(
                                                Number(
                                                  item.product.productPrice,
                                                ) * item.productQty,
                                              )}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              ...styles.priceView,
                                              marginRight: 5,
                                            }}>
                                            <Text style={styles.price}>
                                              DP :{''}
                                            </Text>
                                            <Text style={styles.price}>
                                              ₹{' '}
                                              {Number(
                                                Number(item.product.discount) *
                                                item.productQty,
                                              )}
                                            </Text>
                                          </View>
                                        </View>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginBottom: 5,
                                          }}>
                                          <View style={styles.priceView}>
                                            <Text style={styles.price}>
                                              BV :{''}
                                            </Text>
                                            <Text style={styles.price}>
                                              {Number(
                                                Number(
                                                  item.product.businessVolume,
                                                ) * item.productQty,
                                              )}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              ...styles.priceView,
                                              marginRight: 5,
                                            }}>
                                            <Text style={styles.price}>
                                              PV :{''}
                                            </Text>
                                            <Text style={styles.price}>
                                              {' '}
                                              {Number(
                                                Number(
                                                  item.product.personalVolume,
                                                ) * item.productQty,
                                              ).toFixed(2)}
                                            </Text>
                                          </View>
                                        </View>

                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',

                                            width: width / 4,
                                          }}>
                                          <Pressable
                                            style={{
                                              width: 30,
                                              height: 30,
                                              backgroundColor: Colors.primary,
                                              borderRadius: 100,
                                              justifyContent: 'center',
                                              alignContent: 'center',
                                              alignItems: 'center',
                                              marginRight: 7,
                                            }}
                                            disabled={
                                              this.state.setindex ? true : false
                                            }
                                            onPress={() =>
                                              this.setState(
                                                {
                                                  // qytloader: true,
                                                  setindex: index,
                                                },
                                                () =>
                                                  this.updateCartLoc(
                                                    item,
                                                    '-',
                                                    index,
                                                  ),
                                              )
                                            }>
                                            <Feather
                                              style={{
                                                fontSize: 27,
                                                color: 'white',
                                              }}
                                              name="minus-circle"
                                            />
                                          </Pressable>
                                          {this.state.setindex === index ? (
                                            <ActivityIndicator
                                              size="small"
                                              color="#0000ff"
                                            />
                                          ) : (
                                            <Text
                                              style={{
                                                fontSize: 16,
                                                color: '#fb6802',
                                                alignItems: 'center',
                                                fontWeight: 'bold',
                                                padding: 5,
                                              }}>
                                              {item.productQty}
                                            </Text>
                                          )}
                                          <Pressable
                                            style={{
                                              backgroundColor: Colors.primary,
                                              borderRadius: 100,
                                              justifyContent: 'center',
                                              alignContent: 'center',
                                              alignItems: 'center',
                                              width: 30,
                                              height: 30,
                                            }}
                                            disabled={
                                              this.state.setindex ? true : false
                                            }
                                            onPress={() =>
                                              this.setState(
                                                {
                                                  // qytloader: true,
                                                  setindex: index,
                                                },
                                                () =>
                                                  this.updateCartLoc(
                                                    item,
                                                    '+',
                                                    index,
                                                  ),
                                              )
                                            }>
                                            <Feather
                                              style={{
                                                fontSize: 27,
                                                color: 'white',
                                              }}
                                              name="plus-circle"

                                            // type="Ionicons"
                                            />
                                          </Pressable>
                                        </View>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        borderTopWidth: 1,
                                        borderTopColor: '#f0f0f0',

                                        marginTop: 10,
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
                                            this.savefromlater(item)
                                          }
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            paddingTop: 5,
                                          }}>
                                          <Ionicons
                                            style={{
                                              fontSize: 20,
                                              color: Colors.light_gray,
                                            }}
                                            name="md-download"
                                          />
                                          <Text
                                            style={{
                                              color: Colors.black,
                                              marginLeft: 5,
                                              textAlign: 'center',
                                            }}>
                                            SAVE FOR LATER
                                          </Text>
                                        </Pressable>
                                      </View>
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}>
                                        <Pressable
                                          onPress={() => this.delete(item)}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            paddingTop: 5,
                                          }}>
                                          <MaterialIcons
                                            style={{
                                              fontSize: 20,
                                              color: Colors.light_gray,
                                            }}
                                            name="delete"
                                          />
                                          <Text
                                            style={{
                                              color: Colors.black,
                                              marginLeft: 5,
                                              textAlign: 'center',
                                            }}>
                                            REMOVE
                                          </Text>
                                        </Pressable>
                                      </View>
                                    </View>
                                  </View>
                                </>
                              ) : null;
                            }}
                          />

                          {/* Address  */}

                          {address ? (
                            <View
                              style={{
                                justifyContent: 'space-between',
                                padding: 10,
                                borderTopWidth: 0.5,
                                borderTopColor: '#fff',
                              }}>
                              {/* <Text
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    fontSize: 13,
                    alignSelf: 'flex-end',
                   
                    backgroundColor: Colors.red,
                    color: '#fff',
                    borderRadius: 5,
                    fontWeight: 'bold',
                  }}>
                  Default Address
                  </Text> */}
                              <Text
                                style={{
                                  overflow: 'hidden',
                                  // paddingLeft: 10,
                                  fontSize: 15,
                                }}>
                                {address.address}, {address.city},{' '}
                                {address.state},{address.pincode},
                                {address.mobileNumber}
                              </Text>
                              <Text
                                style={{
                                  paddingHorizontal: 10,
                                  paddingVertical: 2,
                                  fontSize: 13,
                                  alignSelf: 'flex-end',

                                  backgroundColor: Colors.green,
                                  color: '#fff',
                                  borderRadius: 5,
                                  fontWeight: 'bold',
                                }}
                                onPress={() => this.handlePresentModalPress()}>
                                Edit Address
                              </Text>
                            </View>
                          ) : (
                            <Pressable
                              style={{
                                backgroundColor: Colors.green,
                                width: '50%',
                                alignSelf: 'center',
                                padding: 5,
                                borderRadius: 5,
                                justifyContent: 'center',
                                marginTop: 5,
                              }}
                              onPress={() =>
                                this.props.navigation.navigate('AddEditAddress')
                              }>
                              <Text
                                style={{
                                  paddingHorizontal: 10,
                                  paddingVertical: 2,
                                  fontSize: 13,
                                  alignSelf: 'center',
                                  color: '#fff',
                                  borderRadius: 5,
                                  fontWeight: 'bold',
                                }}>
                                add Address
                              </Text>
                            </Pressable>
                          )}
                          <View
                            style={{
                              ...styles.line,
                              borderTopWidth: 1,
                              elevation: 2,
                            }}
                          />
                          {this.state.dppoint_arr.length >= 1 ? (
                            <CustumDropDown
                              placeHolder={'Search For State ...'}
                              searchData={this.state.dppoint_arr}
                              onopenModal={true}
                              fontFamilyMargin={3}
                              placeHolderValue={this.state.dppoint_name}
                              searchTitle={'Distributionpoint'}
                              showValue={'Plaese chose distributionpoint'}
                              name={'dpName'}
                              // fontFamily={CommonFonts.textInputStyle}
                              selectedItem={value =>
                                this.setState({
                                  dppoint_name: value.dpName,
                                  dppoint: value.id,
                                })
                              }
                            />
                          ) : (
                            <EmptyDropDownStyle
                              text={'Plaese chose distributionpoint'}
                            // message={'Please Select Country First'}
                            />
                          )}
                          {/* Address end */}

                          {/* Payment Details  */}
                          <View
                            style={{
                              width: '98%',
                              alignSelf: 'center',
                              backgroundColor: '#fff',
                              borderRadius: 5,
                              elevation: 5,
                              marginVertical: 10,
                              paddingVertical: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,

                                fontWeight: 'bold',
                                marginLeft: 10,
                              }}>
                              Payment Details
                            </Text>
                            <View
                              style={{ ...styles.total_Sub_view, marginTop: 10 }}>
                              <Text
                                style={{
                                  ...styles.total_head_text,
                                  color: '#888',
                                }}>
                                MRP Total
                              </Text>
                              <Text style={styles.total_amt_text}>
                                ₹ {this.mrpTotal()}
                              </Text>
                            </View>
                            <View style={{ ...styles.line }} />
                            <View style={styles.total_Sub_view}>
                              <Text
                                style={{
                                  ...styles.total_head_text,
                                  color: '#888',
                                }}>
                                Product Discount
                              </Text>
                              <Text style={styles.total_amt_text}>
                                -₹ {this.TotalSavings()}
                              </Text>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.total_Sub_view}>
                              <Text
                                style={{
                                  ...styles.total_head_text,
                                  color: '#888',
                                }}>
                                Personal Volume
                              </Text>
                              <Text style={styles.total_amt_text}>
                                {this.personalVolume()}
                              </Text>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.total_Sub_view}>
                              <Text
                                style={{
                                  ...styles.total_head_text,
                                  color: '#888',
                                }}>
                                Business Volume
                              </Text>
                              <Text style={styles.total_amt_text}>
                                {this.businessVolume()}
                              </Text>
                            </View>
                            <View style={styles.line} />

                            <View style={{ ...styles.total_Sub_view }}>
                              <Text style={styles.total_head_text}>
                                Total Amount
                              </Text>
                              <Text style={styles.total_amt_text}>
                                ₹ {this.TotalPrice()}
                              </Text>
                            </View>
                          </View>
                        </ScrollView>
                      ) : (
                        <Text
                          style={{
                            textAlign: 'center',
                            flex: 1,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: '50%',
                            fontSize: 20,
                          }}>
                          Please add some item !
                        </Text>
                      )}
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      {this.state.saveList.length >= 1 ? (
                        <FlatList
                          data={this.state.saveList}
                          renderItem={({ item, index }) => {
                            return Number(item.productQty) >= 0 ? (
                              <>
                                <View style={styles.cartListItemWrapper}>
                                  <View style={styles.cartListItemWrapperInner}>
                                    <View style={styles.cartImageSection}>
                                      <Image
                                        style={styles.productImageStyle}
                                        source={{
                                          uri:
                                            item.product.productImages.length >=
                                              1
                                              ? item.product.productImages[0]
                                              : Imageurl.noimage,
                                        }}
                                      />
                                    </View>

                                    <View style={styles.itemDescView}>
                                      <View style={styles.titleDescView}>
                                        <Text
                                          style={styles.titleTextStyle}
                                          numberOfLines={2}>
                                          {item.product.productName}
                                        </Text>
                                      </View>
                                      <View style={styles.titleDescView}>
                                        <Text
                                          style={styles.titleTextStyle}
                                          numberOfLines={2}>
                                          Quantity : {item.product.quantity}
                                        </Text>
                                      </View>
                                      {/* <View style={styles.priceView}>
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                              }}>
                              MRP ₹{' '}
                              {Number(
                                Number(item.product.productPrice) *
                                  item.productQty,
                              )}
                            </Text>
                          </View> */}
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        }}>
                                        <View style={styles.priceView}>
                                          <Text style={styles.price}>
                                            MRP :{''}
                                          </Text>
                                          <Text style={styles.price}>
                                            ₹
                                            {Number(
                                              Number(
                                                item.product.productPrice,
                                              ) * item.productQty,
                                            )}
                                          </Text>
                                        </View>
                                        <View
                                          style={{
                                            ...styles.priceView,
                                            marginRight: 5,
                                          }}>
                                          <Text style={styles.price}>
                                            DP :{''}
                                          </Text>
                                          <Text style={styles.price}>
                                            ₹{' '}
                                            {Number(
                                              Number(item.product.discount) *
                                              item.productQty,
                                            )}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          marginBottom: 5,
                                        }}>
                                        <View style={styles.priceView}>
                                          <Text style={styles.price}>
                                            BV :{''}
                                          </Text>
                                          <Text style={styles.price}>
                                            {Number(
                                              Number(
                                                item.product.businessVolume,
                                              ) * item.productQty,
                                            )}
                                          </Text>
                                        </View>
                                        <View
                                          style={{
                                            ...styles.priceView,
                                            marginRight: 5,
                                          }}>
                                          <Text style={styles.price}>
                                            PV :{''}
                                          </Text>
                                          <Text style={styles.price}>
                                            {' '}
                                            {Number(
                                              Number(
                                                item.product.personalVolume,
                                              ) * item.productQty,
                                            )}
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.priceView}>
                                        <Text style={styles.price}>
                                          No of item :{''}
                                        </Text>
                                        <Text style={styles.price}>
                                          {item.productQty}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      borderTopWidth: 1,
                                      borderTopColor: '#f0f0f0',

                                      marginTop: 10,
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
                                          this.removefromlater(item)
                                        }
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          alignSelf: 'center',
                                          paddingTop: 5,
                                        }}>
                                        <Ionicons
                                          style={{
                                            fontSize: 20,
                                            color: Colors.light_gray,
                                          }}
                                          name="md-download"
                                        />
                                        <Text
                                          style={{
                                            color: Colors.black,
                                            marginLeft: 5,
                                            textAlign: 'center',
                                          }}>
                                          ADD TO CART
                                        </Text>
                                      </Pressable>
                                    </View>
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Pressable
                                        onPress={() => this.delete(item)}
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          alignSelf: 'center',
                                          paddingTop: 5,
                                        }}>
                                        <MaterialIcons
                                          style={{
                                            fontSize: 20,
                                            color: Colors.light_gray,
                                          }}
                                          name="delete"
                                        />
                                        <Text
                                          style={{
                                            color: Colors.black,
                                            marginLeft: 5,
                                            textAlign: 'center',
                                          }}>
                                          REMOVE
                                        </Text>
                                      </Pressable>
                                    </View>
                                  </View>
                                </View>
                              </>
                            ) : null;
                          }}
                        />
                      ) : (
                        <Text
                          style={{
                            textAlign: 'center',
                            flex: 1,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: '50%',
                            fontSize: 20,
                          }}>
                          Please add some item !
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              )}
              {/* Payment Details end */}
              {this.state.carttype === 'cart' &&
                this.state.cartList_add.length ? (
                <View style={styles.footer}>
                  <View style={styles.footertextview}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.footerheader}>Total {''}</Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#2A9033',
                          paddingLeft: 15,
                        }}>
                        (Total Saving {this.TotalSavings()})
                      </Text>
                    </View>
                    <Text style={styles.footerheader}>
                      ₹ {this.TotalPrice()}
                    </Text>
                  </View>

                  <View style={styles.bottonComponentView}>
                    <Pressable
                      style={{
                        alignSelf: 'center',
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: '#00BFFF',
                        padding: 5,
                        borderRadius: 5,
                        marginBottom: 10,
                      }}
                      onPress={() => this.checkbill()}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#fff',
                          letterSpacing: 0.5,
                        }}>
                        BILL GENERATE
                      </Text>
                    </Pressable>
                    {/* <ButtonComponent
              btnText={"SUBMIT"}
              // txtFontWeight={'bold'}
              btnAction={() => this.check()}
              btnLoader={this.state.loader}
              alignSelf={"center"}
              btnBorderRadius={0}
            /> */}
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <BottomSheetModal
          ref={this.bottomSheetRef}
          snapPoints={snapPoints}
          index={1}
          backdropComponent={BottomSheetBackdrop}>
          <View
            style={{
              flex: 1,
              paddingTop: 10,
              marginHorizontal: 10,
            }}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="caretdown" size={25} color="#000" />
            
            </View> */}
            <FlatList
              data={this.state.addresslist}
              keyExtractor={({ item, index }) => index + 'k'}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 15,
                    }}
                    onPress={() =>
                      this.setState({ addresstype: index, address: item })
                    }>
                    <Ionicons
                      name={
                        this.state.addresstype === index
                          ? 'radio-button-on'
                          : 'radio-button-off-outline'
                      }
                      size={30}
                      color={Colors.black}
                    />
                    <Text
                      style={{
                        overflow: 'hidden',
                        paddingLeft: 10,
                        fontSize: 15,

                        width: '80%',
                      }}>
                      {item.address}, {item.city}, {item.state},{item.pincode},
                      {item.mobileNumber}
                    </Text>
                    <Ionicons
                      name={'pencil'}
                      size={25}
                      color={Colors.black}
                      onPress={() => this.editaddress(item)}
                    />
                  </Pressable>
                );
              }}
            />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  productImageStyle: {
    height: 130,
    width: 130,
  },
  pricedecorate: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 16,
    color: Colors.light_dark,
    marginTop: 5,
    marginLeft: 5,
  },
  bottonComponentView: {
    width: '93%',
    alignSelf: 'center',
    // marginTop: 20
  },
  cartListItemWrapper: {
    marginVertical: 2,
    // backgroundColor: 'red',
    flex: 1,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingVertical: 10,
  },
  cartImageSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  itemDescView: {
    flex: 0.6,
    marginRight: 10,
  },
  titleDescView: {
    marginLeft: 5,
    flex: 1,
  },
  titleTextStyle: {
    lineHeight: 16,
  },
  priceView: {
    flexDirection: 'row',
  },
  price: {
    fontSize: 16,
    color: Colors.light_dark,
    marginTop: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  counterView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    flex: 1,
    marginTop: 10,
  },
  iconViewStyle: {
    padding: 3,
    borderWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
  },
  counternumberStyle: {
    padding: 3.5,
    borderWidth: 0.5,
    borderColor: 'gray',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartListItemWrapperInner: {
    flexDirection: 'row',
  },
  divider: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    width: '100%',
  },
  footer: {
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? 20 : 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    elevation: 5,
  },
  footertextview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3.5%',
    marginRight: '4%',
    marginBottom: 10,
  },
  footerheader: { fontSize: 18 },
  logoImg: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: '10%',
  },
  headerTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    marginTop: 20,
  },
  touchbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  total_Sub_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  total_head_text: {
    fontSize: 14,
  },
  total_amt_text: {
    fontSize: 14,

    fontWeight: 'bold',
    alignSelf: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  textInput: {
    paddingVertical: 5,
  },
  box1: {
    flex: 0.2,
    paddingHorizontal: 25,
    paddingBottom: 10,
    justifyContent: 'flex-end',
  },
  box2: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingVertical: 25,
  },
  text: {
    fontSize: 16,
    marginTop: 20,
  },
  mainview: {
    width: '93%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    color: Colors.light_dark,
    justifyContent: 'center',
    borderRadius: 6,
  },
  subview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  pickerWrapper: {
    ...Platform.select({
      ios: {
        padding: 13,
      },
      android: {
        padding: 0,
      },
    }),
  },
  modal: {
    marginTop: '50%',
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    margin: 50,
  },
  modalbutton: {
    backgroundColor: Colors.primary,
    margin: '5%',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    cartNumber: state.CartReducer.cartNumber,
    userid: state.UserLoginReducer.loginUser,
    videoId: state.AdsReducer.video_ads,
    coin: state.CoinReducer.coinNumber,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCartNumber, updateCoinNumber }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
