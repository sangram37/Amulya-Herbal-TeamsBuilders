import { combineReducers } from "redux";
import UserLoginReducer from "../UserLoginReducer";
import UserSignUpReducer from "../UserSignUpReducer";
import ForgotPasswordReducer from "../ForgotPasswordReducer";
import HomeScreenReducer from "../HomeScreenReducer";
import CategoryReducer from "../CategoryReducer";
import CartReducer from "../CartReducer";
import OrderReducer from "../OrderReducer";
import AddressReducer from "../AddressReducer";
import ProfileReducer from "../ProfileReducer";
import BrandReducer from "../BrandReducer";
import WishlistReducer from "../WishlistReducer";
import ResentViewReducer from "../ResentViewReducer";
import AdsReducer from "../AdsReducer";
import CoinReducer from "../CoinReducer";


export default combineReducers({
  UserSignUpReducer: UserSignUpReducer,
  UserLoginReducer: UserLoginReducer,
  ForgotPasswordReducer: ForgotPasswordReducer,
  HomeScreenReducer: HomeScreenReducer,
  CategoryReducer: CategoryReducer,
  CartReducer: CartReducer,
  OrderReducer: OrderReducer,
  AddressReducer: AddressReducer,
  ProfileReducer: ProfileReducer,
  BrandReducer: BrandReducer,
  WishlistReducer: WishlistReducer,
  ResentViewReducer: ResentViewReducer,
  AdsReducer: AdsReducer,
  CoinReducer: CoinReducer
});
