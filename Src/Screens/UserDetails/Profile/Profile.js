import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import GlobalStyles from '../../../Components/GlobalStyle';
import BackHeader from '../../../Components/Header/BackHeader';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputComponent from '../../../Components/InputComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Fontisto from 'react-native-vector-icons/Fontisto';

//redux
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Constants/Colors';
import { CallApi } from '../../../CallApi';
import ToastMessage from '../../../Components/ToastMessage';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../../Components/Loader';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  // useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import { FormDatCallApi } from '../../../FormDataCallApi';
import { ProfileData } from '../../../Redux/Actions/ProfileAction';
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
const { width, height } = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import { NoInternetModal } from '../../../Components/NoInternetModal';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: 'sangram',
      last_name: 'keshari',
      email: 'samanta@gmail.com',
      phone: '9178690139',
      edit: false,
      loader: false,
      address: '',
      user_id: '',
      profile_picture: '',
      image: null,
      Offline: false,
      onopenModal: false,
    };
    this.bottomSheetRef = React.createRef();
    this.snapPoints = ['0%', '20%'];
  }
  onChangeHandle = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  lunchCameraModule = async () => {
    if (Platform.OS === 'ios') {
      this.lunchCamera();
    }
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Example App Camera Permission',
          message: 'Example App needs access to your camera',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.lunchCamera();
      }
    }
  };
  lunchCamera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const file = {
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        };
        // let formdata = new FormData()
        // formdata.append('profile_picture');
        // console.log(imageSource, 'fileName');
        this.onCloseBottomSheetHandler();
        this.setState(
          {
            image: {
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              uri: response.assets[0].uri,
            },
          },
          () => this.profiledata(file),
        );
        // this.uploadProfile(imagebase64);
      }
    });
  };

  launchImageLibrary = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   this.onCloseBottomSheetHandler();
    //   console.log(image);
    //   let file = {
    //     uri: image.path,
    //     type: image.mime,
    //     name: image.filename || `${Date.now()}`,
    //   };
    //   this.profiledata(file);
    // });
    let options = {
      // title: 'You can choose one image',
      // maxWidth: 256,
      // maxHeight: 256,
      // noData: true,
      // mediaType: 'photo',
      includeBase64: true,

      // selectionLimit: 4,//for Multiple Selection
      storageOptions: {
        skipBackup: true,
        path: 'images',
        filepath: {
          data: '',
          uri: '',
        },
        fileData: '',
        fileUri: '',
      },
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // console.log('response', JSON.stringify(response));

        const file = {
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        };
        // let formdata = new FormData()
        // formdata.append('profile_picture');
        // console.log(imageSource, 'fileName');
        this.onCloseBottomSheetHandler();
        this.setState(
          {
            image: {
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              uri: response.assets[0].uri,
            },
          },
          () => this.profiledata(file),
        );

        // this.setState({
        //   // imagePath: fileName,
        //   // photo: imagebase64,
        // });

        // call api for profile upload start
        // this.uploadProfile(imagebase64);
        // call api for profile upload end
      }
    });
  };
  profiledata = image => {
    console.log('bapi', this.state.image);
    this.setState({ loader: true });
    if (image) {
      let formdata = new FormData();
      // formdata.append('email', this.state.email);
      // formdata.append('first_name', this.state.first_name);
      // formdata.append('last_name', this.state.last_name);
      // formdata.append('mob', this.state.phone);
      // formdata.append('userId', this.state.user_id);
      // formdata.append('address', this.state.address);
      formdata.append('profile_picture', image);
      console.log(formdata, 'xxxx');
      return FormDatCallApi(
        'PATCH',
        `user/${this.props.userid}/`,
        formdata,
      ).then(res => {
        console.log('res address', res);
        try {
          this.getprofile();
        } catch (error) {
          this.setState({ loader: false });
          ToastMessage({
            text: error,
            type: 'type_info',
          });
        }
      });
    }
  };
  componentDidMount() {
    this.getprofile();
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

  submit = () => {
    let formdata = JSON.stringify({
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mob: this.state.phone,
      userId: this.state.user_id,
      address: this.state.address,
    });

    return CallApi('PUT', `user/${this.props.userid}/`, formdata).then(res => {
      console.log('res address', res);
      if (res.status === 200) {
        this.setState({ image: null }, () => this.getprofile());
      } else {
        this.setState({ loader: false });
        ToastMessage({
          text: res.message,
          type: 'type_info',
        });
      }
    });
  };
  getprofile = () => {
    this.setState({ loader: true });

    return CallApi('GET', `user/${this.props.userid}`, '').then(res => {
      this.setState({ loader: false });
      console.log('res alldata', res);

      try {
        this.props.ProfileData(res);
        this.setState({
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
          phone: res.mob,
          address: res.address,
          user_id: res.userId,
          profile_picture: res.profile_picture,
        });
      } catch (error) {
        ToastMessage({
          text: error,
          type: 'type_info',
        });
      }
    });
  };
  onOpenBottomSheetHandler = index => {
    this.bottomSheetRef.current.present();
  };
  onCloseBottomSheetHandler = () => {
    this.bottomSheetRef.current.close();
  };
  bottomSheetBody = () => {
    return (
      <View style={styles.bottomSheetBodyView}>
        <View style={styles.cameraViewStyle}>
          <TouchableOpacity
            onPress={() => {
              this.lunchCameraModule();
            }}
            style={styles.galleryViewStyle}>
            <Fontisto name="camera" size={35} color="rgb(76,46,131)" />
          </TouchableOpacity>
          <Text style={styles.usernameText}>Camera</Text>
        </View>
        <View style={styles.cameraViewStyle}>
          <TouchableOpacity
            onPress={() => this.launchImageLibrary()}
            style={styles.galleryViewStyle}>
            <FontAwesome name="photo" size={35} color="rgb(76,46,131)" />
          </TouchableOpacity>
          <Text style={styles.usernameText}>Galery</Text>
        </View>
      </View>
    );
  };

  render() {
    const { first_name, last_name, email, phone } = this.state;
    return (
      <BottomSheetModalProvider>
        <View style={GlobalStyles.container}>
          <BackHeader
            navigation={this.props.navigation}
            title="Profile"
            cartnumber={this.props.cartNumber}
            coin={this.props.coin}
          />
          {this.state.Offline ? (
            <NoInternetModal
              show={this.state.Offline}
              onRetry={this.getApisection}
              isRetrying={this.state.loader}
            />
          ) : null}
          {this.state.loader ? (
            <Loader />
          ) : (
            <ScrollView>
              <View style={styles.header}>
                <Pressable
                  style={styles.avatar_View}
                  onPress={() => this.setState({ onopenModal: true })}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: this.state.profile_picture
                        ? this.state.profile_picture
                        : 'https://bootdey.com/img/Content/avatar/avatar6.png',
                    }}
                  />
                  <Pressable
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      backgroundColor: '#fff',
                      padding: 5,
                      borderRadius: 30,
                    }}
                    onPress={() => this.onOpenBottomSheetHandler()}>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={25}
                      color={Colors.primary}
                    />
                  </Pressable>
                </Pressable>
                <Text style={styles.name}>
                  {this.state.first_name} {this.state.last_name}
                </Text>
                <Text style={styles.info}>+91 {this.state.phone}</Text>
                <Pressable
                  style={{ position: 'absolute', bottom: 10, right: 10 }}
                  onPress={() => this.setState({ edit: !this.state.edit })}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={25}
                    color={Colors.white}
                  />
                </Pressable>
              </View>
              <View style={GlobalStyles.textinput}>
                <Text style={styles.textheaderstyle}>First Name</Text>
                <InputComponent
                  // placeholder={'Enter your email'}
                  value={first_name}
                  name={'first_name'}
                  autoCapitalize={'none'}
                  editable={this.state.edit}
                  // keyboardType={'email-address'}
                  onChangeHandle={this.onChangeHandle}
                  marginTop={5}
                />
              </View>
              <View style={GlobalStyles.textinput}>
                <Text style={styles.textheaderstyle}>Last Name</Text>
                <InputComponent
                  // placeholder={'Enter your email'}
                  value={last_name}
                  name={'last_name'}
                  autoCapitalize={'none'}
                  editable={this.state.edit}
                  // keyboardType={'email-address'}
                  onChangeHandle={this.onChangeHandle}
                  marginTop={5}
                />
              </View>
              <View style={GlobalStyles.textinput}>
                <Text style={styles.textheaderstyle}>Email</Text>
                <InputComponent
                  // placeholder={'Enter your email'}
                  value={email}
                  name={'email'}
                  autoCapitalize={'none'}
                  editable={this.state.edit}
                  // keyboardType={'email-address'}
                  onChangeHandle={this.onChangeHandle}
                  marginTop={5}
                />
              </View>
              <View style={GlobalStyles.textinput}>
                <Text style={styles.textheaderstyle}>Phone</Text>
                <InputComponent
                  // placeholder={'Enter your email'}
                  value={phone}
                  name={'phone'}
                  autoCapitalize={'none'}
                  editable={false}
                  keyboardType={'numeric'}
                  onChangeHandle={this.onChangeHandle}
                  marginTop={5}
                />
              </View>
              {this.state.edit ? (
                <Pressable
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    alignItems: 'center',
                    backgroundColor: '#00BFFF',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                  onPress={() => this.submit()}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      letterSpacing: 0.5,
                      fontWeight: 'bold',
                    }}>
                    SAVE
                  </Text>
                </Pressable>
              ) : null}
            </ScrollView>
          )}
          <Modal
            animationType="slide"
            visible={this.state.onopenModal}
            transparent={true}
            onRequestClose={() => {
              this.setState({ onopenModal: false });
            }}>
            <Pressable
              style={GlobalStyles.pressablemain}
              onPress={() => this.setState({ onopenModal: false })}>
              <Pressable
                onPress={() => this.setState({ onopenModal: false })}
                style={GlobalStyles.pressableWrapperupperBody}>
                <Pressable
                  style={GlobalStyles.pressableWrapperBody}
                  onPress={() => this.setState({ onopenModal: true })}>
                  <Image
                    style={{
                      height: height / 2,
                      width: '100%',
                      resizeMode: 'contain',
                      // backgroundColor: '#fff',
                    }}
                    source={{
                      uri: this.state.profile_picture,

                      // headers: {Authorization: 'someAuthToken'},
                      // priority: FastImage.priority.high,
                    }}
                  />
                </Pressable>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
        <BottomSheetModal
          ref={this.bottomSheetRef}
          snapPoints={this.snapPoints}
          index={1}
          // enableOverDrag={true}
          enablePanDownToClose={true}
          backdropComponent={BottomSheetBackdrop}>
          <View style={{ flex: 1 }}>{this.bottomSheetBody()}</View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.profile_color,
  },
  textheaderstyle: {
    paddingBottom: 5,
    fontSize: 18,
  },
  avatar_View: {
    width: 130,
    height: 130,
    borderRadius: 63,
    // borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 1,
    marginTop: 20,
    marginBottom: 20,
    // position: "absolute",
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 63,
    // borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    // position: "absolute",
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  bottomSheetBodyView: {
    backgroundColor: '#fff',
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cameraViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryViewStyle: {
    marginLeft: 10,
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 5,
  },
  usernameText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
  bindActionCreators(
    {
      ProfileData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
