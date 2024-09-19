import "../style/menuslide.scss";
import { useState, useRef } from "react";



export const MenuSlide = ({dataSlide}) => {

console.log(dataSlide)

  return (
    <section className="menu-slide">
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
