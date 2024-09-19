import "../style/navbar.scss";
import { useState } from "react";


export const NavBar = ({activeSlide}) => {



const funcionMenuslide = ()=> {
  activeSlide()
}

  return (
    <section className="navbar">
      <div className="cont-navbar">
      <span className="material-symbols-outlined icon-home" >
home
</span>
<h1 className="titulo"><span>A</span><span>C</span></h1>

<span className="material-symbols-outlined btn-menu" onClick={funcionMenuslide}>
menu
</span>
        
      </div>

     
    </section>
  );
};
