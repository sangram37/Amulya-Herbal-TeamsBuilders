import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
  Share,
  TextInput,
  Modal,
} from 'react-native';

import { CallApi, CallApiPagination } from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';
import BackHeader from '../../../Components/Header/BackHeader';
import Loader from '../../../Components/Loader';
import ToastMessage from '../../../Components/ToastMessage';
import Colors from '../../../Constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//redux
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-community/clipboard';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  GAMBannerAd,
  InterstitialAd,
} from '@react-native-admob/admob';
import { BASE_URL } from '../../../Constants/ApiConstants';
const { width, height } = Dimensions.get('screen');
let stopFetchMore = false;
class DpList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      data: [],
      dplist: [],
      dppoint: [],
      dplist_bckp: [],
      query: '',
      pageNo: 1,
      showResultScreen: null,
      onopenModal: false,
      sortname: '',
      bannerad: [{ bannerAd: 1 }],
      banneraddid: '',
      store_Arr: [
        {
          id: 1,
          name: 'Modicare Super Store',
        },
        {
          id: 2,
          name: 'Modicare Success Center (MSC)',
        },
        {
          id: 3,
          name: 'Modicare Lifestyle Center',
        },
        {
          id: 4,
          name: 'Modicare Access Point (TFS Store)',
        },
        {
          id: 5,
          name: 'DISTRIBUTION POINTS (DPS)',
        },
      ],
      addsense_count: [],
    };

    this.count = React.createRef(0);
  }
  componentDidMount() {
    this.getaddapilist();
    this.AddsenseCount();
    this.getApiData();
  }
  getApiData = x => {
    {
      x ? null : this.setState({ loader: true });
    }
    let url = x
      ? this.state.showResultScreen
      : `${BASE_URL}distributionpoint/`;

    return CallApiPagination('GET', url, '').then(res => {
      console.log(res);
      try {
        this.setState(
          {
            dppoint: res.results,
            dplist_bckp: [...this.state.dplist_bckp, ...res.results],
            showResultScreen: res.next,
          },
          () => this.ProductsArr(res.results),
        );
      } catch (error) {
        this.setState({ loadingMore: false, loader: false });
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  AddsenseCount = () => {
    return CallApi('GET', 'adsense-count', '').then(res => {
      // "bill_list": 10, "dp_list": 10, "id": "b29a8185-b5cd-44c8-ae69-512e87c8e078", "product_list": 10
      try {
        console.log(res, 'addsense');
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
    let mainarray = this.state.dppoint;
    let productsArray = mainarray;
    let ind = 0;
    productsArray.map((item, index) => {
      // console.log(index)
      if (
        index !== 0 &&
        index % Number(this.state.addsense_count.dp_list) == 0
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
      dplist: [...this.state.dplist, ...productsArray],
    });
  };

  onShare = async item => {
    try {
      const result = await Share.share({
        title: 'TEAMS BUILDER',
        message: `Name : ${item.dpName}, Address :  ${item.dpAddress
          }, Pincode : ${item.pincode}, DPID : ${item.dpID}Mobile : ${item.mob
          }, Email : ${item.emailAddress ? item.emailAddress : ''}`,
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
  copyToClipboard = item => {
    ToastMessage({
      text: 'Copy successful',
      type: 'type_info',
    });
    let text = `Name : ${item.dpName}, Address :  ${item.dpAddress
      }, Pincode : ${item.pincode}, DPID : ${item.dpID}Mobile : ${item.mob
      }, Email : ${item.emailAddress ? item.emailAddress : ''}}`;
    Clipboard.setString(text);
  };
  handelSearch = query => {
    console.log(query.length);
    this.setState({ query });
    let url = `distributionpoint/?search=${query}`;
    if (query.length > 1) {
      this.setState({ dplist: [] });
      return CallApi('GET', url, '').then(res => {
        // this.setState({qytloader: false, setindex: null});
        // console.log('res update ', res);
        try {
          this.setState({ dplist: res.results });
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    } else {
      //   setSearchData(searchDataPrev);
      this.setState({ dplist: this.state.dplist_bckp });
    }
  };
  handelsortby = () => {
    let url = `distributionpoint/?cityName=&state=&dpAddress=&dp_type=${this.state.sortname}`;
    if (this.state.sortname) {
      this.setState({ dplist: [], onopenModal: false });
      return CallApi('GET', url, '').then(res => {
        // this.setState({qytloader: false, setindex: null});
        // console.log('res update ', res);
        try {
          this.setState({ dplist: res.results });
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    } else {
      //   setSearchData(searchDataPrev);
      this.setState({ onopenModal: false });
    }
  };
  onScrollHandler = () => {
    // this.setState({
    //    page: this.state.page + 1
    // }, () => {
    //    this.fetchRecords(this.state.page);
    // });
    if (this.state.showResultScreen) {
      if (!stopFetchMore) {
        this.setState({ loadingMore: true }, () => {
          this.getApiData('loader off');
          stopFetchMore = true;
        });
      }
    }
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
  getaddapilist = () => {
    return CallApi('GET', 'adsense', '').then(res => {
      // "bill_list": 10, "dp_list": 10, "id": "b29a8185-b5cd-44c8-ae69-512e87c8e078", "product_list": 10
      try {
        console.log(res, 'addsense');
        let banneraddid = res.find(element => element.ad_type === 'banner_ads');
        this.setState({
          banneraddid,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  // onRefresh() {
  //   this.setState({onrefloader: true}, () => {
  //     this.hotelList('1');
  //   });
  // }
  // onEndReached={this.onScrollHandler}
  // onRefresh={() => this.onRefresh()}
  //     refreshing={this.state.onrefloader}
  //     // bounces={false}
  //     enableEmptySections={true}

  render() {
    // console.log(this.props);
    const { query } = this.state;
    return (
      <View style={GlobalStyles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title={'D P'}
          cartnumber={this.props.cartNumber}
          coin={this.props.coin}
        />
        {this.state.loader ? (
          <Loader />
        ) : (
          <View style={{ flex: 1, backgroundColor: '#E6E6E6' }}>
            <View style={styles.searchBarViewParent}>
              <View style={styles.searchBarContainer}>
                <View style={styles.searchIconView}>
                  <EvilIcons
                    name="search"
                    size={Platform.OS === 'ios' ? 25 : 30}
                    color={Colors.dark}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.inputStyles}
                    placeholder="Search Distribution Points"
                    clearButtonMode="always"
                    value={query}
                    onChangeText={query => this.handelSearch(query)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="off"
                    keyboardType="default"
                    autoFocus={false}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      query: '',
                      dplist: this.state.dplist_bckp,
                      onopenModal: true,
                    },
                    () => this.ProductsArr(),
                  );
                }}
                style={styles.cancelView}>
                <Text style={styles.text}>Short By</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.dplist}
              horizontal={false}
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
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height / 2,
                  }}>
                  {/* <Text>No Search Result Found</Text> */}
                  <Text>No Result Found</Text>
                </View>
              )}
              // numColumns={2}
              // onEndReached={this.onScrollHandler}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={post => {
                const item = post.item;
                return (
                  <>
                    {item.bannerAd ? (
                      <View
                        style={{ height: 250, width: '100%', marginBottom: 20 }}>
                        <BannerAd
                          size={BannerAdSize.MEDIUM_RECTANGLE}
                          unitId={
                            this.state.banneraddid
                              ? this.state.banneraddid.unit_id
                              : TestIds.BANNER
                          }
                          requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                          }}
                          style={{
                            alignSelf: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                          onAdFailedToLoad={error => console.log(error)}
                        // ref={this.banref}
                        />
                      </View>
                    ) : (
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
                          <Text
                            style={{ marginTop: 7, color: Colors.light_dark }}>
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
                              onPress={() => this.copyToClipboard(item)}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                paddingTop: 5,
                                paddingBottom: 5,
                              }}>
                              <Ionicons
                                style={{ fontSize: 20, color: Colors.light_gray }}
                                name="copy"
                              />
                              <Text
                                style={{
                                  color: Colors.black,
                                  marginLeft: 5,
                                  textAlign: 'center',
                                }}>
                                COPY
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
                    )}
                  </>
                );
              }}
            />
          </View>
        )}
        <Modal
          animationType="slide"
          visible={this.state.onopenModal}
          transparent={true}
          onRequestClose={() => {
            this.setState({ onopenModal: false });
          }}>
          <Pressable
            style={GlobalStyles.pressablemain}
            onPress={() => this.setState({ onopenModal: false })}>
            <Pressable
              onPress={() => this.setState({ onopenModal: false })}
              style={GlobalStyles.pressableWrapperupperBody}>
              <Pressable
                style={GlobalStyles.pressableWrapperBody}
                onPress={() => this.setState({ onopenModal: false })}>
                <FlatList
                  data={this.state.store_Arr}
                  keyExtractor={(item, index) => String(index)}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => {
                    return <View style={GlobalStyles.divider} />;
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          // marginBottom: Platform.OS === 'ios' ? 30 : 10,
                          flexDirection: 'row',
                          // marginHorizontal: 10,
                          // borderRadius: 10,

                          padding: 10,
                          paddingTop: 15,
                          paddingBottom: 15,
                        }}
                        onPress={() => this.setState({ sortname: item.name })}>
                        {this.state.sortname === item.name ? (
                          <AntDesign
                            name="checkcircle"
                            color={Colors.black}
                            size={17}
                          />
                        ) : (
                          <Entypo
                            name="circle"
                            color={Colors.black}
                            size={17}
                          />
                        )}
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 14,
                            color: Colors.black,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <Pressable
                    style={{
                      width: 100,
                      backgroundColor: Colors.red,
                      marginRight: 10,
                      borderRadius: 6,
                    }}
                    onPress={() =>
                      this.setState({ sortname: '', onopenModal: false })
                    }>
                    <Text
                      style={{
                        padding: 10,
                        textAlign: 'center',
                        color: Colors.white,
                        fontWeight: '500',
                      }}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      width: 100,
                      backgroundColor: Colors.primary,
                      borderRadius: 6,
                    }}
                    onPress={() => this.handelsortby()}>
                    <Text
                      style={{
                        padding: 10,
                        textAlign: 'center',
                        color: Colors.white,
                        fontWeight: '500',
                      }}>
                      Submit
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DpList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
    paddingTop: 10,
  },
  listContainer: {
    // alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // marginTop: 10,
    backgroundColor: 'white',
    // flexBasis: '47%',
    // marginHorizontal: 5,
    width: '98%',
    alignSelf: 'center',
    borderRadius: 3,
  },
  title: {
    fontSize: 16,
    alignSelf: 'center',
    padding: 5,
    paddingVertical: 10,
    color: Colors.primary,
  },
  containerParent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchBarContainer: {
    marginHorizontal: 2,
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    borderRadius: 5,
    borderColor: Colors.light_gray,
  },
  inputStyles: {
    height: 40,
    // height: Platform.OS == 'ios' ? 5 : 40,
    // fontFamily: Fonts.Akt_regular,
    fontSize: 14,
    color: Colors.black,
  },
  searchBarViewParent: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
  },
  searchIconView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 0.8,
  },
  micBtnView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  cancelView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    // fontFamily: Fonts.Akt_regular,
    color: Colors.gray,
  },
});
