import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RatingStar = props => {
  let data = props.star;

  return (
    <View>
      <View style={{flexDirection: 'row', padding: 5}}>
        {data >= 5 ? <Ionicons name="star" size={20} color="#E76143" /> : null}
        {data >= 4 ? <Ionicons name="star" size={20} color="#E76143" /> : null}
        {data >= 3 ? <Ionicons name="star" size={20} color="#E76143" /> : null}
        {data >= 2 ? <Ionicons name="star" size={20} color="#E76143" /> : null}
        {data >= 1 ? <Ionicons name="star" size={20} color="#E76143" /> : null}
      </View>
    </View>
  );
};

export default RatingStar;
