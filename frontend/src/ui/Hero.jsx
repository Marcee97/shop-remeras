import "../style/hero.scss";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="cont-hero">
        <img
          src="https://i.pinimg.com/736x/79/28/ed/7928edbcd0a355cd87d378afce440d24.jpg"
          alt="remera"
          className="fondo-hero"
        />
        <div className="texto-hero">
          <div className="cube-container">
            <div className="cube">
              <div className="face cara-uno">E-Commerce</div>
              <div className="face cara-dos">Remeras</div>
              <div className="face cara-tres">Online</div>
              <div className="face cara-cuatro">Envios</div>
            </div>
          </div>
          <ul className="ul-hero-redes-sociales">
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-tiktok"></i></li>
            <li><i className="fa-brands fa-x-twitter"></i></li>
          </ul>
        </div>
      </div>
      <p style={{color: "red"}}>Aca deberia decir algo mas</p>
    </section>
  );
};
