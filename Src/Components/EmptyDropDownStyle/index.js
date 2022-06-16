import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../Constants/Colors';
import {Toast} from '../Toast';
// import CommonFonts from '../../Constants/CommonFonts';

const EmptyDropDownStyle = props => {
  return (
    <TouchableOpacity
      style={styles.inputFiledView}
      onPress={() => {
        Toast(props.message, 'type_warning');
      }}>
      <Text
        style={[
          styles.showValueStyle,
          {
            // fontFamily: CommonFonts.textInputStyle,
            marginTop: 3,
            color: Colors.black,
            marginLeft: 6,
          },
        ]}>
        {props.text}
      </Text>

      <AntDesign
        style={styles.downArrayStyle}
        name="down"
        color={Colors.black}
        size={20}
      />
    </TouchableOpacity>
  );
};

export default EmptyDropDownStyle;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  inputFiledViewCustum: {
    padding: Platform.OS === 'ios' ? 12 : 12,
    width: '93%',
    height: 50,
    // borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    color: Colors.light_dark,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#D3D3D3',
    borderWidth: 0,
  },
  textView: {
    flex: 0.9,
  },
  iconStyle: {
    flex: 0.1,
    alignSelf: 'center',
  },
  placehilderStyle: {
    // fontFamily: CommonFonts.textInputStyle,
  },
  inputFiledView: {
    padding: Platform.OS === 'ios' ? 12 : 12,
    width: '93%',

    // borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    color: Colors.light_dark,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#D3D3D3',
    borderWidth: 0,
  },
  showValueStyle: {
    flex: 0.9,
  },
  downArrayStyle: {
    flex: 0.1,
  },
});
