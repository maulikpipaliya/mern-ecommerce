import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const itemsStored = action.payload;
            const itemExists = state.cartItems.find(
                (item) => item.product === itemsStored.product
            );

            if (!itemExists) {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemsStored],
                };
            } else {
                return {
                    ...state,
                };
            }
            return {};
        case CART_REMOVE_ITEM:
            return {};
        default:
            return state;
    }
};
