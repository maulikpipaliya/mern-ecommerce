import axios from "axios";
import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
    CART_LIST_FAIL,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const listCARTs = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/CARTs");
    dispatch({
      type: CART_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCARTDetails = (slugid) => async (dispatch) => {
  try {
    dispatch({ type: CART_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/CARTs/${slugid}`)
    
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}