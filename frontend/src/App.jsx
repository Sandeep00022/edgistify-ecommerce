import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { MyNavbar } from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoutes";
import ProductDetail from "./pages/ProductDetail";
import Order from "./pages/Order";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
