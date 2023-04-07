import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {productListReducer} from './reducers/productReducers' 

const reducer = combineReducers({
    productList: productListReducer,
})
const store = configureStore({
    reducer,
    preloadedState: {},
    middleware: [thunk],
})
 
export default store