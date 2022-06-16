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
} from 'react-native';
import { CallApi } from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';
import Loader from '../../../Components/Loader';
import MainHeader from '../../../Components/MainHeader';
import ToastMessage from '../../../Components/ToastMessage';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import BackHeader from '../../../Components/Header/BackHeader';
import { NoInternetModal } from '../../../Components/NoInternetModal';
const { width, height } = Dimensions.get('window');
var UNIT_ID_BANNER = 'ca-app-pub-9200460973857767/4128532871';
import NetInfo from '@react-native-community/netinfo';
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      name_address: '',
      data: [
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
        {
          id: 4,
          title: 'TECHNOLOGY',
          image:
            'https://motorolaus.vtexassets.com/assets/vtex.file-manager-graphql/images/072f0266-4458-41ee-aadd-57212ee53e02___297eeb63b72467303dc4128a2441baa2.jpg',
        },
        {
          id: 5,
          title: 'F & B',
          image:
            'https://economictimes.indiatimes.com/thumb/msid-74415811,width-1200,height-900,resizemode-4,imgsize-713857/alcohol-is-the-fifth-largest-contributor-to-early-death-in-high-income-countries-and-the-seventh-worldwide-.jpg?from=mdr',
        },
        {
          id: 6,
          title: 'OTHERS',
          image:
            'https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/dslr-camera/desktop/DSLR_P1_900x420.jpg.img.jpg',
        },
        {
          id: 7,
          title: 'JEWELLARY',
          image:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1306011662.jpg',
        },
        {
          id: 9,
          title: 'Gallery',
          image:
            'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-gallery-icon-png-image_4278267.jpg',
        },
      ],
      category: [],
      Offline: false,
    };
    this.banref = React.createRef();
  }
  componentDidMount() {
    this.getApiData();
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

  getApiData = () => {
    this.setState({ loader: true });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', 'tagHirarchy', '').then(res => {
      this.setState({ loader: false });
      console.log('res alldata', res);

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
  clickEventListener(item) {
    Alert.alert(item.title);
    // navigation.navigate('Products', item);
  }
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

  render() {
    // console.log(this.props.userid, 'sangram');
    return (
      <View style={GlobalStyles.container}>
        {this.state.Offline ? (
          <NoInternetModal
            show={this.state.Offline}
            onRetry={this.getApiData}
            isRetrying={this.state.loader}
          />
        ) : null}
        <BackHeader
          navigation={this.props.navigation}
          title={'Category'}
          cartnumber={this.props.cartNumber}
          coin={this.props.coin}
        />
        {this.state.loader ? (
          <Loader />
        ) : (
          <ScrollView style={{ backgroundColor: '#FFF' }}>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.category}
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
                        <Text style={styles.title}>
                          {item.category.tagName}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
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
    // alignItems: "center",
  },
  /******** card **************/
  boxview: {
    flexDirection: 'row',
    shadowColor: '#474747',
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
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    // marginVertical: 20,
    // marginHorizontal: 40,
    backgroundColor: '#e2e2e2',
    //flexBasis: '42%',
    width: 80,
    height: 80,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardHeader: {
    paddingVertical: 17,
    // paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    coin: state.CoinReducer.coinNumber,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
