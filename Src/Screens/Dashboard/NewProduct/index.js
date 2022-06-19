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
import { BASE_URL } from '../../../Constants/ApiConstants';
let stopFetchMore = false;
let bannerid = 'ca-app-pub-6922004427566783/2162384474';
class NewProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [],
      products: [],
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
      addsense_count: null,
      banneraddid: '',
    };
    this.count = React.createRef(0);
  }
  getAddedCart(item) {
    let cartListType = this.state.cartList;
    let addedItem = 0;
    let findIndex = cartListType.findIndex(
      o => o.product.id == item.product.id,
    );
    // console.log('bapi', findIndex);
    if (findIndex != -1) {
      addedItem = cartListType[findIndex].productQty;
    }
    // console.log('addedItem', addedItem);
    return addedItem;
  }
  getCartData = x => {
    {
      x ? null : this.setState({ loader: true });
    }

    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', `cart/?user=${this.props.userid}`, '').then(res => {
      // console.log('res cartlist', res);

      try {
        {
          x
            ? this.setState({ cartList: res, btnloader: null })
            : this.setState({ cartList: res, btnloader: null }, () =>
              this.getApiData(),
            );
        }
      } catch (error) {
        this.setState({ loader: false, btnloader: null });
        // ToastMessage({
        //   type: 'type_info',
        //   text: 'Please Login Your Account',
        // });
      }
    });
  };
  addProductToCart = () => {
    Alert.alert('Success', 'The product has been added to your cart');
  };
  componentDidMount() {
    this.getaddapilist();
    this.AddsenseCount();
    this.getCartData();

    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      console.log(Offline, 'hiiii');
      this.setState({ Offline: Offline });
    });
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getCartData('x');
      },
    );
  }
  componentWillUnmount() {
    this.willFocusSubscription;
    this.removeNetInfoSubscription;
  }
  getApiData = x => {
    let url = x
      ? this.state.showResultScreen
      : `${BASE_URL}tagpivot/?category=${this.props.route.params.item.category.id}&page=${this.state.pageNo}`;

    return CallApiPagination('GET', url, '').then(res => {
      try {
        this.setState(
          {
            products: res.results,

            showResultScreen: res.next,
          },
          () => this.ProductsArr(),
        );
      } catch (error) {
        console.log(error);
      }
    });
  };
  ProductsArr = () => {
    let mainarray = this.state.products;
    let productsArray = mainarray;
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log(productsArray)
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    console.log('->>>>>>>>>>>>>>');
    let ind = 0;
    productsArray.map((item, index) => {
      // console.log(index)
      if (
        index !== 0 &&
        index % Number(this.state.addsense_count?.product_list) == 0
      ) {
        console.log(index + ind);
        productsArray.splice(index + ind, 0, { bannerAd: true });
        ind++;
      }
    });
    this.setState({
      loadingMore: false,
      loader: false,
      productsData: [...this.state.productsData, ...productsArray],
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
          showResultScreen: res.next,
        });
      } catch (error) {
        console.log(error);
      }
    });
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
  addtocart = (id, index) => {
    this.setState({ btnloader: index });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    let form = JSON.stringify({
      user: this.props.userid,
      product: id,
      productQty: 1,
    });
    return CallApi('POST', `add/cart`, form).then(res => {
      this.setState({ loader: false });
      // console.log('res add to cart', res);

      try {
        this.getCartData('x');
      } catch (error) {
        console.log(error);
        // ToastMessage({
        //   test: error,
        //   type: 'type_info',
        // });
      }
    });
  };
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
  seperator = e => {
    this.count.current += 1;
    return this.count.current % 5 == 0 ? (
      <BannerAd
        size={BannerAdSize.MEDIUM_RECTANGLE}
        unitId={TestIds.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10 }}
        onAdFailedToLoad={error => console.log(error)}
      // ref={this.banref}
      />
    ) : (
      <View style={styles.separator} />
    );
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
  getItemLayout = (data, index) => ({ length: 100, offset: 100 * index, index });
  renderItem = ({ item, index }) => (
    <>
      {item.bannerAd ? (
        <View style={{ height: 250, width: '100%', marginBottom: 20 }}>
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
            onAdLoaded={() => console.log('comp add')}
          />
        </View>
      ) : (
        <Pressable
          style={styles.card}
          onPress={() =>
            this.props.navigation.navigate('ProductDetails', { item })
          }>
          <View style={styles.cardHeader}>
            {/* <Image style={styles.cardImage} source={{uri: item.image}} /> */}
            {/* <ProgressiveImage
                    thumbnailSource={{
                      uri: `${item.image}?w=50&buster=${Math.random()}`,
                    }}
                    source={{
                      uri: `${item.image}?w=${
                        width * 2
                      }&buster=${Math.random()}`,
                    }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  /> */}

            <Image
              source={{
                uri:
                  item.product && item.product.productImages.length >= 1
                    ? item.product.productImages[0]
                    : Imageurl.noimage,
              }}
              style={styles.cardImage}
              // onLoad={this.onImageLoad}
              resizeMode="cover"
            />
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.title} numberOfLines={1}>
                {item.product.productName}
              </Text>
              <View style={styles.titleDescView}>
                <Text style={styles.titleTextStyle} numberOfLines={2}>
                  Quantity : {item.product.quantity}
                </Text>
              </View>

              <View style={styles.priceView}>
                <Text style={styles.price}>MRP :{''}</Text>
                <Text style={styles.priceright}>
                  ₹{item.product.productPrice}
                </Text>
              </View>
              <View style={{ ...styles.priceView }}>
                <Text style={styles.price}>DP :{''}</Text>
                <Text style={styles.priceright}>₹ {item.product.discount}</Text>
              </View>

              <View style={styles.priceView}>
                <Text style={styles.price}>BV :{''}</Text>
                <Text style={styles.priceright}>
                  {item.product.businessVolume}
                </Text>
              </View>
              <View style={{ ...styles.priceView }}>
                <Text style={styles.price}>PV :{''}</Text>
                <Text style={styles.priceright}>
                  {item.product.personalVolume}
                </Text>
              </View>

              {this.getAddedCart(item) == 0 ? (
                <TouchableOpacity
                  style={{
                    marginTop: 5,
                    width: width / 2.5,
                    flexDirection: 'row',
                    backgroundColor: Colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                  onPress={() => this.addtocart(item.product.id, index)}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'white',
                      alignItems: 'center',
                      // alignSelf: 'center',
                      fontStyle: 'normal',
                      fontWeight: 'bold',

                      textAlign: 'center',
                    }}>
                    {'ADD TO CART'}
                  </Text>
                  {index === this.state.btnloader ? (
                    <ActivityIndicator size="small" color={Colors.white} />
                  ) : null}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ marginTop: 5, width: width / 2.5 }}
                  onPress={() => {
                    this.props.navigation.navigate('CartList');
                    // this.props.navigation.dispatch(
                    //   CommonActions.reset({
                    //     index: 1,
                    //     routes: [{name: 'CartList'}],
                    //   }),
                    // );
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'white',
                      alignItems: 'center',
                      // alignSelf: 'center',
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      backgroundColor: Colors.primary,
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                      textAlign: 'center',
                    }}>
                    {'GO TO CART'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      )}
    </>
  );

  render() {
    const VIEWABILITY_CONFIG = {
      minimumViewTime: 300,
      viewAreaCoveragePercentThreshold: 100,
      waitForInteraction: true,
    };
    console.log(this.state.banneraddid, 'hiii');
    return (
      <View style={GlobalStyles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title={'Products'}
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
            onEndReached={
              this.state.showResultScreen ? this.onScrollHandler : null
            }
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
    width: '98%',
    alignSelf: 'center',
    borderRadius: 3,
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    // flex: 1,

    width: width / 2.2,
  },
  /******** card components **************/
  title: {
    fontSize: 16,
    width: width / 2.5,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
