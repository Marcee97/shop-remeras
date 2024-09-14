import { useState } from "react";
import "../style/footer.scss";
export const Footer = () => {
  const [contactoVisible, setContactoVisible] = useState(false);
  const [sobreNos, setSobreNos] = useState(false);
  const infoDesplegada = (num) => {
    if (num === "contacto") {
      setContactoVisible(!contactoVisible);
    } else {
      setSobreNos(!sobreNos);
    }
  };

  return (
    <section className="footer">
      <div className="cont-footer">
        <div className="info-footer">
          <h5 onClick={() => infoDesplegada("sobrenos")}>
            Sobre Nosotros{" "}
            <i className="fa-solid fa-chevron-right info-opciones-arrow"></i>
          </h5>
          {sobreNos && (
            <div className="cont-texto-sobrenosotros">
              <h6> Bienvenidos a Limonada</h6>
              <p className="texto-info">
                Somos una tienda en línea especializada en camisetas estampadas
                no contamos con un local fisico no tenes que hablar con nadie.
              </p>
            </div>
          )}
          <h5 onClick={() => infoDesplegada("contacto")}>
            Contacto{" "}
            <i className="fa-solid fa-chevron-right info-opciones-arrow"></i>
          </h5>
          {contactoVisible && (
            <div className="cont-info-contacto">
              <h6>WhatsApp</h6>
              <p>3385442291</p>
              <h6>Email</h6>
              <p>usuario@gmail.com</p>
            </div>
          )}
        </div>

        <div className="cont-redes-sociales-footer">
          <ul className="ul-redes-sociales-footer">
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

        <div className="metodos-de-pago__footer">
          <img
            src="/mercado-pago.svg"
            alt="Logo mercadopago"
            className="icons-metodos-de-pago"
          />
          <img
            src="/visa-svgrepo-com.svg"
            alt="Logo mercadopago"
            className="icons-metodos-de-pago"
          />
          <img
            src="/mastercard-svgrepo-com.svg"
            alt="Logo mercadopago"
            className="icons-metodos-de-pago"
          />
        </div>
      </div>
    </section>
  );
};
