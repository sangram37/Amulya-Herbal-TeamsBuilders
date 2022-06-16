import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SwiperComponent from '../../../common/SwiperComponent';
// import Stars from 'react-native-stars';
import { ScrollView } from 'react-native-gesture-handler';
import { CallApi } from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';
import BackHeader from '../../../Components/Header/BackHeader';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCartNumber } from '../../../Redux/Actions/CartAction';
import Loader from '../../../Components/Loader';
import Colors from '../../../Constants/Colors';
//redux
const styles = StyleSheet.create({
  myStarStyle: {
    color: '#000',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});
import NetInfo from '@react-native-community/netinfo';
import { NoInternetModal } from '../../../Components/NoInternetModal';
class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productdetails: {},
      productsImage: [],
      cartList: [],
      loader: false,
      setindex: null,
      Offline: false,
    };
  }
  componentDidMount() {
    this.getCartData();
    this.removeNetInfoSubscription = NetInfo.addEventListener(state => {
      var Offline = !state.isConnected;
      console.log(Offline, 'hiiii');
      this.setState({ Offline: Offline });
    });
    // this.setState({interstitialAd: this.createAd()});
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
  getApiData = () => {
    let id = this.props.route.params.item.product
      ? this.props.route.params.item.product.id
      : this.props.route.params.item.id;
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', `products/${id}`, '').then(res => {
      console.log('res products', res);

      try {
        this.setState({
          productdetails: res,
          productsImage: res.productImages,
          loader: false,
        });
      } catch (error) {
        this.setState({ loader: false });
        ToastMessage({
          test: error,
          type: 'type_info',
        });
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
      console.log('res add to cart', res);

      try {
        this.getCartData();
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };
  getCartData = () => {
    this.setState({ loader: true });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', `cart/?user=${this.props.userid}`, '').then(res => {
      console.log('res cartlist', res);

      try {
        this.setState({ cartList: res }, () => this.getApiData());
      } catch (error) {
        this.setState({ loader: false });
        // ToastMessage({
        //   type: 'type_info',
        //   text: 'Please Login Your Account',
        // });
      }
    });
  };
  getAddedCart = item => {
    let cartListType = this.state.cartList;
    let addedItem = 0;
    let findIndex = cartListType.findIndex(o => o.product.id == item.id);
    // console.log('bapi', findIndex);
    if (findIndex != -1) {
      addedItem = cartListType[findIndex].productQty;
    }
    // console.log('addedItem', addedItem);
    return addedItem;
  };
  render() {
    // console.log('kanha', this.state.productsImage);
    const { productdetails } = this.state;
    return this.state.loader ? (
      <Loader />
    ) : (
      <View style={GlobalStyles.container}>
        {this.state.Offline ? (
          <NoInternetModal
            show={this.state.Offline}
            onRetry={this.getCartData}
            isRetrying={this.state.loader}
          />
        ) : null}
        <BackHeader
          navigation={this.props.navigation}
          title={
            this.props.route.params.item.product
              ? this.props.route.params.item.product.productName
                .split(' ')
                .slice(0, 2)
                .join(' ')
              : this.props.route.params.item.productName
                .split(' ')
                .slice(0, 2)
                .join(' ')
          }
          cartnumber={this.updateTotalItem()}
          coin={this.props.coin}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 340,
                width: '100%',
              }}>
              <SwiperComponent image={this.state.productsImage} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 15,
                marginTop: 20,
                width: '100%',
              }}>
              <View
                style={{
                  width: '65%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Bold',
                    fontSize: 18,
                    color: '#4f4a4a',
                  }}>
                  {productdetails.productName}
                </Text>
              </View>
              <View
                style={{
                  width: '35%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Bold',
                    fontSize: 16,
                    color: '#4f4a4a',
                  }}>
                  LOYALTY - {productdetails.loyalty ? 'YES' : 'NO'}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}></View>
              </View>
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: '#b3aeae',
              }}>
              CODE : {productdetails.productCode}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: Colors.light_dark,
              }}>
              MRP : ₹ {productdetails.productPrice}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: Colors.light_dark,
              }}>
              DP : ₹ {productdetails.discount}
            </Text>
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 16,
                color: '#b3aeae',
              }}>
              Bv : {productdetails.businessVolume}
            </Text>
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 16,
                color: '#b3aeae',
              }}>
              PV : {productdetails.personalVolume}
            </Text>
            <Text
              style={{
                fontFamily: 'Bold',
                fontSize: 16,
                color: '#b3aeae',
              }}>
              PACK SIZE : {productdetails.quantity}
            </Text>
            <Text
              style={{
                fontFamily: 'Medium',
                fontSize: 14,
                lineHeight: 20,
                color: '#b3aeae',
                marginTop: 20,
                marginBottom: 20,
              }}>
              {productdetails.ProductDescription}
            </Text>

            {this.getAddedCart(productdetails) == 0 ? (
              <Pressable
                style={{
                  backgroundColor: Colors.primary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 15,
                }}
                onPress={() => this.addtocart(productdetails.id)}>
                <Image
                  source={require('../../../Assets/Images/bag.png')}
                  style={{ height: 20, width: 16 }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: '#FFF',
                    fontFamily: 'Bold',
                    marginHorizontal: 15,
                  }}>
                  Add to Cart
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  backgroundColor: Colors.primary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 15,
                }}
                onPress={() => this.props.navigation.navigate('CartList')}>
                <Image
                  source={require('../../../Assets/Images/bag.png')}
                  style={{ height: 20, width: 16 }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: '#FFF',
                    fontFamily: 'Bold',
                    marginHorizontal: 15,
                  }}>
                  GO TO CART
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCartNumber }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
