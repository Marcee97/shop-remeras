import "../style/navbar.scss";

export const NavBar = () => {
  return (
    <section className="navbar">
      <div className="cont-navbar">
        <h1 className="titulo-navbar">Limonada.</h1>
        <ul className="ul-navbar-redes-sociales">
          <li>
            <i className="fa-brands fa-x-twitter"></i>
          </li>
          <li>
            <i className="fa-brands fa-instagram"></i>
          </li>
          <li>
            <i className="fa-brands fa-tiktok"></i>
          </li>
        </ul>
      </div>
      
      
      
      <div className="opciones-catalogo-navbar">
        <p>Cine</p>
        <p>Anime</p>
        <p>Bandas</p>
      </div>
    </section>
  );
};
