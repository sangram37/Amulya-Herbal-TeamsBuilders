import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  Pressable,
  Platform,
  Share,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Header, Button, Icon} from 'native-base';
import GlobalStyles from '../GlobalStyle';
import Colors from '../../Constants/Colors';
import RNFetchBlob from 'rn-fetch-blob';
function BillHeader(props) {
  const onShare = async url => {
    try {
      const result = await Share.share({
        title: 'TEAMS BUILDER',
        message: `Check your bill 
        ${url}`,
        url: url,
      });
      // console.log(Share.sharedAction);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const download = item => {
    console.log('sks');

    // Main function to download the image
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let pdf_URL = item;

    // Getting the extention of the file
    let ext = getExtention(pdf_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/pdf_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Pdf',
      },
    };
    config(options)
      .fetch('GET', pdf_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('bill Downloaded Successfully.');
      });
  };

  return (
    <View
      transparent
      style={{
        backgroundColor: Colors.primary,
        opacity: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lighter,
        height: Platform.OS === 'ios' ? '8.8%' : '6%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? 5 : 0,
      }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primary}
        barStyle="dark-content"
      />
      <View style={GlobalStyles.Header}>
        <Pressable
          transparent
          onPress={() => props.navigation.goBack()}
          style={{marginLeft: 20}}>
          <AntDesign
            name="arrowleft"
            style={{fontSize: 30, color: Colors.white}}
          />
        </Pressable>
        <View style={{paddingRight: 10}}>
          <Text style={GlobalStyles.HeaderText}>{props.title}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => download(props.pdflink)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            <Ionicons name="download-outline" size={25} color={Colors.white} />
          </Pressable>
          <Pressable
            onPress={() => onShare(props.pdflink)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="ios-share-outline" size={25} color={Colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
export default BillHeader;

const styles = StyleSheet.create({});
