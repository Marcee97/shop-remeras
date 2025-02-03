import { useContext, useEffect, useRef, useState } from "react";
import "../css/components/navbar.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ElContexto from "../context/ProductContext";
import { MenuSlide } from "./MenuSlide";

export const NavBar = ({ activeSlide }) => {
  const [dataActives, setDataActives] = useState(false);

  const {
    setOpenCloseFormEnvio,
    setSelectTalle,
    setproductoSeleccionado,
    setOpenCloseMenuSlide,
    setOpenCloseCarrito,
    setPreferenceId,
    setOpenCloseSectionPay
  } = useContext(ElContexto);

  const location = useLocation();
  const navigate = useNavigate();

  const funcionMenuslide = () => {
    activeSlide("messi");
  };

  const refNavbar = useRef(null);
  const refBtnMenu = useRef(null);

  const menuStyle = () => {
    if (location.pathname === "/modal") {
      const navbar = refNavbar.current;
      const btnMenu = refBtnMenu.current;
      btnMenu.style.visibility = "hidden";
      navbar.style.position = "absolute";
      navbar.style.color = "#2b2a2a";
      navbar.classList.add("animation-logo");
    } else {
      const navbar = refNavbar.current;
    }
  };

  useEffect(() => {
    menuStyle();
  }, [location.pathname]);

  const goHome = () => {
    setOpenCloseFormEnvio("inicial");
    setSelectTalle("inicial");
    setproductoSeleccionado([]);
    setPreferenceId("")
    setOpenCloseSectionPay(false)
    navigate("/");
  };

  return (
    <section className="navbar">
      <div className="cont-navbar">
        <div className="cont-logo">
          <span
            className="material-symbols-outlined icons-nav"
            ref={refBtnMenu}
            onClick={() => setOpenCloseMenuSlide((prevState) => !prevState)}
          >
            sort
          </span>
          <h1 className="titulo-logo" onClick={goHome} ref={refNavbar}>
            Polarys
          </h1>
        </div>
        <span
          className="material-symbols-outlined"
          onClick={() => setOpenCloseCarrito((prevState) => !prevState)}
        >
          shopping_bag
        </span>
      </div>
    </section>
  );
};
