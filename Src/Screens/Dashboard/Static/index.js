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
import AntDesign from 'react-native-vector-icons/AntDesign';
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
const { width, height } = Dimensions.get('window');
var UNIT_ID_BANNER = 'ca-app-pub-9200460973857767/4128532871';
import YoutubePlayer from 'react-native-youtube-iframe';
import BackHeader from '../../../Components/Header/BackHeader';
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
class Static extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      name_address: '',
      section: [],
      category: [],
    };
    this.banref = React.createRef();
  }
  componentDidMount() {
    // this.getApiData();
    console.log(this.props.route.params.item);
    // this.getApisection();
  }

  getApisection = () => {
    this.setState({ loader: true });
    return CallApi(
      'GET',
      `video/?section=${this.props.route.params.item.title}`,
      '',
    ).then(res => {
      this.setState({ loader: false });
      console.log('res alldata', res);
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
  filterdatas = () => {
    let filterdata = this.state.section;
    let data = filterdata.filter(item => item.section_name == 'why_modicare');
    // console.log('jdk', data);
    return data;
  };

  checkvideoId = url => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
      var b = match[7];
      return b;
    } else {
      alert('Url incorrecta');
    }
  };
  render() {
    // console.log(this.props.userid, 'sangram');
    return (
      <View style={styles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title={this.props.route.params.item.title}
          coin={this.props.coin}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  listContainer: {
    paddingTop: 15,
    // alignItems: "center",
  },
  /******** card **************/
  boxview: {
    // flexDirection: 'row',
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
    width: '100%',

    // borderRadius: 10,
    // alignItems: 'center',
    justifyContent: 'space-around',
    // paddingTop: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginTop: -20,
    marginBottom: 10,
    marginLeft: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(Static);
