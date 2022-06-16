import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {addToResentView} from '../../../Redux/Actions/ResentViewAction';

//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ToastMessage from '../../../Components/ToastMessage';
import {CallApi} from '../../../CallApi';
import Imageurl from '../../../Constants/Imageurl';
// import Fonts from '../../../Constants/Fonts';
const {height, width} = Dimensions.get('screen');
const SearchScreen = props => {
  const [searchData, setSearchData] = useState([]);
  const [searchDataPrev, setSearchDataPrev] = useState([]);
  const [query, setQuery] = useState('');
  const [loyalty, setLoyalty] = useState(false);

  //   useEffect(() => callSearchNetworkCall(), []);

  const handelSearch = query => {
    console.log(query.length);
    setQuery(query);
    let url = loyalty
      ? `products/?search=${query}&loyalty=true`
      : `products/?search=${query}`;
    if (query.length > 2) {
      return CallApi('GET', url, '').then(res => {
        // this.setState({qytloader: false, setindex: null});
        console.log('res update ', res);
        try {
          setSearchData(res.results);
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    } else {
      //   setSearchData(searchDataPrev);
      setSearchData([]);
    }
  };
  const handelSearchloyalty = query => {
    setLoyalty(!loyalty);
    console.log(query.length);
    setQuery(query);
    let url = loyalty
      ? `products/?search=${query}&loyalty=true`
      : `products/?search=${query}`;
    if (query.length > 2) {
      return CallApi('GET', url, '').then(res => {
        // this.setState({qytloader: false, setindex: null});
        console.log('res update ', res);
        try {
          setSearchData(res.results);
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    } else {
      //   setSearchData(searchDataPrev);
      setSearchData([]);
    }
  };
  const navigationDetails = item => {
    props.navigation.navigate('ProductDetails', {
      id: item.productId,
      item,
    });
    props.addToResentView(props.resentView, item);
  };

  return (
    <View style={styles.containerParent}>
      <View style={styles.container}>
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
                placeholder="Search Aqualogis"
                clearButtonMode="always"
                value={query}
                onChangeText={query => handelSearch(query)}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                keyboardType="default"
                autoFocus={true}
              />
            </View>
            <View style={styles.micBtnView}>
              {/* <Ionicons name="mic-outline" size={25} color={Colors.dark} /> */}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={styles.cancelView}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() => handelSearchloyalty(query)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            marginLeft: 10,
          }}>
          <Feather
            name={loyalty ? 'check-square' : 'square'}
            size={Platform.OS === 'ios' ? 25 : 25}
            color={Colors.dark}
          />

          <Text
            style={{
              marginHorizontal: 10,

              // fontFamily: Fonts.Akt_regular,
              fontSize: 12,
            }}>
            LOYALTY
          </Text>
        </Pressable>

        <View style={{height: 1, borderBottomWidth: 0.5, paddingTop: 10}} />

        {/* {searchData && (
          <View>
            {searchData.length > 0 ? null : (
              <View
                style={{
                //   flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:height,

                }}>
                <Text>No Search Result Found</Text>
              </View>
            )}
          </View>
        )} */}

        <View>
          <FlatList
            data={searchData}
            keyExtractor={index => index + 1}
            renderItem={({item}) => {
              return (
                <>
                  <Pressable
                    onPress={() =>
                      props.navigation.navigate('ProductDetails', {item})
                    }
                    style={{flexDirection: 'row', paddingVertical: 10}}>
                    <View
                      style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{
                          uri:
                            item.productImages.length >= 1
                              ? item.productImages[0]
                              : Imageurl.noimage,
                        }}
                        style={{width: 40, height: 40}}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.6,
                        justifyContent: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{...styles.fontText, fontSize: 11}}>
                        {item.productName}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...styles.fontText,
                          fontSize: 12,
                          marginBottom: Platform.OS === 'ios' ? 4 : 0,
                        }}>
                        {item.brand.BrandName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                      }}>
                      <Text
                        style={{
                          ...styles.fontText,
                          fontSize: 13,
                          color: Colors.pale_red,
                          marginBottom: Platform.OS === 'ios' ? 4 : 0,
                        }}>
                        Now ₹{item.discount}
                      </Text>
                      <Text
                        style={{
                          ...styles.fontText,
                          fontSize: 11,
                          color: Colors.light_gray,
                        }}>
                        Was ₹{item.productPrice}
                      </Text>
                    </View>
                  </Pressable>
                  <View
                    style={{height: 1, borderBottomWidth: 0.5, opacity: 0.3}}
                  />
                </>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: Platform.OS === 'ios' ? '10%' : 10,
  },
  containerParent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchBarContainer: {
    marginHorizontal: 10,
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
  fontText: {
    // fontFamily: Fonts.Akt_regular,
  },
});
const mapStateToProps = state => {
  return {
    //   CategoryScreenData: state.CategoryReducer,
    resentView: state.ResentViewReducer.resentView,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
