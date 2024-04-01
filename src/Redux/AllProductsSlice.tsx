import { Slice, createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../Firebase/FirebaseConfig";
interface productType {
  title: string;
  price: string;
  imageUrl: string;
  category: string;
  date: string;
  id: string;
}
interface initialStateType {
  allProductsList: productType[];
}

const initialState: initialStateType = {
  allProductsList: [],
};

export const fetchAllProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray: any = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        resolve(productsArray);
      });
      return () => data;
    } catch (error) {
      reject("Something went wrong while fetchint Data.!");
    }
  });
};

const AllProductsSlice: Slice<initialStateType> = createSlice({
  name: "AllProducts",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      return {
        ...state,
        allProductsList: action.payload,
      };
    },
    addNewProduct: (state, action) => {
      return {
        ...state,
        allProductsList: [action.payload, ...state.allProductsList],
      };
    },
    updateProduct: (state, action) => {
      return {
        ...state,
        allProductsList: state.allProductsList.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        }),
      };
    },
  },
});

export const { getAllProducts, addNewProduct, updateProduct } =
  AllProductsSlice.actions;
export default AllProductsSlice.reducer;
