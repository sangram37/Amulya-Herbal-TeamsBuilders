import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Platform,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../Constants/Colors';
const {width, height} = Dimensions.get('screen');
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToastMessage from '../ToastMessage';
import {CallApi} from '../../CallApi';

const CustumDropDown = props => {
  const [onopenModal, setOnopenModal] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [pickerData, setPickerData] = useState([]);
  const [searchData, setsearchData] = useState([]);
  const [dupData, setdupData] = useState(0);
  const [showValue, setShowValue] = useState(props.showValue);

  useEffect(() => {
    setPickerData(props.searchData);
    setsearchData(props.searchData);
  }, []);
  useEffect(() => {
    setdupData(pickerData.length);
  });
  const handelSearch = query => {
    console.log(query.length);
    setSearchText(query);
    let url = `distributionpoint/?search=${query}`;
    if (query.length > 1) {
      //   setPickerData([]);
      return CallApi('GET', url, '').then(res => {
        // this.setState({qytloader: false, setindex: null});
        // console.log('res update ', res);
        try {
          setPickerData(res.results);
        } catch (error) {
          ToastMessage({
            test: error,
            type: 'type_info',
          });
        }
      });
    } else {
      //   setSearchData(searchDataPrev);
      setPickerData(searchData);
    }
  };
  const SearchFilterFunction = text => {
    setSearchText(text);
    console.log(text);
    const newData = props.searchData.filter(function (item) {
      const itemData = item[props.name].toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData);
    setSearchText(text);
    setPickerData(newData);
  };

  const onSelectValue = item => {
    console.log('seleted ', item[props.name]);
    setShowValue(item[props.name]);
    props.selectedItem(item);
    setPickerData(props.searchData);
    setSearchText('');
    setOnopenModal(false);
  };

  let dupData1 = {
    textAlign: 'center',
    marginTop: dupData ? 40 : -10,
    marginBottom: 10,
    fontFamily: props.fontFamily,
    fontSize: 15.5,
  };
  let dupData2 = {
    marginTop: -20,
    fontFamily: props.fontFamily,
    fontSize: 15.5,
    marginTop: -10,
  };
  let dupData3 = {
    marginBottom: 10,
    fontFamily: props.fontFamily,
    fontSize: 15.5,
    marginTop: -10,
  };
  let fontFamily_prop = {
    fontFamily: props.fontFamily,
    marginTop: props.fontFamilyMargin,
  };

  return (
    <View>
      {/* --MODAL DESIGN FOR SEARCH ANIMATION START--  */}
      <Modal
        animationType="slide"
        visible={onopenModal}
        transparent={true}
        onRequestClose={() => {
          setOnopenModal(false);
        }}>
        <Pressable
          style={styles.pressablemain}
          onPress={() => setOnopenModal(false)}>
          <Pressable
            onPress={() => setOnopenModal(false)}
            style={styles.pressableWrapperupperBody}>
            <Pressable>
              <Pressable
                style={styles.pressableWrapperBody}
                onPress={() => setOnopenModal(true)}>
                <Text
                  style={[
                    dupData && dupData1,
                    dupData <= 4 && dupData2,
                    dupData <= 7 && dupData2,
                    dupData <= 8 && dupData2,
                    dupData === 0 && dupData3,
                  ]}>
                  {props.searchTitle || 'searchTitle'}
                </Text>

                <View style={styles.searchBoxWrapper}>
                  <TextInput
                    placeholder={props.placeHolder}
                    onChangeText={text => handelSearch(text)}
                    value={searchText}
                    style={[styles.textInputStyle, fontFamily_prop]}
                    underlineColorAndroid="transparent"
                  />
                  <AntDesign
                    style={styles.searchIconStyle}
                    name="search1"
                    size={20}
                    color={Colors.black}
                  />
                </View>
                <View style={styles.flatListWrapper}>
                  <FlatList
                    data={pickerData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `item-${item.id}`}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => onSelectValue(item)}
                          style={styles.itemStyle}>
                          <Text style={[styles.itemNameStyle, fontFamily_prop]}>
                            Name: {item[props.name]}
                          </Text>
                          <Text style={[styles.itemNameStyle, fontFamily_prop]}>
                            DpId: {item.dpID}
                          </Text>
                          <Text style={[styles.itemNameStyle, fontFamily_prop]}>
                            Address: {item.dpAddress}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </Pressable>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      {/* --MODAL DESIGN FOR SEARCH ANIMATION END-- */}

      {/* --CUSTUMIZE SECTION DESIGN START-- */}

      {/* -- DESIGN TO SHOW IN SCREEN START -- */}
      <TouchableOpacity
        style={styles.inputFiledView}
        onPress={() => {
          setOnopenModal(true);
        }}>
        <Text
          style={{
            ...styles.showValueStyle,
            ...fontFamily_prop,
            color: props.placeHolderValue ? Colors.black : Colors.black,
          }}>
          {props.placeHolderValue ? props.placeHolderValue : showValue}
        </Text>

        <AntDesign
          style={styles.downArrayStyle}
          name="down"
          color={Colors.black}
          size={20}
        />
      </TouchableOpacity>
      {/* -- DESIGN TO SHOW IN SCREEN END -- */}

      {/* --CUSTUMIZE SECTION DESIGN END-- */}
    </View>
  );
};

export default CustumDropDown;

const styles = StyleSheet.create({
  inputFiledView: {
    padding: Platform.OS === 'ios' ? 12 : 12,
    width: '93%',

    // borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    color: Colors.light_dark,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#D3D3D3',
    borderWidth: 0,
    flexDirection: 'row',
  },
  inputFiledViewCustum: {
    padding: Platform.OS === 'ios' ? 12 : 12,
    borderWidth: 1,
    marginHorizontal: 0,
    borderColor: Colors.filterText,
    marginTop: 8,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  itemStyle: {
    marginVertical: 6,
    marginHorizontal: 5,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light_gray,
  },
  itemNameStyle: {
    fontSize: 16,
  },
  textInputStyle: {
    flex: 0.9,
    marginLeft: 15,
  },
  searchIconStyle: {
    flex: 0.1,
    alignSelf: 'center',
  },
  searchBoxWrapper: {
    borderWidth: 0.3,
    width: '100%',
    height: Platform.OS == 'ios' ? 40 : 40,
    backgroundColor: Colors.lighter,
    borderRadius: 5,
    flexDirection: 'row',
  },
  flatListWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  pressableWrapperBody: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 30 : 40,
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  pressableWrapperupperBody: {
    justifyContent: 'center',
    height: Platform.OS == 'ios' ? height / 2 : height / 2,
    width: '95%',
    alignSelf: 'center',
  },
  pressablemain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  showValueStyle: {
    flex: 0.9,
    fontSize: 16,
  },
  downArrayStyle: {
    flex: 0.1,
  },
});
