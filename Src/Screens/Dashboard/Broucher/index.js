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
  ActivityIndicator,
} from 'react-native';
import { CallApi, CallApiPagination } from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';
import BackHeader from '../../../Components/Header/BackHeader';
import Loader from '../../../Components/Loader';

import Colors from '../../../Constants/Colors';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCartNumber } from '../../../Redux/Actions/CartAction';
import FastImage from 'react-native-fast-image';
import Imageurl from '../../../Constants/Imageurl';
import { CommonActions } from '@react-navigation/native';
//redux
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  GAMBannerAd,
  InterstitialAd,
} from '@react-native-admob/admob';
const { width, height } = Dimensions.get('screen');
import NetInfo from '@react-native-community/netinfo';
let stopFetchMore = false;
class Broucher extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [
        {
          name: 'sangram',
          rating_number: 4,
          ratinng_text: 'nice',
          date: 10 / 10 / 21,
          image:
            'https://www.aqualogis.co.uk/wp-content/uploads/2018/07/Zest-AL-White_Decalc-500x500.jpg',
        },
        {
          name: 'sangram',
          rating_number: 4,
          ratinng_text: 'nice',
          date: 10 / 10 / 21,
          image:
            'https://www.aqualogis.co.uk/wp-content/uploads/2018/07/Zest-AL-White_Decalc-500x500.jpg',
        },
      ],
      cartList: [],
      loader: false,
      setindex: null,
      pageNo: 1,
      showResultScreen: null,
      btnloader: null,
      Offline: false,
      loadingMore: false,
      bannerad: [{ bannerAd: 1 }],
      shoadd: null,
    };
    this.count = React.createRef(0);
  }

  componentDidMount() {
    this.getApiData();
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      console.log(Offline, 'hiiii');
      this.setState({ Offline: Offline });
    });
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        // this.getApiData();
      },
    );
  }
  componentWillUnmount() {
    this.willFocusSubscription;
    this.removeNetInfoSubscription;
  }
  getApiData = x => {
    this.setState({ loader: true });
    let url = x;

    return CallApi('GET', 'brochure-section', '').then(res => {
      console.log(res, 'ghjjjjj');
      try {
        this.setState({
          productsData: res,
          loadingMore: false,
          loader: false,

          showResultScreen: res.next,
        });
      } catch (error) {
        console.log(error);
      }
    });
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
          //   this.getApiData('loader off');
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
  getItemLayout = (data, index) => ({ length: 100, offset: 100 * index, index });
  renderItem = ({ item, index }) => (
    <>
      {item.bannerAd ? (
        <View style={{ height: 250, width: '100%', marginBottom: 20 }}>
          <BannerAd
            size={BannerAdSize.MEDIUM_RECTANGLE}
            unitId={TestIds.BANNER}
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
        <Pressable
          style={styles.card}
          onPress={() =>
            this.props.navigation.navigate('BroucherLanguage', { item })
          }>
          <View style={styles.cardHeader}>
            <Image
              source={{
                uri: item.brochure_image
                  ? item.brochure_image
                  : Imageurl.noimage,
              }}
              style={styles.cardImage}
              // onLoad={this.onImageLoad}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.primary,
              overflow: 'hidden',
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
            }}>
            <Text style={styles.title} numberOfLines={1}>
              {item.brochure_name}
            </Text>
          </View>
        </Pressable>
      )}
    </>
  );
  updateTotalItem() {
    let data = this.state.cartList;
    let val = this.state.cartList.length;
    // let val = 0;
    // data.map(item => {
    //   val = val + item.productQty;
    // });
    this.props.updateCartNumber(val);
    return val;
  }
  render() {
    const VIEWABILITY_CONFIG = {
      minimumViewTime: 300,
      viewAreaCoveragePercentThreshold: 100,
      waitForInteraction: true,
    };
    //   console.log(this.props.route.params.item.category.id);
    return (
      <View style={GlobalStyles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title={'Broucher'}
          cartnumber={this.updateTotalItem()}
          coin={this.props.coin}
        />
        {this.state.Offline ? (
          <NoInternetModal
            show={this.state.Offline}
            onRetry={this.getApiData}
            isRetrying={this.state.loader}
          />
        ) : null}
        {this.state.loader ? (
          <Loader />
        ) : (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.productsData}
            horizontal={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
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
            ListFooterComponent={this.ListFooterComponent2}
            // numColumns={2}
            // onEndReached={this.onScrollHandler}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            numColumns={2}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

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
    width: width / 2.2,
    // alignSelf: 'center',
    borderRadius: 3,
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    // flex: 1,

    width: '100%',
    height: 220,
  },
  /******** card components **************/
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
    padding: 5,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingBottom: 8,
  },
  price: {
    fontSize: 16,
    color: Colors.light_dark,
    marginTop: 5,
    fontWeight: 'bold',
  },
  priceright: {
    fontSize: 16,
    color: Colors.light_dark,
    marginTop: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  pricedecorate: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 16,
    color: Colors.light_dark,
    marginTop: 5,
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,

    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  priceView: {
    flexDirection: 'row',
  },
});

const mapStateToProps = state => {
  return {
    cartNumber: state.CartReducer.cartNumber,
    userid: state.UserLoginReducer.loginUser,
    coin: state.CoinReducer.coinNumber,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCartNumber }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Broucher);
