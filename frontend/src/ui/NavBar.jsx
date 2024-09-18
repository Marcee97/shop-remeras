import "../style/navbar.scss";
import { useState } from "react";


export const NavBar = () => {


const [activeMenuSlide, setActiveMenuSlide] = useState(false)

const funcionMenuslide = ()=> {
  setActiveMenuSlide()
}

  return (
    <section className="navbar">
      <div className="cont-navbar">
      <span className="material-symbols-outlined icon-home">
home
</span>
<h1 className="titulo"><span>A</span><span>C</span></h1>

<span className="material-symbols-outlined btn-menu">
menu
</span>
        
      </div>

     
    </section>
  );
};
