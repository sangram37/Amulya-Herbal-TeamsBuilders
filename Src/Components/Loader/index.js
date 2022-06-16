import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../Constants/Colors';
export default Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}>
      <ActivityIndicator animating={true} color={Colors.primary} size={50} />
    </View>
  );
};
