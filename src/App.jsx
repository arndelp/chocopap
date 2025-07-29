import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/App.css";
import { Carousel } from "./components/Carousel.jsx";
import Nav from "./components/Nav";
import { slides } from "./data/carouselData.js";
import { Boutique } from "./components/Boutique.jsx";




export default function App() {
  return (
    
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/chocopap/" element={
      <Carousel data={slides} /> }>
      </Route>
      <Route path="/chocopap/boutique" element={
      <Boutique /> }>
      </Route>
     
      
    </Routes>   
    </BrowserRouter>
  );
}


