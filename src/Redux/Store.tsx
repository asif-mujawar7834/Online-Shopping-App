import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import ThemeSlice from "./ThemeSlice";
import AllProductsSlice from "./AllProductsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import LoadingSlice from "./LoadingSlice";
import OrdersSlice from "./OrdersSlice";

export const Store = configureStore({
  reducer: {
    cart: CartSlice,
    Theme: ThemeSlice,
    AllProducts: AllProductsSlice,
    Loading: LoadingSlice,
    Orders: OrdersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof Store.getState>
> = useSelector;
