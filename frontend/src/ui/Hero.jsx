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
              <div className="face cara-dos">Online</div>
              <div className="face cara-tres">Remeras</div>
              <div className="face cara-cuatro">Envios</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
