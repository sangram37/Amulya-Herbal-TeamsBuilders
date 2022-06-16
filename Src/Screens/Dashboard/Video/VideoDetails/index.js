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
import { CallApi } from '../../../../CallApi';
import GlobalStyles from '../../../../Components/GlobalStyle';
import Loader from '../../../../Components/Loader';
import MainHeader from '../../../../Components/MainHeader';
import ToastMessage from '../../../../Components/ToastMessage';
import AntDesign from 'react-native-vector-icons/AntDesign';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../../../Constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//redux
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  GAMBannerAd,
  InterstitialAd,
} from '@react-native-admob/admob';
import Imageurl from '../../../../Constants/Imageurl';
const { width, height } = Dimensions.get('window');
var UNIT_ID_BANNER = 'ca-app-pub-9200460973857767/4128532871';
import YoutubePlayer from 'react-native-youtube-iframe';
import BackHeader from '../../../../Components/Header/BackHeader';
import { NoInternetModal } from '../../../../Components/NoInternetModal';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import Webview from 'react-native-webview';
class VideoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      name_address: '',
      section: [],
      category: [],
      Offline: false,
    };
    this.banref = React.createRef();
  }
  componentDidMount() {
    // this.getApiData();
    // this.getApisection();
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
  getApisection = () => {
    this.setState({ loader: true });
    return CallApi('GET', 'section/', '').then(res => {
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
    // console.log(this.props.route.params.item, 'sangram');
    return (
      <View style={styles.container}>
        <BackHeader
          navigation={this.props.navigation}
          title={this.props.route.params.item.title}
          coin={this.props.coin}
        />
        {this.state.Offline ? (
          <NoInternetModal
            show={this.state.Offline}
            onRetry={this.getApisection}
            isRetrying={this.state.loader}
          />
        ) : null}
        {/* <YoutubePlayer
          videoId={this.checkvideoId(this.props.route.params.item.video_link)}
          // video height -> screen width
          //   height={SCREEN_HEIGHT}
          height={300}
          // video width -> screen height
          width={'100%'}
          // prevent aspect ratio auto sizing
          onFullScreenChange={isfullscreen => {
            console.log('bapi', isfullscreen);
          }}
          webViewProps={{
            injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.paddingBottom = 'unset';
            true;
          `,
          }}
          initialPlayerParams={{
            preventFullScreen: false,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
          }}
        /> */}
        <Webview
          javaScriptEnabled={true}
          scrollEnabled={false}
          allowsFullscreenVideo={true}
          //           userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
          //  (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
          source={{
            uri: `https://www.youtube.com/embed/${this.checkvideoId(
              this.props.route.params.item.video_link,
            )}?&autoplay=0&mute=0&showinfo=0&controls=1&fullscreen=1`,
          }}
        // style={styles.video}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetails);
