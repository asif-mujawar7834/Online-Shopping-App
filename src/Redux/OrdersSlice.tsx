import { Slice, createSlice } from "@reduxjs/toolkit";
import { cartItemType } from "./CartSlice";

interface extendedCartItemType extends cartItemType {
  category: string;
  status: string;
}

export interface ordersType {
  addressInfo: {
    name: string;
    phoneNumber: string;
    pincode: string;
    address: string;
  };
  cartItems: extendedCartItemType[];
  date: string;
  email: string;
  userid: string;
  id: string;
}

interface initialStateType {
  orders: ordersType[];
}
const initialState: initialStateType = {
  orders: [],
};

const OrdersSlice: Slice<initialStateType> = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    setOrdersList: (state, action) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
    updateOrder: (state, action) => {
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...order, cartItems: action.payload.cartItems };
          }
          return order;
        }),
      };
    },
  },
});

export const { setOrdersList, updateOrder } = OrdersSlice.actions;
export default OrdersSlice.reducer;
