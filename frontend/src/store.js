import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {productDatailReducer, productListReducer} from './reducers/productReducers' 
import {cartReducer} from './reducers/cartReducer'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers'
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDatailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [];
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse         (localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";
const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage}
}
const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
})
 
export default store