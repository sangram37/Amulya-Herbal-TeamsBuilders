import { assignToCart, assignToWishlist } from '../../business/DashboardBusiness';
import * as types from "../../Types"
import * as ConstantsApi from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";



export const addToWishlist = (wishList, newItemForWishlist) => {

    return async (dispatch) => {
        try {
            let finalCartWishlist = assignToWishlist(wishList, newItemForWishlist);
            //   debugger;
            dispatch({ type: types.ADD_TO_WISHLIST, payload: finalCartWishlist });
        } catch (e) {
            // alert(e)
            alert('Error', JSON.stringify(e));
            dispatch({
                type: types.HOME_LOADING,
                payload: false,
            });
        }
    };
};
export const updateWishlist = (wishList) => {
    return async (dispatch) => {
        try {
            //  debugger;
            dispatch({ type: types.ADD_TO_WISHLIST, payload: wishList });
        } catch (e) {
            // alert(e)

            dispatch({
                type: types.HOME_LOADING,
                payload: false,
            });
        }
    };
};

export const removeWishlist = () => {
    return async (dispatch) => {
        try {
            //     debugger;
            dispatch({ type: types.ADD_TO_WISHLIST, payload: [] });
        } catch (e) {
            // alert(e)
            alert('Error', JSON.stringify(e));
            dispatch({
                type: types.HOME_LOADING,
                payload: false,
            });
        }
    };
};

export const updateWishlistNumber = (cartnumber) => {
    return async (dispatch) => {
        try {
            //  debugger;
            dispatch({ type: types.WISHLIST_NUMBER, payload: cartnumber });
        } catch (e) {
            // alert(e)
            alert('Error', JSON.stringify(e));

        }
    };
};
