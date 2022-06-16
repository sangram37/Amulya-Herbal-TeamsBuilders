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
} from 'react-native';
import { CallApi } from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';
import BackHeader from '../../../Components/Header/BackHeader';
import Loader from '../../../Components/Loader';
import ProgressiveImage from '../../../Components/ProgressiveImage';
import ToastMessage from '../../../Components/ToastMessage';
import Colors from '../../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
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
import { NoInternetModal } from '../../../Components/NoInternetModal';
let stopFetchMore = false;
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: 'The product has been added to your cart',
          price: 'Rs 25.00',
          image: 'https://picsum.photos/200/300',
        },
        {
          id: 2,
          title: 'Product 2',
          price: 'Rs 10.13',
          image: 'https://picsum.photos/200/301',
        },
        {
          id: 3,
          title: 'Product 3',
          price: 'Rs 12.12',
          image: 'https://picsum.photos/200/302',
        },
        {
          id: 4,
          title: 'Product 4',
          price: 'Rs 11.00',
          image: 'https://picsum.photos/200/3003',
        },
        {
          id: 5,
          title: 'Product 5',
          price: 'Rs 20.00',
          image: 'https://picsum.photos/200/3004',
        },
        {
          id: 6,
          title: 'Product 6',
          price: 'Rs 33.00',
          image: 'https://picsum.photos/200/3005',
        },
        {
          id: 7,
          title: 'Product 7',
          price: 'Rs 20.95',
          image: 'https://picsum.photos/200/3008',
        },
        {
          id: 8,
          title: 'Product 8',
          price: 'Rs 13.60',
          image: 'https://picsum.photos/200/3030',
        },
        {
          id: 9,
          title: 'Product 9',
          price: 'Rs 15.30',
          image: 'https://picsum.photos/200/3040',
        },
        {
          id: 9,
          title: 'Product 10',
          price: 'Rs 21.30',
          image: 'https://picsum.photos/200/3052',
        },
      ],
      products: [],
      productsData: [],
      cartList: [],
      loader: false,
      setindex: null,
      pageNo: 1,
      showResultScreen: null,
      Offline: false,
      loadingMore: false,
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
            ? this.setState({ cartList: res })
            : this.setState({ cartList: res }, () => this.getApiData('load'));
        }
      } catch (error) {
        this.setState({ loader: false });
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
    this.getCartData();
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      console.log(Offline, 'hiiii');
      this.setState({ Offline: Offline });
    });
  }
  componentWillUnmount() {
    this.removeNetInfoSubscription;
  }
  getApiData = x => {
    {
      x ? null : this.setState({ loader: true });
    }

    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi(
      'GET',
      `tagpivot/?category=${this.props.route.params.item.category.id}&page=${this.state.pageNo}`,
      '',
    ).then(res => {
      this.setState({ loader: false });
      console.log('res alldata', res);

      try {
        this.setState({
          products: [...this.state.products, ...res.results],
          productsData: [...this.state.products, ...res.results],
          showResultScreen: res.next,
          loadingMore: false,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  addtocart = id => {
    this.setState({ loader: true });
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
    if (!stopFetchMore) {
      this.setState({ pageNo: this.state.pageNo + 1, loadingMore: true }, () => {
        this.getApiData('loader off');
        stopFetchMore = true;
      });
    }
  };
  ListFooterComponent = () => (
    <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
      }}>
      Loading...
    </Text>
  );
  render() {
    //   console.log(this.props.route.params.item.category.id);
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
            onRetry={this.getCartData}
            isRetrying={this.state.loader}
          />
        ) : null}
        {this.state.loader ? (
          <Loader />
        ) : (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.products}
            horizontal={false}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: height / 2,
                }}>
                {/* <Text>No Search Result Found</Text> */}
                <Text>No Products Found</Text>
              </View>
            )}
            ListFooterComponent={() =>
              this.state.loadingMore && <ListFooterComponent />
            }
            onEndReached={
              this.state.showResultScreen ? this.onScrollHandler : null
            }
            onEndReachedThreshold={0.5}
            onScrollBeginDrag={() => {
              stopFetchMore = false;
            }}
            // numColumns={2}
            keyExtractor={item => {
              return item.id;
            }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            // ItemSeparatorComponent={
            //   e => this.seperator(e)
            //   // return <View style={styles.separator} />;
            // }
            renderItem={({ item, index }) => {
              // console.log('bapisks', item.product.productImages[0]);
              return (
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
                          item.product.productImages.length >= 1
                            ? item.product.productImages[0]
                            : Imageurl.noimage,
                      }}
                      style={styles.cardImage}
                      // onLoad={this.onImageLoad}
                      resizeMode="cover"
                    />
                    <View
                      style={{ marginLeft: 10, justifyContent: 'space-between' }}>
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
                        <Text style={styles.priceright}>
                          ₹ {item.product.discount}
                        </Text>
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
                          style={{ marginTop: 5, width: width / 2.5 }}
                          onPress={() => this.addtocart(item.product.id)}>
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
                            {'ADD TO CART'}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{ marginTop: 5, width: width / 2.5 }}
                          onPress={() => {
                            // this.props.navigation.navigate('');
                            this.props.navigation.dispatch(
                              CommonActions.reset({
                                index: 1,
                                routes: [{ name: 'CartList' }],
                              }),
                            );
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
              );
            }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
