import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/App.css";
import { Carousel } from "./components/Carousel.jsx";
import Nav from "./components/Nav";
import { slides } from "./components/carouselData.js";
import { Boutique } from "./components/Boutique.jsx";
import { ProductDetails } from "./components/ProductDetails.jsx"
import { Cart } from "./components/Cart.jsx"; 
import { CartProvider } from "../context/CartContext.jsx";


// CartProvider englobe l'App afin d'avoir accès aux élément du panier dans le Nav et autre composants


export default function App() {
  return (
    <CartProvider>
      <BrowserRouter >
        <Nav />
        <Routes>

          <Route path="/chocopap/"  element={  <Carousel data={slides} /> }>   </Route>
          <Route path="/chocopap/boutique" element={  <Boutique /> }>   </Route>
          <Route path="/chocopap/boutique/ProductDetails" element={<ProductDetails /> } > </Route>  
          <Route path="/chocopap/panier" element={<Cart />} >  </Route>  

        </Routes>   
      </BrowserRouter>
    </CartProvider>
  );
}


