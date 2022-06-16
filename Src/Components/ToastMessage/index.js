import Toast from 'react-native-toast-message';
import React,{useRef} from 'react'
import { View, Text } from 'react-native'

const ToastMessage = (props) => {

    return (
        <View>
{  Toast.show({

  type: props.type,
  position: 'bottom',
  text1: props.text,
  visibilityTime: 2000,
  autoHide: true,
  topOffset: 30,
  bottomOffset: 30,
})}
        </View>
    )
}

export default ToastMessage
