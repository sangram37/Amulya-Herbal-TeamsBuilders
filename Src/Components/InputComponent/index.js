import React from 'react';
import {StyleSheet, Image, TextInput, View} from 'react-native';

import Colors from '../../Constants/Colors';

function InputComponent(props) {
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop || null,
        opacity: 1,
        borderWidth: props.borderWidth || 1,
        borderColor: props.borderColor || Colors.light_dark,
        borderRadius: props.borderRadius || 6,
      }}>
      <TextInput
        style={{
          color: Colors.black,
          marginLeft: 15,
          editable: props.editable || true,
          // marginTop: -7,
          alignItems: 'center',
          fontSize: props.fontSize || 16,
          justifyContent: 'center',
          paddingVertical: props.paddingVertical || 10,
          // fontFamily: 'Roboto-Regular',
        }}
        editable={props.editable}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        placeholderTextColor={Colors.black}
        value={props.value}
        secureTextEntry={props.isSecureTxt || false}
        keyboardType={props.keyboardType || 'default'}
        autoCapitalize={props.autoCapitalize || 'words'}
        onChangeText={txt => props.onChangeHandle(props.name, txt)}
        multiline={props.multiline || false}

        // {props.btnLoader ? (
        //   <ActivityIndicator size="small" color="#f00" />
        // ) : null}
      />
    </View>
  );
}

export default InputComponent;

const styles = StyleSheet.create({});
