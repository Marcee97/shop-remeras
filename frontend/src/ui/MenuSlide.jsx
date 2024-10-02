import "../style/menuslide.scss";
import { useEffect, useRef, useState } from "react";

export const MenuSlide = ({ openCloseSlide }) => {
  const refMenuSlide = useRef(null);
  const [closeSlide, setCloseSlide] = useState(true);

  useEffect(() => {
    const menuSlide = refMenuSlide.current;

    if (openCloseSlide) {
      menuSlide.style.transform = "translateY(0%)";
    } else {
      menuSlide.style.transform = "translateY(0%)";
    }
  }, [openCloseSlide]);

  const closeMenuSlide = () => {
    setCloseSlide(!closeSlide);
  };

  useEffect(() => {
    const menuSlide = refMenuSlide.current;
    menuSlide.style.transform = "translateY(-100%)";
  }, [closeSlide]);



const [opcioSeleccionada, setOpcioSeleccionada] = useState(null)

const renderOpcion = (opcion)=> {
setOpcioSeleccionada(opcioSeleccionada === opcion ? null : opcion)
}
    

  return (
    <section className="menu-slide" ref={refMenuSlide}>

      <span className="material-symbols-outlined icon-close" onClick={closeMenuSlide}>
close
</span>
      
      <div className="cont-menu-opciones-slide">
      
<h5 onClick={()=> renderOpcion(1)}>Sobre Nosotros</h5>
<div className={`contenido ${opcioSeleccionada === 1 ? "activo" : ""}`}>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum facere, temporibus blanditiis totam beatae fugit hic natus delec</p>
</div>
<h5 onClick={()=> renderOpcion(2)}>Sorteos</h5>
<div className={`contenido ${opcioSeleccionada === 2 ? "activo" : ""}`}>
  <p>Info sobre Sorteos</p>
</div>
<h5 onClick={()=> renderOpcion(3)}>Contacto</h5>
<div className={`contenido ${opcioSeleccionada === 3 ? "activo" : ""}`}>
  <p><span>WhatsApp:</span>  3385-***-****</p>
  <p><span>Email:</span> tuvieja@gmail.com</p>
</div>
      </div>
    </section>
  );
};
