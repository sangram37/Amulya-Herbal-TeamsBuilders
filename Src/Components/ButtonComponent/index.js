import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';

function ButtonComponent(props) {
  return (
    <TouchableOpacity
      onPress={() => props.btnAction()}
      disabled={props.btnLoader}
      style={styles(props).btnStyle}>
      <Text style={styles(props).btnText}>{props.btnText}</Text>
      {props.btnLoader ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = props =>
  StyleSheet.create({
    btnStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.btnBgColor || Colors.primary, //'transparent',
      paddingTop: props.btnPaddingTop || 15,
      paddingRight: props.btnPadingRight || 15,
      paddingBottom: props.btnPaddingBottom || 15,
      paddingLeft: props.btnPaddingLeft || 15,
      borderRadius: props.btnBorderRadius || 6,
      width: props.btnwidth || '100%',
      borderWidth: props.borderWidth || 0
    },
    btnText: {
      fontSize: props.txtSize || 16,
      color: props.txtColor || '#FFF',
      fontWeight: props.txtFontWeight || 'normal',

      textDecorationLine: props.txtDecoration || 'none', //underline
      marginRight: 5,
      letterSpacing: 1,
      // fontFamily: Fonts.Akt_regular,
      textAlign: 'center',
    },
  });
export default ButtonComponent;
