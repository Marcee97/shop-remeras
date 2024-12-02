import { useState } from "react";
import "../css/components/navbar.css"

export const NavBar = ({activeSlide}) => {

const [dataActives, setDataActives] = useState(false)

const funcionMenuslide = ()=> {
  activeSlide('messi')
}

  return (
    <section className="navbar">
      <div className="cont-navbar">
      <span className="material-symbols-outlined icon-home" >
home
</span>
<h1 className="titulo"><span>N</span><span>S</span></h1>

<span className="material-symbols-outlined btn-menu" onClick={funcionMenuslide}>
menu
</span>
        
      </div>

     
    </section>
  );
};
