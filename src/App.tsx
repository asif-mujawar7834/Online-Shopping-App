import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Orders } from "./Pages/Orders/Orders";
import { Cart } from "./Pages/Cart/Cart";
import { Dashboard } from "./Pages/Admin/Dashboard/Dashboard";
import { NoPage } from "./Pages/NoPage/NoPage";
import { StoreContextProvider } from "./Context/StoreContext";
import { Login } from "./Pages/Login/Login";
import { Signup } from "./Pages/SignIn/SignIn";
import { ProductInfo } from "./Pages/ProductInfo/ProductInfo";
function App() {
  return (
    <StoreContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </StoreContextProvider>
  );
}

export default App;
