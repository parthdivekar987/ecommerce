import {
  CONFIRMED_ORDER_FAILURE,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./ActionType";

// 1. Add all the properties your component uses to the initial state
const initialState = {
  loading: false,
  orders: [],
  error: null,
  confirmed: null,
  shipped: null,
  delivered: null,
  deletedOrder: null,
};

const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
    case CONFIRMED_ORDER_REQUEST:
    case DELIVERED_ORDER_REQUEST:
    case SHIP_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    // 2. Correctly update the specific order in the array
    case CONFIRMED_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        confirmed: action.payload,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case SHIP_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        shipped: action.payload,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case DELIVERED_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        delivered: action.payload,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedOrder: action.payload,
        orders: state.orders.filter((order) => order.id !== action.payload.id),
      };

    case GET_ORDERS_FAILURE:
    case CONFIRMED_ORDER_FAILURE:
    case DELIVERED_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default adminOrderReducer;