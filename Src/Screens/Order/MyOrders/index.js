import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
  Share,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';

// import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../../Components/Loader';
import { CallApi, CallApiPagination } from '../../../CallApi';
import ToastMessage from '../../../Components/ToastMessage';
import GlobalStyles from '../../../Components/GlobalStyle';
import BackHeader from '../../../Components/Header/BackHeader';
import Colors from '../../../Constants/Colors';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainHeader from '../../../Components/MainHeader';

//redux
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Ionicons from 'react-native-vector-icons/Ionicons';
const REMOTE_IMAGE_PATH =
  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png';
// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';
import { BASE_URL } from '../../../Constants/ApiConstants';
const { width, height } = Dimensions.get('screen');
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  GAMBannerAd,
  InterstitialAd,
} from '@react-native-admob/admob';

import { NoInternetModal } from '../../../Components/NoInternetModal';
import Imageurl from '../../../Constants/Imageurl';
import NetInfo from '@react-native-community/netinfo';
import { AdViewExm } from '../../AdViewExm';
import Strings from '../../../Constants/Strings';
let stopFetchMore = false;
let bannerid = 'ca-app-pub-6922004427566783/2162384474';
class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      isFetching: false,
      orders: [],
      ordersData: [],
      updateState: false,
      cartValue: 0,
      A_token: '',
      showResultScreen: null,
      adLoaded: false,
      pageNo: 1,
      setindex: null,
      Offline: false,
      bannerad: [{ bannerAd: 1 }],
      addsense_count: [],
      loadingMore: false,
      banneraddid: '',
    };
  }
  onShare = async item => {
    try {
      const result = await Share.share({
        title: 'TEAMS BUILDER',
        message: `Check your bill ${BASE_URL}${item.id}/bill/`,
        url: `${BASE_URL}${item.id}/bill/`,
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
  checkPermission = async item => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      this.downloadImage(item);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          this.pdfurl(item);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  pdfurl = item => {
    // api/<order_id>/generate/bill
    this.setState({ loader: true });

    // return CallApi('GET ', `${item.id}/generate/bill`, '').then(res => {
    //   this.setState({loader: false});
    //   console.log('res pdflist', res);
    //   try {
    //   } catch (error) {
    //     ToastMessage({
    //       text: error,
    //       type: 'type_info',
    //     });
    //   }
    // });
    //GET request
    fetch(`${BASE_URL}${item.id}/generate/bill`, {
      method: 'GET',
      //Request Type
    })
      .then(response => response.json())
      //If response is in json then in success
      .then(responseJson => {
        //Succes
        this.downloadImage(responseJson.res.bill);
      })
      //If response is not in json then in error
      .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  };
  downloadImage = item => {
    this.setState({ loader: false });
    // Main function to download the image
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let pdf_URL = item;

    // Getting the extention of the file
    let ext = this.getExtention(pdf_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/pdf_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Pdf',
      },
    };
    config(options)
      .fetch('GET', pdf_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('bill Downloaded Successfully.');
      });
  };

  getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  async componentDidMount() {
    this.getaddapilist();
    this.AddsenseCount();
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //
    // });;
    let token = await AsyncStorage.getItem('token');
    let parsed_token = JSON.parse(token);
    this.setState({ A_token: parsed_token });

    // if (token) {
    //   this.orderlist();
    // }

    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.orderlist('refresh');
      },
    );
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      console.log(Offline, 'hiiii');
      this.setState({ Offline: Offline });
    });
    this.orderlist();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.interstitialAd !== prevState.interstitialAd) {
      this.setState({ adLoaded: false });
      prevState.interstitialAd?.destroy();
    }
  }
  getaddapilist = () => {
    return CallApi('GET', 'adsense', '').then(res => {
      // "bill_list": 10, "dp_list": 10, "id": "b29a8185-b5cd-44c8-ae69-512e87c8e078", "product_list": 10
      try {
        console.log(res, 'addsense');
        // let banneraddid = res.find(element => element.ad_type === 'banner_ads');
        let banneraddid = res.find(element => element.ad_type === 'native_ads');
        this.setState({
          banneraddid,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  createAd() {
    const ad = InterstitialAd.createAd(TestIds.INTERSTITIAL_VIDEO, {
      loadOnDismissed: true,
      requestOptions: {
        requestNonPersonalizedAdsOnly: true,
      },
    });
    ad.addEventListener('adLoaded', () => {
      this.setState({ adLoaded: true });
    });
    ad.addEventListener('adDismissed', () => {
      this.props.navigation.navigate('CartList');
    });
    return ad;
  }

  componentWillUnmount() {
    this.willFocusSubscription;
    this.removeNetInfoSubscription;
  }
  orderlist = refresh => {
    {
      refresh ? null : this.setState({ loader: true });
    }
    let url =
      refresh === 'loader off'
        ? this.state.showResultScreen
        : `${BASE_URL}order?user=${this.props.userid}&page=1`;
    return CallApiPagination('GET ', url, '').then(res => {
      {
        refresh === 'refresh' ? this.setState({ orders: [] }) : null;
      }
      console.log('sangram', res)
      try {
        this.setState(
          {
            ordersData: res.results,

            showResultScreen: res.next,
          },
          () => this.ProductsArr(),
        );
      } catch (error) {
        this.setState({ loadingMore: false, loader: false });
        ToastMessage({
          text: error,
          type: 'type_info',
        });
      }
    });
  };
  AddsenseCount = () => {
    return CallApi('GET', 'adsense-count', '').then(res => {
      // "bill_list": 10, "dp_list": 10, "id": "b29a8185-b5cd-44c8-ae69-512e87c8e078", "product_list": 10
      try {
        console.log(res, 'addsensesss');
        this.setState({
          addsense_count: res[0],
          loadingMore: false,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  ProductsArr = result => {
    let mainarray = this.state.ordersData;
    let productsArray = mainarray;
    let ind = 0;
    productsArray.map((item, index) => {
      // console.log(index)
      if (
        index !== 0 &&
        index % Number(this.state.addsense_count.bill_list) == 0
      ) {
        console.log(index + ind);
        productsArray.splice(index + ind, 0, { bannerAd: true });
        ind++;
      }
    });
    this.setState({
      loadingMore: false,
      loader: false,
      loader: false,
      orders: [...this.state.orders, ...productsArray],
    });
  };
  ListFooterComponent = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 5,
          }}>
          Loading...
        </Text>
      </View>
    );
  };
  ListFooterComponent2 = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 5,
          }}></Text>
      </View>
    );
  };
  onScrollHandler = () => {
    if (this.state.showResultScreen) {
      if (!stopFetchMore) {
        this.setState({ loadingMore: true }, () => {
          this.orderlist('loader off');
          stopFetchMore = true;
        });
      }
    }
  };
  onDownload = () => {
    alert('download');
  };
  returnImage = () => {
    if (this.props.user) {
      if (this.props.user.profile_picture) {
        return this.props.user.profile_picture;
      } else {
        return Imageurl.noimage;
      }
    } else {
      return Imageurl.noimage;
    }
  };
  render() {
    const { email, password, loader, orders } = this.state;
    const { cartList, navigation } = this.props;
    // console.log('cartList', cartList)
    return (
      <View style={GlobalStyles.container}>
        <StatusBar
          translucent={false}
          backgroundColor={Colors.primary}
          barStyle="dark-content"
        />
        {this.state.Offline ? (
          <NoInternetModal
            show={this.state.Offline}
            onRetry={this.orderlist}
            isRetrying={this.state.loader}
          />
        ) : null}
        {/* @Header Design Start */}
        <View
          style={{
            backgroundColor: Colors.primary,
            ...Platform.select({
              ios: {
                marginTop: '10%',
                paddingBottom: 5,
                paddingTop: 5,
              },
              android: {
                marginTop: 0,
                paddingVertical: 5,
              },
            }),
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}
              onPress={() => this.props.navigation.toggleDrawer()}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 60,
                  // backgroundColor: '#fff',
                }}
                source={{
                  uri: this.returnImage(),

                  // headers: {Authorization: 'someAuthToken'},
                  // priority: FastImage.priority.high,
                }}
              />
            </Pressable>

            <Pressable
              style={{
                flex: 1.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => props.navigation.navigate('logonavi')}>
              <Text style={{ fontWeight: '700', fontSize: 17, color: 'white' }}>
                {Strings.App_Heading_Name}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                this.props.navigation.navigate('CartList');
              }}
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="shopping-bag" size={25} color="white" />
              {this.props.cartNumber ? (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#ff8585',
                    right: 3,
                    top: 1,
                    borderRadius: 20,
                    overflow: 'hidden',
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: 'center',
                      color: Colors.white,
                    }}>
                    {this.props.cartNumber}{' '}
                  </Text>
                </View>
              ) : null}
            </Pressable>
            <Pressable style={{ paddingRight: 5, flexDirection: 'row', marginLeft: 10, alignItems: 'center' }} onPress={()=>this.props.navigation.navigate('Transaction')}>
              <FontAwesome name="diamond" size={18} color="white" />
              <Text style={GlobalStyles.cointext}>{this.props.coin ? this.props.coin : 0}</Text>
            </Pressable>
          </View>
        </View>
        {/* @Header Design End */}
        {loader ? (
          <Loader />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            onEndReached={this.onScrollHandler}
            ListFooterComponent={
              this.state.loadingMore
                ? this.ListFooterComponent
                : this.ListFooterComponent2
            }
            onEndReachedThreshold={0.5}
            onScrollBeginDrag={() => {
              stopFetchMore = false;
            }}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            keyExtractor={(item, index) => `${index}K`}
            data={orders}
            onRefresh={() => this.orderlist('refresh')}
            refreshing={this.state.loader}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height / 2,
                }}>
                {/* <Text>No Search Result Found</Text> */}
                <Text>No Bills Found</Text>
              </View>
            )}
            renderItem={({ item }) => {
              return (
                <>
                  {item.bannerAd ? (
                    <AdViewExm adsid={this.state.banneraddid.unit_id} type="image" media={false} />
                    // <View style={{ height: 50, width: '100%', marginBottom: 20 }}>
                    //   <BannerAd
                    //     size={BannerAdSize.BANNER}
                    //     unitId={
                    //       this.state.banneraddid
                    //         ? this.state.banneraddid.unit_id
                    //         : TestIds.BANNER
                    //     }
                    //     requestOptions={{
                    //       requestNonPersonalizedAdsOnly: true,
                    //     }}
                    //     style={{
                    //       alignSelf: 'center',
                    //       marginTop: 10,
                    //       marginBottom: 10,
                    //     }}
                    //     onAdFailedToLoad={error => console.log(error)}
                    //   // ref={this.banref}
                    //   />
                    // </View>
                  ) : (
                    <Pressable
                      onPress={() =>
                        this.props.navigation.navigate('GenerateBill', {
                          id: item.id,
                        })
                      }>
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
                          padding: 5,
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,
                          elevation: 2,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: 'transparent',
                            marginTop: 5,
                          }}>
                          <View
                            style={{
                              width: '50%',
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              backgroundColor: 'transparent',
                            }}>
                            <Text numberOfLines={1} style={styles.mainTxt}>
                              Order ID:{' '}
                            </Text>
                            <Text numberOfLines={1} style={styles.subText}>
                              {item.id}
                            </Text>
                          </View>
                          {/* <View
                        style={{
                          width: '50%',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        <Text numberOfLines={1} style={styles.mainTxt}>
                          Date:
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{...styles.subText, fontStyle: 'italic'}}>
                          {item.created_at}
                        
                        </Text>
                      </View> */}
                        </View>
                        {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: 'transparent', marginTop: 5 }} > */}
                        <View
                          style={{
                            width: '50%',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: 'transparent',
                            marginTop: 5,
                          }}>
                          <Text numberOfLines={1} style={styles.mainTxt}>
                            Order Number:{' '}
                          </Text>
                          <Text numberOfLines={1} style={styles.subText}>
                            {item.orderNumber}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: 'transparent',
                            marginTop: 5,
                          }}>
                          <Text numberOfLines={1} style={styles.mainTxt}>
                            Distributionpoint:{' '}
                          </Text>
                          <Text numberOfLines={1} style={styles.subText}>
                            {item.distributionpoint.dpName}
                          </Text>
                        </View>

                        {/* </View> */}
                        {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: 'transparent', marginTop: 5 }}>
                                        <Text numberOfLines={1} style={{ width: null, fontSize: 13, color: 'black', fontWeight: 'bold', backgroundColor: 'transparent' }}>Amount: </Text>
                                        <Text numberOfLines={1} style={{ width: null, fontSize: 13, color: 'black', fontWeight: 'bold' }}>{item.total_amount}</Text>
                                    </View> */}
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: 'transparent',
                            marginTop: 5,
                          }}>
                          <View
                            style={{
                              width: '50%',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              flexDirection: 'row',
                            }}>
                            <Text numberOfLines={1} style={styles.mainTxt}>
                              Status:{' '}
                            </Text>
                            <Text numberOfLines={1} style={styles.subText}>
                              {/* {item.delivery_status === 0
                            ? 'Processing'
                            : item.delivery_status === 1
                            ? 'Confirmed'
                            : item.delivery_status === 2
                            ? 'Out For Delivery'
                            : item.delivery_status === 3
                            ? 'Delivered'
                            : item.delivery_status === 4
                            ? 'Cancelled'
                            : 'Pending'} */}
                              {item.status ? 'Confirmed' : 'Cancelled'}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '50%',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-end',
                              flexDirection: 'row',
                            }}>
                            <Text numberOfLines={1} style={styles.mainTxt}>
                              Date:{' '}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{ ...styles.subText, fontStyle: 'italic' }}>
                              {item.created_at}
                              {/* {item.delivered_date
                            ? moment(item.delivered_date).format('LL')
                            : moment(item.order_date).format('LL')} */}
                            </Text>
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
                              // onPress={() => this.onDownload(item)}
                              onPress={() => this.checkPermission(item)}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                paddingTop: 5,
                                paddingBottom: 5,
                              }}>
                              <Ionicons
                                style={{ fontSize: 20, color: Colors.light_gray }}
                                name="md-download"
                              />
                              <Text
                                style={{
                                  color: Colors.black,
                                  marginLeft: 5,
                                  textAlign: 'center',
                                }}>
                                DOWNLOAD
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
                              onPress={() => this.onShare(item)}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                paddingTop: 5,
                                paddingBottom: 5,
                              }}>
                              <Ionicons
                                style={{ fontSize: 20, color: Colors.light_gray }}
                                name="share"
                              />
                              <Text
                                style={{
                                  color: Colors.black,
                                  marginLeft: 5,
                                  textAlign: 'center',
                                }}>
                                SHARE
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  )}
                </>
              );
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainTxt: {
    width: null,
    fontSize: 15,
    color: 'black',
    // fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  subText: {
    width: null,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {
    cartNumber: state.CartReducer.cartNumber,
    user: state.ProfileReducer.userdata,
    userid: state.UserLoginReducer.loginUser,
    coin: state.CoinReducer.coinNumber
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
