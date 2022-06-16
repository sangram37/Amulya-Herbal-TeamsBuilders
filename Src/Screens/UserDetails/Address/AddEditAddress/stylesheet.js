import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../../Constants/Colors';
import Fonts from '../../../../Constants/Fonts';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  textheaderstyle: {
    paddingBottom: 5,
    fontSize: 18,
    // fontFamily: Fonts.Akt_bold,
  },
});
