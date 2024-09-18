import "../style/navbar.scss";

export const NavBar = () => {
  return (
    <section className="navbar">
      <div className="cont-navbar">
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
<h1 className="titulo"><span>A</span><span>C</span></h1>

<span className="material-symbols-outlined btn-menu">
menu
</span>
        
      </div>

     
    </section>
  );
};
