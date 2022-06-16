import {assignToCart} from '../../business/DashboardBusiness';
import * as types from '../../Types';
import * as ConstantsApi from '../../../Constants/ApiConstants';
import {CallApi} from '../../../CallApi';
import ToastMessage from '../../../Components/ToastMessage';

export const addToCart = (cartList, newItemForCart) => {
  return async dispatch => {
    try {
      let finalCartList = assignToCart(cartList, newItemForCart);
      //   debugger;
      dispatch({type: types.ADD_TO_CART, payload: finalCartList});
    } catch (e) {
      // alert(e)
      // alert('Error', JSON.stringify(e));
      dispatch({
        type: types.HOME_LOADING,
        payload: false,
      });
    }
  };
};
export const updateCart = cartList => {
  return async dispatch => {
    try {
      //  debugger;
      dispatch({type: types.ADD_TO_CART, payload: cartList});
    } catch (e) {
      // alert(e)

      dispatch({
        type: types.HOME_LOADING,
        payload: false,
      });
    }
  };
};

export const removeCart = () => {
  return async dispatch => {
    try {
      //     debugger;
      dispatch({type: types.ADD_TO_CART, payload: []});
    } catch (e) {
      // alert(e)
      // alert('Error', JSON.stringify(e));
      dispatch({
        type: types.HOME_LOADING,
        payload: false,
      });
    }
  };
};
export const checkOut = (payload, cb) => {
  return async dispatch => {
    CallApi('POST', ConstantsApi.url.CHECKOUT_URL, payload)
      .then(res => {
        dispatch({
          type: types.CHECKOUT_DATA,
          payload: res,
        });
        return cb(true, false, res);
      })
      .catch(error => {
        ToastMessage({
          type: 'type_info',
          text: 'Please wait our devloper Working on Checkout',
          // props:Colors.warning
        });
        return cb(false, true, 'Error While Getting data.');
      });
  };
};
export const updateCartNumber = cartnumber => {
  return async dispatch => {
    try {
      //  debugger;
      dispatch({type: types.CART_NUMBER, payload: cartnumber});
    } catch (e) {
      // alert(e)
      // alert('Errors', JSON.stringify(e));
    }
  };
};
