import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    EMPTY_USER_DETAILS,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
} from "../constants/userConstants";

import { EMPTY_CART } from "../constants/cartConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch, getState) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("shippingAddress");

    dispatch({ type: EMPTY_CART });
    dispatch({ type: EMPTY_USER_DETAILS });
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: USER_LOGOUT });
};

export const register =
    (name, email, password, pincode, geoState, city, contactNumber) =>
    async (dispatch) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/users/register",
                {
                    name,
                    email,
                    password,
                    address: { pincode: pincode, state: geoState, city: city },
                    contact: contactNumber,
                },
                config
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        console.log("Printing user info");
        console.log(userInfo);
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        console.log(data);
        if (data) {
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data,
            });
        }
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

/*
---------------------------------------------------------------------
---------------------------------------------------------------------
*/

//admin acions

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/users/${user._id}`,
            user,
            config
        );

        dispatch({ type: USER_UPDATE_SUCCESS });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
