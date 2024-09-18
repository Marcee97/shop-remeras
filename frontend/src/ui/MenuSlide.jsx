import "../style/menuslide.scss";
import { useState, useRef } from "react";



export const MenuSlide = () => {

const [slideActive, setSlideActive] = useState(false)


const refMenu = useRef(null)

const menuActive = ()=> {
setSlideActive(prevSlide => (!prevSlide))


if(slideActive){
    console.log('es true')
}else{
    console.log('es false')
}
}



  return (
    <section className="menu-slide" ref={refMenu} onClick={menuActive}>
        <div className="cont-menu-slide">
            <ul className="menu-slide-opciones">
                <li>Sobre Nosotros</li>
                <li>Sorteos</li>
                <li>Redes</li>
            </ul>
        </div>
    </section>
  )
}
