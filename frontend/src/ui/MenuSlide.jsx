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

  const dataArray = ["Sobre Nosotros", "Sorteos", "Redes"];

  const [activeIndex, setActiveIndex] = useState(null);

  const opcionesMenu = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="menu-slide" ref={refMenuSlide}>

      <span className="material-symbols-outlined icon-close" onClick={closeMenuSlide}>
close
</span>
      <div className="cont-menu-slide">
        {dataArray.map((item, index) => (
          <div key={index}>
            <h5 onClick={() => opcionesMenu(index)}>{item}</h5>

            {activeIndex === index && (
              <div className={`cont-textos-menus ${activeIndex === index ? 'active' : ''}`}>
                {item === "Sobre Nosotros" && (
                  <p className="text-opciones-menu-slide">Somos una tienda en línea especializada en camisetas estampadas
                no contamos con un local fisico.</p>
                )}
                {item === "Sorteos" && <p className="text-opciones-menu-slide">Info sobre sorteos esta aca</p>}
                {item === "Redes" && (
                  <div className="redes-opciones-menu-slide">
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-tiktok"></i>
                    <i className="fa-brands fa-x-twitter"></i>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
