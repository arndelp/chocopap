import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Carousel } from "./components/Carousel";
import Nav from "./components/Nav";
import { slides } from "./data/carouselData.json";
import ReactDOM from "react-dom/client";
import { Boutique } from "./components/Boutique";



export default function App() {
  return (
    
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={
      <Carousel data={slides} /> }>
      </Route>
      <Route path="/boutique" element={
      <Boutique /> }>
      </Route>
     
      
    </Routes>   
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);