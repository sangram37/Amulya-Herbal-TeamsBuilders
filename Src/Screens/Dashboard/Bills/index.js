import React, {Component} from 'react';
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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CallApi} from '../../../CallApi';
import GlobalStyles from '../../../Components/GlobalStyle';
import Loader from '../../../Components/Loader';
import MainHeader from '../../../Components/MainHeader';
import ToastMessage from '../../../Components/ToastMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../Constants/Colors';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');
//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class Bills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateComp: false,
      qytloader: false,
      cartList: [
        // {
        //   id: 1,
        //   title: 'Product 1',
        //   price: '25.00',
        //   image: 'https://picsum.photos/200/300',
        //   numberOfItem: 2,
        // },
        // {
        //   id: 2,
        //   title: 'Product 2',
        //   price: '10.13',
        //   image: 'https://picsum.photos/200/301',
        //   numberOfItem: 2,
        // },
        // {
        //   id: 3,
        //   title: 'Product 3',
        //   price: '12.12',
        //   image: 'https://picsum.photos/200/302',
        //   numberOfItem: 2,
        // },
      ],
      loader: false,
      setindex: null,
      address: {},
      dppoint_modal: false,
      dppoint: '',
      dppoint_arr: [],
    };
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
    let data = this.state.cartList;
    let val = 0;
    data.map(item => {
      val = val + Number(item.product.discount) * Number(item.productQty);
    });
    return val; //54
  }
  TotalSavings() {
    let data = this.state.cartList;
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
    let data = this.state.cartList;
    let val = 0;
    data.map(item => {
      val = val + Number(item.product.productPrice) * Number(item.productQty);
    });
    return val; //54
  }
  componentDidMount() {
    this.getDpData();
    this.getApiData();
    this.getAddress();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getApiData();
        this.getAddress();
      },
    );
  }
  getApiData = x => {
    {
      x ? null : this.setState({loader: true});
    }
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', 'cart', '').then(res => {
      this.setState({loader: false, qytloader: false, setindex: null});
      console.log('res alldata', res);

      try {
        this.setState({cartList: res});
      } catch (error) {
        // ToastMessage({
        //   type: 'type_info',
        //   text: 'Please Login Your Account',
        // });
      }
    });
  };
  updateCartLoc = (item, type, index) => {
    this.setState({
      qytloader: true,
      setindex: index,
    });
    let qty =
      type == '+' ? Number(item.productQty) + 1 : Number(item.productQty) - 1;
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    let form = JSON.stringify({
      productQty:
        type == '+' ? Number(item.productQty) + 1 : Number(item.productQty) - 1,
    });
    console.log(form);
    if (qty === 0) {
      return CallApi('DELETE', `delete/cart/${item.id}/`, form).then(res => {
        // this.setState({qytloader: false, setindex: null});
        console.log('res update cart', res);
        try {
          this.getApiData('x');
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
          this.getApiData('x');
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    }
  };
  billgenerate = () => {
    let form = JSON.stringify({
      user: 1,
      shippingDetails: '1',
      distributionpoint: this.state.dppoint,
    });
    console.log(form);
    if (this.state.dppoint === '') {
      ToastMessage({
        text: 'Please chose distributionpoint',
        type: 'type_info',
      });
    } else {
      this.setState({loader: true});
      return CallApi('POST', `generate/order/`, form).then(res => {
        // this.setState({qytloader: false, setindex: null});
        console.log('res order', res);
        this.setState({loader: false});
        try {
          this.getApiData();
        } catch (error) {
          ToastMessage({
            text: error,
            type: 'type_info',
          });
        }
      });
    }
  };
  getAddress = () => {
    this.setState({loader: true});
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', `shipping/address/?user=${this.props.userid}`, '').then(res => {
      this.setState({loader: false});
      console.log('res alldata', res);

      try {
        this.setState({address: res[0]});
      } catch (error) {
        ToastMessage({
          text: error,
          type: 'type_info',
        });
      }
    });
  };
  getDpData = () => {
    this.setState({loader: true});
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', 'distributionpoint', '').then(res => {
      this.setState({loader: false});
      console.log('res dpdat', res);

      try {
        this.setState({dppoint_arr: res});
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };

  render() {
    const {address} = this.state;
    return (
      <View style={GlobalStyles.container}>
        <MainHeader
          navigation={this.props.navigation}
          cartnumber={this.props.cartNumber}
          image={this.props.user ? this.props.user.profile_picture : Imageurl}
        />
        {this.state.loader ? (
          <Loader />
        ) : (
          <View style={GlobalStyles.container}>
            {this.state.cartList.length ? (
              <ScrollView>
                <FlatList
                  data={this.state.cartList}
                  renderItem={({item, index}) => {
                    return Number(item.productQty) >= 0 ? (
                      <>
                        <View style={styles.cartListItemWrapper}>
                          <View style={styles.cartListItemWrapperInner}>
                            <View style={styles.cartImageSection}>
                              <Image
                                style={styles.productImageStyle}
                                source={{
                                  uri: 'https://picsum.photos/200/302',
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
                                  <Text style={styles.price}>MRP :{''}</Text>
                                  <Text style={styles.price}>
                                    ₹
                                    {Number(
                                      Number(item.product.productPrice) *
                                        item.productQty,
                                    )}
                                  </Text>
                                </View>
                                <View
                                  style={{...styles.priceView, marginRight: 5}}>
                                  <Text style={styles.price}>DP :{''}</Text>
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
                                  <Text style={styles.price}>BV :{''}</Text>
                                  <Text style={styles.price}>
                                    ₹
                                    {Number(
                                      Number(item.product.businessVolume) *
                                        item.productQty,
                                    )}
                                  </Text>
                                </View>
                                <View
                                  style={{...styles.priceView, marginRight: 5}}>
                                  <Text style={styles.price}>PV :{''}</Text>
                                  <Text style={styles.price}>
                                    ₹{' '}
                                    {Number(
                                      Number(item.product.personalVolume) *
                                        item.productQty,
                                    )}
                                  </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',

                                  width: width / 4,
                                }}>
                                <TouchableOpacity
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
                                  disabled={this.state.setindex ? true : false}
                                  onPress={() => {
                                    this.updateCartLoc(item, '-', index);
                                    this.setState({
                                      updateComp: !this.state.updateComp,
                                    });
                                  }}>
                                  <Feather
                                    style={{fontSize: 27, color: 'white'}}
                                    name="minus-circle"
                                  />
                                </TouchableOpacity>
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
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: Colors.primary,
                                    borderRadius: 100,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    width: 30,
                                    height: 30,
                                  }}
                                  disabled={this.state.setindex ? true : false}
                                  onPress={() => {
                                    this.updateCartLoc(item, '+', index);
                                  }}>
                                  <Feather
                                    style={{fontSize: 27, color: 'white'}}
                                    name="plus-circle"

                                    // type="Ionicons"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </>
                    ) : null;
                  }}
                />

                {/* Address  */}

                <View
                  style={{
                    justifyContent: 'space-between',
                    padding: 10,
                    borderTopWidth: 0.5,
                    borderTopColor: '#fff',
                  }}>
                  <Text
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
                  </Text>
                  <Text
                    style={{
                      overflow: 'hidden',
                      // paddingLeft: 10,
                      fontSize: 15,
                    }}>
                    {address.address}, {address.city}, {address.state},
                    {address.pincode},{address.mobileNumber}
                  </Text>
                </View>
                <View
                  style={{...styles.line, borderTopWidth: 1, elevation: 2}}
                />
                {/* Address end */}
                <View
                  style={{
                    ...styles.mainview,
                    backgroundColor: '#D3D3D3',
                    borderWidth: 0,
                  }}>
                  {Platform.OS === 'android' ? (
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={this.state.dppoint}
                        mode="dialog"
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({dppoint: itemValue});
                        }}>
                        <Picker.Item
                          label="Plaese chose distributionpoint"
                          value=""
                          key="key"
                        />
                        {this.state.dppoint_arr.map((item, index) => {
                          return (
                            <Picker.Item
                              label={item.dpName}
                              value={item.id}
                              key={`key+${index}`}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                  ) : (
                    <View style={styles.pickerWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            dppoint_modal: !this.state.dppoint_modal,
                          });
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        {this.state.reminder ? (
                          <Text>{this.state.dppoint}</Text>
                        ) : (
                          <Text>please select distributionpoint</Text>
                        )}
                        <AntDesign name="caretdown" size={12} color="#000" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                {this.state.dppoint_modal && (
                  <>
                    <Modal
                      transparent={true}
                      animationType="slide"
                      visible={this.state.dppoint_modal}>
                      <View style={styles.modal}>
                        <View>
                          <Picker
                            selectedValue={this.state.dppoint}
                            mode="dialog"
                            onValueChange={(itemValue, itemIndex) => {
                              this.setState({dppoint: itemValue});
                            }}>
                            <Picker.Item
                              label="Plaese chose city"
                              value=""
                              key="key"
                            />
                            {this.state.dppoint_arr.map((item, index) => {
                              return (
                                <Picker.Item
                                  label={item.dpName}
                                  value={item.id}
                                  key={`key+${index}`}
                                />
                              );
                            })}
                          </Picker>

                          <TouchableOpacity
                            style={styles.modalbutton}
                            onPress={() =>
                              this.setState({
                                dppoint_modal: !this.state.dppoint_modal,
                              })
                            }>
                            <Text style={{color: Colors.white}}>Select</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </>
                )}
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
                  <View style={{...styles.total_Sub_view, marginTop: 10}}>
                    <Text style={{...styles.total_head_text, color: '#888'}}>
                      MRP Total
                    </Text>
                    <Text style={styles.total_amt_text}>
                      ₹ {this.mrpTotal()}
                    </Text>
                  </View>
                  <View style={{...styles.line, marginVertical: 3}} />
                  <View style={styles.total_Sub_view}>
                    <Text style={{...styles.total_head_text, color: '#888'}}>
                      Product Discount
                    </Text>
                    <Text style={styles.total_amt_text}>
                      -₹ {this.TotalSavings()}
                    </Text>
                  </View>
                  <View style={styles.line} />
                  <View style={{...styles.total_Sub_view}}>
                    <Text style={styles.total_head_text}>Total Amount</Text>
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
            {/* Payment Details end */}
            {this.state.cartList.length ? (
              <View style={styles.footer}>
                <View style={styles.footertextview}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  <Text style={styles.footerheader}>₹ {this.TotalPrice()}</Text>
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
                    onPress={this.billgenerate}>
                    <Text
                      style={{fontSize: 18, color: '#fff', letterSpacing: 0.5}}>
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
  footerheader: {fontSize: 18},
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
    loginUserStatus: state.UserLoginReducer.loginUserStatus,
    userid: state.UserLoginReducer.loginUser,
    user: state.ProfileReducer.userdata,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Bills);
