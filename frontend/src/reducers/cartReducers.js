import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    EMPTY_CART
} from "../constants/cartConstants";

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newCartItem = action.payload;
            console.log(
                "🚀 ~ file: cartReducers.js ~ line 7 ~ cartReducer ~ newCartItem",
                newCartItem
            );
            console.log("my state", state);

            const itemExists = state.cartItems.find(
                (x) => x.product === newCartItem.product
            );

            console.log("lola");
            if (!itemExists) {
                console.log("hahah");

                return {
                    ...state,
                    cartItems: [...state.cartItems, newCartItem],
                };
            } else {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === itemExists.product ? newCartItem : x
                    ),
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case EMPTY_CART:
            return { cartItems: [], shippingAddress: {}};
        default:
            return state;
    }
};
