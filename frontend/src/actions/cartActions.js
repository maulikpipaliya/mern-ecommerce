import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
export const addToCart = (slugid, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${slugid}`);
        console.log(
            "🚀 ~ file: cartActions.js ~ line 7 ~ addToCart ~ data",
            data
        );

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price.base,
                countInStock: data.countInStock,
                qty,
            },
        });

        localStorage.setItem(
            "cartItem",
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {}
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id,
        });

        localStorage.setItems(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {}
};


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }