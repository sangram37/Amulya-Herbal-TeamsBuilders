import { Platform, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Constants/Colors';
import Fonts from '../../Constants/Fonts';
const { width, height } = Dimensions.get('screen');
const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    // width: '100%'
  },
  HeaderText: {
    fontSize: 20,
    color: Colors.white,
    // fontFamily: Fonts.Akt_medium,
    marginBottom: Platform.OS === 'ios' ? 3 : 0,
    textAlign: 'left',
    // letterSpacing: 0.5,
    marginLeft: 10,
    // fontFamily: 'Roboto-Regular',
  },
  cointext: {
    fontSize: 12,
    color: Colors.white,
    // fontFamily: Fonts.Akt_medium,
    marginBottom: Platform.OS === 'ios' ? 3 : 0,
    textAlign: 'left',
    // letterSpacing: 0.5,
    marginLeft: 5,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',

    backgroundColor: Colors.primary,
    marginLeft: -20,
  },

  boxcontainer: {
    width: 200,
    paddingHorizontal: 5,
    backgroundColor: Colors.white,
    paddingVertical: 15,
    elevation: 5,
    borderRadius: 0,
    opacity: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
  },
  boxcontainertext: {
    paddingLeft: 10,
    fontSize: 15,
    // fontFamily: Fonts.Akt_bold,
    width: '55%',
    // fontFamily: Colors.font_Regular,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_dark,
    width: '100%',
    opacity: 0.5,
  },
  textinput: {
    width: '93%',
    marginTop: 10,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 15,
    // fontFamily: Fonts.Akt_bold,
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  forgotPasswordText: {
    color: Colors.primary,
    // fontFamily: Fonts.Akt_bold,
  },
  bottonComponentView: {
    width: '93%',
    alignSelf: 'center',
    // marginTop: 20
  },
  pressableWrapperupperBody: {
    justifyContent: 'center',
    height: Platform.OS == 'ios' ? height / 2 : height / 2,
    width: '95%',
    alignSelf: 'center',
  },
  pressablemain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  pressableWrapperBody: {
    backgroundColor: Colors.white,
    // alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 10 : 10,
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
});
export default GlobalStyles;
