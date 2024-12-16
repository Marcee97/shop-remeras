import { useEffect, useRef, useState } from "react";
import "../css/components/navbar.css"
import { useLocation, Link, useNavigate } from "react-router-dom";
export const NavBar = ({activeSlide}) => {

const [dataActives, setDataActives] = useState(false)

const location = useLocation();
const navigate = useNavigate();


const funcionMenuslide = ()=> {
  activeSlide('messi')
}



const refNavbar = useRef(null)
const refBtnHome = useRef(null)
const refBtnMenu = useRef(null)

const menuStyle = ()=> {
  if(location.pathname === '/modal') {
    const navbar = refNavbar.current
    const btnHome = refBtnHome.current
    const btnMenu = refBtnMenu.current
    btnHome.style.visibility = "hidden"
    btnMenu.style.visibility = "hidden"
    navbar.style.background = "#00000036"
    navbar.style.fontSize = "1em"
    navbar.style.marginBottom = "1em"
    navbar.style.border = " 1px solid #222121"
  } else{
    const navbar = refNavbar.current
  }
}

useEffect(()=> {
menuStyle()
}, [location.pathname])


const goHome = ()=> {
navigate('/')
}




  return (
    <section className="navbar" ref={refNavbar}>
      <div className="cont-navbar">
      <span className="material-symbols-outlined icon-home" ref={refBtnHome}>
home
</span>
<h1 className="titulo" onClick={goHome}><span>N</span><span>S</span></h1>

<span className="material-symbols-outlined btn-menu" onClick={funcionMenuslide} ref={refBtnMenu}>
menu
</span>
        
      </div>

     
    </section>
  );
};
