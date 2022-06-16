import React from 'react';
import {StyleSheet, View, ActivityIndicator, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import BackHeader from '../../Components/Header/BackHeader';
import BillHeader from '../../Components/Header/BillHeader';
import {BASE_URL} from '../../Constants/ApiConstants';
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import {CallApi} from '../../CallApi';

//for about
class GenerateBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      downloadurl: '',
    };
  }
  // webView = {
  //   canGoBack: false,
  //   ref: null,
  // };

  // hideSpinner = () => {
  //   this.setState({loader: false});
  // };
  // showSpinner = () => {
  //   this.setState({loader: true});
  // };
  componentDidMount() {
    this.pdfurl();
  }
  pdfurl = () => {
    // api/<order_id>/generate/bill
    this.setState({loader: true});

    return CallApi(
      'GET',
      `${this.props.route.params.id}/generate/bill`,
      '',
    ).then(res => {
      // "bill_list": 10, "dp_list": 10, "id": "b29a8185-b5cd-44c8-ae69-512e87c8e078", "product_list": 10
      try {
        console.log(res, 'addsensesss');
        this.setState({
          downloadurl: res.res.bill,
          loader: false,
        });
        // this.downloadImage(res.bill);
      } catch (error) {
        console.log(error);
      }
    });

    // fetch(`${BASE_URL}${this.props.route.params.id}/generate/bill`, {
    //   method: 'GET',
    // })
    //   .then(response => response.json())
    //   //If response is in json then in success
    //   .then(responseJson => {
    //     //Succes
    //     this.setState({downloadurl: responseJson.res.bill, loader: false});
    //     // this.downloadImage(responseJson.res.bill);
    //   })
    //   //If response is not in json then in error
    //   .catch(error => {
    //     //Error
    //     alert(JSON.stringify(error));
    //     console.error(error);
    //   });
  };

  render() {
    const {height, width} = Dimensions.get('window');
    console.log(this.props.route.params);

    return (
      <View
        style={{
          flex: 1,
        }}>
        <BillHeader
          navigation={this.props.navigation}
          // link={`https://djparida.pythonanywhere.com/api/${this.props.route.params.id}/bill/`}
          link={`${BASE_URL}/media/pdfFiles/${this.props.route.params.id}.pdf`}
          title={'Generated Bill'}
          pdflink={this.state.downloadurl}
        />
        {/* <BackHeader navigation={this.props.navigation} title={'Bill'} /> */}
        {/* {this.props.route.params != undefined ? (
          <WebView
            onLoadEnd={() => this.setState({loader: false})}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 10,
              right: 10,
              top: 0,
            }}
            scrollEnabled={false}
            ref={webView => {
              this.webView.ref = webView;
            }}
            source={{
              uri: `${BASE_URL}${this.props.route.params.id}/bill/`,
            }}
            useWebKit={true}
            onLoadStart={() => this.showSpinner()}
            onLoad={() => this.hideSpinner()}
          />
        ) : null} */}
        {/* {this.state.downloadurl ? (
          <Pdf
            source={{uri: this.state.downloadurl, cache: true}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        ) : null} */}
        {this.state.loader ? (
          <ActivityIndicator
            color="#1a72d6"
            style={{position: 'absolute', top: height / 2, left: width / 2}}
            size="large"
          />
        ) : (
          <Pdf
            source={{uri: this.state.downloadurl, cache: true}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        )}
      </View>
    );
  }
}

export default GenerateBill;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
