import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Details from '../screen/dashboard/Details';

import Colors from '../../Constants/Colors';

import Home from '../../Screens/Dashboard/Home';
import Bills from '../../Screens/Dashboard/Bills';
import MyOrders from '../../Screens/Order/MyOrders';
import CoinSection from '../../Screens/Dashboard/CoinSection';
const Tabnav = createBottomTabNavigator();
const Dashboardstack = createStackNavigator();

// const DashboardtackScreen = () => (
//   <Dashboardstack.Navigator headerMode={false}>
//     <Dashboardstack.Screen name="Home" component={Home} />
//   </Dashboardstack.Navigator>
// );

function TabNavigation(props) {
  // console.log('abd', props);

  return (
    // <SafeAreaProvider>
    <Tabnav.Navigator
      initialRouteName={'Home'}
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: Colors.color_red,
        inactiveTintColor: '#9c9687',
        labelPosition: 'below-icon',
        pressColor: 'blue',
        style: {
          height: Platform.OS === 'android' ? 60 : 85,
          backgroundColor: Colors.white,
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 14,
          paddingBottom: 5,
          // fontFamily: 'Roboto-Regular',
        },
      }}>
      <Tabnav.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={24} color={color} />
          ),
        }}
      />
      <Tabnav.Screen
        name="Credits"
        component={CoinSection}
        options={{
          // tabBarBadge: updateTotalItem(),
          tabBarLabel: 'Credits',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star" color={color} size={26} />
          ),
        }}
      />

      <Tabnav.Screen
        name="Bills"
        component={MyOrders}
        options={{
          tabBarLabel: 'Bills',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food" color={color} size={26} />
          ),
        }}
      />

      {/* 
        <Tabnav.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <Ionicons name="person" color={color} size={26} />
            ),
          }}
        /> */}
    </Tabnav.Navigator>

    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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
});

const mapStateToProps = ({ }) => {
  return {};
};
export default connect(mapStateToProps, {})(TabNavigation);
