import "../style/footer.scss";

export const Footer = () => {
  return (
    <section className="footer">
      <div className="cont-footer">
        <div className="info-footer"></div>

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
