
import * as types from '../../Types';

export const updateCoinNumber = coinnumber => {
    return async dispatch => {
        try {
            //  debugger;
            dispatch({ type: types.COIN_NUMBER, payload: coinnumber });
        } catch (e) {
            // alert(e)
            // alert('Errors', JSON.stringify(e));
        }
    };
};