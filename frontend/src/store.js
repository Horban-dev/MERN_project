import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {productDatailReducer, productListReducer} from './reducers/productReducers' 
import {cartReducer} from './reducers/cartReducer'
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDatailReducer,
    cart: cartReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialState = {
    cart: { cartItems: cartItemsFromStorage}
}
const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
})
 
export default store