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
  TextInput,
} from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { CallApi } from '../../CallApi';
import GlobalStyles from '../../Components/GlobalStyle';
import BackHeader from '../../Components/Header/BackHeader';
import Loader from '../../Components/Loader';
import ToastMessage from '../../Components/ToastMessage';
import Colors from '../../Constants/Colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//redux
class Dp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      data: [
        {
          id: 1,
          title: 'TEAM BUILDERS ACCESS POINT (TFS STORE)',
          price: 'Rs 25.00',
          image: 'https://picsum.photos/200/300',
          navigation: 'DpList',
        },
        {
          id: 2,
          title: 'TEAM BUILDERS LIFESTYLE CENTER',
          price: 'Rs 10.13',
          image: 'https://picsum.photos/200/301',
          navigation: 'DpList',
        },
        {
          id: 3,
          title: 'TEAM BUILDERS SUCCESS CENTER (MSC)',
          price: 'Rs 12.12',
          image: 'https://picsum.photos/200/302',
          navigation: 'DpList',
        },
        {
          id: 4,
          title: 'TEAM BUILDERS SUPER SORE',
          price: 'Rs 11.00',
          image: 'https://picsum.photos/200/3003',
          navigation: 'DpList',
        },
        {
          id: 5,
          title: 'DISTRIBUTION POINTS (DPS)',
          price: 'Rs 20.00',
          image: 'https://picsum.photos/200/3004',
          navigation: 'DpList',
        },
      ],
      dplist: [],
      query: '',
    };
  }
  componentDidMount() {
    // this.getApiData();
  }
  getApiData = () => {
    this.setState({ loader: true });
    // let form = new FormData();
    // form.append('lat', this.props.lat);
    // form.append('long', this.props.long);
    return CallApi('GET', 'distributionpoint', '').then(res => {
      this.setState({ loader: false });
      console.log('res alldata', res);

      try {
        this.setState({ dplist: res });
      } catch (error) {
        ToastMessage({
          test: error,
          type: 'type_info',
        });
      }
    });
  };

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
          <View style={GlobalStyles.container}>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.data}
              horizontal={false}
              // numColumns={2}
              keyExtractor={item => {
                return item.id;
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={post => {
                const item = post.item;
                return (
                  <Pressable
                    style={styles.card}
                    onPress={() =>
                      this.props.navigation.navigate(item.navigation)
                    }>
                    <Text style={styles.title}>{item.title}</Text>
                  </Pressable>
                );
              }}
            />
          </View>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dp);

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
});
