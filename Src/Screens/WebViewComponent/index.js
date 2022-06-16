import {
  BackHandler,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import BackHeader from '../../Components/Header/BackHeader';
import Loader from '../../Components/Loader';
const {width, height} = Dimensions.get('screen');
const WebViewComponent = props => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={{flex: 1}}>
      <BackHeader
        title={props.route.params.name}
        navigation={props.navigation}
      />
      <View style={{flex: 1}}>
        {loading && <Loader />}
        {props.route.params != undefined && props.route.params.url != '' ? (
          <WebView
            style={{
              position: 'absolute',
              bottom: 0,
              left: 10,
              right: 10,
              top: 0,
            }}
            scrollEnabled={false}
            useWebKit={true}
            source={{uri: props.route.params.url}}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: height / 2,
            }}>
            {/* <Text>No Search Result Found</Text> */}
            <Text>No Result Found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default WebViewComponent;

const styles = StyleSheet.create({});
