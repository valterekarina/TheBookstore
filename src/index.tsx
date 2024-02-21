import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './components/ProductList/ProductList';
import { NavBar } from "./components/NavBar/NavBar";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import {Provider} from "react-redux"
import store from "./components/Redux/Store";
import Checkout from "./components/Checkout/Checkout";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path="/product/:productId" element = {<ProductDetails />} />
        <Route path="/cart" element = {<Cart />} />
        <Route path="/checkout" element = {<Checkout />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);
