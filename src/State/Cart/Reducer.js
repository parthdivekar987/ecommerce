import { removeItemToCart } from "./Action";
import {
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE
} from "./ActionType";

const initialState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
        case GET_CART_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.cartItems,
            };

        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems, action.payload],
            };

        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                removeItemToCart: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
            };

        case UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                updateItemToCart: state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case ADD_ITEM_TO_CART_FAILURE:
        case GET_CART_FAILURE:
        case REMOVE_CART_ITEM_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};