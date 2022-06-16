import React from 'react';
import {
  View,
  Text,
  Pressable,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Constants/Colors';
import ProgressiveImage from '../ProgressiveImage';
const {width, height} = Dimensions.get('screen');
import FastImage from 'react-native-fast-image';
import Imageurl from '../../Constants/Imageurl';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const MainHeader = props => {
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primary}
        barStyle="dark-content"
      />
      {/* @Header Design Start */}
      <View
        style={{
          backgroundColor: Colors.primary,
          ...Platform.select({
            ios: {
              marginTop: '10%',
              paddingBottom: 5,
              paddingTop: 5,
            },
            android: {
              marginTop: 0,
              paddingVertical: 5,
            },
          }),
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.toggleDrawer()}>
            <Image
              style={{height: 40, width: 40, borderRadius: 60}}
              source={{
                uri: props.user ? props.user.image : Imageurl.noimage,
                // headers: {Authorization: 'someAuthToken'},
                // priority: FastImage.priority.high,
              }}
            />
          </Pressable>

          <Pressable
            style={{
              flex: 1.6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.navigate('logonavi')}>
            <Text style={{fontWeight: '700', fontSize: 17, color: 'white'}}>
              Teams Builder
            </Text>
          </Pressable>

          <Pressable
            onPress={() => props.navigation.navigate('Cart')}
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="shopping-bag" size={25} color="white" />
            {props.cartnumber ? (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: '#ff8585',
                  right: 3,
                  top: 1,
                  borderRadius: 20,
                  overflow: 'hidden',
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    color: Colors.white,
                  }}>
                  {props.cartnumber}{' '}
                </Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      </View>
      {/* @Header Design End */}
    </>
  );
};
const mapStateToProps = state => {
  return {
    cartNumber: state.CartReducer.cartNumber,
    loginUserStatus: state.UserLoginReducer.loginUserStatus,
    userid: state.UserLoginReducer.loginUser,
    user: state.ProfileReducer.userdata,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
