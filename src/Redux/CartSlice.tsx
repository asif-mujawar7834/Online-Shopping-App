import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
export interface cartItemType {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  description: string;
  count: number;
}

export interface cartInitialStateType {
  cartItems: cartItemType[];
}
const parsedCartItems = localStorage.getItem("cartItems");
const initialState: cartInitialStateType = {
  cartItems: parsedCartItems ? JSON.parse(parsedCartItems) : [],
};

const CartSlice: Slice<cartInitialStateType> = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItemType>) => {
      const cartItems = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cartItems,
      };
    },

    increaseDecreaseCartProductCount: (state, action) => {
      const cartItems = state.cartItems.map((item) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            count: action.payload.flag ? item.count + 1 : item.count - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cartItems,
      };
    },

    deleteFromCart: (state, action: PayloadAction<cartItemType>) => {
      const cartItems = state.cartItems.filter(
        (item) => item.id != action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cartItems,
      };
    },
  },
});

export const { addToCart, deleteFromCart, increaseDecreaseCartProductCount } =
  CartSlice.actions;

export default CartSlice.reducer;
