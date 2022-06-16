import {createDrawerNavigator} from '@react-navigation/drawer';

import * as React from 'react';

import Home from '../../Screens/Dashboard/Home';

import DrawerContentscreen from '../DrawerContentscreen';
import TabNavigation from '../TabNavigation';

const Drawer = createDrawerNavigator();

export default DrawerContainer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContentscreen {...props} />}
      defaultStatus={'closed'}
      // initialRouteName="TabNavigation"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        drawerStatusBarAnimation: 'slide',
        // overlayColor: "transparent"
      }}>
      <Drawer.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
