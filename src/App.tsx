import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Orders } from "./Pages/Orders/Orders";
import { Dashboard } from "./Pages/Admin/Dashboard/Dashboard";
import { NoPage } from "./Pages/NoPage/NoPage";
import { Login } from "./Pages/Login/Login";
import { Signup } from "./Pages/SignIn/SignIn";
import { ProductInfo } from "./Pages/ProductInfo/ProductInfo";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AddProduct } from "./Pages/Admin/AddProduct";
import { useAppDispatch, useAppSelector } from "./Redux/Store";
import { Loader } from "./Components/Loader/Loader";
import { UpdateProduct } from "./Pages/Admin/UpdateProduct";
import { useEffect } from "react";
import { setLoading } from "./Redux/LoadingSlice";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "./Firebase/FirebaseConfig";
import { getAllProducts } from "./Redux/AllProductsSlice";
import Cart from "./Pages/Cart/Cart";
import { setOrdersList } from "./Redux/OrdersSlice";
import { AdminAuthProvider } from "./Components/Auth/AdminAuthProvider";
import { AuthProvider } from "./Components/Auth/AuthProvider";
function App() {
  const { isLoading } = useAppSelector((state) => state.Loading);
  const dispatch = useAppDispatch();
  const getProductData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(collection(fireDB, "products"), orderBy("time"));
        const data = onSnapshot(q, (QuerySnapshot) => {
          let productsArray: any = [];
          QuerySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          resolve(productsArray);
        });
        return () => data;
      } catch (error) {
        reject("Something Went Wrong.!");
      }
    });
  };

  const getOrderData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await getDocs(collection(fireDB, "orders"));
        const ordersArray: any = [];
        result.forEach((doc) => {
          ordersArray.push({ ...doc.data(), id: doc.id });
          setLoading(false);
        });
        resolve(ordersArray);
      } catch (error) {
        reject("Something Went Wrong.!");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const res = await Promise.all([getProductData(), getOrderData()]);
        dispatch(getAllProducts(res[0]));
        dispatch(setOrdersList(res[1]));
      } catch (error) {
        toast.error("Something Went Wrong.!");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={
              <AuthProvider>
                <Orders />
              </AuthProvider>
            }
          />
          <Route
            path="/cart"
            element={
              <AuthProvider>
                <Cart />
              </AuthProvider>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminAuthProvider>
                <Dashboard />
              </AdminAuthProvider>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/addproduct"
            element={
              <AdminAuthProvider>
                <AddProduct />
              </AdminAuthProvider>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <AdminAuthProvider>
                <UpdateProduct />
              </AdminAuthProvider>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
      <ToastContainer />
      {isLoading && <Loader />}
    </>
  );
}

export default App;
