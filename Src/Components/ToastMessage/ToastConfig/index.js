import * as React from 'react';
import { View ,Text} from 'react-native'
import Toast, { BaseToast, ErrorToast,ToastProps } from 'react-native-toast-message';
import Colors from '../../../Constants/Colors';
export const ToastConfig = {
    /* 
      overwrite 'success' type, 
      modifying the existing `BaseToast` component
    */
    success: ({ text1, props, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
        text1={text1}
        text2={props.uuid}
      />
    ),
  
    /*
      Reuse the default ErrorToast toast component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
    /* 
      or create a completely new type - `my_custom_type`,
      building the layout from scratch
    */
   
      type_danger: ({text1,colorss, props, ...rest}) => (
        <View
          style={{
            paddingVertical: 10,
            maxWidth: '100%',
            minWidth: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'red',
          }}>
          <Text style={{fontSize:15,fontWeight:'500',color:Colors.white,paddingHorizontal:10}}>{text1}</Text>
        </View>
      ),
      type_green: ({text1,colorss, props, ...rest}) => (
        <View
          style={{
            paddingVertical: 10,
            maxWidth: '100%',
            minWidth: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'green',
          }}>
          <Text style={{fontSize:15,fontWeight:'500',color:Colors.white,paddingHorizontal:10}}>{text1}</Text>
        </View>
      ),
      type_warning: ({text1,colorss, props, ...rest}) => (
        <View
          style={{
            paddingVertical: 10,
            maxWidth: '100%',
            minWidth: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'orange',
          }}>
          <Text style={{fontSize:15,fontWeight:'500',color:Colors.black,paddingHorizontal:10}}>{text1}</Text>
        </View>
      ),
      type_info: ({text1,colorss, props, ...rest}) => (
        <View
          style={{
            paddingVertical: 10,
            maxWidth: '100%',
            minWidth: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'black',
          }}>
          <Text style={{fontSize:15,fontWeight:'500',color:Colors.white,paddingHorizontal:10}}>{text1}</Text>
        </View>
      ),
  };