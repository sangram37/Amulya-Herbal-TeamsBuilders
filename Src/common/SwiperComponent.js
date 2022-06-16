import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import Swiper from 'react-native-swiper';
import Imageurl from '../Constants/Imageurl';

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});
var products = [{}, {}, {}];
export default class SwiperComponent extends React.Component {
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        dotStyle={{
          backgroundColor: '#000',
          borderColor: '#000',
          borderWidth: 1,
          width: 10,
          height: 10,
          borderRadius: 10,
        }}
        activeDotColor="#FFF"
        activeDotStyle={{
          borderColor: '#000',
          borderWidth: 1,
          width: 10,
          height: 10,
          borderRadius: 10,
        }}>
        {this.props.image.length >= 1 ? (
          this.props.image.map(item => {
            return (
              <View style={styles.slide}>
                <Image
                  source={{uri: item ? item : Imageurl.noimage}}
                  style={{height: 300, width: 300}}
                />
              </View>
            );
          })
        ) : (
          <View style={styles.slide}>
            <Image
              source={{uri: Imageurl.noimage}}
              style={{height: 300, width: 300}}
            />
          </View>
        )}
      </Swiper>
    );
  }
}
