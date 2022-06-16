import {StyleSheet, Platform} from 'react-native';
import Colors from '../../../Constants/Colors';
// import CommonFonts from '../../../Constants/CommonFonts';

export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 10;
export const DEFAULT_CELL_BG_COLOR = Colors.white;
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  codeFiledRoot: {
    // height: CELL_SIZE,
    marginTop: 30,
    // paddingHorizontal: 30,
    // justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: Colors.white,

    // IOS
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  // =======================

  root: {
    flex: 1,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  WrapperBottom: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
  },
  gradinetButtonStyle: {
    borderRadius: 6,
    marginBottom: 10,
    padding: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 17,
  },
  btnTextStyle: {
    color: Colors.white,
    fontSize: 15,
    // fontFamily: CommonFonts.buttonTextFont,
  },
});

export default styles;
