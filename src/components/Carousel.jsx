import React, { useState } from 'react';
import "./Carousel.css";
import { Outlet, Link } from "react-router-dom";

export const Carousel = ( { data }) => {
    
    const [slide, setSlide] = useState(0);

   
   
    return (
        <div className="carousel">
   
            {data.map((item, idx) => {
            return <img src={item.src} alt={item.alt} key={idx} className={slide === idx ? "slide" : "slide slide-hidden"}    />
        })}
            <span className="indicators">
                {data.map((_, idx) => {
                    return <button 
                        key={idx} 
                        onClick={() => setSlide(idx)} 
                        className={
                            slide === idx ? "indicator":"indicator indicator-inactive"}  >
                    </button>
                })}
            </span>
            <p className="slogan d-none d-lg-block">CHOCO PAP</p>
            <p className="sloganM d-block d-lg-none">CHOCO PAP</p>
        <div class="buttonPosition d-none d-lg-block">
            <Link to="/boutique">
                <button type="button" class=" btn-secondary btn-lg indexShopButton">VOIR LA BOUTIQUE</button>
            </Link> 
        </div>
   
        <div class="buttonPositionM d-block d-lg-none">
            <Link to="/boutique">
                <button type="button" class=" btn-secondary btn-lg indexShopButtonM">VOIR LA BOUTIQUE</button>
            </Link> 
            <Outlet />
        </div>
    </div>
    )
}