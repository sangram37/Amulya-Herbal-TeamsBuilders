import { assignToCart, assignToResentView } from '../../business/DashboardBusiness';
import * as types from "../../Types"
import * as ConstantsApi from "../../../Constants/ApiConstants";
import { CallApi } from "../../../CallApi";



export const addToResentView = (resentView, newItemForResentView) => {

    return async (dispatch) => {
        try {
            let finalCartResentView = assignToResentView(resentView, newItemForResentView);
            //   debugger;
            dispatch({ type: types.ADD_TO_RESENTVIEW, payload: finalCartResentView });
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


export const removeResentView = () => {
    return async (dispatch) => {
        try {
            //     debugger;
            dispatch({ type: types.ADD_TO_RESENTVIEW, payload: [] });
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


