import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  Pressable,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import {Header, Button, Icon} from 'native-base';
import GlobalStyles from '../GlobalStyle';
import Colors from '../../Constants/Colors';

function BackHeader(props) {
  return (
    <View
      transparent
      style={{
        backgroundColor: Colors.primary,
        opacity: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lighter,
        height: Platform.OS === 'ios' ? '8.8%' : '6%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? 5 : 0,
      }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primary}
        barStyle="dark-content"
      />
      <View style={GlobalStyles.Header}>
        <Pressable
          transparent
          onPress={() => props.navigation.goBack()}
          style={{ marginLeft: 20 }}>
          <AntDesign
            name="arrowleft"
            style={{ fontSize: 30, color: Colors.white }}
          />
        </Pressable>
        {props.title && (
          <View style={{ paddingRight: 10 }}>
            <Text style={GlobalStyles.HeaderText}>{props.title}</Text>
          </View>
        )}


        {props.title === 'Products' ? (
          <Pressable
            style={{
              flex: 0.8,
              alignItems: 'flex-end',
            }}
            onPress={() => props.navigation.navigate('Search')}>
            <AntDesign name="search1" size={24} color="white" />
          </Pressable>
        ) : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {props.cartnumber ? (
            <Pressable
              onPress={() => props.navigation.navigate('CartList')}
              style={{
                // justifyContent: 'center',
                alignItems: 'flex-end',
                // flex:1
              }}>
              <MaterialIcons name="shopping-bag" size={25} color="white" />
              {props.cartnumber ? (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#ff8585',
                    right: -8,
                    top: -4,
                    borderRadius: 20,
                    overflow: 'hidden',
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 10, color: Colors.white }}>
                    {props.cartnumber}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          ) : null}
          <Pressable style={{ paddingRight: 5, flexDirection: 'row', marginLeft: 15, alignItems: 'center' }} onPress={() => props.navigation.navigate('Transaction')}>
            <FontAwesome name="diamond" size={18} color="white" />
            <Text style={GlobalStyles.cointext}>{props.coin ? props.coin : 0}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
export default BackHeader;

const styles = StyleSheet.create({});
