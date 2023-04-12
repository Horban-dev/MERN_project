import axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST } from "../constans/productConstans";

export const listProducts = () => async (disatch) => {
    try {
        disatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/api/products')

        disatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        disatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message  : error.message,  
        })
    }
} 