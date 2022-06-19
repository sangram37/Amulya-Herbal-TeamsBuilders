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
  Share,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { CallApi } from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';
import Loader from '../../../Components/Loader';
import MainHeader from '../../../Components/MainHeader';
import ToastMessage from '../../../Components/ToastMessage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProfileData } from '../../../Redux/Actions/ProfileAction';
import { updateCoinNumber } from '../../../Redux/Actions/CoinAction'
import { AddAds } from '../../../Redux/Actions/AdsAction';
import Colors from '../../../Constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//redux
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  GAMBannerAd,
  InterstitialAd,
} from '@react-native-admob/admob';
import Imageurl from '../../../Constants/Imageurl';
import FastImage from 'react-native-fast-image';
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';
import { NoInternetModal } from '../../../Components/NoInternetModal';
import NetInfo from '@react-native-community/netinfo';
import Strings from '../../../Constants/Strings';

const { width, height } = Dimensions.get('window');
var UNIT_ID_BANNER = 'ca-app-pub-9200460973857767/4128532871';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      name_address: '',
      section: [
        {
          id: 0,
          title: 'WELLNESS',
          image:
            'https://askthescientists.com/wp-content/uploads/2017/11/AdobeStock_163967512-1030x687.jpeg',
        },
        {
          id: 1,
          title: 'SKIN CARE',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDvQKaVtL3FyDRW6Jkw-J6FdCGO8kDX53BQ&usqp=CAU',
        },
        {
          id: 2,
          title: 'COLOR',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76GjIjy9CgL6Zmbxk2lrJmUP5u5Ahj_O4fA&usqp=CAU',
        },
        {
          id: 3,
          title: 'PERSONAL CARE',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMIwtF5hvFFBAn_wZXpaDw_stLOfJIjFc0vQ&usqp=CAU',
        },
      ],
      category: [],
      getoffersection: null,
      interstitialAd: this.createAd(),
      adLoaded: false,
      Offline: false,
    };
    this.banref = React.createRef();
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCoin()
    });;
    this.getCoin()
    this.getads();
    this.getofferData();
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      // console.log(Offline, 'hiiii');
      if (!Offline) {
        this.onRetry();
      } else {
        this.setState({ loader: false });
      }
      this.setState({ Offline: Offline });
    });
    // this.setState({interstitialAd: this.createAd()});
  }
  componentWillUnmount() {
    this.removeNetInfoSubscription;
    this._unsubscribe
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.interstitialAd !== prevState.interstitialAd) {
      this.setState({ adLoaded: false });
      prevState.interstitialAd?.destroy();
    }
  }
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
  // componentWillUnmount() {
  //   this.state.interstitialAd?.destroy();
  // }
  getCoin = () => {
    try {
      return CallApi('GET', `user-coin/?user=${this.props.userid}`, '').then(res => {
        this.setState({ loader: false });
        console.log(res[0], "bapiska")
        this.props.updateCoinNumber(res[0].coin)

      })
    } catch (error) {
      console.log(error)
    }

  }
  getads = () => {
    this.props.AddAds('', async (success, error, data) => {
      console.log(data, "hjklm")
    })
  }
  getprofile = () => {
    this.setState({ loader: true });

    return CallApi('GET', `user/${this.props.userid}`, '').then(res => {
      this.setState({ loader: false });

      // console.log('res alldata', res);

      try {
        this.props.ProfileData(res);
        // this.setState({
        //   first_name: res.first_name,
        //   last_name: res.last_name,
        //   email: res.email,
        //   phone: res.mob,
        //   address: res.address,
        //   user_id: res.userId,
        //   profile_picture: res.profile_picture,
        // });
      } catch (error) {
        ToastMessage({
          text: error,
          type: 'type_info',
        });
      }
    });
  };
  getApiData = () => {
    this.setState({ loader: true });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', 'tagHirarchy', '').then(res => {
      this.setState({ loader: false });

      try {
        this.setState({ category: res });
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  getofferData = () => {
    this.setState({ loader: true });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', 'offere-refer', '').then(res => {
      this.setState({ loader: false });
      // console.log(res, 'bapi');
      try {
        this.setState({ getoffersection: res[0] });
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  getApisection = () => {
    this.setState({ loader: true });
    return CallApi('GET', 'section/', '').then(res => {
      this.setState({ loader: false });
      // console.log('res section', res);
      try {
        this.setState({ section: res });
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  clickEventListener(item) {
    Alert.alert(item.title);
    // navigation.navigate('Products', item);
  }
  filterdatas = text => {
    let filterdata = this.state.section;
    if (filterdata.length) {
      let data = filterdata.filter(item => item.section_name == text);
      // console.log('jdk', data);
      return data;
    } else {
      // console.log('jdk', data);
      return [];
    }
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        title: 'TEAMS BUILDER',
        url: 'https://play.google.com/store/apps/details?id=com.skyupindia_consumer',
        message:
          'https://play.google.com/store/apps/details?id=com.skyupindia_consumer',
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
  navigationtype = item => {
    if (item.section_type === 'video') {
      this.props.navigation.navigate('Video', { item });
    } else {
      this.props.navigation.navigate('Static', { item });
    }
  };
  navigationtypearchiver = item => {
    console.log(item);
    if (item.section_type === 'video') {
      this.props.navigation.navigate('Video', { item });
    } else {
      if (item.title === 'Earning Model') {
        this.props.navigation.navigate('Earning', { item });
      } else {
        this.props.navigation.navigate('Broucher', { item });
      }
    }
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
  onRetry = () => {
    this.getApiData();
    this.getApisection();
    this.getprofile();
  };

  render() {
    console.log(this.state.section, 'sangram');
    return (
      <View style={GlobalStyles.container}>
        {/* <MainHeader
          navigation={this.props.navigation}
          cartnumber={this.props.cartNumber}
          image={this.props.user.profile_picture}
        /> */}

        <StatusBar
          translucent={false}
          backgroundColor={Colors.primary}
          barStyle="dark-content"
        />
        {this.state.Offline ? (
          <NoInternetModal
            show={this.state.Offline}
            onRetry={this.onRetry}
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
            <Pressable style={{ paddingRight: 5, flexDirection: 'row', marginLeft: 10, alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Transaction')}>
              <FontAwesome name="diamond" size={18} color="white" />
              <Text style={GlobalStyles.cointext}>{this.props.coin ? this.props.coin : 0}</Text>
            </Pressable>
          </View>
        </View>
        {/* @Header Design End */}

        <Pressable
          style={styles.inputContainer}
          onPress={() => this.props.navigation.navigate('Search')}>
          <MaterialIcons
            name="search"
            size={25}
            color="black"
            style={{ marginLeft: 20 }}
          />
          <TextInput
            style={styles.inputs}
            ref={'txtPassword'}
            placeholder="Search"
            underlineColorAndroid="transparent"
            onChangeText={name_address => this.setState({ name_address })}
            editable={false}
          />
        </Pressable>

        {this.state.loader ? (
          <Loader />
        ) : (
          <ScrollView style={{ backgroundColor: '#FFF' }}>
            <View>
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={
                  this.state.category
                    ? this.state.category.slice(0, 5)
                    : this.state.category
                }
                horizontal={false}
                numColumns={3}
                columnWrapperStyle={
                  {
                    // justifyContent: 'space-around',
                    // width: "90%",
                  }
                }
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: '33%',
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                          // this.clickEventListener(item);
                          this.props.navigation.navigate('NewProduct', { item });
                        }}>
                        <Image
                          style={styles.cardImage}
                          // resizeMode="contain"
                          source={{
                            uri: item.category.tagImage
                              ? item.category.tagImage
                              : Imageurl.noimage,
                          }}
                        />
                      </TouchableOpacity>

                      <View style={styles.cardHeader}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.title} numberOfLines={2}>
                            {item.category.tagName}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '33%',
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 2,
                }}>
                <TouchableOpacity
                  style={{ ...styles.card, backgroundColor: Colors.primary }}
                  onPress={() => {
                    // this.clickEventListener(item);
                    this.props.navigation.navigate('Category');
                  }}>
                  <AntDesign
                    name="right"
                    size={30}
                    color="white"
                    style={{ alignSelf: 'center' }}
                  />
                  {/* <Image
                  style={styles.cardImage}
                  source={{
                    uri: item.category.tagImage
                      ? item.category.tagImage
                      : Imageurl.noimage,
                  }}
                /> */}
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.title}>SEE ALL</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* <BannerAd
              size={BannerAdSize.BANNER}
              unitId={TestIds.UNIT_ID_BANNER}
              onAdFailedToLoad={error => console.error(error)}
              ref={this.banref}
            /> */}
            {/* <BannerAd
              size={BannerAdSize.MEDIUM_RECTANGLE}
              unitId={TestIds.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              style={{alignSelf: 'center'}}
              onAdFailedToLoad={error => console.log(error)}
              // ref={this.banref}
            /> */}
            <View style={styles.boxview}>
              <View
                style={{
                  width: '30%',
                  // alignSelf: "center",
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    this.clickEventListener({ title: 'View' });
                  }}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: this.state.getoffersection
                        ? this.state.getoffersection.view_all_offer
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-YldHw4r7HoQYbJ7SRH-R9l9Nj1trt2aBCg&usqp=CAU',
                    }}
                  />
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.title}>View All offer</Text>
                  </View>
                </View>
              </View>

              <Pressable
                style={{
                  width: '30%',
                  // alignSelf: "center",
                  alignItems: 'center',
                }}
                onPress={() => this.props.navigation.navigate('DpList')}>
                <View style={styles.card}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: this.state.getoffersection
                        ? this.state.getoffersection.dp_list
                        : 'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202106/night-1927265_1920_x.jpeg?qFeLEVx.Ysj5jputbJNPJRSpvnmz.o_f',
                    }}
                  />
                </View>

                <View style={styles.cardHeader}>
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.title}>DP List</Text>
                  </View>
                </View>
              </Pressable>

              <View
                style={{
                  width: '30%',
                  // alignSelf: "center",
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    this.onShare();
                  }}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: this.state.getoffersection
                        ? this.state.getoffersection.refer_earn
                        : 'https://www.clearias.com/up/Refer-Earn-.png',
                    }}
                  />
                </TouchableOpacity>

                <View style={{ ...styles.cardHeader, width: '100%' }}>
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.title} numberOfLines={1}>
                      Refer And Eran
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.sectionview}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  alignSelf: 'flex-start',
                  marginLeft: 12,
                  marginTop: 5,
                }}>
                Why HHI
              </Text>
              <FlatList
                // style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={this.filterdatas('Why HHI')}
                horizontal={false}
                numColumns={3}
                columnWrapperStyle={
                  {
                    // justifyContent: 'space-around',
                    // width: "90%",
                  }
                }
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={{
                        width:
                          this.filterdatas('Why Modicare').length <= 2
                            ? '50%'
                            : '33%',
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.navigationtype(item)}>
                      <View style={styles.card}>
                        <Image
                          style={styles.cardImage}
                          resizeMode="contain"
                          source={{
                            uri: item.section_image
                              ? item.section_image
                              : Imageurl.noimage,
                          }}
                        />
                      </View>

                      <View style={styles.cardHeader}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
            <View style={styles.sectionview}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  alignSelf: 'flex-start',
                  marginLeft: 12,
                  marginTop: 5,
                }}>
                Learnings
              </Text>
              <FlatList
                // style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={this.filterdatas('Learnings')}
                horizontal={false}
                numColumns={3}
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={{
                        width:
                          this.filterdatas('Learnings').length <= 2
                            ? '50%'
                            : '33%',
                        // alignSelf: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.navigationtype(item)}>
                      <View style={styles.card}>
                        <Image
                          style={styles.cardImage}
                          resizeMode="contain"
                          source={{
                            uri: item.section_image
                              ? item.section_image
                              : Imageurl.noimage,
                          }}
                        />
                      </View>

                      <View style={styles.cardHeader}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
            <View style={styles.sectionview}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  alignSelf: 'flex-start',
                  marginLeft: 12,
                  marginTop: 5,
                }}>
                Archivers
              </Text>
              <FlatList
                // style={styles.list}

                data={this.filterdatas('Archivers')}
                contentContainerStyle={styles.listContainer}
                horizontal={false}
                numColumns={3}
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={{
                        width:
                          this.filterdatas('Archivers').length <= 2
                            ? '50%'
                            : '33%',
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.navigationtypearchiver(item)}>
                      <View style={styles.card}>
                        <Image
                          style={styles.cardImage}
                          resizeMode="contain"
                          source={{
                            uri: item.section_image
                              ? item.section_image
                              : Imageurl.noimage,
                          }}
                        />
                      </View>

                      <View style={styles.cardHeader}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
            <View style={styles.sectionview}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  alignSelf: 'flex-start',
                  marginLeft: 12,
                  marginTop: 5,
                }}>
                Events
              </Text>
              <FlatList
                // style={styles.list}

                data={this.filterdatas('Events')}
                contentContainerStyle={styles.listContainer}
                horizontal={false}
                numColumns={3}
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={{
                        width:
                          this.filterdatas('Events').length <= 2
                            ? '50%'
                            : '33%',
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => this.navigationtype(item)}>
                      <View style={styles.card}>
                        <Image
                          style={styles.cardImage}
                          resizeMode="contain"
                          source={{
                            uri: item.section_image
                              ? item.section_image
                              : Imageurl.noimage,
                          }}
                        />
                      </View>

                      <View style={styles.cardHeader}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.title}>{item.title}</Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  list: {
    backgroundColor: '#FFF',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#e2e2e2',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',

    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  listContainer: {
    paddingTop: 15,
    width: '100%',
    // alignItems: "center",
  },
  /******** card **************/
  boxview: {
    flexDirection: 'row',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 5,
    // marginVertical: 20,
    // marginHorizontal: 40,
    backgroundColor: '#e2e2e2',
    //flexBasis: '42%',
    width: '90%',

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  sectionview: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 5,
    // marginVertical: 20,
    // marginHorizontal: 40,
    backgroundColor: '#e2e2e2',
    //flexBasis: '42%',
    width: '90%',

    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'space-around',
  },
  card: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    // marginVertical: 20,
    // marginHorizontal: 40,
    backgroundColor: Colors.white,
    //flexBasis: '42%',
    width: 80,
    height: 80,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardHeader: {
    width: '90%',
    paddingVertical: 17,
    // paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  cardContent: {
    paddingVertical: 12.5,
    // paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    // paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
    textAlign: 'center',

  },
});

const mapStateToProps = state => {
  return {
    cartNumber: state.CartReducer.cartNumber,
    loginUserStatus: state.UserLoginReducer.loginUserStatus,
    userid: state.UserLoginReducer.loginUser,
    user: state.ProfileReducer.userdata,
    coin: state.CoinReducer.coinNumber
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ProfileData,
      AddAds,
      updateCoinNumber,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
