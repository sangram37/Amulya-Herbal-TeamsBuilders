import * as types from "../../Types";

const initialState = {
  categoryScreenData: [],
  categoryProductList: [],
  categoryProductDetails: {},
  categoryListing: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_SCREEN:
      return {
        ...state,
        categoryScreenData: action.payload,
      };
    case types.GET_CATEGORY_PRODUCT_LIST_SCREEN:
      return {
        ...state,
        categoryProductList: action.payload,
      };
    case types.GET_CATEGORY_PRODUCT_DETAILS_SCREEN:
      return {
        ...state,
        categoryProductDetails: action.payload,
      };
    case types.GET_CATEGORY_LIST:
      return {
        ...state,
        categoryListing: action.payload,
      };
    default:
      return state;
  }
};
